import { getCities, getContactById, getStates, postContact } from "./api_calls.js"
import { getData } from "./main.js"

const formModal = document.querySelector('.contact-form-container')

getStates().then(async response => {
    let states = await response.json()
    let dropdown = document.querySelector('#stateName')
    dropdown.innerHTML = states.map(x => `<option>${x.stateName}</option>`).join('')
})

getCities().then(async response => {
    let cities = await response.json()
    let datalist = document.querySelector('#cities')
    datalist.innerHTML = cities.map(x => `<option value='${x.cityName}'></option>`).join('')
})


const showNewForm = () => {
    formModal.querySelector('.contact-form').reset()
    document.querySelector('.contact-header').innerHTML = 'New Contact'
    formModal.showModal()
}

const showUpdateForm = async id => {
    let response = await getContactById(id)
    let contact = await response.json()
    //fill out all fields in the form with the contact's data
    Object.keys(contact).forEach(key => {
        if (formModal.querySelector(`#${key}`))
            formModal.querySelector(`#${key}`).value = contact[key]
    })
    document.querySelector('.contact-header').innerHTML = 'Edit Contact'
    formModal.showModal()
}

const hideUpdateForm = () => formModal.close()

formModal.onclick = e => {
    const dialogDim = formModal.getBoundingClientRect()
    if (
        e.clientX < dialogDim.left ||
        e.clientX > dialogDim.right ||
        e.clientY < dialogDim.top ||
        e.clientY > dialogDim.bottom
    )
        formModal.close()
}

document.querySelector('.contact-form').onsubmit = e => {
    const data = new FormData(e.target)
    postContact(data).then(getData)
}

// Global scope
window.showNewForm = showNewForm
window.showUpdateForm = showUpdateForm
window.hideUpdateForm = hideUpdateForm