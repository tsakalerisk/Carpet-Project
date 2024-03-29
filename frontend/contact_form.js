import { alertError, alertSuccess } from './alerts.js'
import {
    getCities,
    getContactById,
    getStates,
    postContact,
} from './api_calls.js'
import { getData } from './main.js'

const formModal = document.querySelector('.contact-form-modal')

const formHeader = document.querySelector('.contact-header')
const dropdown = document.querySelector('#stateName')
const citiesDatalist = document.querySelector('#cities')
const submitButton = document.querySelector('#contact-form-submit')
let states
let cities

const fillCitiesAndStates = async () => {
    let response = await getStates()
    states = await response.json()
    dropdown.innerHTML += states
        .map(x => `<option>${x.stateName}</option>`)
        .join('')

    response = await getCities()
    cities = await response.json()

    dropdown.onchange = () => {
        document.querySelector('#cityName').value = ''
        citiesDatalist.innerHTML = getCitiesFromCurrentState(cities, states)
            .map(x => `<option>${x.cityName}</option>`)
            .join('')
    }
}

fillCitiesAndStates()

const getCitiesFromCurrentState = (cities, states) => {
    let currentState = states.find(state => state.stateName === dropdown.value)
    return cities.filter(x => x.state.stateId === currentState.stateId)
}

const showNewForm = () => {
    formModal.querySelector('.contact-form').reset()
    formHeader.innerHTML = 'New Contact'
    submitButton.value = 'Create contact'
    citiesDatalist.innerHTML = ''
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
    formModal.querySelector('#cityName').value = contact.city.cityName
    formModal.querySelector('#stateName').value = contact.city.state.stateName
    formHeader.innerHTML = 'Edit Contact'
    submitButton.value = 'Update contact'
    citiesDatalist.innerHTML = getCitiesFromCurrentState(cities, states)
        .map(x => `<option>${x.cityName}</option>`)
        .join('')
    formModal.showModal()
}

const hideUpdateForm = () => formModal.close()

formModal.onclick = e => {
    // if clicked outside, the target will be the formModal backdrop, otherwise the contact-form-container
    if (e.target === formModal) {
        formModal.close()
    }
}

document.querySelector('.contact-form').onsubmit = async e => {
    const data = new FormData(e.target)
    let response = await postContact(data)
    if (response.status === 201) {
        getData()
        alertSuccess('Successfully added')
    } else {
        let error = await response.json()
        alertError(error.message)
    }
}

// Global scope
window.showNewForm = showNewForm
window.showUpdateForm = showUpdateForm
window.hideUpdateForm = hideUpdateForm
