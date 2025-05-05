//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TableWidget } from './components/TableWidget'
import { PasswordProvider } from './data/PasswordContext'
import GenPasswordButton from './components/GenPasswordButton'
import { Test } from "./components/Test";
//import { DataTable } from './components/DataTable'

/**
 * Główny komponent aplikacji, zarządzający przełączaniem między zakładkami "Hasła" i "Generuj".
 * Zawiera komponenty `TableWidget` do zarządzania hasłami oraz `GenPasswordButton` do generowania haseł.
 * Otacza zawartość providerem `PasswordProvider` dla wspólnego kontekstu haseł.
 * 
 * @function App
 * @returns {JSX.Element} Interfejs z zakładkami i zawartością aplikacji.
 * 
 * @example
 * ```tsx
 * import App from '@/App';
 * 
 * <App />
 * ```
 * 
 * @remarks
 * - Komponent używa komponentu `Tabs` z biblioteki `@/components/ui/tabs` do zarządzania zakładkami.
 * - Zakładka "Hasła" renderuje `TableWidget`, który wyświetla tabelę haseł lub kroki logowania.
 * - Zakładka "Generuj" renderuje `GenPasswordButton`, umożliwiając generowanie nowych haseł.
 * - `PasswordProvider` dostarcza kontekst dla zarządzania stanem haseł w całej aplikacji.
 * - Komponent `Test` jest renderowany poza zakładkami (prawdopodobnie do celów testowych).
 * - Stylizacja obejmuje padding, zaokrąglone rogi i blokadę zaznaczania tekstu (`userSelect: 'none'`).
 * 
 * @see {@link https://www.radix-ui.com/primitives/docs/components/tabs} - Dokumentacja Radix UI Tabs.
 * @see {@link TableWidget} - Komponent zarządzania hasłami.
 * @see {@link GenPasswordButton} - Komponent generowania haseł.
 * @see {@link PasswordProvider} - Provider kontekstu haseł.
 * @see {@link Test} - Komponent testowy.
 */
function App() {
  /*const [count, _] = useState(0)
  const [colour, setColour] = useState("red")
  const onClick = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    if (!tab || !tab.id) {
      console.error("Nie znaleziono aktywnej karty.");
      return;
    }
  
    try {
      await chrome.scripting.executeScript<string[],void>({
        target: { tabId: tab.id },
        world: "MAIN",
        args: [colour],
        func: (colour) => {
         
          const emailInput = document.getElementById("emailId") as HTMLInputElement | null;
          const passwordInput = document.getElementById("passwordId") as HTMLInputElement | null;
          const submitButton = document.querySelector("button[type='submit']") as HTMLInputElement | null;
         if(emailInput && passwordInput && submitButton) {
          emailInput.value = "abbbgg@int.pl";
          passwordInput.value = "ston^&9gPassword&*9";
          submitButton.click();
         }
         document.body.style.backgroundColor = colour;
        }
      });
    } catch (error) {
      console.error("Błąd przy uruchamianiu skryptu:", error);
    }
  };
  */

  return (
    <div className='w-md p-4 rounded-lg' style={{ userSelect: 'none' }}>
      <PasswordProvider>
      
      <Tabs defaultValue="hasla">
      <TabsList className="w-full flex justify-between">
        <TabsTrigger value="hasla" className="flex-1 text-center">Hasła</TabsTrigger>
        <TabsTrigger value="generuj" className="flex-1 text-center">Generuj</TabsTrigger>
      </TabsList>
      <TabsContent value="hasla"><TableWidget /></TabsContent>
      <TabsContent value="generuj">
        <GenPasswordButton />
      </TabsContent>
      </Tabs>
      
      <Test />
      </PasswordProvider>
      
    </div>
  )
}

export default App
