import { usePasswordContext } from '@/data/PasswordContext';
import { Button } from '@/components/ui/button';
import { LogOut, Key } from 'lucide-react';
import { DataTable } from './DataTable';
import { LoginSteps } from './LoginSteps';
import { RecoverMasterkeyDialog } from './RecoverMasterKeyDialog';
import { useState } from 'react';

/**
 * Komponent nadrzędny zarządzający widokiem widgetu haseł.
 * Wyświetla kroki logowania (`LoginSteps`) dla niezalogowanych użytkowników lub tabelę haseł (`DataTable`) z opcjami wylogowania i zmiany klucza głównego dla zalogowanych.
 * 
 * @function TableWidget
 * @returns {JSX.Element} Widok kroków logowania lub tabela haseł z przyciskami akcji.
 * 
 * @example
 * ```tsx
 * import { TableWidget } from '@/components/TableWidget';
 * 
 * <TableWidget />
 * ```
 * 
 * @remarks
 * - Komponent korzysta z kontekstu `usePasswordContext` do sprawdzania stanu autoryzacji (`state.token`) i zarządzania kluczem głównym (`setMasterkey`).
 * - Dla niezalogowanych użytkowników (brak `state.token`) renderuje komponent `LoginSteps`.
 * - Dla zalogowanych użytkowników renderuje `DataTable` oraz przyciski do wylogowania i zmiany klucza głównego.
 * - Wylogowanie usuwa token JWT z `localStorage` i odświeża stronę.
 * - Zmiana klucza głównego otwiera dialog `RecoverMasterkeyDialog`.
 * - Przyciski akcji są stylizowane z użyciem wariantu `outline` i kolorów indigo.
 * 
 * @see {@link usePasswordContext} - Kontekst zarządzania hasłami.
 * @see {@link LoginSteps} - Komponent kroków logowania.
 * @see {@link DataTable} - Komponent tabeli haseł.
 * @see {@link RecoverMasterkeyDialog} - Dialog odzyskiwania/zmiany klucza głównego.
 */
export const TableWidget = () => {
  const { state, setMasterkey } = usePasswordContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  if (!state.token) {
    return <LoginSteps setMasterkey={setMasterkey} />;
  }
  if (state.token) {
    return (
      <div>
        <DataTable />
        <div className="flex flex-col sm:flex-row gap-3 p-4 bg-gray-100 rounded-lg">
          <Button
            variant="outline"
            onClick={() => {
              localStorage.removeItem('jwt_token');
              window.location.reload();
            }}
            className="flex items-center gap-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700"
          >
            <LogOut className="w-5 h-5" />
            Wyloguj
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center gap-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700"
          >
            <Key className="w-5 h-5" />
            Zmień Masterkey
          </Button>
          <RecoverMasterkeyDialog
            setMasterkey={setMasterkey}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
        </div>
      </div>
    );
  }
};