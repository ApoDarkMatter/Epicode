const apiUrl = "https://striveschool-api.herokuapp.com/api/"

const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const brandInput = document.getElementById('brand');
const imageUrlInput = document.getElementById('imageUrl');
const priceInput = document.getElementById('price');

const form = document.getElementById("product-form")
const button = document.getElementById("buttonSubmit")

const container = document.getElementById("main-container")

const title = document.getElementById("titleAddModify")
const params = new URLSearchParams(location.search)
const id = params.get("id")

form.addEventListener('submit', async (event) => {

  event.preventDefault();

  const product = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: imageUrlInput.value,
    price: priceInput.value
  }

  let URL = ""
  let method = ""
 
  if(id !== null && id !== "add") {
    URL = apiUrl+"product/"+id
    method = "PUT"
  } else {
    URL = apiUrl+"product/"
    method = "POST"
  }

  try {
    const response = await fetch(URL, {
      method: method,
      body: JSON.stringify(product),
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ZjUzZmRmZmI4YjAwMTQ0MTNkMzUiLCJpYXQiOjE2OTI3MjY1OTIsImV4cCI6MTY5MzkzNjE5Mn0.Rv-6TAE7YE7A5tkUA8TnwiK8eQ6Gt70j2AuLUMsJdVs",
        "Content-type": "application/json; charset=UTF-8"
      }
    })

    if (response.ok) {
      window.location.href = 'backoffice.html'
    }
  } catch (error) {
    console.log('Errore durante il salvataggio: ', error);
    alert('Si è verificato un errore durante il salvataggio.')
  }
})

async function fetchOneProduct(id) {
  try {
    const response = await fetch(`${apiUrl}product/${id}`, {
      headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ZjUzZmRmZmI4YjAwMTQ0MTNkMzUiLCJpYXQiOjE2OTI3MjY1OTIsImV4cCI6MTY5MzkzNjE5Mn0.Rv-6TAE7YE7A5tkUA8TnwiK8eQ6Gt70j2AuLUMsJdVs"
      }
      })
      const productData = await response.json()
      console.log(productData)
      printFormProduct(productData)
  } catch (error) {
    console.log('Errore recupero dati prodotti: ', error);
  }
}

const printFormProduct = (product) => {
  nameInput.value = product.name
  descriptionInput.value = product.description
  brandInput.value = product.brand
  imageUrlInput.value = product.imageUrl
  priceInput.value = product.price
};

if(id != null && id != "add") {
  title.innerHTML = "Modify Product"
  button.innerHTML = "Modify"
  fetchOneProduct(id)
}

if(id == null) {
  form.classList.add("d-none")
  fetchProducts()
}

async function fetchProducts() {
  try {
    const response = await fetch(`${apiUrl}product/`, {
      headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ZjUzZmRmZmI4YjAwMTQ0MTNkMzUiLCJpYXQiOjE2OTI3MjY1OTIsImV4cCI6MTY5MzkzNjE5Mn0.Rv-6TAE7YE7A5tkUA8TnwiK8eQ6Gt70j2AuLUMsJdVs"
      }
      })
      const productData = await response.json()
      printProduct(productData)
  } catch (error) {
    console.log('Errore recupero dati prodotti: ', error);
  }
}

const printProduct = (allProducts) => {
  let tableHtml = ``
  tableHtml = `
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Options</th>
                  </tr>
                </thead>
              <tbody>
              `
  
  allProducts.forEach(element => {
    const row = `
                <tr>
                  <th scope="row"><img src="${element.imageUrl}" class="imgbackoffice"></th>
                  <td>${element.name}</td>
                  <td>${element.price} €</td>
                  <td><a class="btn btn-primary" href="./backoffice.html?id=${element._id}" role="button"><ion-icon name="pencil-outline"></ion-icon></a> <button type="button" class="btn btn-danger" onClick="deleteProduct('${element._id}')"><ion-icon name="trash-outline"></ion-icon></button></td>
                </tr>
                `
    tableHtml += row
    
});
  tableHtml += `
      </tbody>
    </table>
  `
  container.innerHTML = tableHtml
}

async function deleteProduct(id) {
  if (confirm('Sei sicuro di voler eliminare questo prodotto?')) {
    try {
      const response = await fetch(`${apiUrl}product/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ZjUzZmRmZmI4YjAwMTQ0MTNkMzUiLCJpYXQiOjE2OTI3MjY1OTIsImV4cCI6MTY5MzkzNjE5Mn0.Rv-6TAE7YE7A5tkUA8TnwiK8eQ6Gt70j2AuLUMsJdVs"
        }
      })
  
      if (response.ok) {
        window.location.href = 'backoffice.html'
      }
    } catch (error) {
      console.log('Errore durante eliminazione prodotto: ', error);
      alert('Si è verificato un errore durante eliminazione.')
    }
  }
}