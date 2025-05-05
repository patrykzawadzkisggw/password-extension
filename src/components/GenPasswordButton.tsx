import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ClipboardCopy, RefreshCcw } from "lucide-react";

import generator from "generate-password-browser";

/**
 * Komponent generujący i wyświetlający hasło z możliwością konfiguracji długości, użycia cyfr i znaków specjalnych.
 * Umożliwia kopiowanie wygenerowanego hasła do schowka.
 * 
 * @function GenPasswordButton
 * @returns {JSX.Element} Interfejs użytkownika z polami do konfiguracji i generowania hasła.
 * 
 * @example
 * ```tsx
 * import GenPasswordButton from '@/components/GenPasswordButton';
 * 
 * <GenPasswordButton />
 * ```
 * 
 * @remarks
 * - Komponent używa biblioteki `generate-password-browser` do generowania haseł.
 * - Hasło jest generowane z uwzględnieniem długości, cyfr, znaków specjalnych, wielkich i małych liter, z wykluczeniem podobnych znaków.
 * - Kopiowanie do schowka używa API `navigator.clipboard`.
 * - W przypadku błędu kopiowania, komunikat jest logowany do konsoli.
 * - Komponent zawiera interaktywne elementy UI, takie jak `Slider` do ustawiania długości hasła i `Switch` do włączania/wyłączania cyfr oraz znaków specjalnych.
 * 
 * @see {@link https://www.npmjs.com/package/generate-password-browser} - Dokumentacja generate-password-browser.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API} - Dokumentacja Clipboard API.
 */
export default function GenPasswordButton() {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    const newPassword = generator.generate({
      length: length,
      numbers: includeNumbers,
      symbols: includeSymbols,
      uppercase: true,
      lowercase: true,
      excludeSimilarCharacters: true,
      strict: true,
    });
    setPassword(newPassword);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      
    } catch (error) {
      console.error("Błąd kopiowania:", error);
      
    }
  };

  

  
  return (

    <div className="space-y-4 bg-w">
          <div className="flex items-center space-x-2">
                  <Input value={password} readOnly className="flex-1" />
                  <Button variant="outline" size="icon" onClick={copyToClipboard}>
                    <ClipboardCopy className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <span>Długość: {length}</span>
                  <Slider
                    defaultValue={[12]}
                    min={8}
                    max={30}
                    step={1}
                    onValueChange={(value) => setLength(value[0])}
                    className="w-32"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span>Cyfry</span>
                  <Switch checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
                </div>

                <div className="flex items-center justify-between">
                  <span>Znaki specjalne</span>
                  <Switch checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
                </div>

                <Button className="w-full" onClick={generatePassword}>
                  <RefreshCcw className="w-5 h-5 mr-2" />
                  Generuj hasło
                </Button>
        </div>
  )
}
