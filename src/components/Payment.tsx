import { useState } from "react";
import Switch from "react-switch";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { usePaymentContext } from "../contexts/PaymentContext";
import UpdatePaymentModal from "./UpdatePaymentModal";
import useToast from "../hooks/useToast";

type PaymentType = {
  id: number;
  description: string;
  price: number;
  deadline: string;
  paidOut: boolean;
};

type PaymentProps = {
  data: PaymentType;
};

const Payment = ({ data }: PaymentProps) => {
  const [paidOut, setPaidOut] = useState<boolean>(data.paidOut);
  const [updatePaymentModalIsOpen, setUpdatePaymentModalIsOpen] =
    useState<boolean>(false);

  const { removePayment, setPaid, formatPriceInBRL } = usePaymentContext();

  const [ToastContainer, showMessage] = useToast();

  function handleSwitch() {
    setPaid(data.id, !paidOut);

    if (!paidOut) {
      showMessage("Pagamento finalizado");
    }

    setPaidOut(!paidOut);
  }

  function handleRemovePayment() {
    if (window.confirm("Tem certeza que deseja excluir este pagamento?")) {
      removePayment(data.id);

      showMessage("Pagamento excluído");
    }
  }

  function statusColor(): string {
    if (
      Date.now() > new Date(`${data.deadline} 23:59:59`).getTime() &&
      !data.paidOut
    ) {
      return "text-red-400";
    }

    const days = 86400000 * 3; // 3 days

    if (
      new Date(`${data.deadline} 23:59:59`).getTime() - days <= Date.now() &&
      !data.paidOut
    ) {
      return "text-yellow-500";
    }

    return "";
  }

  return (
    <>
      <tr
        className={`bg-white shadow-sm 
      dark:bg-gray-700 text-gray-500 dark:text-gray-400 
      hover:bg-gray-50 dark:hover:bg-gray-600 
      ${paidOut && "opacity-60 hover:bg-white dark:hover:bg-gray-700"}`}
      >
        <td className="py-5 px-6 rounded-l">{data.description}</td>
        <td className="py-3 px-6">{formatPriceInBRL(data.price)}</td>
        <td className={`py-3 px-6 whitespace-nowrap ${statusColor()}`}>
          {format(parseISO(data.deadline), "d MMM yyyy", { locale: ptBR })}
        </td>
        <td className="py-3 px-6 rounded-r">
          <div className="flex items-center justify-end">
            <Switch
              onChange={handleSwitch}
              checked={paidOut}
              height={20}
              width={48}
              uncheckedIcon={false}
              onColor="#10B981"
              offColor="#bdbdbd"
              onHandleColor="#eee"
              offHandleColor="#eee"
            />
            <button
              className="flex items-center ml-5"
              onClick={() => setUpdatePaymentModalIsOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
            <button
              className="flex items-center ml-4"
              onClick={handleRemovePayment}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
          <ToastContainer />
        </td>
      </tr>
      <UpdatePaymentModal
        modalIsOpen={updatePaymentModalIsOpen}
        closeModal={() => setUpdatePaymentModalIsOpen(false)}
        payment={data}
      />
    </>
  );
};

export default Payment;
