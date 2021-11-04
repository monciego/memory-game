const main = document.querySelector("main");
const livesCount = document.getElementById("livesCount");

let originalLives = 10;
let playerLives = 10;

livesCount.textContent = playerLives;

const cardData = () => [
  {
    name: "aurora",
    img: "./images/aurora.jpg",
    id: 1,
  },
  {
    name: "aurora",
    img: "./images/aurora.jpg",
    id: 2,
  },
  {
    name: "beach",
    img: "./images/beach.jpg",
    id: 3,
  },
  {
    name: "beach",
    img: "./images/beach.jpg",
    id: 4,
  },
  {
    name: "falls",
    img: "./images/falls.jpg",
    id: 5,
  },
  {
    name: "falls",
    img: "./images/falls.jpg",
    id: 6,
  },
  {
    name: "forest",
    img: "./images/forest.jpg",
    id: 7,
  },
  {
    name: "forest",
    img: "./images/forest.jpg",
    id: 8,
  },
  {
    name: "lake",
    img: "./images/lake.jpg",
    id: 9,
  },
  {
    name: "lake",
    img: "./images/lake.jpg",
    id: 10,
  },
  {
    name: "mountain",
    img: "./images/mountain.jpg",
    id: 11,
  },
  {
    name: "mountain",
    img: "./images/mountain.jpg",
    id: 12,
  },
  {
    name: "ocean",
    img: "./images/ocean.jpg",
    id: 13,
  },
  {
    name: "ocean",
    img: "./images/ocean.jpg",
    id: 14,
  },
  {
    name: "snow",
    img: "./images/snow.jpg",
    id: 15,
  },
  {
    name: "snow",
    img: "./images/snow.jpg",
    id: 16,
  },
];

// randomize

const randomCard = () => {
  const cards = cardData();
  cards.sort(() => Math.random() - 0.5);
  return cards;
};

// generate card
const generateCards = () => {
  const cards = randomCard();

  // create html elements
  cards.forEach((cardItem) => {
    const card = document.createElement("div"); // card
    const front = document.createElement("img");
    const back = document.createElement("div");

    // add classes
    card.setAttribute("class", "card");
    front.setAttribute("class", "front");
    back.setAttribute("class", "back");

    // attach images
    front.src = cardItem.img;
    card.setAttribute("name", cardItem.name);
    // append to main element
    main.appendChild(card);
    // append to cards
    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      matched(e);
    });
  });
};

// if matched

const matched = (e) => {
  const clicked = e.target;
  clicked.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      flippedCards.forEach((flippedCard) => {
        flippedCard.classList.remove("flipped");
        flippedCard.style.pointerEvents = "none";
        flippedCard.style.border = "4px solid lightgreen";
      });
    } else {
      console.log("wrong");
      flippedCards.forEach((flippedCard) => {
        flippedCard.classList.remove("flipped");
        setTimeout(() => {
          flippedCard.classList.remove("toggleCard");
        }, 700);
      });
      playerLives--;
      livesCount.textContent = playerLives;
      if (playerLives === 0) {
        restart("TRY AGAIN!❌");
      }
    }
  }
  if (toggleCard.length === 16) {
    restart("YOU WON");
  }
};

// restart

const restart = (text) => {
  // reset flipped
  let cardsRandomed = randomCard();
  let front = document.querySelectorAll(".front");
  let cards = document.querySelectorAll(".card");
  main.style.pointerEvents = "none";
  cardsRandomed.forEach((cardRandomed, index) => {
    cards[index].classList.remove("toggleCard");

    setTimeout(() => {
      // reset styles
      cards[index].style.pointerEvents = "all";
      // randomize again
      front[index].src = cardRandomed.img;
      // update name
      cards[index].setAttribute("name", cardRandomed.name);
      main.style.pointerEvents = "all";
    }, 1000);
    cards[index].style.border = "none";
  });
  // reset lives
  playerLives = originalLives;
  livesCount.textContent = playerLives;
  setTimeout(() => {
    window.alert(text), 1000;
  });
};

generateCards();
