/*OVERALL EVALUATION OF ALL URLS ABOVE
• Excellent work on implementing all the required features, including the bonus switch functionality. The application correctly fetches currency codes, performs conversions, and works as expected.
• A major security concern is that your API key is exposed in the client-side JavaScript file. Anyone visiting the page can view the source code and steal your key. For future projects, never store secret keys in front-end code. The standard practice is to create a simple backend (a server-side proxy) that holds the key and makes the API request on behalf of the front-end.
• To prevent users from entering non-numeric values, consider adding validation to the 'Amount' field. A simple way to improve this is to change the input type in your HTML from type="text" to type="number".
• In your window.onload function, the code to create and append <option> elements is repeated for both the 'from' and 'to' dropdowns. You could create a helper function to handle this logic, which would reduce code duplication and make it more maintainable.*/

window.onload = async (e) => {
    try {
        e.preventDefault();
        let codesUrl = 'https://v6.exchangerate-api.com/v6/fca75a019c97f20bc1d4952a/codes';
        const response = await fetch(codesUrl);
        if (!response.ok) {
            throw new Error("Something went wrong");
        } else {
            let data = await response.json();
            for (const item of data.supported_codes) {
                const select_from = document.getElementById('from');
                const opt_from = document.createElement('option');
                opt_from.value = item[0];
                opt_from.textContent = item[1];
                select_from.appendChild(opt_from);
                const select_to = document.getElementById('to');
                const opt_to = document.createElement('option');
                opt_to.value = item[0];
                opt_to.textContent = item[1];
                select_to.appendChild(opt_to);
            }
        }
    } catch (err) {
        console.log("In the catch ", err);
    }
}

formElem.onsubmit = async (e) => {
    try {
        e.preventDefault();
        const formData = new FormData(formElem);
        const from_currency = formData.get('from');
        const to_currency = formData.get('to');
        const amount = formData.get('amount');
        fetchCurrencyExchange(from_currency, to_currency, amount);
    } catch (err) {
        console.log("In the catch 2 ", err);
    }
}

async function fetchCurrencyExchange(fromCurrency, toCurrency, amount) {
    const total = document.getElementById('total');
    let convertUrl = 'https://v6.exchangerate-api.com/v6/fca75a019c97f20bc1d4952a/pair/'+ fromCurrency + '/' + toCurrency + '/' + amount;
    const response = await fetch(convertUrl);
    if (!response.ok) {
        throw new Error("Something went wrong 2");
    } else {
        let data = await response.json();
        total.value = data.conversion_result;
    }
}

const viceVersaBtn = document.getElementById("vice_versa");
viceVersaBtn.onclick = async (e) => {
    try {
        e.preventDefault();
        const fromElem = document.getElementById('from');
        const toElem = document.getElementById('to');
        const formData = new FormData(formElem);
        const fromForm = formData.get('from');
        const toForm = formData.get('to');
        const amount = formData.get('amount');
        fromElem.value = toForm;
        toElem.value = fromForm;
        fetchCurrencyExchange(toForm, fromForm, amount);
    } catch (err) {
        console.log("In the catch 3 ", err);
    }
}
