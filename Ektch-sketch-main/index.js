const canvas = document.querySelector("#etch-a-sketch");
const ctx = canvas.getContext("2d");
const shakeButton = document.querySelector(".shake");
const MOVE_AMOUNT = 10;
const { width, height } = canvas;
let y = Math.floor(Math.random() * height);
let x = Math.floor(Math.random() * width);
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 10;
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

function handleKey(e) {
  if (e.key.includes("Arrow")) {
    e.preventDefault();
    draw({ key: e.key });
  }
}

window.addEventListener("keydown", handleKey);

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

function draw({ key }) {
  hue += 1;
  ctx.strokeStyle = `hsl(${Math.random() * 360},100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y);
  ctx.stroke();
  switch (key) {
    case "ArrowUp":
      y -= MOVE_AMOUNT;
      break;
    case "ArrowRight":
      x += MOVE_AMOUNT;
      break;
    case "ArrowDown":
      y += MOVE_AMOUNT;
      break;
    case "ArrowLeft":
      x -= MOVE_AMOUNT;
      break;
    default:
      break;
  }
}

function clearCanvas() {
  canvas.classList.add("shake");
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener(
    "animationend",
    function () {
      console.log("done the shake!");
      canvas.classList.remove("shake");
    },
    { once: true }
  );
}

shakeButton.addEventListener("click", clearCanvas);
