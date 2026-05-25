formElem.onsubmit = async (e) => {
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
}