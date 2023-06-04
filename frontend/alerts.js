export const alertSuccess = (message, duration = 1000) => {
    alertDialog(message, 'success', duration)
}

export const alertError = (message, duration = 1000) => {
    alertDialog(message, 'error', duration)
}

const alertDialog = (message, type, duration = 1000) => {
    let alert = document.createElement('div')
    alert.classList.add('alert', type)
    alert.innerHTML = message
    document.body.appendChild(alert)
    setTimeout(() => {
        document.body.removeChild(alert)
    }, duration)
}