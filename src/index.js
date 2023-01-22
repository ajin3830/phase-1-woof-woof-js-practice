// document.addEventListener('DOMContentLoaded', () => {
//     getPups()
// })
// do ^ this 
// OR just domcontentload the entire code from top to bottom
// OR add space defer at the end of
//  <script type="text/javascript" src="src/index.js"
// OR move the entire script tag to 
// before or after the closing </body> tag

let allDogs = []

function getPups() {
    fetch(`http://localhost:3000/pups`)
    // make it a habit to use `` for fetch URL
    .then(response => response.json())
    .then(data => {
        data.forEach(allPups)
        allDogs = data
    })
}

getPups()

// function removeDogImg (parent) {
//     console.log(parent)
//     while (parent.firstChild) {
//         parent.removeChild(parent.firstChild)
//     }
// }

const dogInfo = document.querySelector("#dog-info")
const dogBar =  document.querySelector("#dog-bar")
const dogFilter = document.querySelector("#good-dog-filter")

function onePup (pup) {  
    dogInfo.innerHTML = ''
    // ^remember this
    const img = document.createElement('img')
    img.src = pup.image

    const h2 = document.createElement('h2')
    h2.textContent = pup.name

    const button = document.createElement('button')
    button.textContent =  pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!'
    // pup is parameter
    // isGoodDog is a key of object pups
    // dot notation here is to access the value of the key
    // yellow
    button.addEventListener('click', () => {
        handlePatch(!pup.isGoodDog, pup)
    })
        // ^set handlePatch to have 2 parameters here
    document.querySelector("#dog-info").append(img, h2, button)
}

function allPups (pup) {

        const span = document.createElement('span')
        span.id = 'pup-name'
        span.textContent = pup.name

        span.addEventListener('click', () => {
            // removeDogImg (dogInfo) 
            // ^ calling this funciton here 
            // does same thing as dogInfo.innerHTML = ''
            onePup(pup)
        })
        dogBar.appendChild(span)
}

function handlePatch(dogStatus, pup) {
// ^pup is a placeholder that stores the data from fetch
    fetch(`http://localhost:3000/pups/${pup.id}` , {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'},
        body: JSON.stringify({
            isGoodDog: dogStatus
    })
    // ^this will modify db.json!!
})
    .then(response => response.json())
    .then(data => onePup(data))
}



let toggle = true;

dogFilter.addEventListener('click', () => {
    toggle = !toggle; 
    // ^ write this before if statement b/c when you have it after if statement
    // the very first time you click it would remain OFF because it's true
    
    if (toggle === true) {
        dogFilter.textContent = 'Filter good dogs: OFF'
    } else {
        dogFilter.textContent = 'Filter good dogs: ON'

        function goodDogs(dogs) {
            console.log(dogs)
            const filtered = dogs.filter(pup => pup.isGoodDog === true)
            // console.log(filtered)
            dogBar.textContent = ''

            filtered.forEach(dog => {
                const span = document.createElement('span')
                span.id = 'pup-name'
                span.textContent = dog.name
                
                dogBar.appendChild(span)
            })
    
        }
        goodDogs(allDogs)

    }
    // console.log(toggle)
    
})


