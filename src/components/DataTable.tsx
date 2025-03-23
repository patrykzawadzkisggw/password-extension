import React, { useEffect } from "react";
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
import { ArrowUpDown, LogIn } from "lucide-react";
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
import axios from "axios";
import { usePasswordContext } from "../data/PasswordContext";
import JSZip from "jszip";
import { findIconUrl } from "@/lib/functions";
export type Payment = {
  id: string;
  amount: number;
  status: string; // URL do logo
  email: string;
  platform?: string; // Dodajemy platformę, aby znać nazwę serwisu
  passwordfile?: string; // Dodajemy pole na nazwę pliku z hasłem
};

type LoginEntry = {
  timestamp: string;
  user_id: string;
  login: string;
  page: string;
};

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
      const { state } = usePasswordContext(); // Pobieramy kontekst
      const login = row.getValue("email") as string;
      const platform = row.original.platform || "Nieznany serwis"; // Nazwa serwisu
      const passwordfile = row.original.passwordfile; // Nazwa pliku z hasłem

      const handleLoginClick = async () => {
        try {
          if (!state.zip || !state.encryptionKey || !passwordfile) {
            console.error("Brak ZIP, klucza szyfrowania lub pliku z hasłem");
            return;
          }
          
          // Odszyfrowanie hasła
          const password = await extractPasswordFromZip(state.zip, passwordfile, state.encryptionKey);


          const email = login;
    const url = platform;

    const loginEntry : LoginEntry = {
      timestamp: new Date().toISOString(),
      user_id: state.currentUser?.id || "",
      login: email,
      page: url,
    };
   try { await axios.post<LoginEntry>(
    `${import.meta.env.VITE_API_URL}/users/${state.currentUser?.id}/logins/`,
    loginEntry,
    { headers: { Authorization: `Bearer ${state.token}` } }
  );
//alert("Zapisano logowanie");
} catch (error) {
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
        </div>
      );
    },
  },
];

// Funkcja do odszyfrowania hasła (przeniesiona z PasswordContext dla kompletności)
const extractPasswordFromZip = async (zip: JSZip, filename: string, key: CryptoKey) => {
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

const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
};

export function DataTable() {
  const { state } = usePasswordContext();
  const [data, setData] = React.useState<Payment[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchData = async () => {
    const token = state.token;

    try {
      setLoading(true);
      const response = await axios.get<PasswordTable[]>(`${import.meta.env.VITE_API_URL}/passwords`, {
        headers: { Authorization: `Bearer ${token}` },
      });

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