import { DOLLAR_PRICE } from "../services/dollarPrice.js"
import { NEWS } from "../services/news.js"
import { FEATURED_NEWS } from "../services/featuredNews.js"

const formatter = (number) => {
  const price = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(number)
  return price
}
const dollarBarContainer = document.querySelector(".dollarBar__container")
const featureNewsContainer = document.querySelector(".featureNews__container")
const newsContainer = document.querySelector(".news__container")

// Retiré la búsqueda por input porque no estaba funcionando, ÚNICAMENTE FUNCIONA EN FIREFOX (donde yo trabajo).

// const btnSearch = document.querySelector("#btnSearch")

// btnSearch.addEventListener("click", () => {
//   window.location.reload()
//   window.localStorage.removeItem("categorySelected")
// })

// let input = document.getElementById("inputSearch").value

let categorySelected = parseInt(window.localStorage.getItem("categorySelected"))

let results = []

if (categorySelected > 0 /*&& input.length < 1*/) {
  results = NEWS.filter((_new) => _new.categoryId === categorySelected)
} /*else if (input != "") {
  results = NEWS.filter((_new) =>
    _new.text_content
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .includes(
        input
          .toLocaleLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
      )
  )
}*/ else {
  results = NEWS
}

const dollars = DOLLAR_PRICE.map((dollar) => {
  return `
    <div class="dollarInfo">
       <i class="${dollar.variant} fa-solid fa-play"></i>
       <h3>Dólar ${dollar.name} <span>${formatter(dollar.price)}</span></h3>
    </div>
    `
})

const featured_news = FEATURED_NEWS.map((featured_new) => {
  const inputText = featured_new?.text_content
  const splittedText = inputText.split(".")[0]
  const slicedText = inputText.slice(splittedText.length + 1)
  return `
    <div class="slider">
      <img
        src="${featured_new.cover_image}"
      />
      <div class="text__container"><p><span class="new--title">${splittedText}.</span>${slicedText}</p></div>
    </div>
    `
})

const news = results.map((_new) => {
  const inputText = _new?.text_content
  const splittedText = inputText.split(".")[0]
  const slicedText = inputText.slice(splittedText.length + 1)
  return `
    <div class="news__card">
      <img
        src="${_new.new_cover}"
      />
      <div class="newsCard__content">
      
      <p><span class="new--title">${splittedText}.</span>${slicedText}</p>
      </div>
      <div class="author__content">
        <img src="${_new.profile_image}" />
        <h3>${_new.full_name}</h3>
      </div>
      </div>
    `
})

const msgError = `
    
      <h4 class="error--msg">No hay resultados para su búsqueda</h4>
    
  `

dollarBarContainer.innerHTML = dollars.join("")
featureNewsContainer.innerHTML = featured_news.join("")

if (results.length <= 0) {
  newsContainer.innerHTML = msgError
} else {
  newsContainer.innerHTML = news.join("")
}

var currentSlide = 0
var slides = document.getElementsByClassName("slider")

function showSlide() {
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"
  }
  currentSlide = (currentSlide + 1) % slides.length
  slides[currentSlide].style.display = "block"
}

setInterval(showSlide, 3500)

const btnMenu = document.getElementById("btnMenu")
const sideBar = document.querySelector(".sideBar__container")

function sideBarHandleClick() {
  if (sideBar.style.display === "none") {
    sideBar.style.display = "block"
  } else {
    sideBar.style.display = "none"
  }
}

btnMenu.addEventListener("click", () => {
  sideBarHandleClick()
})

const sideBarItems = document.querySelectorAll(".item")
sideBarItems.forEach((item) => {
  item.addEventListener("click", () => {
    window.localStorage.setItem("categorySelected", item.id)
    window.location.reload()
  })
})
