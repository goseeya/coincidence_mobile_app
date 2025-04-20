const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      account_name TEXT,
      account_number VARCHAR(11) UNIQUE,
      balance REAL DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fromAccount TEXT,
      toAccount TEXT,
      currency TEXT,
      amount REAL,
      nokValue REAL,
      transactionType TEXT,
      date DATETIME
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `);

  db.get("SELECT COUNT(*) as count FROM accounts", (err, row) => {
    if (row.count === 0) {
      const insert = db.prepare("INSERT INTO accounts (account_name, account_number, balance) VALUES (?, ?, ?)");
      insert.run("Savings account", "18022252505", 5000);
      insert.run("Standard account", "12284224333", 20000);
      insert.finalize();
      console.log("Added dummy accounts");
    }
  });

  db.get("SELECT * FROM users WHERE username = ?", ['test'], async (err, row) => {
    if (!row) {
      const hashed = await bcrypt.hash('test123', 10);
      db.run("INSERT INTO users (username, password) VALUES (?, ?)", ['test', hashed]);
      console.log("Test user added");
    }
  });
});

app.get('/', (req, res) => res.send('Server is running'));

app.get("/accounts", (req, res) => {
  db.all("SELECT id, account_name, account_number, balance FROM accounts", (err, rows) => {
    if (err) return res.status(500).send("Database error");
    res.json(rows);
  });
});

app.get("/balance", (req, res) => {
  db.get("SELECT SUM(balance) AS total_balance FROM accounts", (err, row) => {
    if (err) return res.status(500).send("Database error");
    res.json({ total_balance: row?.total_balance || 0 });
  });
});

app.get('/transactions', (req, res) => {
  db.all("SELECT * FROM transactions ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).send("Database error");
    res.json(rows);
  });
});

app.post('/transactions', (req, res) => {
  const { fromAccount, toAccount, currency, amount, nokValue, transactionType } = req.body;
  if (!fromAccount || !toAccount || !amount) return res.status(400).send("Missing transaction data");

  db.serialize(() => {
    db.run("BEGIN TRANSACTION");

    db.get("SELECT balance FROM accounts WHERE account_number = ?", [fromAccount], (err, fromRow) => {
      if (err || !fromRow) return rollback("Source account does not exist");
      if (fromRow.balance < nokValue ?? amount) return rollback("Insufficient funds");

      db.run("UPDATE accounts SET balance = balance - ? WHERE account_number = ?", [nokValue ?? amount, fromAccount], (err) => {
        if (err) return rollback("Error while deducting funds");

        db.run("UPDATE accounts SET balance = balance + ? WHERE account_number = ?", [nokValue ?? amount, toAccount], (err) => {
          if (err) return rollback("Error while adding funds");

          db.run(`
            INSERT INTO transactions (fromAccount, toAccount, currency, amount, nokValue, transactionType, date)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [fromAccount, toAccount, currency, amount, nokValue ?? null, transactionType, new Date()],
            function (err) {
              if (err) return rollback("Erorr while saving transaction");
              db.run("COMMIT");
              res.status(201).json({ id: this.lastID, message: "Transaction completed successfully" });
            }
          );
        });
      });
    });

    function rollback(message) {
      db.run("ROLLBACK");
      res.status(400).send(message);
    }
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
    if (err) return res.status(500).send("Server error");
    if (!user) return res.status(401).send("Wrong credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).send("Wrong credentials");
    res.json({ success: true, message: "Logged in successfully" });
  });
});


app.get("/wise-rate", async (req, res) => {
  const { from, target } = req.query;
  const MOCK_API_KEY = '7c6a0dac-2d04-4c4e-949b-4e057abec904';
  const apiKey = process.env.WISE_API_KEY ?? MOCK_API_KEY;
  const response = await fetch(`https://api.wise.com/v1/rates?source=${from}&target=${target || 'NOK'}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  const data = await response.json();
  res.json(data[0]?.rate || null);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
