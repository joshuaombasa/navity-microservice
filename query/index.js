const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const PORT = 4017

app.use(express.json())
app.use(cors())

const tweets = {

}

const handleEvents = (type, data) => {
    if (type === 'TweetCreated') {
        const { id, tweet } = data

        tweets[id] = { tweetId: id, tweet, reactions: [] }
    }

    if (type === 'ReactionCreated') {
        const { id, reaction, tweetId, status } = data
        tweets[tweetId].reactions.push({ id, reaction, status })
    }

    if (type === 'ReactionUpdated') {
        const { id, reaction, tweetId, status } = data
        const reactionToUpdate = tweets[tweetId].reactions.find(reaction => reaction.id === id)

        reactionToUpdate.status = status
        reactionToUpdate.reaction = reaction
    }
}

app.post('/events', (request, response) => {
    console.log(request.body)
    const event = request.body
    const { type, data } = event

    handleEvents(type, data)

    response.send({})
})

app.get('/tweets', (request, response) => {
    response.send(tweets)
})

app.listen(PORT, async () => {
    console.log(`server runnin on port ${PORT}`)

    const res = await axios.get(`http://localhost:4020/events`)

    const events = res.data

    for (let event of events) {
        const { type, data } = event
        console.log('processing event:', type)
        handleEvents(type, data)
    }
})