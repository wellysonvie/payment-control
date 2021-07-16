import { ToastContainer, toast, ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useToast = () => {
  function showMessage(message: string) {
    toast.info(message, {
      className: "bg-gray-100 text-green-600 dark:bg-green-600 dark:text-white",
      progressClassName:
        "bg-green-600 bg-opacity-80 dark:bg-white dark:bg-opacity-60",
    });
  }

  return [ToastContainer, showMessage] as [
    React.FC<ToastContainerProps>,
    (message: string) => void
  ];
};

export default useToast;
