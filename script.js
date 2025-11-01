const modelUrl = "fashion_cnn.onnx";
let session = null;
let classMap = null;

async function init() {
  session = await ort.InferenceSession.create(modelUrl);
  const res = await fetch("class_map.json");
  classMap = await res.json();
  console.log("✅ Model loaded");
}

async function preprocessImage(file) {
  return new Promise((resolve) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    img.onload = () => {
      canvas.width = 28;
      canvas.height = 28;
      ctx.drawImage(img, 0, 0, 28, 28);
      const imgData = ctx.getImageData(0, 0, 28, 28);
      const gray = new Float32Array(1 * 28 * 28);
      for (let i = 0; i < 28 * 28; i++) {
        const r = imgData.data[i * 4];
        const g = imgData.data[i * 4 + 1];
        const b = imgData.data[i * 4 + 2];
        gray[i] = ((r + g + b) / 3 / 255.0 - 0.5) / 0.5; // Normalize
      }
      resolve(gray);
    };
    img.src = URL.createObjectURL(file);
  });
}

async function predict(file) {
  const tensorData = await preprocessImage(file);
  const inputTensor = new ort.Tensor("float32", tensorData, [1, 1, 28, 28]);
  const outputs = await session.run({ input: inputTensor });
  const preds = outputs.output.data;
  const argmax = preds.indexOf(Math.max(...preds));
  const label = classMap[argmax.toString()];
  document.getElementById("result").innerText = `👕 Prediction: ${label}`;
}

document.getElementById("imageInput").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  document.getElementById("preview").src = URL.createObjectURL(file);
  await predict(file);
});

init();
