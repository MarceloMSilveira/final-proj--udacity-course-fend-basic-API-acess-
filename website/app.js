/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather";
const apikey = 'dd6c3ba86f66f547459582b843e14bc8';
//https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
//https://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid={API key}
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

function setUpdataToSend(temperature) {
    const userResp = document.getElementById('feelings').value
    const dataToSend = {
        temperature: temperature,
        date: newDate, 
        userResp: userResp
    }
    return dataToSend
}

async function postData( url = '', data = {}) {
    //console.log(data);
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
   // Body data type must match "Content-Type" header        
    body: JSON.stringify(data), 
  });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    }catch(error) {
    console.log("error", error);
    }
}


async function getWeatherData(baseURL,zipCode, apikey) {
    const weatherURL = baseURL+'?zip='+zipCode+'&appid='+apikey;
    
    try {
        const res = await fetch(weatherURL);
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const allData = await res.json();
        
        if (allData.main && allData.main.temp) {
            const temperature = allData.main.temp;
            //console.log(`Temperatura em ${allData.name}: ${temperature}`);
            return temperature;
        } else {
            throw new Error('Temperature data not found');
        }
        
    } catch (error) {
        console.log("Error", error);
    }
}

async function dataTransmission(zipCode) {
    try {
        const temperature = await getWeatherData(baseURL,zipCode, apikey);
        console.log(temperature);
        const data = setUpdataToSend(temperature);
        await postData('/data',data)
    } catch (error) {
        
    }
}


document.getElementById('generate').addEventListener('click',()=>{
    const zipCode = document.getElementById('zip').value
    dataTransmission(zipCode) 
})
