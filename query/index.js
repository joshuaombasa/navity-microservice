const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const PORT = 4015

app.post('/events', (request, response) => {

})

app.get('', (request, response) => {

})

app.listen(PORT, () => {
    console.log(`server runnin on port ${PORT}`)
})