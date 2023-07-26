const searchImage = () => {
    const queryStr = document.getElementById("searchInput")
    console.log(queryStr.value);
    fetch(`https://api.pexels.com/v1/search?query=${queryStr.value}`, {headers: {
        Authorization: `74v9zReuSPS9z1w64thtxIwXUwahBDvcLu8mRsq34UF1ZSYi0bz7cYf0`
        }})
    .then(response => response.json())
    .then(res => {
        let cardDiv = document.getElementById("image-card")
        console.log(i);
        cardDiv.innerHTML = res.photos.map((photo) => {
            return `<div class="card" style="width: 18rem;">
                        <img src="${photo.src.large}" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>` 
            }).join("")
            //console.log(card);
    })
    .catch(error => console.log("Si è verificato un errore!"))
    }
