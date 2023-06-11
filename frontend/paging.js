const CONTACTS_PER_PAGE = 20
const URL_PARAMS = new URLSearchParams(document.location.search)

let current_page = URL_PARAMS.has('page') ? parseInt(URL_PARAMS.get('page')) : 0

const setPage = page => {
    URL_PARAMS.set('page', page)
    location.href = 'http://' + location.host + '?' + URL_PARAMS
}

const updatePages = async totalPages => {
    let paging = document.querySelector('.paging')

    let mapToButton = x => {
        let button = document.createElement('button')
        if (x === current_page + 1) button.classList.add('current')
        button.onclick = () => setPage(x - 1)
        button.disabled = x === current_page + 1
        button.textContent = x
        return button
    }

    let pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    paging.replaceChildren(
        ...pages
            .filter(
                x =>
                    x === 1 ||
                    x === totalPages ||
                    Math.abs(current_page + 1 - x) < 3
            )
            .flatMap((x, i, filtered_pages) =>
                filtered_pages[i + 1] > x + 1
                    ? [mapToButton(x), '. . .']
                    : [mapToButton(x)]
            )
    )
}

export { current_page, CONTACTS_PER_PAGE, setPage, updatePages }
