const wrapper = document.querySelector(".wrapper"),
inputpart = wrapper.querySelector(".input-part"),
infotxt = inputpart.querySelector(".info-txt"), 
inputfield = inputpart.querySelector("input"),
locationbtn = inputpart.querySelector("button")
let apikey = "74e0aaaba6e11087a9b8bb14aff602fb"
let icon = document.querySelector(".weather-part img")
let back = document.querySelector(".wrapper header i")

let api;


inputfield.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputfield.value.trim() != ""){
        requestApi(inputfield.value.trim());
    }
})

locationbtn.addEventListener("click", () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onsucces, onerror)
    }else{
        alert("your browser not support geolocation api")
    }
})

function onsucces(position){
    const {latitude,longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`
    fecthdata()
}

function onerror(error){
    
    infotxt.innerText = error.message
    infotxt.classList.add("error")
}

let requestApi = (city) => {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
    fecthdata()
}
function fecthdata(){
    infotxt.innerText = "getting weather details...."
    infotxt.classList.add("pending")
    fetch(api).then(response => response.json()).then(result => weatherdetails(result))
}

function weatherdetails(info){
    if(info.cod == "404"){
    infotxt.innerText = `${inputfield.value} isn't a valid city name`
    infotxt.classList.replace("pending","error")
    }
    else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city},${country}`;
        wrapper.querySelector(".bottom-details .temp .numb").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;
        if(id == 800){
            icon.src = "Weather Icons/clear.png.svg"
        }else if(id >= 200 && id <= 232){
            icon.src = "Weather Icons/strom.png.svg"
        }else if(id >= 600 && id <= 622){
            icon.src = "Weather Icons/snow.png.svg"
        }else if(id >= 701 && id <= 781){
            icon.src = "Weather Icons/haze.png.svg"
        }else if(id >= 801 && id <= 804){
            icon.src = "Weather Icons/cloud.png.svg"
        }else if((id >= 300 && id <= 321) || (id>= 500 && id <= 531)){
            icon.src = "Weather Icons/rain.png.svg"
        }
    infotxt.classList.remove("pending","error")
    wrapper.classList.add("active")
    }
    console.log(info)
}
back.addEventListener("click", () => {
    wrapper.classList.remove("active")
})