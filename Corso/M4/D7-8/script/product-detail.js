const apiUrl = "https://striveschool-api.herokuapp.com/api/"

const main = document.getElementById('main-product');

const params = new URLSearchParams(location.search)
const id = params.get("id")

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
    main.innerHTML = `
                    <div class="row g-0">
                        <div class="col-md-4">
                        <img src="${product.imageUrl}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${product.description}</p>
                                <p class="card-text"><small class="text-body-secondary">${product.price}</small></p>
                            </div>
                        </div>
                    </div>  
                    `
};

fetchOneProduct(id)