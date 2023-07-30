window.onload = () => {
    printBooks()
}
const printBooks = () => {
    fetch("https://striveschool-api.herokuapp.com/books")
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data)
            let bookList = document.getElementById("book-list")
            bookList.innerHTML = data
            .map((book) => {
                return `<div class="card" style="width: 15rem;">
                            <img src="${book.img}" class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">Category: ${book.category}</p>
                            <p class="card-text">Price: ${book.price}</p>
                            <button class="btn btn-primary" onclick="addToCart('${book.img}','${book.title}','${book.price}','${book.asin}')">Add to cart</button>
                            </div>
                        </div>`
            })
            .join("")
        })
        .catch(error => console.log("Si è verificato un errore!"))
}

const addToCart = (image,title,price,asin) => {
    const cartList = document.getElementById("cart")
    let book = {
        bookImage: `${image}`,
        bookTitle: `${title}`,
        bookPrice: `${price}`,
        bookAsin: `${asin}`,
    }
    let html = `<div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${book.bookImage}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${book.bookTitle}</h5>
                                <p class="card-text">Price: ${book.bookPrice}</p>
                                <button class="btn btn-danger" onclick="removeFromCart(${book.bookAsin})">Remove from cart</button>
                            </div>
                        </div>
                    </div>
                </div>`
    cartList.insertAdjacentHTML('beforeend', html)

    const numCart = document.getElementById("num-cart")
    let nCart = numCart.innerHTML
    nCart++
    numCart.innerHTML = nCart
}

const removeFromCart = () => {
    


    const numCart = document.getElementById("num-cart")
    let nCart = numCart.innerHTML
    nCart--
    numCart.innerHTML = nCart
}

const seeCart = () => {
    const cartBtn = document.getElementById("cart")
    if (cartBtn.style.display === "none") {
        cartBtn.style.display = "flex"
    } else {
        cartBtn.style.display = "none"
    }
}
