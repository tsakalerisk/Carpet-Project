import { deleteContact, getContacts, postContact } from './api_calls.js'
import { CONTACTS_PER_PAGE, current_page, updatePages } from './paging.js'

let getData = async () => {
    let response = await getContacts(current_page, CONTACTS_PER_PAGE)
    let data = await response.json()
    //     .filter(contact =>
    //     Object.keys(filters).every(key =>
    //         contact[key].toLowerCase().startsWith(filters[key].toLowerCase())
    //     )
    // )
    updateTable(data)
    updatePages()
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
            <td>${x.cityName}</td>
            <td>${x.stateName}</td>
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
