import { alertError, alertSuccess } from './alerts.js'
import {
    getCities,
    getContactById,
    getStates,
    postContact,
} from './api_calls.js'
import { getData } from './main.js'

const formModal = document.querySelector('.contact-form-container')

let dropdown = document.querySelector('#stateName')
let citiesDatalist = document.querySelector('#cities')

const fillCitiesAndStates = async () => {
    let response = await getStates()
    let states = await response.json()
    dropdown.innerHTML += states
        .map(x => `<option>${x.stateName}</option>`)
        .join('')

    response = await getCities()
    let cities = await response.json()

    dropdown.onchange = () => {
        document.querySelector('#cityName').value = ''
        citiesDatalist.innerHTML = getCitiesFromCurrentState(cities, states)
            .map(x => `<option>${x.cityName}</option>`)
            .join('')
    }
}

fillCitiesAndStates()

const getCitiesFromCurrentState = (cities, states) => {
    let currentStateId = states.find(
        state => state.stateName === dropdown.value
    ).stateId
    return cities.filter(x => x.stateId === currentStateId)
}

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

document.querySelector('.contact-form').onsubmit = async e => {
    const data = new FormData(e.target)
    let response = await postContact(data)
    if (response.status === 201) {
        getData()
        alertSuccess('Successfully added')
    } else {
        alertError(await response.text())
    }
}

// Global scope
window.showNewForm = showNewForm
window.showUpdateForm = showUpdateForm
window.hideUpdateForm = hideUpdateForm
