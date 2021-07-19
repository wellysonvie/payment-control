import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { usePaymentContext } from "../contexts/PaymentContext";

type MonthlyBalance = {
  monthIndex: number;
  monthName: string;
  totalPaid: number;
  totalToPay: number;
};

const useCalculateMonthlyBalance = (monthIndex: number) => {
  const { payments } = usePaymentContext();

  return {
    monthIndex,
    monthName: format(new Date().setMonth(monthIndex), "MMMM", {
      locale: ptBR,
    }),
    totalPaid: payments.reduce(
      (total, payment) =>
        payment.paidOut && new Date(payment.deadline).getMonth() === monthIndex
          ? total + payment.price
          : total,
      0
    ),
    totalToPay: payments.reduce(
      (total, payment) =>
        new Date(payment.deadline).getMonth() === monthIndex
          ? total + payment.price
          : total,
      0
    ),
  } as MonthlyBalance;
};

export default useCalculateMonthlyBalance;
