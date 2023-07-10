const express = require('express');
const app = express()
const port = 3000;
const axios = require('axios')


app.use(express.json())

app.get('/user/dashboard', (req, res) => {
    res.send("i am at dashboard  api")
})
app.post('/login', (req, res) => {
    console.log(req.body.name)
    res.send(`i am  post request at login api ${req.body}`)
})
app.post('/history', (req, res) => {
    console.log(req.body.name)
    res.send(`i am at history api having post request ${req.body}`)
})

app.listen(port, () => {
    let data = {
        "fundname": "sara",
        "url": "http://localhost:3000",
        "endpoints": [
            "user/dashboard",
            "login",
            "history"
        ]
    }
    axios.post('http://localhost:4000/addtoregistry', data)
        .then((responce) => {
            console.log(responce.data);
        })
    console.log("server running at port ", port)
})