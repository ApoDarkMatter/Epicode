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
                return `<div class="card" style="width: 15rem;" id="b_${book.asin}">
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
    
    const cartList = document.getElementById("cartList")
    let book = {
        bookImage: `${image}`,
        bookTitle: `${title}`,
        bookPrice: `${price}`,
        bookAsin: `${asin}`,
    }
    html = `<li>
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
}

const removeFromCart = () => {
    event.target.closest("li").remove()

    const numCart = document.getElementById("num-cart")
    let nCart = numCart.innerHTML
    nCart--
    numCart.innerHTML = nCart

    if (nCart == 0) {
        document.getElementById("cart").style.display = "none"
    }

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
