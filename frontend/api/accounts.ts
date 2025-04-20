export const fetchAccounts = async () => {
    const response = await fetch('http://localhost:3001/accounts');
    if (!response.ok) throw new Error('Error fetching accounts: ' + response.status);
    const data = await response.json();
    return data;
  };