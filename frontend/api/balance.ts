export const fetchBalance = async () => {
    const response = await fetch('http://localhost:3001/balance');
    if (!response.ok) throw new Error('Error fetching balance: ' + response.status);
    const data = await response.json();
    return data;
  };