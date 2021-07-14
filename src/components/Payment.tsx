import { useState } from "react";
import Switch from "react-switch";

const Payment = () => {
  const [paidOut, setPaidOut] = useState(false);

  function handleSwitch() {
    setPaidOut(!paidOut);
  }

  return (
    <tr
      className={`bg-white shadow-sm dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 ${
        paidOut && "opacity-60 hover:bg-white dark:hover:bg-gray-700"
      }`}
    >
      <td className="py-5 px-6 rounded-l">Luz</td>
      <td className="py-3 px-6">R$ 300,00</td>
      <td className="py-3 px-6">30/07/2021</td>
      <td className="py-3 px-6 rounded-r">
        <div className="flex items-center justify-between">
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
          <button className="flex items-center ml-5">
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
      </td>
    </tr>
  );
};

export default Payment;