import { render, screen, waitFor } from "@testing-library/react";
import PasswordButtonAdder from "@/components/PasswordButtonAdder";

// Poprawka mockowania PopoverButton - zakładamy, że jest to eksport nazwany
jest.mock("@/components/PopoverButton", () => ({
  __esModule: true, // Potrzebne dla modułów ES6 z domyślnym eksportem
  default: () => <div data-testid="popover-button">Mock PopoverButton</div>,
}));

// Mock dla ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }
  private callback: ResizeObserverCallback;
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock dla getComputedStyle
const mockGetComputedStyle = jest.fn();
Object.defineProperty(window, "getComputedStyle", {
  value: mockGetComputedStyle,
  writable: true,
});

describe("PasswordButtonAdder", () => {
  // Przechowujemy oryginalny document.body
  const originalBody = document.body;


  beforeAll(() => {
    
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

 

  beforeEach(() => {
    // Resetowanie document.body przed każdym testem
    document.body = originalBody;
    document.body.innerHTML = "";
    jest.clearAllMocks();

    // Domyślny mock dla getComputedStyle
    mockGetComputedStyle.mockReturnValue({
      position: "static",
    });
  });

  afterEach(() => {
    // Czyszczenie po każdym teście
    if(document.body)
    document.body.innerHTML = "";
    // Przywracamy document.body na wypadek, gdyby został ustawiony na null
    document.body = originalBody;
  });

  it("renderuje komunikat o obserwowaniu niereactowego kodu", () => {
    render(<PasswordButtonAdder />);

    expect(
      screen.getByText("React tylko obserwuje i dodaje przycisk do niereactowego kodu!")
    ).toBeInTheDocument();
  });

  it("nie renderuje PopoverButton, jeśli nie ma inputa hasła", () => {
    render(<PasswordButtonAdder />);

    expect(screen.queryByTestId("popover-button")).not.toBeInTheDocument();
  });

  it("renderuje PopoverButton obok inputa hasła z type='password'", async () => {
    render(<PasswordButtonAdder />);

    // Dodajemy input hasła do document.body
    const input = document.createElement("input");
    input.setAttribute("type", "password");
    input.setAttribute("id", "password-input");
    document.body.appendChild(input);

    // Symulujemy zmianę w DOM, aby MutationObserver zareagował
    const event = new Event("DOMNodeInserted", { bubbles: true });
    input.dispatchEvent(event);

    // Czekamy na renderowanie PopoverButton z większym timeoutem
    await waitFor(
      () => {
        expect(screen.getByTestId("popover-button")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // Sprawdzamy, czy kontener <span> został utworzony i jest rodzeństwem inputa
    const spanContainer = input.nextSibling as HTMLElement;
    expect(spanContainer).toBeTruthy();
    expect(spanContainer.tagName).toBe("SPAN");
    expect(spanContainer.style.position).toBe("absolute");

    // Sprawdzamy, czy rodzic inputa ma position: relative
    const parent = input.parentElement as HTMLElement;
    expect(mockGetComputedStyle).toHaveBeenCalledWith(parent);
    expect(parent.style.position).toBe("relative");

    // Sprawdzamy pozycjonowanie kontenera
    expect(spanContainer.style.top).toBe(`${input.offsetTop}px`);
    expect(spanContainer.style.left).toBe(`${input.offsetLeft + input.getBoundingClientRect().width - spanContainer.offsetWidth}px`);
    expect(spanContainer.style.height).toBe(`${input.getBoundingClientRect().height}px`);
    expect(spanContainer.style.display).toBe("flex");
    expect(spanContainer.style.alignItems).toBe("center");
  });

  it("renderuje PopoverButton dla inputa z name='password'", async () => {
    render(<PasswordButtonAdder />);

    const input = document.createElement("input");
    input.setAttribute("name", "password");
    document.body.appendChild(input);

    const event = new Event("DOMNodeInserted", { bubbles: true });
    input.dispatchEvent(event);

    await waitFor(
      () => {
        expect(screen.getByTestId("popover-button")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    const spanContainer = input.nextSibling as HTMLElement;
    expect(spanContainer).toBeTruthy();
    expect(spanContainer.tagName).toBe("SPAN");
  });

  it("renderuje PopoverButton dla inputa z id='login-password'", async () => {
    render(<PasswordButtonAdder />);

    const input = document.createElement("input");
    input.setAttribute("id", "login-password");
    document.body.appendChild(input);

    const event = new Event("DOMNodeInserted", { bubbles: true });
    input.dispatchEvent(event);

    await waitFor(
      () => {
        expect(screen.getByTestId("popover-button")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it("renderuje PopoverButton dla inputa z autocomplete='current-password'", async () => {
    render(<PasswordButtonAdder />);

    const input = document.createElement("input");
    input.setAttribute("autocomplete", "current-password");
    document.body.appendChild(input);

    const event = new Event("DOMNodeInserted", { bubbles: true });
    input.dispatchEvent(event);

    await waitFor(
      () => {
        expect(screen.getByTestId("popover-button")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it("usuwa PopoverButton i kontener, gdy input hasła znika", async () => {
    render(<PasswordButtonAdder />);

    const input = document.createElement("input");
    input.setAttribute("type", "password");
    document.body.appendChild(input);

    const eventInsert = new Event("DOMNodeInserted", { bubbles: true });
    input.dispatchEvent(eventInsert);

    await waitFor(
      () => {
        expect(screen.getByTestId("popover-button")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    document.body.removeChild(input);

    const eventRemove = new Event("DOMNodeRemoved", { bubbles: true });
    document.body.dispatchEvent(eventRemove);

    await waitFor(
      () => {
        expect(screen.queryByTestId("popover-button")).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    const spanContainer = document.body.querySelector("span");
    expect(spanContainer).toBeNull();
  });

  it("nie modyfikuje istniejącego kontenera, jeśli jest to <span>", async () => {
    render(<PasswordButtonAdder />);

    const input = document.createElement("input");
    input.setAttribute("type", "password");
    const existingSpan = document.createElement("span");
    document.body.appendChild(input);
    document.body.appendChild(existingSpan);

    const event = new Event("DOMNodeInserted", { bubbles: true });
    input.dispatchEvent(event);

    await waitFor(
      () => {
        expect(screen.getByTestId("popover-button")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    const spanContainer = input.nextSibling as HTMLElement;
    expect(spanContainer).toBe(existingSpan);
  });

  it("loguje błąd, jeśli document.body nie istnieje", () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    // Ustawiamy document.body na null
    Object.defineProperty(document, "body", {
      value: null,
      writable: true,
    });
    //const tempContainer = document.createElement('div');
    // Renderowanie powinno zostać przechwycone przez try-catch w teście
    expect(() => render(<PasswordButtonAdder />, { container: tempContainer })).toThrowError();

    // Przywracamy document.body
    Object.defineProperty(document, "body", {
      value: originalBody,
      writable: true,
    });
    consoleErrorSpy.mockRestore();
  });
});