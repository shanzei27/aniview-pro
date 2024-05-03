const axios = require("axios");

async function sendContactForm(formData) {
    console.log('sending');
    axios.post(`${process.env.REACT_APP_API_URL}/v1/contactform/form/`, {
        data: formData
      })
      .then((response) => {
        console.log(response);
      });
}

export  {
    sendContactForm,
}