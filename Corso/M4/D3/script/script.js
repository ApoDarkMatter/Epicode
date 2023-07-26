const searchImage = () => {
    const queryStr = document.getElementById("searchInput")
    console.log(queryStr.value);
    document.getElementById("image-card").innerHTML = ""
    fetch(`https://api.pexels.com/v1/search?query=${queryStr.value}`, {headers: {
        Authorization: `74v9zReuSPS9z1w64thtxIwXUwahBDvcLu8mRsq34UF1ZSYi0bz7cYf0`
        }})
    .then(res => {
        return res.json()
    })
    .then(data => {
        data.photos.forEach(image => {
            console.log(image.src.large);
            const singleImage = `<div class="card" style="width: 18rem;"><img src="${image.src.large}" class="card-img-top" alt="..."></div>`
            document.getElementById("image-card").insertAdjacentHTML('beforeend', singleImage)
        });
    })
    .catch(error => console.log("Si è verificato un errore!"))
    }



    