export type Transaction = {
    id?: number;
    fromAccount: string;
    toAccount: string;
    currency: string;
    amount: number;
    nokValue?: number;
    type: 'internal' | 'domestic' | 'international';
    date: string;
  };

  export async function fetchTransactions(): Promise<Transaction[]> {
    const response = await fetch('http://localhost:3001/transactions');
    return response.json();
  }

  export async function sendTransaction(transaction: Transaction) {
    const response = await fetch('http://localhost:3001/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    });
    if (!response.ok) throw new Error('Saving transaction failed');
    return response.json();
  }