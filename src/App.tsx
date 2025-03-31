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
