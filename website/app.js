
/* Global Variables */
const apiKey = "&appid=556e79aeaf3d7a365eafd0775f58777b";
const baseUrl = "http://localhost:8080/";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const userZipCode = document.getElementById("zip");
const userFeeling = document.getElementById("feelings");
const temprature = document.getElementById("temp");
const date = document.getElementById("date");
const content = document.getElementById("content");
let d = new Date();

// Event listener to add function to existing HTML DOM element

document.getElementById("generate").addEventListener("click", performAction);


/* Function called by event listener */

function performAction() {
  const zipCode = userZipCode.value;
  let userData = {
    temp: 0,
    date: d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear(),
    content: userFeeling.value,
  };
  if (userData.content==="") {
    alert("please tell us your feeling today :)");
  } else {
    getWeather(apiUrl, zipCode, apiKey).then((data) => {
      userData.temp = data.main.temp;
      postData(userData).then(updateUI());
    });
  }
}


/* Function to GET Web API Data*/

const getWeather = async (apiUrl, zip, apiKey) => {
  const response = await fetch(apiUrl + zip + apiKey);
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};


/* Function to POST data */

const postData = async (data) => {
  const response = await fetch("http://localhost:8080/postData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    await response.json();
  } catch (error) {
    console.log("error", error);
  }
};


/* Function to GET Project Data */

const updateUI = async () => {
  const request = await fetch(`http://localhost:8080/all`);
  try {
    await request.json().then((data) => {
      temprature.innerHTML = `The temperature now is ${data.temp}`;
      date.innerHTML = `Today is ${data.date}`;
      content.innerHTML = `Your feeling today is ${data.content}`;
      temprature.classList.add("list-group-item");
      date.classList.add("list-group-item");
      content.classList.add("list-group-item");
      
    });
  } catch (error) {
    console.log("error", error);
  }
};
