import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ClipboardCopy, RefreshCcw } from "lucide-react";



export default function GenPasswordButton() {
    const [password, ] = useState("");
  const [length, ] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  

  
  return (

    <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold">Generator Haseł</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input value={password} readOnly className="flex-1" />
            <Button variant="outline" size="icon" >
              <ClipboardCopy className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <span>Długość: {length}</span>
            <Slider
              defaultValue={[12]}
              min={6}
              max={30}
              step={1}
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

          <Button className="w-full" >
            <RefreshCcw className="w-5 h-5 mr-2" />
            Generuj hasło
          </Button>
        </CardContent>
      </Card>
  )
}
