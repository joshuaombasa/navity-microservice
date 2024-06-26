const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const PORT = 4020

const events = []

app.use(cors())
app.use(express.json())

app.post('/events', async (request, response) => {
    const event = request.body
    console.log(event)
    console.log("latest is running")
    events.push(event)

    try {
        await axios.post(`http://tweets-srv:4015/events`, event)
        await axios.post(`http://reactions-srv:4016/events`,event)
        await axios.post(`http://moderation-srv:4018/events`,event)
        await axios.post(`http://query-srv:4017/events`,event)


        response.json({ status: 'Ok' })
    } catch (error) {
        console.log(error.name)
    }
})

app.get('/events', (request, response) => {
    response.send(events)
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})