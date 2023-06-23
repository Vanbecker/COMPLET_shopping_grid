import { displayGrid } from "./grid.js";

const checks = document.querySelectorAll('.btn-check');

checks.forEach((check) => {
    check.addEventListener('change', onListChange)
})

function onListChange() {
    let categories = []
    checks.forEach((check) => {
        if (check.checked) {
            categories.push(check.value)
        }
    })
    displayGrid(categories)
    return categories;
}

export { onListChange }