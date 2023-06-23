import { fetchData } from "./fetchAPI.js";
import { displayGrid } from "./grid.js";

init()

async function init() {
    window.data = await fetchData()
    displayGrid()
}