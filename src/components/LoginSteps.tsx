import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RecoverMasterkeyDialog } from './RecoverMasterKeyDialog';
import { Info } from 'lucide-react';
import { useState } from 'react';

/**
 * Komponent wyświetlający kroki logowania dla rozszerzenia przeglądarkowego.
 * Umożliwia otwarcie strony logowania oraz wprowadzenie klucza głównego (Masterkey) poprzez dialog.
 * 
 * @function LoginSteps
 * @param {Object} props - Właściwości komponentu.
 * @param {Function} props.setMasterkey - Funkcja asynchroniczna do ustawienia klucza głównego.
 * @param {string} props.setMasterkey.masterkey - Klucz główny jako ciąg znaków.
 * @returns {JSX.Element} Karta z instrukcjami logowania i przyciskami do interakcji.
 * 
 * @example
 * ```tsx
 * import { LoginSteps } from '@/components/LoginSteps';
 * 
 * const setMasterkey = async (masterkey: string) => {
 *   console.log("Masterkey set:", masterkey);
 * };
 * 
 * <LoginSteps setMasterkey={setMasterkey} />
 * ```
 * 
 * @remarks
 * - Komponent używa `chrome.tabs.create` do otwarcia strony logowania w nowej karcie przeglądarki, co wymaga środowiska Chrome Extension.
 * - `RecoverMasterkeyDialog` jest oddzielnym komponentem odpowiedzialnym za wprowadzanie klucza głównego.
 * - Użytkownik jest ostrzegany o konieczności używania tego samego klucza głównego, co w aplikacji SecureBox, aby zapewnić spójność danych.
 * 
 * @see {@link RecoverMasterkeyDialog} - Komponent dialogowy do wprowadzania klucza głównego.
 * @see {@link https://developer.chrome.com/docs/extensions/reference/tabs/} - Dokumentacja API Chrome Tabs.
 */
export const LoginSteps = ({ setMasterkey }: { setMasterkey: (masterkey: string) => Promise<void> }) => {
  const handleOpenLoginPage = () => {
    chrome.tabs.create({ url: 'http://localhost:5173' });
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-[350px] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">Logowanie</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4">
            <li className="flex items-center gap-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-semibold">
                1
              </span>
              <div className="flex-1">
                <p className="text-gray-700 font-medium">Zaloguj się</p>
                <p className="text-sm text-gray-500">
                  Otwórz stronę logowania, aby się uwierzytelnić.
                </p>
                <Button
                  onClick={handleOpenLoginPage}
                  className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Otwórz stronę logowania
                </Button>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-semibold">
                2
              </span>
              <div className="flex-1">
                <p className="text-gray-700 font-medium">Wprowadź Master Key</p>
                <p className="text-sm text-gray-500">
                  Podaj swój klucz główny, aby uzyskać dostęp.
                </p>
                <div className="mt-2 flex items-start gap-2">
                  <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600">
                    Używaj tego samego <strong>Masterkey</strong> co w aplikacji SecureBox, aby zapewnić spójność. Niespójny
                    Masterkey może uniemożliwić dostęp do haseł w rozszerzeniu.
                  </p>
                </div>
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Wprowadź
                </Button>
                <RecoverMasterkeyDialog
                  isDialogOpen={isDialogOpen}
                  setIsDialogOpen={setIsDialogOpen}
                  setMasterkey={setMasterkey}
                />
              </div>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};