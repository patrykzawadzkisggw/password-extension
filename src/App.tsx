//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { DataTable } from './components/DataTable'

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
    <div className='w-md p-4 rounded-lg'>
      <DataTable />
    </div>
  )
}

export default App
