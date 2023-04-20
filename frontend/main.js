const CONTACTS_PER_PAGE = 20

let data, current_page = 1
let filter = new URLSearchParams(document.location.search).get("filter")
document.querySelector('.filter').value = filter

let getData = async () => {
    let response = await fetch('./MOCK_DATA.json')
    data = (await response.json())
        .filter(x => !filter || x.first_name.toLowerCase().startsWith(filter.toLowerCase()))
    updateTable(data)
    updatePages(data)
}

getData()

let updateTable = data => {
    let table = document.querySelector('#contacts')
    table.innerHTML = data
        .sort((a, b) => a.first_name > b.first_name ? 1 : -1)
        .slice((current_page - 1) * CONTACTS_PER_PAGE, current_page * CONTACTS_PER_PAGE)
        .map(x => `
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
    `)
        .join('')
}

let updatePages = data => {
    let paging = document.querySelector('.paging')
    let pages = Array.from({ length: Math.ceil(data.length / CONTACTS_PER_PAGE) }, (_, i) => i + 1)
    let mapToButton = x => `
        <button class="${x === current_page ? 'current' : ''}" onclick="setPage(${x})" ${x === current_page ? 'disabled' : ''}>
            ${x}
        </button>
    `
    paging.innerHTML = pages
        .filter(x => x === 1 || x === pages.length || Math.abs(current_page - x) < 2)
        .flatMap((x, i, filtered_pages) => filtered_pages[i + 1] > x + 1 ? [mapToButton(x), '. . .'] : [mapToButton(x)])
        .join('')
}

let setPage = page => {
    current_page = page
    updateTable(data)
    updatePages(data)
    window.scrollTo(0, 0);
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