const urlInput = document.getElementById("input-url");
const fileInput = document.getElementById("input-file");
const output = document.getElementById("output").getContext("2d");

const mark = document.getElementById("mark");

async function updateOutput(e) {  
  const buffer = new Image();

  buffer.onload = () => {
    output.drawImage(buffer, 0, 0, 200, 200);
    output.drawImage(mark, 120, 120, 60, 60);
  }

  if (e.target.type === "url") {
    buffer.src = e.target.value
  } else {
    buffer.src = URL.createObjectURL(this.files[0]);
  }
}

urlInput.addEventListener("input", updateOutput);
fileInput.addEventListener("change", updateOutput);
