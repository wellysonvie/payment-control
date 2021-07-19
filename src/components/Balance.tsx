import useCalculateMonthlyBalance from "../hooks/useCalculateMonthlyBalance";
import useFormatPriceInBRL from "../hooks/useFormatPriceInBRL";

const Balance = () => {
  const today = new Date();
  const currentMonthBalance = useCalculateMonthlyBalance(today.getMonth());
  today.setMonth(today.getMonth() - 1);
  const previousMonthBalance = useCalculateMonthlyBalance(today.getMonth());

  return (
    <section className="max-w-3xl mx-auto flex sm:flex-row flex-col items-center justify-evenly relative top-7 sm:top-9 z-10">
      <h2 className="sr-only">Balanço</h2>
      <div className="bg-white shadow-sm dark:bg-gray-600 rounded-md sm:w-1/3 w-full p-5 sm:mb-0 mb-4">
        <h3 className="text-gray-500 dark:text-gray-400 font-normal text-lg mb-3">
          {previousMonthBalance.monthName}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 font-light text-sm flex mb-1">
          Total quitado:{" "}
          <span className="ml-auto">
            R$ {useFormatPriceInBRL(previousMonthBalance.totalPaid)}
          </span>
        </p>
        <p className="text-gray-500 dark:text-gray-400 font-light text-sm flex">
          Total à pagar:{" "}
          <span className="ml-auto">
            R$ {useFormatPriceInBRL(previousMonthBalance.totalToPay)}
          </span>
        </p>
      </div>
      <div className="bg-white shadow-sm dark:bg-gray-600 rounded-md sm:w-1/3 w-full p-5">
        <h3 className="text-green-500 font-normal text-lg mb-3">Esse mês</h3>
        <p className="text-gray-500 dark:text-gray-400 font-light text-sm flex mb-1">
          Total quitado:{" "}
          <span className="ml-auto">
            R$ {useFormatPriceInBRL(currentMonthBalance.totalPaid)}
          </span>
        </p>
        <p className="text-gray-500 dark:text-gray-400 font-light text-sm flex">
          Total à pagar:{" "}
          <span className="ml-auto">
            R$ {useFormatPriceInBRL(currentMonthBalance.totalToPay)}
          </span>
        </p>
      </div>
    </section>
  );
};

export default Balance;
