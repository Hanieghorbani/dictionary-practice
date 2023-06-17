// `https://api.dictionaryapi.dev/api/v2/entries/en/<word>`
const container = document.querySelector(".container")
const userInput = document.querySelector(".userInput")
const searchBtn = document.querySelector(".searchBtn")
const fas = document.querySelector(".fas")
const title = document.querySelector(".title")
const pronun = document.querySelector(".pronun")
const desc = document.querySelector(".desc")

userInput.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    translate()
  }
})
searchBtn.addEventListener("click", () => {
  translate()
})

function translate() {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${userInput.value}`)
    .then((res) => res.json())
    .then((data) => {
      container.classList.add("active")
      generate(data)
      console.log(data)
      // console.log(data[0].phonetics[1].text)
    })
    .catch((err) => {
      desc.innerText = `Sorry pal, we couldn't find definitions
     for the word you were looking for.You can try the search again 
     at later time or head to the web instead.`
      title.innerText = userInput.value
      pronun.innerText = "__ / __"
      desc.style.color = "rgb(206, 26, 26)"
      userInput.value = ""
      userInput.focus()
    })
}

function generate(data) {
  desc.style.color = "rgb(48, 48, 48)"
  title.innerText = data[0].word
  let icon = document.createElement("i")
  icon.setAttribute("class", "fas fa-volume")
  title.append(icon)
  pronun.innerText = `${data[0].meanings[0].partOfSpeech}  ${
    data[0].phonetic || data[0].phonetics[1].text
  }`
  desc.innerText = data[0].meanings[0].definitions[0].definition
  icon.addEventListener("click", () => {
    try {
      let voise = new Audio(
        `${
          data[0].phonetics[0].audio ||
          data[0].phonetics[1].audio ||
          data[0].phonetics[2].audio
        }`
      )
      voise.play()
    } catch {
      alert("There is no pronunciation !")
    }
  })

  userInput.value = ""
  userInput.focus()
}
