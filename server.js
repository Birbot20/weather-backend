require("dotenv").config();

const express = require("express");
const axios = require("axios");

const app = express();


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-origin", "*");
    next();
});

app.get("/weather", (req, res) => {
    const city = req.query.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`;

    axios 
    .get(url)
    .then((response) => {
        const weatherData = {
            city: response.data.name,
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
        };
        res.json(weatherData);
    })
    .catch((error) => {
        res.status(500).json({ error: "Could not get the weather for that city."});
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
