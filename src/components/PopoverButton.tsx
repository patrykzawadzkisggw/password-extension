import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import GenPasswordButton from "./GenPasswordButton";
import { X, Menu } from "lucide-react";

/**
 * Komponent renderujący przycisk kontekstowy w formie popoveru, który otwiera panel z komponentem `GenPasswordButton`.
 * Przycisk przełącza między ikonami `Menu` (otwarty) i `X` (zamknięty) w zależności od stanu popoveru.
 * 
 * @function PopoverButton
 * @returns {JSX.Element} Przycisk z popoverem zawierającym `GenPasswordButton`.
 * 
 * @example
 * ```tsx
 * import PopoverButton from '@/components/PopoverButton';
 * 
 * <PopoverButton />
 * ```
 * 
 * @remarks
 * - Komponent korzysta z biblioteki `@/components/ui/popover` do zarządzania popoverem.
 * - Stan otwarcia/zamknięcia jest kontrolowany za pomocą hooka `useState`.
 * - Przycisk jest stylizowany jako okrągły z wariantem `outline` i zmienia ikony w zależności od stanu.
 * - Komponent `GenPasswordButton` jest renderowany wewnątrz `PopoverContent`.
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/popover} - Dokumentacja Radix UI Popover.
 * @see {@link GenPasswordButton} - Komponent generujący hasło.
 */
function PopoverButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
      <Button
          variant="outline"
          size="icon"
          className="rounded-full w-10 h-10"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <GenPasswordButton />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default PopoverButton;