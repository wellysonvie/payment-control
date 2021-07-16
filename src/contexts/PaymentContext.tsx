import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Payment = {
  id: number;
  description: string;
  price: number;
  deadline: string;
  paidOut: boolean;
};

type PaymentContextType = {
  payments: Payment[];
  addPayment: (description: string, price: number, deadline: string) => void;
  removePayment: (paymentId: number) => void;
  updatePayment: (paymentId: number, newValue: Payment) => void;
  setPaid: (paymentId: number, paidOut: boolean) => void;
  formatPriceInBRL: (price: number) => string;
};

type PaymentProviderProps = {
  children: ReactNode;
};

export const PaymentContext = createContext({} as PaymentContextType);

export const PaymentProvider = ({ children }: PaymentProviderProps) => {
  const [payments, setPayments] = useState<Payment[]>(() => {
    const currentValue = window.localStorage.getItem("payments");
    return JSON.parse(currentValue || "[]") as Payment[];
  });

  useEffect(() => {
    window.localStorage.setItem("payments", JSON.stringify(payments));
  }, [payments]);

  function addPayment(description: string, price: number, deadline: string) {
    function generateID() {
      return (
        payments.reduce((max, payment) => {
          if (payment.id > max) max = payment.id;
          return max;
        }, 0) + 1
      );
    }

    setPayments((payments) => [
      ...payments,
      { id: generateID(), description, price, deadline, paidOut: false },
    ]);

    reorderPayments();
  }

  function removePayment(paymentId: number) {
    setPayments((payments) =>
      payments.filter((payment) => payment.id !== paymentId)
    );
    reorderPayments();
  }

  function updatePayment(paymentId: number, newValue: Payment) {
    setPayments((payments) =>
      payments.map((payment) => {
        if (payment.id === paymentId) {
          return newValue;
        }
        return payment;
      })
    );

    reorderPayments();
  }

  function setPaid(paymentId: number, paidOut: boolean) {
    setPayments((payments) =>
      payments.map((payment) => {
        if (payment.id === paymentId) {
          return { ...payment, paidOut };
        }
        return payment;
      })
    );

    reorderPayments();
  }

  function formatPriceInBRL(price: number): string {
    return price.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
  }

  function reorderPayments() {
    setPayments((payments) =>
      [...payments]
        .sort(
          (a: Payment, b: Payment) =>
            new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
        )
        .sort((a: Payment, b: Payment) => {
          if (a.paidOut) return 1;
          return -1;
        })
    );
  }

  return (
    <PaymentContext.Provider
      value={{
        payments,
        addPayment,
        removePayment,
        updatePayment,
        setPaid,
        formatPriceInBRL,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export function usePaymentContext() {
  return useContext(PaymentContext);
}
