import { deleteContact, getContacts } from './api_calls.js'
import { filters } from './filters.js'
import { CONTACTS_PER_PAGE, current_page, updatePages } from './paging.js'

let getData = async () => {
    let response = await getContacts(current_page, CONTACTS_PER_PAGE, filters)
    let data = await response.json()
    updateTable(data.content)
    updatePages(data.totalPages)
}

getData()

let updateTable = data => {
    let table = document.querySelector('#contacts')
    table.innerHTML = data
        .map(
            x => `
        <tr>
            <td>${x.firstName}</td>
            <td>${x.lastName}</td>
            <td>${x.streetAddress}</td>
            <td>${x.city.cityName}</td>
            <td>${x.city.state.stateName}</td>
            <td>${x.zipCode}</td>
            <td>${x.phoneNumber}</td>
            <td>${x.emailAddress}</td>
            <td class="contact-options">
                <button class="edit opens-form" onclick="showUpdateForm(${x.contactId})">
                    <span class="material-symbols-outlined">edit_square</span>
                </button>
                <button class="delete" onclick="deleteContact(${x.contactId})">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </td>
        </tr>
    `
        )
        .join('')
}

let deleteContactById = id => {
    deleteContact(id).then(getData)
}

window.deleteContact = deleteContactById

export { getData }
