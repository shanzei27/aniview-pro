var validator = require("validator");
const express = require("express");
const router = express.Router();

router.post("/form", async (req, res, next) => {
  const body = req.body;
  let errors = [];

  let validatedFormData = {};
  validatedFormData["name"] = validator.escape(body["name"]);

  const email = validator.escape(body["email"]);
  if (validator.isEmail(email)) {
    validatedFormData["email"] = email;
  } else {
    validatedFormData["email"] = "invalid email";
    errors.push("invalid email");
  }

  validatedFormData["message"] = validator.escape(body["message"]);

  writeDataToGoogleSheets(validatedFormData);

  res.send({
    status: "success!",
    errors: errors,
  });
});

function writeDataToGoogleSheets(formData) {
  // google sheets api integration
}

module.exports = router;
