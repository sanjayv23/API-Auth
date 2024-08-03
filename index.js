import express from "express";
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port =process.env.PORT || 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.


const yourUsername = process.env.USER_NAME;
const yourPassword = process.env.PASSWORD;
const yourAPIKey =  process.env.BEARER_KEY;
const yourBearerToken =  process.env.BEARER_TOKEN;


// const yourUsername = "_sanjayv_";
// const yourPassword = "232004";
// const yourAPIKey = "dde0e04a-5708-42c7-8696-eb80ab7795cb";
// const yourBearerToken = "efbee3d5-2db3-43fa-bd07-0c9b047dd8ca";
app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async(req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  try{
    const response=await axios.get("https://secrets-api.appbrewery.com/random");
    
    const result=JSON.stringify(response.data);//js object ----> json 
    
    res.render("index.ejs",{content:result})
    
  }
  catch(error){
    console.log("Error: ",error.message);
    res.status(500).send("Failed");
  }
});

app.get("/basicAuth", async(req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
    try{
      const response=await axios.get("https://secrets-api.appbrewery.com/all?page=2", {
        auth: {
            username: yourUsername ,
            password: yourPassword
        },
      
    })
      const result=JSON.stringify(response.data);//js object ----> json 
      
      res.render("index.ejs",{content:result})
      
    }
    catch(error){
      console.log("Error: ",error.message);
      res.status(500).send("Failed");
    }
});

app.get("/apiKey", async(req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  try{
    //const response=await axios.get(`https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`);
    //same as above 
    const response=await axios.get(`https://secrets-api.appbrewery.com/filter`, {
      params: {
        score: 5 ,
        apiKey:yourAPIKey
      },
    
  })
    const result=JSON.stringify(response.data);//js object ----> json 
    
    res.render("index.ejs",{content:result})
    
  }
  catch(error){
    console.log("Error: ",error.message);
    res.status(500).send("Failed");
  }
});

app.get("/bearerToken", async(req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
 
  try{
    //const response=await axios.get(`https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`);
    //same as above 
    const response=await axios.get(API_URL+"secrets/42",{
      headers: { Authorization: `Bearer ${yourBearerToken}`},
    });
    const result=JSON.stringify(response.data);//js object ----> json 
    
    res.render("index.ejs",{content:result})
    
  }
  catch(error){
    console.log("Error: ",error.message);
    res.status(500).send("Failed");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
