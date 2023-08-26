//Dichiarazioni costanti
const apiUrl = "https://striveschool-api.herokuapp.com/api/"

//Funzione per fetch GET di tutti i prodotti
async function fetchProducts() {
    try {
      const response = await fetch(`${apiUrl}product/`, {
        headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ZjUzZmRmZmI4YjAwMTQ0MTNkMzUiLCJpYXQiOjE2OTI3MjY1OTIsImV4cCI6MTY5MzkzNjE5Mn0.Rv-6TAE7YE7A5tkUA8TnwiK8eQ6Gt70j2AuLUMsJdVs"
        }
        })
        const productData = await response.json()
        console.log(productData)
        printProduct(productData)
    } catch (error) {
      console.log('Errore recupero dati prodotti: ', error);
    }
}


//Funzione per stampa nel DOM dei risultati del fetch GET
const printProduct = (allProducts) => {
  const productList = document.getElementById("productsList")
  productList.innerHTML = ''

  allProducts.forEach(element => {
    //decodifica stringhe per gestione caratteri speciali
    const name = decodeURIComponent(element.name)
    const description = decodeURIComponent(element.description)
    const brand = decodeURIComponent(element.brand)
    const imageUrl = decodeURIComponent(element.imageUrl)
    const price = decodeURIComponent(element.price)
    const id = decodeURIComponent(element._id)

    const row = `
      <div class="card mb-3">
        <img src="${imageUrl}" class="card-img-top" alt="...">
        <div class="card-body">
          <h4 class="card-title">${name}</h4>
          <h5 class="card-title">${brand}</h5>
          <p class="card-text">${description}</p>
          <p class="card-text">${price} €</p>
          <a href="./product.html?id=${id}" class="btn btn-primary">Product page</a>
        </div>
      </div>
    `
    productList.innerHTML += row
  });
}

//Richiamo funzione fetch e stampa su DOM
fetchProducts()