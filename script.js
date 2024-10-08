const container = document.querySelector(".container");
const btn = document.querySelector("button");

let userInput = 64;
let promptInput = "64";

const genNewGrid = () => {
  userInput = parseInt(promptInput, 10);
  for (let i = 0; i < userInput * userInput; i++) {
    const div = document.createElement("div");
    container.appendChild(div);
  }
};

const changeBGColor = () => {
  container.querySelectorAll("div").forEach((div) => {
    div.addEventListener("mouseover", () => {
      const bgColorValue =
        getComputedStyle(div).getPropertyValue("background-color");
      const rgba = bgColorValue.match(/[\d.]+/g);

      if (rgba.length === 4) {
        rgba[3] = Math.min(1, Math.max(0, parseFloat(rgba[3])));

        if (rgba[3] <= 1) {
          rgba[3] += 0.1;
        }

        div.style.backgroundColor = `rgba(0, 0, 0, ${rgba[3]})`;
      }
    });
  });
};

const getUserInput = () => {
  promptInput = prompt("How many squares do you want per side?\n(1-101)", "64");

  while (
    promptInput <= 1 ||
    promptInput > 100 ||
    !/^[0-9]+$/.test(promptInput)
  ) {
    alert("Please enter a number between 1 and 101");
    promptInput = prompt("How many squares do you want per side?", "64");
  }
};

const adjustNewGrid = () => {
  const newFlexBasis = 100 / userInput;
  container.querySelectorAll("div").forEach((div) => {
    div.style.flexBasis = `${newFlexBasis}%`;
  });
};

btn.addEventListener("click", () => {
  getUserInput();
  removeCurrentGrid();
  genNewGrid();
  adjustNewGrid();
  changeBGColor();
  changeButtonText();
});

function removeCurrentGrid() {
  while (container.firstChild) {
    container.firstChild.remove();
  }
}

function changeButtonText() {
  btn.textContent = `${userInput}x${userInput}`;
}

genNewGrid();
adjustNewGrid();
changeBGColor();
