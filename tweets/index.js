const express = require('express')
const cors = require('cors')
const axios = require('axios')
const { randomBytes } = require('crypto')

const app = express()
const PORT = 4015

app.use(cors())
app.use(express.json())

const tweets = {}

app.post('/tweets', async (request, response) => {
    const id = randomBytes(4).toString('hex')
    const { tweet } = request.body

    tweets[id] = { id, tweet }

    try {
        await axios.post(`http://navity-event-bus-srv:4020/events`,
            {
                type: 'TweetCreated',
                data: { id, tweet }
            })

        response.status(201).send(tweets[id])
    } catch (error) {
        console.log(error)
    }
})

app.get('/tweets', (request, response) => {
    response.send(tweets)
})

app.post('/events', async (request, response) => {
    console.log(request.body)
    try {
        response.send({})
    } catch (error) {
        console.log(error.name)
    }
})

app.listen(PORT, () => {
    console.log(`server runnin on port ${PORT}`)
})