const express = require('express');
const app = express();
const port = 4000;
const routes = require('./routes')

app.use(express.json())
app.use('/', routes)


app.listen(port, () => {
    console.log("Gateway is started on port ", port)
})