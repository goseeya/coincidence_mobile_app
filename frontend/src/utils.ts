export const formatAccountNumber = (accountNumber: string) => {
    const part1 = accountNumber.slice(0, 4);
    const part2 = accountNumber.slice(4, 6);
    const part3 = accountNumber.slice(6);
    return `${part1} ${part2} ${part3}`;
  };