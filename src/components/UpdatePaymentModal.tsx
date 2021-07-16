import Modal from "react-modal";
import PaymentForm from "./PaymentForm";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

type Payment = {
  id: number;
  description: string;
  price: number;
  deadline: string;
  paidOut: boolean;
};

type UpdatePaymentModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  payment: Payment | null;
};

const UpdatePaymentModal = ({
  modalIsOpen,
  closeModal,
  payment,
}: UpdatePaymentModalProps) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      className="modal bg-gray-100 dark:bg-gray-800 w-96 p-7 rounded shadow-md"
      overlayClassName="modal-overlay"
    >
      <div className="w-full flex flex-col">
        <h2 className="text-green-500 font-bold text-lg mb-5 pb-1">
          Atualizar pagamento
        </h2>
        <PaymentForm closeModal={closeModal} payment={payment} />
      </div>
    </Modal>
  );
};

export default UpdatePaymentModal;
