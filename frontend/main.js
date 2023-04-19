const CONTACTS_PER_PAGE = 20

let data, page = 0

let getData = async () => {
    let response = await fetch('./MOCK_DATA.json')
    data = await response.json()
    updateTable(data.sort((a, b) => a.first_name > b.first_name ? 1 : -1).slice(0, 20))
}

getData()

let updateTable = data => {
    let table = document.querySelector('#contacts')
    table.innerHTML = data.map(x => `
        <tr>
            <td>${x.first_name}</td>
            <td>${x.last_name}</td>
            <td>${x.street_address}</td>
            <td>${x.city}</td>
            <td>${x.state}</td>
            <td>${x.zip_code}</td>
            <td>${x.phone_number}</td>
            <td>${x.email}</td>
            <td class="contact-options">
                <button class="edit" onclick="showUpdateForm(${x.id})">
                    <span class="material-symbols-outlined">edit_square</span>
                </button>
                <button class="delete" onclick="console.log('Deleted id=${x.id}. Replace this with delete request.')">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </td>
        </tr>
    `).join('')
}

let filterText = document.querySelector('.filter')
filterText.oninput = e => {
    updateTable(
        data
            .filter(x => x.first_name.toLowerCase().includes(e.target.value.toLowerCase()))
            .slice(0, 20)
    )
}

let showUpdateForm = id => {
    let form = document.querySelector('.update-form')
    let contact = data.find(x => x.id === id)
    //fill out all fields in the form with the contact's data
    Object.keys(contact).forEach(key => {
        form.querySelector(`#${key}`) &&
            (form.querySelector(`#${key}`).value = contact[key])
    })

    form.classList.add('open')
}

let hideUpdateForm = () => document.querySelector('.update-form').classList.remove('open')

window.addEventListener('click', e => {
    let form = document.querySelector('.update-form')
    if (!form.contains(e.target) && !e.target.closest('.edit') && form.classList.contains('open')) {
        hideUpdateForm()
    }
})