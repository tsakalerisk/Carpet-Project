const FieldNames = {
    firstName: 'First name',
    lastName: 'Last name',
    streetAddress: 'Street address',
    cityName: 'City',
    stateName: 'State',
    zipCode: 'ZIP code',
    phoneNumber: 'Phone number',
    emailAddress: 'Email'
}

const URL_PARAMS = new URLSearchParams(document.location.search)

let filters = Object.fromEntries(
    [...URL_PARAMS.entries()].filter(
        ([key, _]) => !['page', 'size', 'sort'].includes(key)
    )
)

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
    URL_PARAMS.set('page', 0)
    URL_PARAMS.set(e.target.filter_key.value, e.target.filter_value.value)
    location.href = 'http://' + location.host + '?' + URL_PARAMS
}

let removeFilter = filter => {
    URL_PARAMS.set('page', 0)
    URL_PARAMS.delete(filter)
    location.href = 'http://' + location.host + '?' + URL_PARAMS
}

//Global scope
window.removeFilter = removeFilter

export { filters }