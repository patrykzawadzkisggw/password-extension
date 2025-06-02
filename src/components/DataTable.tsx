import { useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, LogIn, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePasswordContext } from "../data/PasswordContext";
import JSZip from "jszip";
import { findIconUrl, getLoginUrl } from '@/lib/icons';
import api from "@/lib/api";
import { RecoverMasterkeyDialog } from "./RecoverMasterKeyDialog";

/**
 * Interfejs reprezentujący dane w tabeli haseł.
 * @interface Payment
 * @property {string} id - Unikalny identyfikator rekordu.
 * @property {number} amount - Wartość numeryczna (używana do celów logowania, domyślnie 0).
 * @property {string} status - URL do logo serwisu.
 * @property {string} email - Login lub adres e-mail użytkownika.
 * @property {string} [platform] - Nazwa serwisu (opcjonalne).
 * @property {string} [passwordfile] - Nazwa pliku z zaszyfrowanym hasłem (opcjonalne).
 */
export type Payment = {
  id: string;
  amount: number;
  status: string; // URL do logo
  email: string;
  platform?: string; // Dodajemy platformę, aby znać nazwę serwisu
  passwordfile?: string; // Dodajemy pole na nazwę pliku z hasłem
};

/**
 * Interfejs reprezentujący wpis logowania.
 * @interface LoginEntry
 * @property {string} timestamp - Czas logowania w formacie ISO.
 * @property {string} user_id - Identyfikator użytkownika.
 * @property {string} login - Login lub adres e-mail.
 * @property {string} page - URL strony logowania.
 */
export type LoginEntry = {
  timestamp: string;
  user_id: string;
  login: string;
  page: string;
};

/**
 * Definicja kolumn tabeli haseł.
 * @type {ColumnDef<Payment>[]}
 */
export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "platform",
    header: "Serwis",
    cell: ({ row }) => {
      const iconUrl = findIconUrl(row.getValue("platform"));
      return iconUrl ? (
        <img
          src={iconUrl}
          alt="Logo"
          width="40"
          height="40"
          style={{ borderRadius: "50%" }}
        />
      ) : (
        <span>{row.getValue("platform")}</span>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Login
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Zaloguj</div>,
    cell: ({ row }) => {
      const { state, setMasterkey } = usePasswordContext(); // Pobieramy kontekst
      const login = row.getValue("email") as string;
      const platform = row.original.platform || "Nieznany serwis"; // Nazwa serwisu
      const passwordfile = row.original.passwordfile; // Nazwa pliku z hasłem
      const [isRecoverDialogOpen, setIsRecoverDialogOpen] = useState(false);
      const handleDecryptionFail = () => {
        setIsRecoverDialogOpen(true);
      };
      const handleLoginClick = async () => {
        try {
          if (!state.zip || !state.encryptionKey || !passwordfile) {
            console.error("Brak ZIP, klucza szyfrowania lub pliku z hasłem");
            return;
          }
          
          // Odszyfrowanie hasła
          const password = await extractPasswordFromZip(state.zip, passwordfile, state.encryptionKey);


          const email = login;
          let p="";
          if (!(platform.startsWith('http://') || platform.startsWith('https://'))) {
            p="https://";
          }
          

    const url = p+platform;

    const loginEntry : LoginEntry = {
      timestamp: new Date().toISOString(),
      user_id: state.currentUser?.id || "",
      login: email,
      page: url,
    };
   try { await api.post<LoginEntry>(
    `/users/${state.currentUser?.id}/logins/`,
    loginEntry
  );
//alert("Zapisano logowanie");
} catch (error) {
  handleDecryptionFail();
   // alert("Błąd podczas zapisywania logowania"+error);
  }
    chrome.runtime.sendMessage({ action: "fillForm", email, password, url });
        } catch (error) {
          console.error("Błąd podczas odszyfrowywania hasła:", error);
          localStorage.jwt_token = "";
          window.location.reload();
        }
      };

      return (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outline"
            size="icon"
            style={{ cursor: "pointer" }}
            onClick={handleLoginClick}
          >
            <LogIn className="w-5 h-5" />
          </Button>
          <RecoverMasterkeyDialog
            isDialogOpen={isRecoverDialogOpen}
            setIsDialogOpen={setIsRecoverDialogOpen}
            setMasterkey={setMasterkey}

          />
        </div>
      );
    },
  },
];


/**
 * Odszyfrowuje hasło z pliku ZIP przy użyciu klucza szyfrowania.
 * @function extractPasswordFromZip
 * @async
 * @param {JSZip} zip - Obiekt ZIP zawierający zaszyfrowane hasło.
 * @param {string} filename - Nazwa pliku z hasłem.
 * @param {CryptoKey} key - Klucz szyfrowania.
 * @returns {Promise<string>} Odszyfrowane hasło.
 * @throws {Error} Jeśli plik nie istnieje lub odszyfrowanie się nie powiedzie.
 */
export const extractPasswordFromZip = async (zip: JSZip, filename: string, key: CryptoKey) => {
  const file = zip.file(filename);
  if (!file) throw new Error("Plik nie znaleziony w ZIP");
  const encryptedData = await file.async("string");
  const [encrypted, iv] = encryptedData.split(":");
  const decoder = new TextDecoder();
  const encryptedBuffer = base64ToArrayBuffer(encrypted);
  const ivBuffer = base64ToArrayBuffer(iv);
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: ivBuffer },
    key,
    encryptedBuffer
  );
  return decoder.decode(decrypted);
};

