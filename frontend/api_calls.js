const BACKEND = `http://${window.location.hostname}:5000`

const getContacts = async (page, size, filters) => {
    return fetch(
        `${BACKEND}/contacts?page=${page}&size=${size}&` +
            new URLSearchParams(filters)
    )
}

const getContactById = async id => fetch(`${BACKEND}/contacts/${id}`)

const postContact = async formData =>
    fetch(`${BACKEND}/contacts`, {
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'post',
    })

const deleteContact = async id =>
    fetch(`${BACKEND}/contacts?id=${id}`, {
        method: 'delete',
    })

const getStates = async () => fetch(`${BACKEND}/states`)

const getCities = async () => fetch(`${BACKEND}/cities`)

export {
    getContacts,
    postContact,
    deleteContact,
    getContactById,
    getStates,
    getCities,
}
