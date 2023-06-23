import { displayGrid } from "./grid.js";
import { onListChange } from "./checkboxes.js";

const select = document.querySelector('.form-select');

select.addEventListener('change', () => {
    onSelect()
})

function orderList() {
    if (select.value === 'Trier par') return

    let asc = select.value.includes('asc')
    let criteria = select.value.split(' ')

    let result = 1
    if (!asc) {
        result = -1
    }

    window.data.sort((a, b) => {
        let propertyA, propertyB

        if (criteria.includes('price')) {
            propertyA = a.price
            propertyB = b.price
        } else {
            propertyA = a.rating.rate
            propertyB = b.rating.rate
        }
        if (propertyA < propertyB) {
            return -result;
        } else if (propertyA > propertyB) {
            return result;
        } else {
            return 0;
        }
    });
}

function onSelect() {
    let categories = onListChange()
    displayGrid(categories)
}

export { orderList }