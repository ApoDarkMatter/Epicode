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
    main.innerHTML = `
                    <div class="row g-0">
                        <div class="col-md-4">
                        <img src="${product.imageUrl}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h1 class="card-title">${product.name}</h1>
                                <p class="card-text price-text"><small class="text-body-secondary"><span class="price-text">Price:</span> ${product.price} €</small></p>
                                <p class="description-title">Description</p>
                                <p class="card-text">${product.description}</p>
                                </div>
                        </div>
                    </div>  
                    `
};

//Richiamo della funzione di fetch e stampa
fetchOneProduct(id)