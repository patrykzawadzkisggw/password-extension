// src/Popup.jsx
//import { getLoginUrl } from '@/lib/functions';
//import { useEffect, useState } from 'react';


export const Test = () => {
   /* const [email, setEmail] = useState('Brak emaila');
    const [password, setPassword] = useState('Brak hasła');
    const [url, setUrl] = useState('Brak URL');

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
                        const pageUrl = window.location.href;

                        return {
                            email: emailValue,
                            password: passwordValue,
                            url: pageUrl
                        };
                    }
                });

                if (result && result.result) {
                    const { email, password, url } = result.result;
                    setEmail(email || 'Brak emaila');
                    setPassword(password || 'Brak hasła');
                    setUrl(url || 'Brak URL');

                    // Możesz robić z danymi, co chcesz
                    console.log('Pobrane dane:', { email, password, url });
                    chrome.storage.local.set({ credentials: { email, password, url } });
                }
            } catch (error) {
                console.error('Błąd przy pobieraniu danych:', error);
            }
        });
    }, []);*/

    return (
        <div>
           {/*  <h1>Dane z formularza</h1>
            <p>Email: {email}</p>
            <p>Hasło: {password}</p>
            <p>URL: {getLoginUrl(url)}</p>*/}
        </div>
    );
};

