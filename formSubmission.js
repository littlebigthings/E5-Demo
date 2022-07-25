const submitForm = () => {
    let formElm = document.querySelector("[data-form='form']")
    formElm.addEventListener('submit', (e) => {
        e.preventDefault()
        e.stopPropagation()
        e.target.querySelector("input[type='password']").type = "text"
        document.location = '/dashboard';
    })
}
submitForm();