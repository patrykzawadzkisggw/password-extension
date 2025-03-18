(function () {
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
  })();