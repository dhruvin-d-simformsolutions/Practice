const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require('./utils/Geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Dhruvin Dankhara",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Dhruvin Dankhara",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        helpText: "This is some Helpful Text",
        name: "Dhruvin Dankhara", 
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please Provide Address",
        });
    }
    // console.log(req.query.address);
    geocode(req.query.address,(error,{latitude,longitude,location}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastdata) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast : forecastdata,
                location,
                address : req.query.address,
            })
        })
    })
    
    // res.send({
    //     forecast: "It is Sunny",
    //     location: "Gujarat",
    //     address : req.query.address
    // });
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term",
        });
    }
    console.log(req.query.search),
        res.send({
            products: [],
        });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Andrew Mead",
        errorMessage: "Help article not found.",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Andrew Mead",
        errorMessage: "Page not found.",
    });
});

app.listen(port, () => {
    console.log("Server is running at port "+port);
});