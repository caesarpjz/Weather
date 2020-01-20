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
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'abc'

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading......'
    messageTwo.textContent = '' // to remove previous results
    fetch('http://localhost:3000/weather?address=' + location)
    .then((response) => {
        response.json()
        .then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                console.log(data)
                console.log(data.forecast.summary)
                console.log(data.hourDescription)
                messageOne.textContent = data.forecast.summary
                messageTwo.textContent = data.forecast.temperature
            }
            
        })
        .catch(error => console.log(error))
    })
})
