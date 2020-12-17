document.addEventListener('DOMContentLoaded',()=>{

/* Global Variables */
const generate = document.querySelector('#generate')
const zip =document.querySelector("#zip")
const userInput = document.querySelector("#feelings")
const date = document.querySelector('#date')
const temp = document.querySelector('#temp')
const content =  document.querySelector('#content')
const apiKey = '';


const postData = async (path , data={})=>{
  fetch(path,{
    "method":"POST",
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

const updateUI = async ()=>{
  fetch("/api/data",{
    "method":"GET",
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(res => res.json())
  .then((data)=>{
    temp.textContent = data.temperature
    date.textContent  = data.date
    content.textContent =data.user_response
  }).catch(err=>{
    console.log(err);
  })

}

const getData =async (url)=> {
  fetch(url, {
    "method": "GET",
  })
  .then(response => response.json())
  .then((data)=>{
    let d = new Date();
    let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
    const body = {
      temperature : data.main["temp"] ,
      date : newDate,
      user_response: userInput.value
    }
    postData("api/add", body)
  })
  .then(()=>{
    updateUI()
  })
  .catch(err => {
    console.error(err);
    alert("please enter correct zip code and country in this format zipcode,country")
  });
}


generate.addEventListener('click',()=>{
  const zipCode = zip.value
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}${apiKey}`
  getData(url, apiKey, zipCode)
})


})
