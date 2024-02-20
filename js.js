let level = localStorage.getItem("level");
console.log(level);
const playArea = document.querySelector(".play-area"),
  sections = playArea.querySelectorAll(".play-area section");
let squares = [];
sections.forEach((sects) => {
  const spans = sects.querySelectorAll(".play-area section span");
  squares.push(Array.from(spans));
});
let moveCount = 0;
function changePositions() {
  fetch("positions.json")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < sections.length; i++) {
        for (let j = 0; j < sections.length; j++) {
          squares[i][j].dataset.active = data[level][i][j];
        }
      }
    });
}
function resetAllSqrs() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      squares[i][j].dataset.active = "false";
      squares[i][j].style.background = "#df4484";
    }
  }
}
function startGame() {
  document.querySelector(".bottom-info button").classList.add("disabled");
  document.querySelector(".bottom-info .level-info h1").innerHTML = level;
  document.querySelector(".bottom-res .result-levels span").innerHTML = level;
  document.querySelector(".bottom-info").classList.remove("hide");
  document.querySelector(".bottom-res").classList.add("hide");
  document.querySelector(".bottom-info .moves-info h1").innerHTML = 0;
  moveCount = 0;
  playArea.style.pointerEvents = "all";
  changePositions();
  setTimeout(() => {
    colorChange();
  }, 100);
}
startGame();
function checkIfWin() {
  for (let i = 0; i < sections.length; i++) {
    for (let j = 0; j < sections.length; j++) {
      if (squares[i][j].dataset.active === "true") {
        return false;
        break;
      }
    }
  }
  return true;
}
setTimeout(() => {
  colorChange();
}, 10);
function colorChange() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const isActive = squares[i][j].getAttribute("data-active") === "true";
      if (isActive) {
        squares[i][j].style.background =
          "linear-gradient(145deg,#fffdfe,#f4c7d9)";
        squares[i][j].style.transform = "scale(1.08)";
      } else {
        squares[i][j].style.background = "#df4484";
        squares[i][j].style.transform = "translateZ(0) scale(1)";
      }
    }
  }
}

document.querySelectorAll(".options a").forEach((element) => {
  element.addEventListener("mouseover", () => {
    document.querySelectorAll(".options a").forEach((ele) => {
      ele.classList.remove("active");
    });
    element.classList.add("active");
    console.log(1);
  });
});
document.querySelector(".options").addEventListener("mouseout", () => {
  document.querySelectorAll(".options a").forEach((ele) => {
    ele.classList.remove("active");
  });
  document.querySelector(".options .play-link").classList.add("active");
});

document.querySelector(".next-level").addEventListener("click", () => {
  startGame();
});
document.querySelector(".bottom-info button").addEventListener("click", () => {
  startGame();
});
playArea.addEventListener("click", (e) => {
  document.querySelector(".bottom-info button").classList.remove("disabled");
  if (e.target.dataset.active === "true") {
    e.target.dataset.active = "false";
    document.querySelector(".bottom-info .moves-info h1").innerHTML =
      ++moveCount;
  } else if (e.target.dataset.active === "false") {
    e.target.dataset.active = "true";
    document.querySelector(".bottom-info .moves-info h1").innerHTML =
      ++moveCount;
  }
  let x, y;
  for (let i = 0; i < sections.length; i++) {
    for (let j = 0; j < sections.length; j++) {
      if (e.target == squares[i][j]) {
        x = j;
        y = i;
        break;
      }
    }
  }
  if (x + 1 < 5) {
    if (squares[y][x + 1].dataset.active === "true") {
      squares[y][x + 1].dataset.active = "false";
    } else {
      squares[y][x + 1].dataset.active = "true";
    }
  }
  if (y + 1 < 5) {
    if (squares[y + 1][x].dataset.active === "true") {
      squares[y + 1][x].dataset.active = "false";
    } else {
      squares[y + 1][x].dataset.active = "true";
    }
  }
  if (x - 1 >= 0) {
    if (squares[y][x - 1].dataset.active === "true") {
      squares[y][x - 1].dataset.active = "false";
    } else {
      squares[y][x - 1].dataset.active = "true";
    }
  }
  if (y - 1 >= 0) {
    if (squares[y - 1][x].dataset.active === "true") {
      squares[y - 1][x].dataset.active = "false";
    } else {
      squares[y - 1][x].dataset.active = "true";
    }
  }
  setTimeout(() => {
    if (checkIfWin()) {
      document.querySelector(".bottom-info").classList.add("hide");
      document.querySelector(".bottom-res").classList.remove("hide");
      document.querySelector(".bottom-res .result-moves span").innerHTML =
      moveCount;
      playArea.style.pointerEvents = "none";
      if (level == 51) {
        document.querySelector(".bottom-res .next-level").disabled = true;
        document.querySelector(".bottom-res .next-level").style.background =
        "#fcecf2b9";
      }
      let index = 0,
      ind = index - 1;
      let inter = setInterval(() => {
        for (let x = 0; x < 5; x++) {
          squares[index][x].style.background =
          "linear-gradient(145deg,#fffdfe,#f4c7d9)";
        }
        index++;
        setTimeout(() => {
          ind++;
          for (let x = 0; x < 5; x++) {
            squares[ind][x].style.background = "#df4484";
          }
        }, 100);
        if (index == 5) {
          clearInterval(inter);
        }
      }, 100);
      localStorage.setItem("level", parseInt(++level));
    }
  }, 10);
  colorChange();
});
