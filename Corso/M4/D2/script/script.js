const fetchMusic = (query, id) => {
    const section = document.querySelector(`#${id}`)

    const row = document.querySelector(`#${id}Section`)
    console.log(row)
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
        .then((raw) => {
            return raw.json()
        })
        .then((res) => {
            let music = res.data
            section.classList.remove("d-none")
            for (let i = 0; i < music.slice(0, 4).length; i++) {
              const element = music[i]
              row.innerHTML += `<div class='col col-3'> <img class='w-100' src='${element.album.cover_xl}'/> </div>`
            }
        })
        .catch(error => console.log("Si è verificato un errore!"))
    } 

window.onload = () => {
    fetchMusic("eminem", "eminem")
    fetchMusic("queen", "queen")
    fetchMusic("metallica", "metallica")
}