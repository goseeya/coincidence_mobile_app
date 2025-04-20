  export const getExchangeRateToNok = async (from: string): Promise<number> => {
    const response = await fetch(
      `http://localhost:3001/wise-rate?from=${from}&to=NOK`
    );
    if (!response.ok) throw new Error("Error fetching exchange rate");
    const exchangeRate = await response.json();
    return exchangeRate;
  };