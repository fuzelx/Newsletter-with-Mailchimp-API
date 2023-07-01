const express = require("express");

const request = require("request")

const bodyParser = require("body-parser");
const https = require("https")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
   res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res){
   const firstName =  req.body.first;
   const lastName = req.body.last;
   const email = req.body.mail;
  
   const data = {
      members:[
         {
            email_address: email,
            status: "subscribed",
            merge_fields:{
               FNAME: firstName,
               LNAME: lastName,

            }
         }
      ]
   };

   const jsonData = JSON.stringify(data)

   const url = "https://us8.api.mailchimp.com/3.0/lists/81d6e6f5cf"
    
   const options = {
      method: "POST",
      auth: "fuzail01:a2d034f4c8e04804f4cb8cf6fcaf648d-us8"
   }
   const request = https.request(url, options, function(response){
   if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html")
   } else {
      res.sendFile(__dirname + "/fail.html")
   }

        response.on("data", function(data){
         console.log(JSON.parse(data));
        })
   });

   request.write(jsonData);
   request.end();

});

app.post("/failure", function(req, res){
   res.redirect("/")
})


app.listen(process.env.PORT , function(){
   console.log("Server is up on port 3000")
});

// API KEY 
// a2d034f4c8e04804f4cb8cf6fcaf648d-us8

// list id 
// 81d6e6f5cf