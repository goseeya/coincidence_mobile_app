# C🟡INCIDENCE - Transaction App

<img width="375" alt="image" src="https://github.com/user-attachments/assets/f2068fbb-d233-4a46-9030-32817c796f5c" />


Coincidence is a simple mobile application built using React Native with a Node.js + SQLite backend. It simulates a basic banking environment with features like:

- Sending money between accounts of the same customer
- Sending money to another entity
- Sending money abroad

## Architecture & Stack

- React Native was chosen for mobile development.
- Node.js is a lightweight backend ideal for fast prototyping.
- SQLite3 provides a file-based database, simple, for local development without big setup.
- RESTful API architecture ensures a clean separation between frontend and backend responsibilities.

<img width="1005" alt="image" src="https://github.com/user-attachments/assets/1f91c2e0-2f65-402e-bf55-cafb9398fcfe" />



## Authentication

- The backend uses bcrypt to hash and validate user passwords (https://www.npmjs.com/package/bcrypt).
- Simple session-like login flow (no persistent session or token logic) was used for simplicity and clarity.
- Future Improvement: Integrate JWT for secure authentication, enabling protected endpoints and set timeout to 15 min.

## Frontend Design

- All screens are built using functional components.
- App fetches data from the backend using axios.
- A minimal but structured UI divided into components.
- Account data and transactions are dynamically loaded on-screen load.
- Future Improvement: Improve navigation with burger menu. Add state management.

## Backend Functionality

- The backend initializes a fresh SQLite database with predefined accounts and a demo user (test/test123).
- API endpoints support:
  - GET /accounts
  - GET /balance
  - GET /transactions
  - POST /transactions
  - POST /login
- Exchange rate data is using a Wise API key.

## Error Handling

- Backend includes basic error handling with appropriate status codes.
- Frontend provides user feedback for invalid credentials or transaction errors.

## Getting Started

To start the project, after cloning, you need to run both backend and frontend. To see the UI you can use simulator on MacBook or ExpoGo on iPhone.

- Backend:
  - cd backend
  - npm install
  - node index.js (the first run of this command initializes the database)
- Frontend:
  - cd frontend
  - npm install
  - npm start
  - i (to run on Simulator)
  - w (to run on web)
    The app expects the backend to run at http://localhost:3001.
