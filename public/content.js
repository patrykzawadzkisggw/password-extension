/*(function () {
    let appContainer = document.getElementById("gen-password-button");
    const passwordInput = document.querySelector('input[type="password"]');
    if (!appContainer && passwordInput) {
      appContainer = document.createElement("div");
      appContainer.id = "gen-password-button";
    passwordInput.parentNode.insertBefore(appContainer, passwordInput);
        
    }
  
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("index.js");
    script.onload = () => {
      if (!appContainer.dataset.rendered) {
        const root = ReactDOM.createRoot(appContainer);
        root.render(React.createElement(MojKomponent));
        appContainer.dataset.rendered = "true";
      }
    };
    document.head.appendChild(script);
  
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = chrome.runtime.getURL("index.css");
    document.head.appendChild(link);
  })();*/

  // content.js
(function () {
  // Funkcja wypełniająca pole email/login
  function fillEmailField(emailText) {
    const selectors = [
      '#emailId',
      '#login',
      '#login-username',
      '#emailTextInput',
      'input[name="email"]',
      'input[name="login_username"]',
      'input[name="username"]',
      'input[autocomplete="username"]',
      'input[type="email"]'
    ];

    let fieldFound = false;

    for (const selector of selectors) {
      const inputField = document.querySelector(selector);
      if (inputField) {
        inputField.value = emailText;
        const inputEvent = new Event('input', { bubbles: true });
        inputField.dispatchEvent(inputEvent);
        const changeEvent = new Event('change', { bubbles: true });
        inputField.dispatchEvent(changeEvent);
        fieldFound = true;
        break;
      }
    }

    if (!fieldFound) {
      console.warn('Nie znaleziono żadnego pasującego pola email/login');
    }

    return fieldFound;
  }

  // Funkcja wypełniająca pole hasła
  function fillPasswordField(passwordText) {
    const selectors = [
      '#password',
      '#login-password',
      '#pass',
      'input[name="password"]',
      'input[name="Passwd"]',
      'input[name="pass"]',
      'input[autocomplete="current-password"]',
      'input[type="password"]'
    ];

    let fieldFound = false;

    for (const selector of selectors) {
      const inputField = document.querySelector(selector);
      if (inputField) {
        inputField.value = passwordText;
        const inputEvent = new Event('input', { bubbles: true });
        inputField.dispatchEvent(inputEvent);
        const changeEvent = new Event('change', { bubbles: true });
        inputField.dispatchEvent(changeEvent);
        fieldFound = true;
        break;
      }
    }

    if (!fieldFound) {
      console.warn('Nie znaleziono żadnego pasującego pola hasła');
    }

    return fieldFound;
  }

  // Funkcja klikająca przycisk submit
  function clickSubmitButton() {
    const buttonSelectors = [
      'button[type="submit"]',
      'input[type="submit"]',
      'button:contains("loguje się")',
      'button:contains("Zaloguj się")',
      'button:contains("log in")',
      'span:contains("loguje się")',
      'span:contains("Zaloguj się")',
      'span:contains("log in")',
      'button:contains("Loguje się")',
      'button:contains("zaloguj się")',
      'button:contains("Log in")',
      'span:contains("Loguje się")',
      'span:contains("zaloguj się")',
      'span:contains("Log in")'
    ];

    let buttonFound = false;

    const findButtonWithText = (selector) => {
      const text = selector.split(':contains("')[1].slice(0, -1).toLowerCase();
      const baseSelector = selector.split(':contains')[0] || 'button,span';
      const elements = document.querySelectorAll(baseSelector);
      for (const element of elements) {
        const elementText = element.textContent.trim().toLowerCase();
        if (elementText.includes(text)) {
          return element;
        }
      }
      return null;
    };

    for (const selector of buttonSelectors) {
      let button;
      if (selector.includes(':contains')) {
        button = findButtonWithText(selector);
      } else {
        button = document.querySelector(selector);
      }
      if (button) {
        button.click();
        const clickEvent = new Event('click', { bubbles: true });
        button.dispatchEvent(clickEvent);
        buttonFound = true;
        break;
      }
    }

    if (!buttonFound) {
      console.warn('Nie znaleziono pasującego przycisku submit');
    }

    return buttonFound;
  }

  // Funkcja klikająca przycisk "Dalej"
  function clickNextButton() {
    const clickableElements = document.querySelectorAll('button span');
    for (const element of clickableElements) {
      if (element.textContent.trim().toLowerCase().includes('dalej')) {
        element.click();
        const clickEvent = new Event('click', { bubbles: true });
        element.dispatchEvent(clickEvent);
        return true;
      }
    }
    console.warn('Nie znaleziono pasującego przycisku "Dalej"');
    return false;
  }

  // Udostępniamy funkcje w globalnym obiekcie window
  window.fillEmailField = fillEmailField;
  window.fillPasswordField = fillPasswordField;
  window.clickSubmitButton = clickSubmitButton;
  window.clickNextButton = clickNextButton;

  // Opcjonalnie: Nasłuchiwanie komunikatów od background.js
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "fillForm") {
     // alert('Wypełniam formularz');
      const emailFilled = fillEmailField(message.email);
      clickNextButton();
      const passwordFilled = fillPasswordField(message.password);
      clickNextButton();
      if (emailFilled && passwordFilled) {
        clickSubmitButton() || clickNextButton(); // Próbujemy submit, a potem "Dalej"
      }
    }
  });

  function checkUrlForKeywords() {
    // Pobranie bieżącego URL
    const url = window.location.href;

    // Lista słów kluczowych do sprawdzenia
    const keywords = ['rejestracja', 'register', 'r.php', 'Utwórz_konto', 'signup'];

    // Sprawdzenie, czy URL zawiera któreś ze słów kluczowych
    for (let keyword of keywords) {
        if (url.includes(keyword)) {
            return true;  // Jeśli jedno z słów kluczowych jest obecne, zwróć true
        }
    }

    return false;  // Jeśli żadne słowo kluczowe nie jest obecne, zwróć false
}


  function findAndHighlightPasswordField() {
    if (!checkUrlForKeywords()) return null;
    const selectors = [
        '#password',
        '#login-password',
        '#pass',
        'input[name="password"]',
        'input[name="Passwd"]',
        'input[name="pass"]',
        'input[autocomplete="current-password"]',
        'input[type="password"]'
    ];

    let fieldFound = false;

    // Przechodzimy po każdym selektorze
    for (const selector of selectors) {
        const inputField = document.querySelector(selector);
        if (inputField) {
            // Utwórz div dla czerwonego kwadratu
            const redSquare = document.createElement('div');
            redSquare.id = "gen-password-button";

            // Dodaj czerwony kwadrat do rodzica pola input
            inputField.parentElement.appendChild(redSquare);

            // Ustaw odpowiednią pozycję kwadratu
            const inputRect = inputField.getBoundingClientRect();
            redSquare.style.position = 'absolute';
            redSquare.style.top = `5px`;
            redSquare.style.right = `5px`;

            fieldFound = true;
            return redSquare;
        }
    }

    if (!fieldFound) {
        console.warn('Nie znaleziono żadnego pasującego pola hasła');
    }
}
//let appContainer = document.createElement("div");
//appContainer.id = "gen-password-button";
//document.body.appendChild(appContainer);
 /* let appContainer = document.getElementById("gen-password-button");
  const passwordInput = document.querySelector('input[type="password"]');
  if (!appContainer && passwordInput) {
    appContainer = document.createElement("div");
    appContainer.id = "gen-password-button";
  passwordInput.parentNode.insertBefore(appContainer, passwordInput);
      
  }*/




  //const script = document.createElement("script");
  //script.src = chrome.runtime.getURL("index.js");
 /* script.onload = () => {
    if (!appContainer.dataset.rendered) {
      const root = ReactDOM.createRoot(appContainer);
      root.render(React.createElement(MojKomponent));
      appContainer.dataset.rendered = "true";
    }
  };*/
 // document.head.appendChild(script);

  //const link = document.createElement("link");
  //link.rel = "stylesheet";
  //link.href = chrome.runtime.getURL("index2.css");
  //document.head.appendChild(link);


})();