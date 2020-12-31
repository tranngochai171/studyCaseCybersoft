import drawBackYard from "./backyard/index.js";
import drawTree from "./tree/index.js";
import * as Constants from "./assets/constants/constants.js";

const canvas = document.createElement("canvas");

document.getElementById("currentBYWidth").innerHTML = window.innerWidth;
const c = canvas.getContext("2d");

async function run(bYLength, radius, distance) {
  // Chiều dài sân
  const bYLengthTemp = window.innerWidth - Constants.START_X_BY * 2;
  // Bán kính cây
  const radiusTemp = (radius * bYLengthTemp) / bYLength;
  // Khoảng cách giữa các cây
  const distanceTemp = (distance * bYLengthTemp) / bYLength;

  // Số lượng cây
  let quantityOfTree = Math.floor(
    bYLengthTemp / (radiusTemp * 2 + distanceTemp)
  );
  // chiều cao khu vườn
  const bYHeight = (radiusTemp + distanceTemp) * 2;

  // Chiều dài tối đa trồng cây
  const maxLength =
    (distanceTemp + radiusTemp * 2) * quantityOfTree + distanceTemp;

  quantityOfTree =
    maxLength > bYLengthTemp ? quantityOfTree - 1 : quantityOfTree;

  const arr = [];
  for (let i = 0; i < quantityOfTree; i++) {
    let x, y, item;
    if (arr.length === 0) {
      x = Constants.START_X_BY + radiusTemp + distanceTemp;
      y = Constants.START_Y_BY + bYHeight / 2;
    } else {
      x = arr[arr.length - 1].x + (radiusTemp * 2 + distanceTemp);
      y = arr[arr.length - 1].y;
    }
    item = {
      x,
      y,
    };
    arr.push(item);
  }
  if (quantityOfTree > 0) {
    // const bYHeight = (radius + distance) * 2;
    await drawBackYard(c, bYLengthTemp, bYHeight);
    // const centerX = Constants.START_X_BY + radius + distance;
    // const centerY = Constants.START_Y_BY + bYHeight / 2;
    await Promise.all(
      arr.map((item) => {
        return drawTree(c, item.x, item.y, radiusTemp);
      })
    );
    const finalArea = Math.pow(radius, 2) * Math.PI * quantityOfTree;
    alert(
      `Trồng được ${quantityOfTree} cây, Tổng diện tích các cây trồng: ${finalArea.toFixed(
        2
      )} m2`
    );
  } else {
    alert("Không thể tạo ra mô phỏng với thông tin này");
  }
}
function submit(e) {
  e.preventDefault();
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  let res = true;
  const bYLength = document.getElementById("backyard").value;
  res = res && (bYLength ? true : false);
  const radius = document.getElementById("radius").value;
  res = res && (radius ? true : false);
  const distance = document.getElementById("distance").value;
  res = res && (distance ? true : false);
  if (res) {
    if (bYLength < window.innerWidth)
      run(parseFloat(bYLength), parseFloat(radius), parseFloat(distance));
    else alert("Please resize your web to submit this Backyard width");
  } else {
    alert("Please complete all information");
  }
}

document.getElementById("submit").addEventListener("click", submit);
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.getElementById("currentBYWidth").innerHTML = window.innerWidth;
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.appendChild(canvas);
