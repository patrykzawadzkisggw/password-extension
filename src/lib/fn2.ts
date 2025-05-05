import { decryptMasterkey, decryptPassword, deriveEncryptionKeyFromMasterkey, encryptMasterkey, encryptPassword, PasswordTable, User } from "@/data/PasswordContext";
import JSZip from "jszip";
import api from "./api";

export async function updateMasterKey(oldMasterkey: string, newMasterkey: string, token: string | null, currentUser : User | null, passwords : PasswordTable[]) {
      if (!currentUser ||  !token) {
        throw new Error("Brak danych użytkownika lub tokenu.");
      }
      const [zipResponse] = await Promise.all([
        api.get(`/passwords/${currentUser.id}/files`, {
          responseType: "blob",
        })
      ]);
  
      const loadedZip = await JSZip.loadAsync(zipResponse.data);
        if (!loadedZip) {
            throw new Error("Nie udało się załadować plików z serwera.");
        }
  
      const encryptedMasterkey = localStorage.getItem(`masterkey`);
      if (!encryptedMasterkey) {
        throw new Error("Brak masterkey w localStorage.");
      }
      const decryptedOldMasterkey = await decryptMasterkey(encryptedMasterkey, "123");
      if (decryptedOldMasterkey !== oldMasterkey) {
        throw new Error("Podane stare masterkey jest nieprawidłowe.");
      }
  
      const oldEncryptionKey = await deriveEncryptionKeyFromMasterkey(oldMasterkey);
  
      const passwordsToUpdate = [];
      for (const passwordEntry of passwords) {
        const encryptedData = await loadedZip.file(passwordEntry.passwordfile)?.async("string");
        if (!encryptedData) {
          throw new Error(`Nie znaleziono pliku ${passwordEntry.passwordfile} w ZIP-ie`);
        }
        const [encrypted, iv] = encryptedData.split(":");
        const decryptedPassword = await decryptPassword(encrypted, iv, oldEncryptionKey);
        passwordsToUpdate.push({
          platform: passwordEntry.platform,
          login: passwordEntry.login,
          new_password: decryptedPassword,
        });
      }
  
      const newEncryptionKey = await deriveEncryptionKeyFromMasterkey(newMasterkey);
      const encryptedPasswords = await Promise.all(
        passwordsToUpdate.map(async (entry) => {
          const { encrypted, iv } = await encryptPassword(entry.new_password, newEncryptionKey);
          return {
            platform: entry.platform,
            login: entry.login,
            new_password: `${encrypted}:${iv}`,
          };
        })
      );
  
       await api.put(
        `/passwords/${currentUser.id}/passwords`,
        { passwordsall: encryptedPasswords },
      );
      
      const newEncryptedMasterkey = await encryptMasterkey(newMasterkey, currentUser.password);
      localStorage.setItem(`masterkey`, newEncryptedMasterkey);
    }

export const resetPasswordSubmit = async (email : string, token: string) => {
      await api.post(`/users/reset-password/`,{
        "login": email,
        "token": token
      });
    }


   export const resetPasswordFn = async (resetToken: string | undefined, newPassword: any) => {
      return await api.post(
        `/users/reset-password/confirm`,
        {
          resetToken: resetToken,
          newPassword: newPassword,
        }
      );
     } 