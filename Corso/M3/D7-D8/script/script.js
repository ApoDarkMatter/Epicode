function leftScroll(idCard) {
    const left = document.getElementById(idCard);
    left.scrollBy(-200, 0);
}
function rightScroll(idCard) {
    const right = document.getElementById(idCard);
    right.scrollBy(200, 0);
}

document.addEventListener('scroll', () => {
    let vertical = window.scrollY

    const rowList = document.querySelectorAll("div.row-film")

    if (vertical > 0 && vertical < 150) {
        rowList[0].classList.remove("not-in-center")
        rowList[1].classList.add("not-in-center")
        rowList[2].classList.add("not-in-center")
    }
    if (vertical > 150 && vertical < 300) {
        rowList[0].classList.add("not-in-center")
        rowList[1].classList.remove("not-in-center")
        rowList[2].classList.add("not-in-center")
    } 
    if (vertical > 300) {
        rowList[0].classList.add("not-in-center")
        rowList[1].classList.add("not-in-center")
        rowList[2].classList.remove("not-in-center")
    }
})