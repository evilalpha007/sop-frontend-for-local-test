"use client";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { IoClose } from "react-icons/io5";

interface ModalContextProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  handleClose: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

interface ModalBoxProps {
  children: ReactNode;
  closeBtn?: boolean;
  outsideHide?: boolean;
  animationDuration?: number;
  className?: string; // Class for the modal overlay
  contentClassName?: string; // Class for modal content wrapper
}

const ModalBox: FC<ModalBoxProps> & {
  Trigger: FC<{ children: ReactNode }>;
  Content: FC<{ children: ReactNode }>;
} = ({
  children,
  closeBtn = true,
  outsideHide = true,
  animationDuration = 500,
  className = "",
  contentClassName = "",
}) => {
  const [open, setOpen] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setOpen(false); // Close the modal
    }, animationDuration);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Clean up when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const modalContent = open ? (
    <div
      className={`fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center p-5 ${className}`}
      onClick={outsideHide ? handleClose : undefined}
    >
      <div
        className={`${isClosing ? "animate-modal-close" : "animate-modal"} relative flex flex-col items-center ${contentClassName}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Conditionally render close button */}
        {closeBtn && (
          <button
            onClick={handleClose}
            className="absolute right-0 top-0 z-50 p-1 text-2xl text-theme-off-white"
          >
            <IoClose />
          </button>
        )}
        {/* Render the actual modal content */}
        <ModalContext.Provider value={{ open, setOpen, handleClose }}>
          {children}
        </ModalContext.Provider>
      </div>
    </div>
  ) : null;

  return <>{isBrowser && ReactDOM.createPortal(modalContent, document.body)}</>;
};

const ModalTrigger: FC<{ children: ReactNode }> = ({ children }) => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("ModalTrigger must be used within a ModalBox");

  return (
    <div onClick={() => context.setOpen(true)} className="cursor-pointer">
      {children}
    </div>
  );
};

const ModalContent: FC<{ children: ReactNode }> = ({ children }) => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("ModalContent must be used within a ModalBox");

  return context.open ? <div>{children}</div> : null;
};

// Assigning ModalTrigger and ModalContent as properties of ModalBox
ModalBox.Trigger = ModalTrigger;
ModalBox.Content = ModalContent;

export default ModalBox;
