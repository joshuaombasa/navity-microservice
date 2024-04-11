const express = require('express')
const cors = require('cors')
const axios = require('axios')
const { randomBytes } = require('crypto')

const app = express()
const PORT = 4015

app.use(cors())
app.use(express.json())

const tweets = {}

app.post('/tweets', (request, response) => {
    const id = randomBytes(4).toString('hex')
    const { tweet } = request.body

    tweets[id] = { id, tweet }

    response.status(201).send(tweets[id])
})

app.get('/tweets', (request, response) => {
    response.send(tweets)
})

app.listen(PORT, () => {
    console.log(`server runnin on port ${PORT}`)
})