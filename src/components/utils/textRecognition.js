import Tesseract, { createWorker } from "tesseract.js";

const worker = await createWorker("eng");

export async function recognizeImageText(imageFile) {
  if (!imageFile) {
    throw new Error("Please provide Image file");
  }
  console.log(imageFile);
  const result = await worker.recognize(imageFile);
  console.log(result.text);
  await worker.terminate();
  return result;
}
