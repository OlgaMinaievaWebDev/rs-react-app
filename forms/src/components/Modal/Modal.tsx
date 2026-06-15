import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import {
  CloseButton,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from './Modal.styles';
import type { ModalProps } from './Modal.interfaces';

export function Modal({ title, children, onClose }: ModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  //I use direct DOM focus APIs only for accessibility behavior in the modal focus trap. It is not replacing React state or rendering logic. React still controls whether the modal is open; DOM APIs are used only to move keyboard focus between existing focusable elements.
  const focusableSelector =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusableElements =
        dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector);
      const focusableElementsArray = Array.from(focusableElements ?? []);
      const firstFocusableElement = focusableElementsArray[0];
      const lastFocusableElement =
        focusableElementsArray[focusableElementsArray.length - 1];

      if (!firstFocusableElement || !lastFocusableElement) return;

      if (
        e.shiftKey === true &&
        document.activeElement === firstFocusableElement
      ) {
        e.preventDefault();
        lastFocusableElement.focus();
      }

      if (!e.shiftKey && document.activeElement === lastFocusableElement) {
        e.preventDefault();
        firstFocusableElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  return createPortal(
    <ModalBackdrop onClick={onClose}>
      <ModalContent
        role="dialog"
        ref={dialogRef}
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <ModalHeader>
          <ModalTitle id="modal-title">{title}</ModalTitle>
          <CloseButton
            ref={closeButtonRef}
            type="button"
            aria-label="Close modal"
            onClick={onClose}
          >
            x
          </CloseButton>
        </ModalHeader>
        {children}
      </ModalContent>
    </ModalBackdrop>,
    document.body
  );
}
