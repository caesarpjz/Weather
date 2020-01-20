console.log('Client side java script file')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=boston')
//     .then((response) => {
//         response.json()
//         .then((data) => {
//             console.log(data)
//             console.log(data.forecast.summary)
//             console.log(data.hourDescription)
//         })
//         .catch(error => console.log(error))
//     })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageZero = document.querySelector('#message-0')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'abc'

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value
    messageZero.textContent = 'Finding your desired location...'
    messageOne.textContent = ''
    messageTwo.textContent = '' // to remove previous results
    fetch('/weather?address=' + location)
    .then((response) => {
        response.json()
        .then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                console.log(data)
                console.log(data.forecast.summary)
                console.log(data.hourDescription)
                console.log(data.forecast.temperature)
                messageZero.textContent = "Location: " + data.forecast.timezone
                messageOne.textContent = "Summary: " + data.forecast.summary
                messageTwo.textContent = "Temperature: " + data.forecast.temperature
            }
            
        })
        .catch(error => console.log(error))
    })
})
