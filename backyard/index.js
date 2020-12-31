import * as Constants from "../assets/constants/constants.js";
const drawBackYard = (c, bYLength, bYHeight) => {
  return new Promise((resolve, reject) => {
    c.beginPath();
    c.rect(Constants.START_X_BY, Constants.START_Y_BY, bYLength, bYHeight);
    c.strokeStyle = "green";
    c.stroke();
    resolve("Done drawing backyard");
    // let width = 0;
    // function animate() {
    //   let id = requestAnimationFrame(animate);
    //   c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    //   c.beginPath();
    //   c.rect(Constants.START_X_BY, Constants.START_Y_BY, width, bYHeight);
    //   c.stroke();
    //   if (width <= bYLength) width += 1;
    //   else {
    //     window.cancelAnimationFrame(id);
    //     resolve("Done drawing backyard");
    //   }
    // }
    // animate();
  });
};

export default drawBackYard;
