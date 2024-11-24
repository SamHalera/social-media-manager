import { isAfter, isBefore, isEqual } from "date-fns";
import dayjs from "dayjs";
import { DateRange } from "react-day-picker";

export const computeWalletBalances = (wallet: WalletProps) => {
  let walletBalance = wallet.balance;
  const expensesPast = wallet.transaction.filter(
    (elt) => elt.type === "EXPENSE" && elt.transactionStatus === "PAST"
  );
  const incomesPast = wallet.transaction.filter(
    (elt) => elt.type === "INCOME" && elt.transactionStatus === "PAST"
  );
  const expensesUpcoming = wallet.transaction.filter(
    (elt) => elt.type === "EXPENSE" && elt.transactionStatus === "UPCOMING"
  );
  const incomesUpcoming = wallet.transaction.filter(
    (elt) => elt.type === "INCOME" && elt.transactionStatus === "UPCOMING"
  );

  let expensesPastBalance = 0;
  let incomesPastBalance = 0;
  let expensesUpcomingBalance = 0;
  let incomesUpcomingBalance = 0;

  expensesPast.forEach((item) => (expensesPastBalance += item.amount));
  expensesUpcoming.forEach((item) => (expensesUpcomingBalance += item.amount));

  incomesPast.forEach((item) => (incomesPastBalance += item.amount));
  incomesUpcoming.forEach((item) => (incomesUpcomingBalance += item.amount));

  walletBalance += incomesPastBalance - expensesPastBalance;
  return {
    walletBalance,
    incomesPastBalance,
    incomesUpcomingBalance,
    expensesPastBalance,
    expensesUpcomingBalance,
  };
};

export const filterAndSortDataForTable = (
  dataForTable: TransactionProps[],
  showPast: boolean,
  showUpcoming: boolean,
  method: string[],
  date: DateRange | undefined,
  searchedValue: string
) => {
  return dataForTable
    .sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    })
    .filter((elt) => {
      if (showPast && !showUpcoming) return elt.transactionStatus === "PAST";
      if (showUpcoming && !showPast)
        return elt.transactionStatus === "UPCOMING";
      else return elt;
    })
    .filter((elt: TransactionProps) => {
      if (method.length > 0) return method.includes(elt.paymentMethod);
      else return elt;
    })
    .filter((elt) => {
      if (date && date.from && date.to) {
        return (
          isEqual(elt.date, date.from) ||
          isEqual(elt.date, date.to) ||
          (isAfter(elt.date, date.from) && isBefore(elt.date, date.to))
        );
      } else {
        return elt;
      }
    })
    .filter((elt) => {
      if (searchedValue) {
        return (
          elt.label.toLowerCase().includes(searchedValue.toLowerCase()) ||
          elt.paymentMethod.toLowerCase().includes(searchedValue.toLowerCase())
        );
      }
      return elt;
    });
};

export const formatDataForCharts = (wallet: WalletProps) => {
  const transactionsCharts: TransactionsChartProps[] = [];

  const monthList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  monthList.forEach((month) => {
    const transactionsByMonth = wallet.transaction.filter((transactionElt) => {
      const transactionMonth = dayjs(transactionElt.date).format("MMM");
      return transactionMonth === month;
    });

    let totalIncomes = 0;
    let totalExpenses = 0;
    transactionsByMonth.forEach((transaction) => {
      if (transaction.type === "INCOME") {
        totalIncomes += transaction.amount;
      }
      if (transaction.type === "EXPENSE") {
        totalExpenses += transaction.amount;
      }
    });
    const objectData = {
      month,
      incomes: totalIncomes,
      expenses: totalExpenses,
    };

    transactionsCharts.push(objectData);
  });
  return transactionsCharts;
};

export const formatTransactionsByMethodForCharts = (
  walletTransactions: TransactionProps[]
) => {
  const transactions: {
    method: string;
    occurences: number;
    incomes: number;
    expenses: number;
  }[] = [];

  const transactionMethods =
    process.env.NEXT_PUBLIC_TRANSACTION_METHODS?.split(",");

  transactionMethods?.forEach((method) => {
    const transactionByMethodArray = walletTransactions.filter(
      (elt) => elt.paymentMethod === method
    );
    const occurences = transactionByMethodArray.length;

    const { incomes, expenses } = calculateTransactionAmountByMethod(
      transactionByMethodArray,
      method
    );
    transactions.push({
      method: `${method} (${occurences})`,
      occurences,
      incomes,
      expenses,
    });
  });

  return transactions;
};

export const createSelectOptionsForYears = (
  firstYear: number,
  limit: number
) => {
  const yearOptions: { value: string; label: string }[] = [];
  for (let i = 0; i <= limit; i++) {
    const value = firstYear + i;
    yearOptions.push({
      value: value.toString(),
      label: value.toString(),
    });
  }
  return yearOptions;
};

const calculateTransactionAmountByMethod = (
  transactionsByMethod: TransactionProps[],
  method: string
) => {
  let totalIncomes = 0;
  let totalExpenses = 0;
  transactionsByMethod.forEach((transaction) => {
    if (transaction.paymentMethod === method && transaction.type === "INCOME")
      totalIncomes += transaction.amount;
    if (transaction.paymentMethod === method && transaction.type === "EXPENSE")
      totalExpenses += transaction.amount;
  });
  return { expenses: totalExpenses, incomes: totalIncomes };
};
