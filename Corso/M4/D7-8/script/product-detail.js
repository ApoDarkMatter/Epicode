//Dischiarazioni costanti elementi HRML e query da URL
const apiUrl = "https://striveschool-api.herokuapp.com/api/"

const main = document.getElementById('main-product');

const params = new URLSearchParams(location.search)
const id = params.get("id")

//Funzione per fetch GET singolo prodotto
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

//Funzione per stampa del singolo prodotto nel DOM
const printFormProduct = (product) => {
    //decodifica stringhe per gestione caratteri speciali
    const name = decodeURIComponent(product.name)
    const description = decodeURIComponent(product.description)
    const brand = decodeURIComponent(product.brand)
    const imageUrl = decodeURIComponent(product.imageUrl)
    const price = decodeURIComponent(product.price)
    const id = decodeURIComponent(product._id)
    main.innerHTML = `
                    <div class="row g-0">
                        <div class="col-md-4">
                        <img src="${imageUrl}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h1 class="card-title">${brand} - ${name}</h1>
                                <p class="card-text price-text"><small class="text-body-secondary"><span class="price-text">Price:</span> ${price} €</small></p>
                                <p class="description-title">Description</p>
                                <p class="card-text">${description}</p>
                                </div>
                        </div>
                    </div>
                    `
};

//Richiamo della funzione di fetch e stampa
fetchOneProduct(id)