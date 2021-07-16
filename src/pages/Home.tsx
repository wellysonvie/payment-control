import { useState } from "react";
import NewPaymentModal from "../components/NewPaymentModal";
import Payment from "../components/Payment";
import { usePaymentContext } from "../contexts/PaymentContext";

const Home = () => {
  const [newPaymentModalIsOpen, setNewPaymentModalIsOpen] =
    useState<boolean>(false);

  const { payments } = usePaymentContext();

  function openModal() {
    setNewPaymentModalIsOpen(true);
  }

  function closeModal() {
    setNewPaymentModalIsOpen(false);
  }

  return (
    <main className="flex-grow pt-24 pb-20 px-5 overflow-y-auto">
      <section className="max-w-3xl mx-auto h-full flex flex-col">
        <header
          className="pt-5 pb-3 mb-5 h-20 flex items-center justify-between 
                      border-solid border-b-2 dark:border-gray-400"
        >
          <h1 className="font-bold text-lg text-gray-500 dark:text-gray-400">
            Meus Pagamentos
          </h1>
          <button
            className="text-green-800 dark:text-green-500 
                      hover:text-green-600 dark:hover:text-green-300"
            onClick={openModal}
          >
            + Novo Pagamento
          </button>
        </header>
        <div className="flex-grow overflow-hidden relative">
          <div className="w-full h-full overflow-x-auto pr-1">
            <table className="w-full border-separate">
              <thead>
                <tr
                  className="bg-white shadow-sm dark:bg-gray-700 font-bold 
                          text-gray-400 dark:text-gray-400"
                >
                  <td className="py-3 px-6 rounded-l">Descrição</td>
                  <td className="py-3 px-6 whitespace-nowrap">Valor (R$)</td>
                  <td className="py-3 px-6">Vencimento</td>
                  <td className="py-3 px-6 rounded-r"></td>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <Payment key={payment.id} data={payment} />
                ))}
              </tbody>
            </table>
          </div>

          <div
            className="block sm:hidden absolute bottom-0 right-0 z-10 w-6 h-full 
              flex items-center justify-end 
              bg-gradient-to-r from-transparent to-gray-100 dark:to-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </div>
          <div
            className="absolute bottom-0 left-0 z-10 w-full h-6 
            bg-gradient-to-b from-transparent to-gray-100 dark:to-gray-800"
          ></div>
        </div>
      </section>
      <NewPaymentModal
        modalIsOpen={newPaymentModalIsOpen}
        closeModal={closeModal}
      />
    </main>
  );
};

export default Home;
