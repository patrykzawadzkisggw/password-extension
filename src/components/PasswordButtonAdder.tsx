import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PopoverButton from './PopoverButton';
const PasswordButtonAdder: React.FC = () => {
  const [buttonContainer, setButtonContainer] = useState<HTMLElement | null>(null);
  const [targetInput, setTargetInput] = useState<HTMLInputElement | null>(null);

  // Funkcja do sprawdzania, czy element jest potencjalnym inputem hasła
  const isPasswordInput = (element: HTMLElement): element is HTMLInputElement => {
    if (!(element instanceof HTMLInputElement)) return false;

    const type = element.getAttribute('type');
    const name = element.getAttribute('name')?.toLowerCase();
    const id = element.getAttribute('id')?.toLowerCase();
    const autocomplete = element.getAttribute('autocomplete')?.toLowerCase();

    return (
      type === 'password' ||
      name === 'password' ||
      name === 'passwd' ||
      name === 'pass' ||
      id === 'password' ||
      id === 'login-password' ||
      id === 'pass' ||
      autocomplete === 'current-password'
    );
  };

  useEffect(() => {
    const nonReactContainer = document.querySelector('body') as HTMLElement | null;

    if (!nonReactContainer) {
      console.error('Kontener niereactowy nie został znaleziony!');
      return;
    }

    const observer = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.forEach(() => {
        // Szukamy inputa spełniającego którekolwiek z kryteriów
        const passwordInput = Array.from(nonReactContainer.querySelectorAll('input')).find(isPasswordInput) || null;

        if (passwordInput) {
          setTargetInput(passwordInput);

          let container = passwordInput.nextSibling as HTMLElement | null;
          if (!container || container.tagName !== 'SPAN') {
            container = document.createElement('span');
            container.style.position = 'absolute';
            const parentNode = passwordInput.parentNode as Node;
            const parentElement = parentNode as HTMLElement;
            if (getComputedStyle(parentElement).position !== 'relative') {
              parentElement.style.position = 'relative';
            }
            parentNode.insertBefore(container, passwordInput.nextSibling);
          }

          // Pozycjonowanie kontenera
          const inputRect = passwordInput.getBoundingClientRect();
          container.style.top = `${passwordInput.offsetTop}px`;
          container.style.left = `${passwordInput.offsetLeft + inputRect.width - container.offsetWidth}px`;
          container.style.height = `${inputRect.height}px`;
          container.style.display = 'flex';
          container.style.alignItems = 'center';

          setButtonContainer(container);
        } else {
          const existingContainer = nonReactContainer.querySelector('span');
          if (existingContainer) existingContainer.remove();
          setButtonContainer(null);
          setTargetInput(null);
        }
      });
    });

    observer.observe(nonReactContainer, { childList: true, subtree: true });

    // Sprawdzamy początkowy stan
    const initialInput = Array.from(nonReactContainer.querySelectorAll('input')).find(isPasswordInput) || null;
    if (initialInput) {
      const container = document.createElement('span');
      container.style.position = 'absolute';
      const parentNode = initialInput.parentNode as Node;
      const parentElement = parentNode as HTMLElement;
      if (getComputedStyle(parentElement).position !== 'relative') {
        parentElement.style.position = 'relative';
      }
      parentNode.insertBefore(container, initialInput.nextSibling);

      const inputRect = initialInput.getBoundingClientRect();
      container.style.top = `${initialInput.offsetTop}px`;
      container.style.left = `${initialInput.offsetLeft + inputRect.width - container.offsetWidth}px`;
      container.style.height = `${inputRect.height}px`;
      container.style.display = 'flex';
      container.style.alignItems = 'center';

      setButtonContainer(container);
      setTargetInput(initialInput);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      <p>React tylko obserwuje i dodaje przycisk do niereactowego kodu!</p>
      {buttonContainer && targetInput && createPortal(
        <PopoverButton />,
        buttonContainer
      )}
    </div>
  );
};

export default PasswordButtonAdder;