window.addEventListener("load",()=>{
    navigator.geolocation.getCurrentPosition(async(position)=>{
      const long = position.coords.longitude;
      const lat = position.coords.latitude;
    
      console.log(long,lat);
    
    
      const url = `https://open-weather13.p.rapidapi.com/city/latlon/${lat}/${long}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '00f521fed0mshab91a81be10b748p14aa29jsnc39c240ef8ac',
        'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
      }
    };
    
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      UpdateWetherUI(result,"K");
    } catch (error) {
      console.error(error);
    }
    
    // write javascript for adding greeting message & show time
    let greeting = document.getElementById("greeting");
  
    
    let time = document.getElementById("time");
  
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
  
    if(hours < 12){
      greeting.innerHTML = "Good Morning";
    }
    else if(hours < 17)
    {
      greeting.innerHTML = "Good Afternoon";
    }
    else {
      greeting.innerHTML = "Good Evening";
    }
  
    if(hours < 10 && minutes < 10){
      time.innerHTML = `0${hours}:0${minutes} A.M`;
    }
  
    else if(hours < 10 && !minutes < 10){
      time.innerHTML = `0${hours}:${minutes} A.M`;
    }
  
    else if(!hours < 10 && minutes < 10){
      time.innerHTML = `${hours}:0${minutes} A.M`;
      if(hours >= 12){
        time.innerHTML = `${hours}:${minutes} P.M`;
      }
    }
  
    else{
      time.innerHTML = `${hours}:${minutes} A.M`;
      if(hours >= 12){
        time.innerHTML = `${hours}:${minutes} P.M`;
      }
    }
  
  
  
    
    
    
    })
    })
    
    
    
    
    
    
    const btn = document.getElementById("searchBtn");
    let isLoading = false;
    btn.addEventListener("click", async () => {
      const cityName = document.getElementsByName("cityName")[0].value;
    
      const url = `https://open-weather13.p.rapidapi.com/city/${cityName}`;
    
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '00f521fed0mshab91a81be10b748p14aa29jsnc39c240ef8ac',
          'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
        }
      };
    
      try {
        isLoading =true;
        isLoading ? btn.innerHTML="Loading..." : btn.innerHTML="Search"
        const response = await fetch(url, options);
        const result = await response.json();
        UpdateWetherUI(result,"F");
        isLoading = false;
        isLoading ? btn.innerHTML="Loading..." : btn.innerHTML="Search"
    
    
    
      } catch (error) {
        console.error(error);
      } finally{
        isLoading=false;
        isLoading ? btn.innerHTML="Loading..." : btn.innerHTML="Search"
      }
    })
    
    const FarhenheitToCelsius = (f) => {
      return (f - 32) * 5 / 9;
    }
    
    const kelivinToCelsius = (k) => {
      return k - 273.15;
    }
    
    
    const ConvertToCelsius = (value,unit) => {
      if(unit==="K")
      {
        return kelivinToCelsius(value);
      }
      else if (unit==="F")
      {
        return FarhenheitToCelsius(value);
      }
    }
    
    
    const UpdateWetherUI = (data,unit)=>{
      // *temperature
      const temperature = document.getElementById("temperature");
      temperature.innerHTML = ConvertToCelsius(data.main.temp , unit).toFixed(2) + "°C";
    
      // *feels_like
    
      const feels_like = document.getElementById("feelsLikeTemperature");
      feels_like.innerHTML = `Feels like: ${ConvertToCelsius(data.main.feels_like,unit).toFixed(2)} °C`
    
    
      // *minimum
      const minimum = document.getElementById("minimum");
      minimum.innerHTML = `Min: ${ConvertToCelsius(data.main.temp_min,unit).toFixed(2)}`
    
      // *maximum
      const maximum = document.getElementById("maximum");
      maximum.innerHTML = `Max: ${ConvertToCelsius(data.main.temp_max,unit).toFixed(2)}`
    
    
      // *Atmospheric Pressure
      const pressure = document.getElementById("pressure");
      pressure.innerHTML = `Pressure: ${data.main.pressure}`
    
      // *visibility
      const visibility = document.getElementById("visibility");
      visibility.innerHTML = `Visibility: ${data.visibility}`
    
      // *wind-speed
      const windSpeed = document.getElementById("windSpeed");
      windSpeed.innerHTML = `Wind Speed: ${data.wind.speed}`;
    
      // *humidity
      const humidity = document.getElementById("humidity");
      humidity.innerHTML = `Humidity: ${data.main.humidity}`
    }
