const urlInput = document.getElementById("input-url");
const fileInput = document.getElementById("input-file");
const output = document.getElementById("output").getContext("2d");

const mark = document.getElementById("mark");
const buffer = document.getElementById("buffer");

async function updateOutput(e) {
  buffer.onload = () => {
    const bufferRatio = buffer.naturalWidth / buffer.naturalHeight;

    let surplusX = 0;
    let surplusY = 0;
    let reference = buffer.naturalWidth;

    // if it's bigger than our target aspect ratio
    if (bufferRatio > 1) {
      surplusX = buffer.naturalWidth - buffer.naturalHeight;
      surplusY = 0;
      reference = buffer.naturalHeight;
    } else if (bufferRatio < 1) {
      surplusX = 0;
      surplusY = buffer.naturalHeight - buffer.naturalWidth;
      reference = buffer.naturalWidth;
    }

    // calculate the position to draw the image at
    const startX = surplusX / 2;
    const startY = surplusY / 2;

    output.drawImage(
      buffer,
      startX,
      startY,
      reference,
      reference,
      0,
      0,
      200,
      200
    );
    output.drawImage(mark, 120, 120, 60, 60);
  };

  if (e.target.type === "url") {
    buffer.src = e.target.value;
  } else {
    buffer.src = URL.createObjectURL(this.files[0]);
  }
}

urlInput.addEventListener("input", updateOutput);
fileInput.addEventListener("change", updateOutput);
