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
        console.log(from_currency + '//' + to_currency);
        /*let convertUrl = 'https://v6.exchangerate-api.com/v6/fca75a019c97f20bc1d4952a/codes';
        const response = await fetch(convertUrl);
        if (!response.ok) {
            throw new Error("Something went wrong 2");
        } else {
            //console.log("response", response)
            let data = await response.json();
            //console.log("data", data);
        }*/
    } catch (err) {
        console.log("In the catch 2 ", err);
    }
}