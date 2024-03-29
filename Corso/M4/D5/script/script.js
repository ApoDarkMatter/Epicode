window.onload = () => {
    printBooks()
}
const printBooks = () => {
    fetch("https://striveschool-api.herokuapp.com/books")
        .then(res => {
            return res.json()
        })
        .then(data => {
            let bookList = document.getElementById("book-list")
            bookList.innerHTML = data
            .map((book) => {
                return `<div class="card" id="b_${book.asin}">
                            <img src="${book.img}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${book.title}</h5>
                                <div class="book-info">
                                    <p class="card-text"><span class="bold-text">Category:</span> ${book.category}</p>
                                    <p class="card-text"><span class="bold-text">Price:</span> ${book.price} €</p>
                                    <button class="btn btn-primary info-btn" onclick="addToCart('${book.img}','${book.title}','${book.price}','${book.asin}')">Add to cart</button>
                                    <button class="btn btn-danger info-btn" onclick="delProduct('b_${book.asin}')">Delete this product</button>
                                    <a href="product-page.html?asin=${book.asin}" class="btn btn-primary addBtn">Go to product page</a>
                                </div>
                            </div>
                        </div>`
            })
            .join("")
        })
        .catch(error => console.log("Si è verificato un errore!"))
}

const addToCart = (image,title,price,asin) => {
    
    const cartList = document.getElementById("cartList")
    let book = {
        bookImage: `${image}`,
        bookTitle: `${title}`,
        bookPrice: `${price}`,
        bookAsin: `${asin}`,
    }
    html = `<li class="book-cart-list">
                <img src="${book.bookImage}" class="img-fluid rounded-start" alt="...">
                <h5 class="card-title">${book.bookTitle}</h5>
                <p class="card-text">Price: ${book.bookPrice}</p>
                <button class="btn btn-danger" onclick="removeFromCart()">Remove from cart</button>         
            </li>`
    cartList.insertAdjacentHTML('beforeend', html)

    const numCart = document.getElementById("num-cart")
    let nCart = numCart.innerHTML
    nCart++
    numCart.innerHTML = nCart

    document.getElementById("remove-all").style.display = "block"
}

const removeFromCart = () => {
    event.target.closest("li").remove()

    const numCart = document.getElementById("num-cart")
    let nCart = numCart.innerHTML
    nCart--
    numCart.innerHTML = nCart

    if (nCart == 0) {
        document.getElementById("cart").style.display = "none"
        document.getElementById("remove-all").style.display = "none"
    }
}

const removeAllFromCart = () => {
    const remAll = document.getElementById("cartList")
    remAll.innerHTML = ""

    const numCart = document.getElementById("num-cart")
    let nCart = numCart.innerHTML
    nCart = 0
    numCart.innerHTML = nCart

    document.getElementById("cart").style.display = "none"
    document.getElementById("remove-all").style.display = "none"
}

const seeCart = () => {
    const cartBtn = document.getElementById("cart")
    if (cartBtn.style.display === "flex") {
        cartBtn.style.display = "none"
    } else {
        cartBtn.style.display = "flex"
    }
}


const search = (text) => {
    let allTitles = document.querySelectorAll(".card")

    allTitles.forEach((title) => { 
        if (!title.innerText.toLowerCase().includes(text)) {
            title.style.display = "none"
        } else {
            title.style.display = "block"
        }
    })
}

const delProduct = (asin) => {
    const book = document.getElementById(asin)
    console.log(book)
    book.remove()
}

let timeout;
const inputText = document.getElementById("search-input")
inputText.addEventListener('input', () => {
  clearTimeout(timeout);
  
  timeout = setTimeout(() => {
    if(inputText.value.length >= 3) {
      search(inputText.value.toLowerCase())
    } else {
        printBooks()
    }
  }, 500);
});
