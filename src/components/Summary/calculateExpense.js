export default function calculateExpenses(transactions) {
  return transactions.reduce(
    (acc, current) => {
      switch (current.type) {
        case "income":
          acc.income += current.amount;
          return acc;
          break;
        case "expense":
          acc.expense += current.amount;
          return acc;
          break;
        default:
          break;
      }
    },
    {
      income: 0,
      expense: 0,
    }
  );
}
