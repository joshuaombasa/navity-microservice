const express = require('express')
const cors = require('cors')
const axios = require('axios')
const { randomBytes } = require('crypto')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 4016

const reactionsByTweetId = {}

app.post('/tweets/:id/reactions', async (request, response) => {
    const { reaction } = request.body
    console.log(request.body)
    const id = request.params.id
    const reactionId = randomBytes(4).toString('hex')
    const reactions = reactionsByTweetId[id] || []
    

    reactions.push({ id: reactionId, reaction, status: 'pending' })

    reactionsByTweetId[id] = reactions

    await axios.post(`http://navity-event-bus-srv:4020/events`,
        {
            type: 'ReactionCreated',
            data: { id: reactionId, reaction, tweetId: request.params.id, status: 'pending' }
        })

    response.status(201).json(reactions)
})

app.get('/tweets/reactions', (request, response) => {
    const id = request.params.id
    response.send(reactionsByTweetId)
})

app.post('/events', async (request, response) => {

    console.log(request.body)
    const event = request.body
    const { type, data } = event

    try {
        if (type === 'ReactionModerated') {
            const { id, reaction, tweetId, status } = data

            const reactions = reactionsByTweetId[tweetId]
            const itemToUpdate =reactions.find(reaction => reaction.id === id)
            itemToUpdate.status = status

            await axios.post(`http://navity-event-bus-srv:4020/events`,
            {
                type: 'ReactionUpdated',
                data: { id, reaction, tweetId, status }
            })
        }
        response.send({})
    } catch (error) {
        console.log(error.name)
    }
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})