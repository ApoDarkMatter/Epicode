const apiUrl = "https://striveschool-api.herokuapp.com/api/"

const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const brandInput = document.getElementById('brand');
const imageUrlInput = document.getElementById('imageUrl');
const priceInput = document.getElementById('price');

const form = document.getElementById("product-form")

form.addEventListener('submit', async (event) => {

  event.preventDefault();

  const product = {
      name: nameInput.value,
      description: descriptionInput.value,
      brand: brandInput.value,
      imageUrl: imageUrlInput.value,
      price: priceInput.value
    }
  
    try {
      const response = await fetch(`${apiUrl}product/`, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ZjUzZmRmZmI4YjAwMTQ0MTNkMzUiLCJpYXQiOjE2OTI3MjY1OTIsImV4cCI6MTY5MzkzNjE5Mn0.Rv-6TAE7YE7A5tkUA8TnwiK8eQ6Gt70j2AuLUMsJdVs",
          "Content-type": "application/json; charset=UTF-8"
        }
      })
  
      if (response.ok) {
        window.location.href = 'index.html'
      } else {
        //alert('Si è verificato un errore durante la creazione del prodotto.')
      }
    } catch (error) {
      console.log('Errore durante il salvataggio: ', error);
      alert('Si è verificato un errore durante il salvataggio.')
    }
})

const title = document.getElementById("titleAddModify")
const params = new URLSearchParams(location.search)
const id = params.get("id")
console.log(id);

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

if(id != null) {
  title.innerHTML = "Modify Product"
  fetchOneProduct(id)
}