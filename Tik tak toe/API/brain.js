fetch('https://calendarific.com/api/v2/holidays?api_key=daf0dd634336ddebed7f3d81c992adc23e2b2561&country=IN&year=2020&month=11')
.then(response => {
    return response.json()
})
.then(data => {
    let holiday;
    holiday = '<h1>Holiday in this November</h1>'
    data.response.holidays.forEach(element => {
        holiday += `<li><e>${element.name}</e> - <b>${element.date.iso}</b> ----- about holiday: ${element.description}</li> </br>`;
        // console.log(holiday)
    });
    document.querySelector("ul").innerHTML = holiday;
})
