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
                //console.log(item[0]);
                const select_from = document.getElementById('from');
                const select_to = document.getElementById('to');
                const opt = document.createElement('option');
                opt.value = item[0];
                opt.textContent = item[1];
                select_to.appendChild(opt);
                select_from.appendChild(opt);
            }
        }
    } catch (err) {
        console.log("In the catch ", err);
    }
}

/*formElem.onsubmit = async (e) => {
    try {
        e.preventDefault();
        const formData = new FormData(formElem);
        const category = formData.get('category');
        let apiUrl = 'https://v6.exchangerate-api.com/v6/fca75a019c97f20bc1d4952a/codes';
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Something went wrong");
        } else {
            //console.log("response", response)
            let data = await response.json();
            //console.log("data", data);
            names.innerText = data.result.properties.name;
            height.innerText = `Height: ${data.result.properties.height}`;
            gender.innerText = `Gender: ${data.result.properties.gender}`;
            birthYear.innerText = `Birth Year: ${data.result.properties.birth_year}`;
        }
    } catch (err) {
        console.log("In the catch ", err);
    }
}*/