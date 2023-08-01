const params = new URLSearchParams(location.search)
const asin = params.get("asin")

console.log(asin)

const printBookDetails = (asin) => {
    fetch("https://striveschool-api.herokuapp.com/books/"+asin)
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data);
            const bookDetails = document.getElementById("book-details")

            bookDetails.innerHTML = `<div class="card mb-3" style="max-width: 540px;">
                                        <div class="row g-0">
                                            <div class="col-md-4">
                                                <img src="${data.img}" class="img-fluid rounded-start" alt="...">
                                            </div>
                                            <div class="col-md-8 card-body">
                                                <h5 class="card-title">${data.title}</h5>
                                                <div class="book-info">
                                                    <p class="card-text"><span class="bold-text">Category:</span> ${data.category}</p>
                                                    <p class="card-text"><span class="bold-text">Price:</span> ${data.price} €</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
        })
        .catch(error => console.log("Si è verificato un errore!"))
    }


printBookDetails(asin)
