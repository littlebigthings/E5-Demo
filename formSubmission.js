const submitForm = () => {
    let formElm = document.querySelector("[data-form='form']")
    formElm.addEventListener('submit', (e) => {
        e.target.querySelector("input[type='password']").type = "text"
        document.location = '/dashboard';
    })
}
submitForm();