/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather";
const apikey = 'dd6c3ba86f66f547459582b843e14bc8';
//https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
//https://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid={API key}
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

async function getWeatherData() {
    const weatherURL = "https://api.openweathermap.org/data/2.5/weather?zip=94111&appid=dd6c3ba86f66f547459582b843e14bc8";
    
    try {
        const res = await fetch(weatherURL);
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const allData = await res.json();
        
        if (allData.main && allData.main.temp) {
            const temperature = allData.main.temp;
            console.log(temperature);
            return temperature;
        } else {
            throw new Error('Temperature data not found');
        }
        
    } catch (error) {
        console.log("Error", error);
    }
}

getWeatherData();