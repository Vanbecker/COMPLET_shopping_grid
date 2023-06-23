const container = document.querySelector('.row')
const checks = document.querySelectorAll('.btn-check')
const select = document.querySelector('.form-select')

let categories = []
let data = []

checks.forEach((check) => {
    check.addEventListener('change', onCheckChange)
})

select.addEventListener('change', onSelect)

// Next step : déclarer les listeners sur les checkboxes
// afficher à chaque click de checkbox, la valeur de la checkbox

fetchData();

async function fetchData() {
    try {
        const response = await fetch(`https://fakestoreapi.com/products`)

        if (!response.ok) {
            throw new Error(`Erreur: ${response.status}`)
        }

        data = await response.json()
        displayData()
    }
    catch (error) {
        console.log(error)
    }
}

function displayData() {
    container.innerHTML = ''
    data.forEach((el) => {
        // Ajoutons une condition , si categories est vide, j'affiche tous les items
        if (categories.includes(el.category) || categories.length === 0) {
            const item = document.createElement('div')
            item.className = "col-md-4";
            let rateStars = buildStars(el.rating.rate)
            item.innerHTML = `
                <div class="card p-3 m-1">
                        <div class="d-flex flex-row mb-3"><img class="" src="${el.image}" width="70">
                            <div class="d-flex flex-column ml-2"><div class="custom-margin"><h5>${el.title}</h5><span class="text-black-50">${el.category}</span><div class="ratings mt-1">${rateStars}</div></div></div>
                        </div>
                        <div>${el.description.slice(0, 80)}...</div>
                        <div class="d-flex justify-content-between install mt-3"><h6>${el.price}€</h6><span class="text-primary">View&nbsp;<i class="fa fa-angle-right"></i></span></div>
                    </div>
                </div>
                        `
            container.appendChild(item)
        }
    })
}

function buildStars(rate) {
    let result = ''
    for (let i = 0; i < Math.round(rate); i++) {
        result += `<i class="fa-solid fa-star"></i>`
    }

    for (let i = 0; i < 5 - Math.round(rate); i++) {
        result += `<i class="fa-regular fa-star"></i>`
    }

    result += `<span style="padding: 10px">${rate}</span>`

    return result
}

function onCheckChange(e) {
    // logger le tableau 'categories' des catégories sélectionnées
    categories = []
    checks.forEach((check) => {
        if (check.checked) categories.push(check.value)
    })
    displayData()
}

function onSelect(e) {
    let nb
    if (select.value.includes('asc')) {
        nb = 1
    } else {
        nb = -1
    }

    data.sort((a, b) => {
        let propertyA, propertyB
        if (select.value.includes('price')) {
            propertyA = a.price
            propertyB = b.price
        } else {
            propertyA = a.rating.rate
            propertyB = b.rating.rate
        }

        if (propertyA > propertyB) {
            return nb
        } else if (propertyA < propertyB) {
            return -nb
        } else {
            return 0
        }
    })

    displayData()
}