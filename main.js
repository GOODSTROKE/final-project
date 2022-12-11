"use strict";

let xFirst;
let yFirst;
let range;
let downImageNum;
let downImageRange;

const emptyRect = document.querySelectorAll(".HoverRect");
const firstSvg = document.querySelector(".firstSvg");
const fillRect = document.querySelectorAll(".FillRect");
const svgText = document.querySelectorAll(".svg--text");
const images = document.querySelectorAll(".img");
const lastImage = document.querySelector(".last-image");
const headers = document.querySelectorAll(".description-header");
const detailType = document.querySelectorAll(".detail-type");
const detailCountry = document.querySelectorAll(".detail-country");
const detailDOB = document.querySelectorAll(".detail-dob");
const detailStatus = document.querySelectorAll(".detial-status");
const generateBtn = document.querySelector(".btn-generate");
const reseteBtn = document.querySelector(".btn-reset");
const leftIcon = document.querySelector(".icon--left");
const rightIcon = document.querySelector(".icon--right");

// SETTING THE DOWN IMAGE INITIAL AND RANGE.
downImageNum = 1;
downImageRange = lastImage.dataset.range;

// FINDING THE RANGE.
range = +emptyRect[0].dataset.range;
setSVGText();

function setProperty(num, index) {
  detailType[num].innerHTML = details[index].type;
  detailCountry[num].innerHTML = details[index].birthPlace;
  detailDOB[num].innerHTML = details[index].birthDay;
  detailStatus[num].innerHTML = details[index].occupation;
}

function setSVGText() {
  let num1 = Math.floor(Math.random() * range + 1);
  let num2 = Math.floor(Math.random() * range + 1) + 4;
  // SET TEXT
  svgText[0].innerHTML = num1;
  svgText[1].innerHTML = num2;

  // SETTING FILLED RANGE.
  let fillRange = 100 / range;
  let fill1 = num1 * fillRange;
  let fill2 = (num2 - range) * fillRange;
  fillRect[0].setAttribute("width", fill1);
  fillRect[1].setAttribute("width", fill2);

  // SET IMAGES.
  images[0].setAttribute("src", `images/${num1}.png`);
  images[1].setAttribute("src", `images/${num2}.png`);

  // SET BOTTOM IMAGE.
  // let path = `images/${num1}-${num2}.png`;
  // lastImage.setAttribute("src", path);
  // lastImage.onerror = function () {
  //   lastImage.setAttribute("src", "images/loading.png");
  // };

  // SETTING THE DETAILS OF INDIVIDUALS
  setProperty(0, num1 - 1);
  setProperty(1, num2 - 1);
}

emptyRect.forEach((item) => {
  item.addEventListener("mousemove", function (e) {
    const parentX = firstSvg.getBoundingClientRect().x;
    const parentY = firstSvg.getBoundingClientRect().y;

    const currentX = item.getBoundingClientRect().x;
    const currentY = item.getBoundingClientRect().y;

    const clientX = window.event.clientX;
    const clientY = window.event.clientY;

    const requiredX = clientX - parentX + 2;
    const requiredY = clientY - parentY + 1.5;
    xFirst = clientX - currentX;
    if (xFirst >= 100) xFirst = 99;
    yFirst = clientY - currentY;

    document.querySelector(".mouse--over-line")?.remove();

    const html = `
      <path
          fill="none"
          stroke="#222"
          stroke-width="2"
          stroke-opacity="1"
          d="M${requiredX}, 39 L${requiredX}, 61"
          class="mouse--over-line"
      ></path>
    `;
    firstSvg.insertAdjacentHTML("beforeend", html);
  });
});

emptyRect.forEach((item) => {
  item.addEventListener("mouseout", function () {
    document.querySelector(".mouse--over-line")?.remove();
  });
});

emptyRect.forEach((item) => {
  item.addEventListener("click", renderElement);
});

function renderElement() {
  let num = this.dataset.type === "first" ? 0 : 1;
  fillRect[num].setAttribute("width", xFirst);

  // new range for dynamically.

  let limit = 100 / range;
  let lowerLimit = +this.dataset.lower;
  svgText[num].innerHTML = lowerLimit + Math.floor(xFirst / limit);

  let imageNum = svgText[num].innerHTML;
  images[num].setAttribute("src", `images/${imageNum}.png`);
  // headers[num].innerHTML = imageNum;

  // This one is to set the downward image.
  let num1 = svgText[0].innerHTML;
  let num2 = svgText[1].innerHTML;

  // SET BOTTOM IMAGE.
  // let path = `images/${num1}-${num2}.png`;
  // lastImage.setAttribute("src", path);
  // lastImage.onerror = function () {
  //   lastImage.setAttribute("src", "images/loading.png");
  // };

  // SETTING THE DETAILS OF INDIVIDUALS
  setProperty(0, num1 - 1);
  setProperty(1, num2 - 1);
}

// GENERATE BTN EVENT.
generateBtn.addEventListener("click", setSVGText);

function reset() {
  lastImage.setAttribute("src", "images/down1.png");
  downImageNum = 1;
}
// RESET BTN IMAGE.
reseteBtn.addEventListener("click", reset);

// SCROLLING TO LEFT AND RIGHT.
leftIcon.addEventListener("click", function () {
  downImageNum--;
  if (downImageNum < 1) downImageNum = downImageRange;
  lastImage.setAttribute("src", `images/down${downImageNum}.png`);
});

rightIcon.addEventListener("click", function () {
  downImageNum++;
  if (downImageNum > downImageRange) downImageNum = 1;
  lastImage.setAttribute("src", `images/down${downImageNum}.png`);
});
