import { DOLLAR_PRICE } from "../services/dollarPrice.js"
import { NEWS } from "../services/news.js"
import { COMMENTS } from "../services/comments.js"

const formatter = (number) => {
  const price = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(number)
  return price
}

const dollarBarContainer = document.querySelector(".dollarBar__container")

const dollars = DOLLAR_PRICE.map((dollar) => {
  return `
    <div class="dollarInfo">
       <i class="${dollar.variant} fa-solid fa-play"></i>
       <h3>Dólar ${dollar.name} <span>${formatter(dollar.price)}</span></h3>
    </div>
    `
})

dollarBarContainer.innerHTML = dollars.join("")
