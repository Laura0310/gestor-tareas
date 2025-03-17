import { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({ isOpen, title, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50" role="dialog" aria-modal="true">
            <div className="bg-white p-6 rounded-xl shadow-md w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                        aria-label="Cerrar"
                    >
                        <i className="fa fa-solid fa-times" />
                    </button>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;