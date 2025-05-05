import { render, screen, fireEvent } from "@testing-library/react";
import PopoverButton from "@/components/PopoverButton";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, ...props }) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

jest.mock("@/components/ui/popover", () => ({
  Popover: ({ children, open, onOpenChange }) => (
    <div data-open={open} data-testid="popover-root">
      {children}
    </div>
  ),
  PopoverTrigger: ({ children, asChild }) => (
    <div data-testid="popover-trigger">{children}</div>
  ),
  PopoverContent: ({ children }) => (
    <div data-testid="popover-content">{children}</div>
  ),
}));

jest.mock("@/components/GenPasswordButton", () => ({
  default: () => <div data-testid="gen-password-button">GenPasswordButton</div>,
}));

describe("PopoverButton", () => {
  test("renderuje PopoverButton z ikoną Menu, gdy jest zamknięty", () => {
    render(<PopoverButton />);
    const button = screen.getByRole("button");
    const menuIcon = screen.getByTestId("popover-trigger").querySelector("svg");
    expect(button).toBeInTheDocument();
    expect(menuIcon).toBeInTheDocument();
  });

  test("przełącza na ikonę X po kliknięciu przycisku", () => {
    render(<PopoverButton />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    const xIcon = screen.getByTestId("popover-trigger").querySelector("svg");
    expect(xIcon).toBeInTheDocument();
  });

  test("pokazuje PopoverContent, gdy popover jest otwarty", () => {
    render(<PopoverButton />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    const popoverContent = screen.getByTestId("popover-content");
    expect(popoverContent).toBeInTheDocument();

    const genPasswordButton = screen.getByTestId("gen-password-button");
    expect(genPasswordButton).toBeInTheDocument();
  });

  test("poprawnie przełącza stan isOpen", () => {
    render(<PopoverButton />);
    const button = screen.getByRole("button");

    expect(screen.getByTestId("popover-root")).toHaveAttribute(
      "data-open",
      "false"
    );

    fireEvent.click(button);
    expect(screen.getByTestId("popover-root")).toHaveAttribute(
      "data-open",
      "true"
    );

    fireEvent.click(button);
    expect(screen.getByTestId("popover-root")).toHaveAttribute(
      "data-open",
      "false"
    );
  });
});