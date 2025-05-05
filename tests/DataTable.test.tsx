import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { DataTable, columns } from "@/components/DataTable";
import { usePasswordContext } from "@/data/PasswordContext";
import { useReactTable } from "@tanstack/react-table";
import api from "@/lib/api";
import { findIconUrl, getLoginUrl } from "@/lib/icons";

// Mock crypto.subtle
Object.defineProperty(global, "crypto", {
  value: {
    subtle: {
      decrypt: jest.fn().mockResolvedValue(new ArrayBuffer(8)),
    },
  },
  writable: true,
});

// Mock dependencies
jest.mock("@/data/PasswordContext", () => ({
  usePasswordContext: jest.fn(),
}));

jest.mock("@tanstack/react-table", () => {
  const originalModule = jest.requireActual("@tanstack/react-table");
  return {
    ...originalModule,
    useReactTable: jest.fn(),
  };
});

jest.mock("@/lib/api", () => ({
  default: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

jest.mock("@/lib/icons", () => ({
  findIconUrl: jest.fn((platform: string) => (platform ? `${platform}-icon.png` : null)),
  getLoginUrl: jest.fn((url: string) => url),
}));

jest.mock("jszip", () => ({
  loadAsync: jest.fn(),
  file: jest.fn(() => ({
    async: jest.fn(() => Promise.resolve("encrypted:iv")),
  })),
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, variant, size, disabled }) => {
    let testId = "save-button";
    if (variant === "ghost") testId = "sort-button";
    else if (variant === "outline" && size === "sm") testId = "pagination-button";
    else if (size === "icon") testId = "login-button";
    
    return (
      <button onClick={onClick} data-testid={testId} disabled={disabled}>
        {children}
      </button>
    );
  },
}));

jest.mock("@/components/ui/input", () => ({
  Input: ({ value, onChange, placeholder }) => (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      data-testid="filter-input"
    />
  ),
}));

jest.mock("@/components/ui/table", () => ({
  Table: ({ children }) => <table>{children}</table>,
  TableHeader: ({ children }) => <thead>{children}</thead>,
  TableBody: ({ children }) => <tbody>{children}</tbody>,
  TableRow: ({ children }) => <tr>{children}</tr>,
  TableHead: ({ children }) => <th>{children}</th>,
  TableCell: ({ children }) => <td>{children}</td>,
}));

jest.mock("@/components/RecoverMasterkeyDialog", () => ({
  RecoverMasterkeyDialog: ({ isDialogOpen, setIsDialogOpen }) => (
    <div
      data-testid="recover-dialog"
      style={{ display: isDialogOpen ? "block" : "none" }}
    >
      <button onClick={() => setIsDialogOpen(false)}>Zamknij</button>
    </div>
  ),
}));

jest.mock("lucide-react", () => ({
  ArrowUpDown: () => <svg data-testid="arrow-up-down" />,
  LogIn: () => <svg data-testid="login-icon" />,
  Save: () => <svg data-testid="save-icon" />,
}));

// Mock extractPasswordFromZip
jest.mock("@/components/DataTable", () => {
  const originalModule = jest.requireActual("@/components/DataTable");
  return {
    ...originalModule,
    extractPasswordFromZip: jest.fn().mockImplementation(() => Promise.resolve("mocked-password")),
  };
});

const mockSendMessage = jest.fn();
global.chrome = {
  runtime: {
    sendMessage: mockSendMessage,
  },
  tabs: {
    query: jest.fn(),
  },
  scripting: {
    executeScript: jest.fn(),
  },
} as any;

describe("DataTable", () => {
  const originalLocation = window.location;
  beforeAll(() => {
    delete window.location;
    window.location = { ...originalLocation, reload: jest.fn() };
  });

  afterAll(() => {
    window.location = originalLocation;
  });

  const mockPasswords: any[] = [
    {
      id: "1",
      platform: "test1",
      login: "user1@example.com",
      passwordfile: "pass1.enc",
      logo: "test1-logo.png",
    },
    {
      id: "2",
      platform: "test2",
      login: "user2@example.com",
      passwordfile: "pass2.enc",
      logo: "test2-logo.png",
    },
  ];

  const defaultTableMock = {
    getHeaderGroups: () => [
      {
        id: "header1",
        headers: [
          {
            id: "platform",
            column: { columnDef: { header: "Serwis" } },
            isPlaceholder: false,
            getContext: () => ({}),
          },
          {
            id: "email",
            column: {
              columnDef: {
                header: "Login",
              },
              toggleSorting: jest.fn(),
              getIsSorted: () => false,
            },
            isPlaceholder: false,
            getContext: () => ({}),
          },
          {
            id: "amount",
            column: { columnDef: { header: () => <div className="text-right">Zaloguj</div> } },
            isPlaceholder: false,
            getContext: () => ({}),
          },
        ],
      },
    ],
    getRowModel: () => ({
      rows: mockPasswords.map((p, i) => ({
        id: `row-${i}`,
        original: {
          ...p,
          passwordfile: p.passwordfile,
        },
        getVisibleCells: () => [
          {
            id: `cell-platform-${i}`,
            column: { columnDef: columns[0] },
            getValue: () => p.platform,
            getContext: () => ({
              row: { original: p, getValue: (key) => key === "email" ? p.login : p[key] },
              getValue: () => p.platform,
              column: { columnDef: columns[0] },
              cell: {},
            }),
          },
          {
            id: `cell-email-${i}`,
            column: { columnDef: columns[1] },
            getValue: () => p.login,
            getContext: () => ({
              row: { original: p, getValue: (key) => key === "email" ? p.login : p[key] },
              getValue: () => p.login,
              column: { columnDef: columns[1] },
              cell: {},
            }),
          },
          {
            id: `cell-amount-${i}`,
            column: { columnDef: columns[2] },
            getValue: () => null,
            getContext: () => ({
              row: { original: p, getValue: (key) => key === "email" ? p.login : p[key] },
              getValue: () => null,
              column: { columnDef: columns[2] },
              cell: {},
            }),
          },
        ],
        getIsSelected: () => false,
      })),
    }),
    getColumn: (id: string) => ({
      getFilterValue: () => "",
      setFilterValue: jest.fn(),
      columnDef: columns.find((col) => col.accessorKey === id),
    }),
    previousPage: jest.fn(),
    nextPage: jest.fn(),
    getCanPreviousPage: () => false,
    getCanNextPage: () => true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (window.location.reload as jest.Mock).mockClear();
    (usePasswordContext as jest.Mock).mockReturnValue({
      state: {
        zip: { file: jest.fn(() => ({ async: jest.fn(() => Promise.resolve("encrypted:iv")) })) },
        encryptionKey: { name: "AES-GCM" },
        currentUser: { id: "user123" },
        token: "mock-token",
      },
      addPassword: jest.fn(),
      setMasterkey: jest.fn(),
    });
    (useReactTable as jest.Mock).mockReturnValue(defaultTableMock);
    (api.get as jest.Mock).mockResolvedValue({ data: mockPasswords });
    (api.post as jest.Mock).mockResolvedValue({});
    (global.chrome.tabs.query as jest.Mock).mockImplementation((_, cb) =>
      cb([{ id: 1 }])
    );
    (global.chrome.scripting.executeScript as jest.Mock).mockResolvedValue([
      { result: { email: null, password: null, url: null } },
    ]);
  });

  test("renderuje tabelę z danymi", async () => {
    render(<DataTable />);
    await waitFor(() => {
      expect(screen.getByText("Serwis")).toBeInTheDocument();
      expect(screen.getByText("Login")).toBeInTheDocument();
      expect(screen.getByText("Zaloguj")).toBeInTheDocument();
      expect(screen.getByText("user1@example.com")).toBeInTheDocument();
      expect(screen.getByText("user2@example.com")).toBeInTheDocument();
      expect(screen.getAllByAltText("Logo")[0]).toBeInTheDocument();
      expect(screen.getByTestId("save-button")).toBeInTheDocument();
    });
  });

  test("pokazuje stan ładowania, gdy dane są pobierane", () => {
    (api.get as jest.Mock).mockReturnValue(new Promise(() => {}));
    render(<DataTable />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("pokazuje błąd, gdy pobieranie danych nie powiedzie się", async () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
    (api.get as jest.Mock).mockRejectedValue(new Error("API error"));
    render(<DataTable />);
    expect(await screen.findByText("Nie udało się pobrać danych z API.")).toBeInTheDocument();
    consoleErrorMock.mockRestore();
  });

  test("filtruje tabelę po loginie", async () => {
    const setFilterValue = jest.fn();
    (useReactTable as jest.Mock).mockReturnValue({
      ...defaultTableMock,
      getColumn: (id: string) => ({
        getFilterValue: () => "",
        setFilterValue,
        columnDef: columns.find((col) => col.accessorKey === id),
      }),
    });

    render(<DataTable />);
    await waitFor(() => {
      expect(screen.getByTestId("filter-input")).toBeInTheDocument();
    });
    fireEvent.change(screen.getByTestId("filter-input"), {
      target: { value: "user1" },
    });
    expect(setFilterValue).toHaveBeenCalledWith("user1");
  });

  test("sortuje tabelę po loginie po kliknięciu nagłówka", async () => {
    const toggleSorting = jest.fn();
    const getIsSorted = jest.fn(() => false);

    const emailColumnDef = columns.find((c: any) => c.accessorKey === 'email');
    if (!emailColumnDef) throw new Error("Email column definition not found");

    (useReactTable as jest.Mock).mockReturnValue({
      ...defaultTableMock,
      getHeaderGroups: () => [
        {
          id: "header1",
          headers: defaultTableMock.getHeaderGroups()[0].headers.map((header: any) => {
            if (header.id === 'email') {
              return {
                ...header,
                column: {
                  ...header.column,
                  columnDef: emailColumnDef,
                  toggleSorting,
                  getIsSorted,
                },
                getContext: () => ({
                  column: {
                    columnDef: emailColumnDef,
                    toggleSorting,
                    getIsSorted,
                  },
                }),
              };
            }
            return header;
          }),
        },
      ],
    });

    render(<DataTable />);

    await waitFor(() => {
      expect(screen.getByTestId("sort-button")).toBeInTheDocument();
    });

    const sortButton = screen.getByTestId("sort-button");
    fireEvent.click(sortButton);
    expect(toggleSorting).toHaveBeenCalled();
  });


 
  test("dodaje hasło po kliknięciu przycisku zapisu", async () => {
    (global.chrome.scripting.executeScript as jest.Mock).mockResolvedValue([
      {
        result: {
          email: "test@example.com",
          password: "test123",
          url: "https://test.com",
        },
      },
    ]);
    const mockAddPassword = jest.fn().mockResolvedValue({});
    (api.get as jest.Mock).mockResolvedValue({ data: mockPasswords });
    (usePasswordContext as jest.Mock).mockReturnValue({
      state: {
        zip: { file: jest.fn(() => ({ async: jest.fn(() => Promise.resolve("encrypted:iv")) })) },
        encryptionKey: { name: "AES-GCM" },
        currentUser: { id: "user123" },
        token: "mock-token",
      },
      addPassword: mockAddPassword,
      setMasterkey: jest.fn(),
    });

    render(<DataTable />);
    await waitFor(() => {
      expect(screen.getByTestId("save-button")).toBeInTheDocument();
    });
    const saveButton = screen.getByTestId("save-button");
    fireEvent.click(saveButton);
    await waitFor(() => {
      expect(mockAddPassword).toHaveBeenCalledWith(
        "test123",
        "https://test.com",
        "test@example.com"
      );
    });
  });

  test("obsługuje paginację", async () => {
    render(<DataTable />);
    await waitFor(() => {
      expect(screen.getAllByTestId("pagination-button")[1]).toBeInTheDocument();
    });
    const nextButton = screen.getAllByTestId("pagination-button")[1];
    expect(nextButton).not.toBeDisabled();
    fireEvent.click(nextButton);
    expect(defaultTableMock.nextPage).toHaveBeenCalled();
  });
});