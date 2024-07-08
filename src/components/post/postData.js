import axios from "axios";

export async function postData(endpoint, postData) {
  try {
    const response = await axios.post(endpoint, JSON.stringify({ data: { barcodes: postData }}));
    console.log("Sent data:", postData);
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error while sending data", error);
    throw error;
  }
}