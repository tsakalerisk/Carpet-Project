let getData = async () => {
    let response = await fetch('./MOCK_DATA.json')
    let data = await response.json()
    let table = document.querySelector('#contacts')

    let updateTable = data => {
        table.innerHTML = data.map((x, index) => `
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
                    <button class="edit" onclick="showUpdateForm('${JSON.stringify(x).replaceAll('"', '%')}')">
                        <span class="material-symbols-outlined">edit_square</span>
                    </button>
                    <button class="delete" onclick="console.log('Deleted ${index}. Replace this with id + delete request.')">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </td>
            </tr>
        `).join('')
    }

    updateTable(data.slice(0, 20))

    let filterText = document.querySelector('.filter')
    filterText.oninput = e => {
        updateTable(
            data
                .filter(x => x.first_name.toLowerCase().includes(e.target.value.toLowerCase()))
                .slice(0, 20)
        )
    }
}

getData()

let showUpdateForm = input => {
    let contact = JSON.parse(input.replaceAll('%', '"'))
    let form = document.querySelector('.update-form')
    form.classList.add('open')

    //fill out all fields in the form with the contact's data
    Object.keys(contact).forEach(key => {
        form.querySelector(`#${key}`) &&
            (form.querySelector(`#${key}`).value = contact[key])
    })
}

let hideUpdateForm = () => document.querySelector('.update-form').classList.remove('open')

window.addEventListener('click', e => {
    let form = document.querySelector('.update-form')
    if (!form.contains(e.target) && !e.target.closest('.edit') && form.classList.contains('open')) {
        hideUpdateForm()
    }
})