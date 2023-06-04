const BACKEND = 'http://localhost:5000'

const getContacts = async (page, size) =>
    fetch(`${BACKEND}/contacts?page=${page}&size=${size}`)

const getContactById = async id => fetch(`${BACKEND}/contacts/${id}`)

const getPages = async size => fetch(`${BACKEND}/contacts/pages?size=${size}`)

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
    getPages,
    postContact,
    deleteContact,
    getContactById,
    getStates,
    getCities,
}
