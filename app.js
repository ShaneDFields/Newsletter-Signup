const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const port = 3000;
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))



app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html")
});

app.post("/", (req, res) => {

  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us13.api.mailchimp.com/3.0/lists/54ddbf4581"

  const options = {
    method: "POST",
    auth: "shane1:7d5ad37ae0b455e23cad24a2a00c86b8-us13"
  }

  const request = https.request(url, options, (response) => {

    if(response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html")
    } else {
      res.sendFile(__dirname + "/failure.html")
    }

    response.on("data", (data) => {
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();

});

app.post("/failure", (req,res) => {
  res.redirect("/")
})

app.post("/success", (req,res) => {
  res.redirect("/")
})

app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on port ${port}`)
});

// API Key
// 7d5ad37ae0b455e23cad24a2a00c86b8-us13

// List Id
// 54ddbf4581
