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

const URL_PARAMS = new URLSearchParams(document.location.search)

let filters = Object.fromEntries(URL_PARAMS)

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
    window.location =
        './' + (newFilters.size ? '?' + newFilters.toString() : '')
}