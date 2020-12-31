import * as constants from "../assets/constants/constants.js";
const drawTree = (c, centerX, centerY, radius) => {
  return new Promise((resolve, reject) => {
    let i = 0;
    function animate() {
      let id = window.requestAnimationFrame(animate);
      c.beginPath();
      c.arc(centerX, centerY, radius, 0, i, false);
      c.strokeStyle = "blue";
      c.stroke();
      if (i < constants.MAX_E_ANGLE) i += 0.1;
      else {
        window.cancelAnimationFrame(id);
        resolve("Done drawing tree");
      }
    }
    animate();
  });
};

export default drawTree;