/**
 * Konwertuje dane w formacie base64 na ArrayBuffer.
 * @function base64ToArrayBuffer
 * @param {string} base64 - Dane w formacie base64.
 * @returns {ArrayBuffer} Przekonwertowane dane.
 */
export const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
};

/**
 * Komponent renderujący tabelę z danymi haseł, umożliwiającą filtrowanie, sortowanie i automatyczne logowanie.
 * Pobiera dane z API oraz z aktywnej karty przeglądarki, aby umożliwić zapis nowych haseł.
 * 
 * @function DataTable
 * @returns {JSX.Element} Tabela z danymi haseł lub komunikaty o ładowaniu/błędzie.
 * 
 * @example
 * ```tsx
 * import { DataTable } from '@/components/DataTable';
 * 
 * <DataTable />
 * ```
 * 
 * @remarks
 * - Komponent używa biblioteki `@tanstack/react-table` do zarządzania tabelą.
 * - Pobiera dane z API za pomocą `api.get` i mapuje je na format `Payment`.
 * - Wykorzystuje kontekst `usePasswordContext` do zarządzania stanem aplikacji.
 * - Umożliwia automatyczne wypełnianie formularzy logowania za pomocą wiadomości Chrome (`chrome.runtime.sendMessage`).
 * - Pobiera dane z aktywnej karty przeglądarki (email, hasło, URL) za pomocą `chrome.scripting.executeScript`.
 * - Obsługuje zapis nowych haseł za pomocą funkcji `addPassword` z kontekstu.
 * - W przypadku nieudanego odszyfrowania otwiera dialog `RecoverMasterkeyDialog`.
 * 
 * @see {@link https://tanstack.com/table/v8} - Dokumentacja TanStack Table.
 * @see {@link https://developer.chrome.com/docs/extensions/reference/} - Dokumentacja Chrome Extensions API.
 * @see {@link usePasswordContext} - Kontekst zarządzania hasłami.
 * @see {@link RecoverMasterkeyDialog} - Dialog odzyskiwania klucza głównego.
 */
export function DataTable() {
  const { state } = usePasswordContext();
  const [data, setData] = useState<Payment[]>([]);
  const [sorting, setSorting] =useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
 const {addPassword} = usePasswordContext(); // Pobieramy kontekst
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        try {
            const [result] = await chrome.scripting.executeScript({
                target: { tabId: tabs[0].id ?? -1 },
                world: "MAIN",
                func: () => {
                    const emailSelectors = [
                        '#emailId',
                        '#login',
                        'input[name="email"]',
                        'input[name="username"]',
                        'input[name="reg_email__"]',
                        'input[type="email"]',
                        'input[autocomplete="username"]'
                    ];
                    const passwordSelectors = [
                        '#password',
                        '#pass',
                        'input[name="password"]',
                        'input[type="password"]',
                        'input[autocomplete="current-password"]'
                    ];

                    let emailValue = null;
                    let passwordValue = null;

                    for (const selector of emailSelectors) {
                        const emailInput = document.querySelector(selector);
                        if (emailInput instanceof HTMLInputElement && emailInput.value) {
                            emailValue = emailInput.value;
                            break;
                        }
                    }

                    for (const selector of passwordSelectors) {
                        const passwordInput = document.querySelector(selector);
                        if (passwordInput instanceof HTMLInputElement && passwordInput.value) {
                            passwordValue = passwordInput.value;
                            break;
                        }
                    }

                    // Pobierz URL strony
                    let pageUrl = window.location.href;


                      console.log({
                        email: emailValue,
                        password: passwordValue,
                        url: pageUrl
                    })
                    const queryIndex = pageUrl.indexOf('?');

                    if (queryIndex !== -1) {
                      pageUrl = pageUrl.substring(0, queryIndex);
                    }
                    return {
                        email: emailValue,
                        password: passwordValue,
                        url: pageUrl
                    };
                }
            });

            if (result && result.result) {
                const { email, password, url } = result.result;
                setEmail(email || null);
                setPassword(password || null);
                setUrl(url || null);

                
            }
        } catch (error) {
            console.error('Błąd przy pobieraniu danych:', error);
        }
    });
}, []);



  const fetchData = async () => {

    try {
      setLoading(true);
      const response = await api.get<PasswordTable[]>(`/passwords`);

      const mappedData: Payment[] = response.data.map((password) => ({
        id: password.id,
        amount: 0,
        status: password.logo,
        email: password.login,
        platform: password.platform, // Dodajemy platformę
        passwordfile: password.passwordfile, // Dodajemy nazwę pliku z hasłem
      }));

      setData(mappedData);
      setError(null);
    } catch (err) {
      console.error("Błąd pobierania danych:", err);
      setError("Nie udało się pobrać danych z API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [state.token]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  async function add() {
    try {
      console.log(email, password, url);
      await addPassword(password ?? "", getLoginUrl(url ?? "") , email ?? "");
    } catch (err) {
      console.error("Błąd podczas dodawania hasła:", error);
    } finally {
      fetchData();
    }
    
  }
  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filtruj konta..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button
      
          size="sm"
          onClick={add}
          disabled={password == null || email == null || url == null}
          className="ml-2"
        >
          <Save className=" h-4 w-4" />
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export type PasswordTable = {
  id: string;
  passwordfile: string;
  logo: string;
  platform: string;
  login: string;
};