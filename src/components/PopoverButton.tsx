import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import GenPasswordButton from "./GenPasswordButton";
import { X, Menu } from "lucide-react";
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