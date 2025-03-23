import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ClipboardCopy, RefreshCcw } from "lucide-react";

import generator from "generate-password-browser";


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
