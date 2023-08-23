const apiUrl = "https://striveschool-api.herokuapp.com/api/"

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



const printProduct = (allProducts) => {
  const productList = document.getElementById("productsList")
  productList.innerHTML = ''

  allProducts.forEach(element => {
    const row = `
        <div class="card mb-3">
        <img src="${element.imageUrl}" class="card-img-top" alt="...">
        <div class="card-body">
          <h4 class="card-title">${element.brand}</h4>
          <h5 class="card-title">${element.name}</h5>
          <p class="card-text">${element.description}</p>
          <p class="card-text">${element.price} €</p>
          <a href="./add-modify-products.html?id=${element._id}" class="btn btn-primary">Product page</a>
        </div>
      </div>
    `
    productList.innerHTML += row
  });
}

fetchProducts()