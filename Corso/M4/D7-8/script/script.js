const apiUrl = "https://striveschool-api.herokuapp.com/api/"

async function fetchProducts() {
    try {
      const response = await fetch(`${apiUrl}product/`, {
        headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ZjUzZmRmZmI4YjAwMTQ0MTNkMzUiLCJpYXQiOjE2OTI3MjY1OTIsImV4cCI6MTY5MzkzNjE5Mn0.Rv-6TAE7YE7A5tkUA8TnwiK8eQ6Gt70j2AuLUMsJdVs"
        }
        })
        const productData = await response.json()
        console.log(productData);
    } catch (error) {
      console.log('Errore recupero dati prodotti: ', error);
    }
}

fetchProducts()