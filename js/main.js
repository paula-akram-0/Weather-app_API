let today =document.getElementById("today");
let todayDate =document.getElementById("today-date");
let todayDegree =document.getElementById("today-degree");
let todayIcon =document.getElementById("today-icon");
let todayDescription = document.getElementById("today-description")
let searchInput = document.getElementById("searchInput")
let cityLocation = document.getElementById("location")

// day2
let nextDay = document.getElementsByClassName("nextDay");
let nextDayIcon = document.getElementsByClassName("nextDay-icon");
let maxDegree = document.getElementsByClassName("max-degree");
let minDegree = document.getElementsByClassName("min-degree");
let nextDayDescription = document.getElementsByClassName("nextDay-description");

let apiResponse;
let responseData;
monthName=['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'];
days=[
    "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
];

async function getWeatherAPI(currentCity='cairo'){
    apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=222c8f681a5b41ba8b3232358223105&q=${currentCity}&days=3`);
    responseData = await apiResponse.json()
    displayData()
    displayNaxtDay()
}
getWeatherAPI()

function displayData(){
    let date = new Date();
    console.log(date)
    today.innerHTML=days[date.getDay()];
    todayDate.innerHTML = `${date.getDate()} ${monthName[date.getMonth()]}`;
    todayDegree.innerHTML = responseData.current.temp_c
    todayIcon.setAttribute("src",`http:${responseData.current.condition.icon}`)
    todayDescription.innerHTML = responseData.current.condition.text
    cityLocation.innerHTML =  responseData.location.name;
    humidty.innerHTML = responseData.current.humidity;
    wind.innerHTML = responseData.current.wind_kph;
}

function displayNaxtDay(){
    for(let i =0; i<nextDay.length;i++){
        nextDay[i].innerHTML = days[new Date(responseData.forecast.forecastday[i+1].date).getDay()];
        nextDayIcon[i].setAttribute("src",`https:${responseData.forecast.forecastday[i+1].day.condition.icon}`);
        maxDegree[i].innerHTML = responseData.forecast.forecastday[i+1].day.maxtemp_c;
        minDegree[i].innerHTML = responseData.forecast.forecastday[i+1].day.mintemp_c;
        nextDayDescription[i].innerHTML=responseData.forecast.forecastday[i+1].day.condition.text
    }
}



searchInput.addEventListener("keyup",()=>{
    currentCity= searchInput.value;
    getWeatherAPI(currentCity)
})