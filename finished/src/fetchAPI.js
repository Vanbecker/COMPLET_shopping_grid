async function fetchData() {
    try {
        const response = await fetch(`https://fakestoreapi.com/products`)

        if (!response.ok) {
            throw new Error(`Erreur: ${response.status}`)
        }

        return await response.json()
    }
    catch (error) {
        console.log(error);
    }
}

export { fetchData }
