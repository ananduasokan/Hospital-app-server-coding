
//    server coding

const express = require('express');
const bodyParser = require('body-parser');

// datas of the patients

const patients = [{
    name: 'Anandu',
    number: '8921345961',
    dob: '22/06/1995',
    city: 'Trivandrum',
    roomNo: '1',
}];

const availableBeds = 2;
  
const app = express();
  
app.set('view engine', 'ejs');
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
  
    

app.get("/", function (req, res) {
    res.render("home", {data: patients});
});

// entering datas into the Database
  
app.post("/", (req, res) => {
    const name = req.body.name
    const number = req.body.number
    const dob = req.body.dob
    const city = req.body.city
    if (patients.length < availableBeds) {
        const roomNo = patients.length + 1;
  
        patients.push({
            name: name,
            number: number,
            dob: dob,
            city: city,
            roomNo: roomNo
        });
  
        res.render("home", {
            data: patients
        });
    } 
    else {
        res.send("No room available");
    }
});
  
app.post('/discharge', (req, res) => {
    var name = req.body.name;
  
    var j = 0;
    patients.forEach(patient => {
        j = j + 1;
        if (patient.name == name) {
            patients.splice((j - 1), 1)
        }
    });
  
    res.render("home", {
        data: patients
    });
});

// port number listening
  
app.listen(3000, (req, res) => {
    console.log("App is running on port 3000")
});
