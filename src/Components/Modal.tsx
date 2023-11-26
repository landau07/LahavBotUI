import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useEventListener } from "../hooks";
import { cn } from "../utils/classnames";
import "./Modal.css";

export type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export function Modal({ children, isOpen, onClose }: ModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const prevIsOpen = useRef<boolean>();
  useEventListener("keydown", (e) => {
    if ((e as KeyboardEvent).key === "Escape") {
      onClose();
    }
  });

  useLayoutEffect(() => {
    if (!isOpen && prevIsOpen.current) {
      setIsClosing(true);
    }

    prevIsOpen.current = isOpen;
  }, [isOpen]);

  if (!isOpen && !isClosing) {
    return null;
  }

  return createPortal(
    <div
      onAnimationEnd={() => setIsClosing(false)}
      className={cn("modal", isClosing && "closing")}
    >
      <div className="overlay" onClick={onClose} />
      <div className="modal-body">{children}</div>
    </div>,
    document.querySelector("#modal-container") as HTMLElement
  );
}
