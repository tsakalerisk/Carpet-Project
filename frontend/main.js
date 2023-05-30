const CONTACTS_PER_PAGE = 20
const FieldNames = {
    first_name: 'First name',
    last_name: 'Last name',
    street_address: 'Street address',
    city: 'City',
    state: 'State',
    zip_code: 'ZIP code',
    phone_number: 'Phone number',
    email: 'Email',
}

let data,
    current_page = 1
let filters = Object.fromEntries(new URLSearchParams(document.location.search))

let loadFilters = () => {
    let container = document.querySelector('.filters')
    container.innerHTML = Object.keys(filters)
        .map(
            key => `
            <div class="filter">
                ${FieldNames[key]}: ${filters[key]}
                <span class="material-symbols-outlined" onclick="removeFilter('${key}')">
                    close
                </span>
            </div>
        `
        )
        .join('')
}

loadFilters()

let getData = async () => {
    let response = await fetch('http://localhost:5000/contacts')
    data = (await response.json()).filter(contact =>
        Object.keys(filters).every(key =>
            contact[key].toLowerCase().startsWith(filters[key].toLowerCase())
        )
    )
    updateTable(data)
    updatePages(data)
}

getData()

let updateTable = data => {
    let table = document.querySelector('#contacts')
    table.innerHTML = data
        // .sort((a, b) => (a.first_name > b.first_name ? 1 : -1))
        // .slice(
        //     (current_page - 1) * CONTACTS_PER_PAGE,
        //     current_page * CONTACTS_PER_PAGE
        // )
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
                <button class="edit opens-form" onclick="showUpdateForm(${x.id})">
                    <span class="material-symbols-outlined">edit_square</span>
                </button>
                <button class="delete" onclick="console.log('Deleted id=${x.id}. Replace this with delete request.')">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </td>
        </tr>
    `
        )
        .join('')
}

let updatePages = data => {
    let paging = document.querySelector('.paging')
    let mapToButton = x => `
    <button class="${
        x === current_page ? 'current' : ''
    }" onclick="setPage(${x})" ${x === current_page ? 'disabled' : ''}>
    ${x}
    </button>
    `
    let pages = Array.from(
        { length: Math.ceil(data.length / CONTACTS_PER_PAGE) },
        (_, i) => i + 1
    )
    paging.innerHTML = pages
        .filter(
            x => x === 1 || x === pages.length || Math.abs(current_page - x) < 3
        )
        .flatMap((x, i, filtered_pages) =>
            filtered_pages[i + 1] > x + 1
                ? [mapToButton(x), '. . .']
                : [mapToButton(x)]
        )
        .join('')
}

let setPage = page => {
    current_page = page
    updateTable(data)
    updatePages(data)
    window.scrollTo(0, 0)
}

let formModal = document.querySelector('.contact-form-container')

let showNewForm = () => {
    formModal.querySelector('.contact-form').reset()
    document.querySelector('.contact-header').innerHTML = 'New Contact'
    formModal.showModal()
}

let showUpdateForm = id => {
    let contact = data.find(x => x.id === id)
    //fill out all fields in the form with the contact's data
    Object.keys(contact).forEach(key => {
        if (formModal.querySelector(`#${key}`))
            formModal.querySelector(`#${key}`).value = contact[key]
    })
    document.querySelector('.contact-header').innerHTML = 'Edit Contact'
    formModal.showModal()
}

let hideUpdateForm = () => formModal.close()

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

let filterForm = document.querySelector('.filter-form')
filterForm.onsubmit = e => {
    e.preventDefault()
    let newFilters = new URLSearchParams(document.location.search)
    newFilters.set(e.target.filter_key.value, e.target.filter_value.value)
    window.location = './?' + newFilters.toString()
}

let removeFilter = filter => {
    let newFilters = new URLSearchParams(document.location.search)
    newFilters.delete(filter)
    window.location = './' + (newFilters.size ? '?' + newFilters.toString() : '')
}
