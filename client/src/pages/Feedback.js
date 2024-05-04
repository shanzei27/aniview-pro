import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { sendContactForm } from "../services/api";
import { FormControl } from "@mui/material";
import axios from "axios";

const Heading = styled(Typography)(({ theme }) => ({}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
}));

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "left",
  width: "100%",
}));

const FormStyledContainer = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "left",
}));

const Feedback = (props) => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleFormFieldChange = (e) => {
    if (formData.hasOwnProperty(e.target.name)) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      console.log(formData);
    }
  };

  const handleFormSubmit = async (e) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/v1/contactform/form/`, {
        name: formData["name"],
        email: formData["email"],
        message: formData["message"],
      })
      .then((response) => {
        console.log(response);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      });
  };

  return (
    <>
      <CssBaseline />
      <StyledGrid container spacing={2}>
        <Grid item xs={11} sx={{ width: "100%" }}>
          <Item>
            <Heading variant="h1">Feedback</Heading>
            <Typography
              variant="body2"
              sx={{ textAlign: "left", paddingTop: 1 }}
            >
              Please fill the form with your feedback.
            </Typography>{" "}
          </Item>{" "}
          <Item>
            <FormStyledContainer
              component="form"
              elevation={3}
              onSubmit={handleFormSubmit}
            >
              <Box sx={{ padding: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={2}>
                    <InputLabel
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        fontWeight: 700,
                      }}
                    >
                      Name
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <TextField
                      required
                      id="name"
                      name="name"
                      label="Name"
                      fullWidth
                      size="small"
                      autoComplete="off"
                      variant="outlined"
                      onChange={handleFormFieldChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <InputLabel
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        fontWeight: 700,
                      }}
                    >
                      Email
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <TextField
                      id="email"
                      name="email"
                      label="Email"
                      fullWidth
                      size="small"
                      autoComplete="off"
                      variant="outlined"
                      onChange={handleFormFieldChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <InputLabel
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        fontWeight: 700,
                      }}
                    >
                      Message
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <TextField
                      required
                      id="message"
                      name="message"
                      label="Your message..."
                      multiline
                      fullWidth
                      rows={4}
                      onChange={handleFormFieldChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Button type="submit" variant="contained">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </FormStyledContainer>
          </Item>
        </Grid>
      </StyledGrid>
    </>
  );
};

export default Feedback;
