/*chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Sprawdzamy, czy strona jest w pełni załadowana
    if (changeInfo.status === "complete" && tab.url && tab.url.includes("/login-clear")) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: addButtonToForm
        });
    }
});

// Funkcja dodająca przycisk do formularza na podstawie pola name
function addButtonToForm() {
    // Znajdujemy formularz za pomocą name='intForm'
    const form = document.querySelector("form[name='intForm']");

    if (form) {
        // Tworzymy nowy przycisk
        const button = document.createElement("button");
        button.type = "button"; 
        button.textContent = "Moje Rozszerzenie";  // Tekst przycisku
         button.classList.add(
            "inline-flex", 
            "items-center", 
            "justify-center", 
            "gap-2", 
            "whitespace-nowrap", 
            "rounded-md", 
            "text-sm", 
            "font-medium", 
            "transition-all", 
            "disabled:pointer-events-none", 
            "disabled:opacity-50", 
            "[&_svg]:pointer-events-none", 
            "[&_svg:not([class*='size-'])]:size-4", 
            "shrink-0", 
            "[&_svg]:shrink-0", 
            "outline-none", 
            "focus-visible:border-ring", 
            "focus-visible:ring-ring/50", 
            "focus-visible:ring-[3px]", 
            "aria-invalid:ring-destructive/20", 
            "dark:aria-invalid:ring-destructive/40", 
            "aria-invalid:border-destructive", 
            "border", 
            "bg-background", 
            "shadow-xs", 
            "hover:bg-accent", 
            "hover:text-accent-foreground", 
            "dark:bg-input/30", 
            "dark:border-input", 
            "dark:hover:bg-input/50", 
            "size-9"
        );

        // Dodajemy przycisk do formularza
        form.appendChild(button);

        // Dodajemy zdarzenie kliknięcia
        button.addEventListener("click", function () {
            const emailInput = document.getElementById("emailId");
          const passwordInput = document.getElementById("passwordId");
          //const submitButton = document.querySelector("button[type='submit']");
         if(emailInput && passwordInput ) {
          emailInput.value = "abbbgg@int.pl";
          passwordInput.value = "ston^&9gPassword&*9";
         // submitButton.click();
         }
        });
    } else {
        console.error("Nie znaleziono formularza o name='intForm'.");
    }
}*/


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "fillForm") {
      const email = message.email;
      const password = message.password;
      const url = message.url;
      chrome.tabs.create({ url: url }, (tab) => {
        chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
          if (tabId === tab.id && changeInfo.status === "complete") {
            chrome.tabs.sendMessage(tabId, {
              action: "fillForm",
              email: email,
              password: password
            });
            chrome.tabs.onUpdated.removeListener(listener);
          }
        });
      });
    }
  });