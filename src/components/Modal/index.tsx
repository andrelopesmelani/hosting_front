import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import "./styles.scss";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ title, isOpen, onClose, children }: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal__overlay" />
        <Dialog.Content className="modal__content">
          <div className="modal__header">
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Close asChild>
              <X size={20} style={{cursor: 'pointer'}} />
            </Dialog.Close>
          </div>
          <div className="modal__body">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
