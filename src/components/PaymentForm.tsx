import { useForm, SubmitHandler } from "react-hook-form";
import { usePaymentContext } from "../contexts/PaymentContext";

type Payment = {
  id: number;
  description: string;
  price: number;
  deadline: string;
  paidOut: boolean;
};

type PaymentFormProps = {
  closeModal: () => void;
  payment?: Payment | null;
};

type Inputs = {
  description: string;
  price: string;
  deadline: string;
};

const PaymentModalForm = ({ closeModal, payment }: PaymentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { addPayment, updatePayment, formatPriceInBRL } = usePaymentContext();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!payment) {
      addPayment(
        data.description,
        Number(data.price.replace(".", "").replace(",", ".")),
        data.deadline
      );
    } else {
      updatePayment(payment.id, {
        ...payment,
        description: data.description,
        price: Number(data.price.replace(".", "").replace(",", ".")),
        deadline: data.deadline,
      });
    }
    closeModal();
  };

  return (
    <form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Descrição"
        className={`w-full p-3 mb-1 border border-gray-300 
            dark:border-gray-600 bg-white dark:bg-gray-700 
            text-gray-600 dark:text-gray-400 rounded 
            ${errors.description && "border-red-400 dark:border-red-400"}`}
        {...register("description", { required: true })}
        defaultValue={payment?.description}
      />
      {errors.description && (
        <span className="font-light text-sm text-red-400">
          Preencha este campo
        </span>
      )}

      <input
        type="text"
        placeholder="Valor (Ex: 1.234,50)"
        className={`w-full p-3 mt-3 mb-1 border border-gray-300 
            dark:border-gray-600 bg-white dark:bg-gray-700 
            text-gray-600 dark:text-gray-400 rounded 
            ${errors.price && "border-red-400 dark:border-red-400"}`}
        {...register("price", {
          required: true,
          pattern: /^(\d{1,3}(\.\d{3})*|\d+)(,\d{2})?$/,
        })}
        defaultValue={payment?.price && formatPriceInBRL(payment?.price)}
      />
      {errors.price && (
        <span className="font-light text-sm text-red-400">
          {errors.price.type === "required" && "Preencha este campo"}
          {errors.price.type === "pattern" && "Insira um valor válido"}
        </span>
      )}

      <input
        type="date"
        placeholder="Vencimento"
        className={`w-full p-3 mt-3 mb-1 border border-gray-300 
            dark:border-gray-600 bg-white dark:bg-gray-700 
            text-gray-600 dark:text-gray-400 rounded 
            ${errors.deadline && "border-red-400 dark:border-red-400"}`}
        {...register("deadline", { required: true })}
        defaultValue={payment?.deadline}
      />
      {errors.deadline && (
        <span className="font-light text-sm text-red-400">
          Preencha este campo
        </span>
      )}

      <div className="mt-7 flex">
        <button
          onClick={closeModal}
          className="
                h-11 
                border-2 
                border-red-400 
                bg-inherit 
                hover:bg-red-400
                text-red-400 
                hover:text-white
                p-3 
                mr-2 
                rounded 
                flex-grow 
                flex 
                items-center 
                justify-center"
        >
          Cancelar
        </button>
        <button
          className="
                h-11 
                bg-green-500 
                hover:bg-green-600
                text-white 
                p-3 
                ml-2 
                rounded 
                flex-grow 
                flex 
                items-center 
                justify-center"
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

export default PaymentModalForm;
