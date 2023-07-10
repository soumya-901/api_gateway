const express = require('express')
const router = express.Router();
const axios = require('axios')
const registry = require('./resgistry.json')
const fs = require('fs');

router.all('/:fundname/:path', async (req, res) => {
    console.log(req.params);
    let fund = req.params.fundname;
    let path = req.params.path;
    console.log(registry[fund].endpoints.includes(path))
    if (registry[fund] && registry[fund].endpoints.includes(path)) {
        let config = {
            method: req.method,
            url: `${registry[fund].url}/${path}`,
            data: req.body,
        }
        console.log(config, "config")
        axios(config)
            .then(response => {
                console.log(response.data);
                res.send(response.data)
            })
            .catch(error => {
                console.error('Error making POST request:', error);
                res.send(error)
            });

    }
    else {
        res.send('api doesnot exist')
    }
})

router.post('/addtoregistry', (req, res) => {
    //   registry[req.body]
    console.log(req.body?.fundname)
    let newfund = req.body;
    // if (registry[newfund.fundname]) {
    //     res.send("already added")
    // }
    // else {

    registry[newfund.fundname] = { ...newfund }
    let jsonData = JSON.stringify(registry, null, 2); // Convert JavaScript object to JSON string with indentation (null, 2)
    fs.writeFile('resgistry.json', jsonData, 'utf8', (err) => {
        if (err) {
            console.error('Error writing JSON file:', err);
            res.send("error in registry file")
        } else {
            console.log('JSON file has been written successfully.');
            res.send("added to registry")
        }
    });
    // res.send("in register api")
    // }
})

module.exports = router;