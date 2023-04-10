import mockData from './MOCK_DATA.json' assert {type: 'json'}

let table = document.querySelector('#contacts')

let updateTable = data => {
    let headers = `
        <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Street address</th>
            <th>City</th>
            <th>State</th>
            <th>ZIP code</th>
            <th>Phone number</th>
            <th>Email</th>
        </tr>
    `
    let contactToRow = x => `
        <tr>
            <td>${x.first_name}</td>
            <td>${x.last_name}</td>
            <td>${x.street_address}</td>
            <td>${x.city}</td>
            <td>${x.state}</td>
            <td>${x.zip_code}</td>
            <td>${x.phone_number}</td>
            <td>${x.email}</td>
        </tr>
    `
    table.innerHTML = headers + data.map(contactToRow).join('')
}

updateTable(mockData.slice(0, 20))

let filterText = document.querySelector('#filter')
filterText.oninput = e => {
    updateTable(
        mockData
            .filter(x => x.first_name.toLowerCase().includes(e.target.value.toLowerCase()))
            .slice(0, 20)
    )
}