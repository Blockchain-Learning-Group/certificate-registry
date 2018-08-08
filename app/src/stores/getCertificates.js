const axios = require('axios');
const API_URL = process.env.REACT_APP_API_URL;

async function getCertificates(filter) {
  const { status, data } = await axios.get(`${API_URL}:3001/getCertificates/${filter}`);
  
  if (status !== 200) {
    console.error(`Unsuccessful request to get certs: ${status}`);
  }

  return data;
}

export default getCertificates;