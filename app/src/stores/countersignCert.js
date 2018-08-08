const axios = require('axios');
const API_URL = process.env.REACT_APP_API_URL;

async function countersignCert(sig, id) {
  const { status, error, data } = await axios.put(`${API_URL}:3001/countersignCert/`, { sig, id });
  if (status !== 200) {
    console.error(`Unsuccessful request countersign error: ${error}`);
    return false;
  } else {
    return { data, sig };
  }
}

export default countersignCert;