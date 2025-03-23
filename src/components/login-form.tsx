import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { encryptMasterkey, usePasswordContext } from "../data/PasswordContext";
import { toast, Toaster } from "sonner";
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { login: loginUser } = usePasswordContext();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [masterkey, setMasterkey] = useState("");
  const [masterkey2, setMasterkey2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (masterkey !== masterkey2) {
      setErrorMessage("Masterkey i jego potwierdzenie muszą być identyczne.");
      setIsLoading(false);
      return;
    }
    setErrorMessage("");

    try {
      // Przekazujemy login, password i masterkey do loginUser
      localStorage.setItem("masterkey", await encryptMasterkey(masterkey, "123"));
      await loginUser(login, password, masterkey);
      toast.success("Zalogowano pomyślnie!", { duration: 3000 });
    } catch (error) {
      setErrorMessage("Nieprawidłowy login, hasło lub masterkey");
      setPassword("");
      setMasterkey(""); // Czyścimy masterkey przy błędzie
      toast.error("Błąd logowania!", {
        description: "Sprawdź dane i spróbuj ponownie.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Zaloguj się</h1>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="login">Login</Label>
            <Input
              id="login"
              type="text"
              placeholder="user123"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Hasło logowania</Label>
              
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="masterkey">Masterkey (hasło szyfrowania)</Label>
            <Input
              id="masterkey"
              type="password"
              value={masterkey}
              onChange={(e) => setMasterkey(e.target.value)}
              required
              disabled={isLoading}
            />
            
          </div>
          <div className="grid gap-3">
            <Label htmlFor="masterkey">Masterkey (hasło szyfrowania)</Label>
            <Input
              id="masterkey2"
              type="password"
              value={masterkey2}
              onChange={(e) => setMasterkey2(e.target.value)}
              required
              disabled={isLoading}
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logowanie..." : "Zaloguj"}
          </Button>
          
        </div>
      </form>
      <Toaster />
    </>
  );
}