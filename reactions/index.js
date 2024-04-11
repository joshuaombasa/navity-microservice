const express = require('express')
const cors = require('cors')
const axios = require('axios')
const { randomBytes } = require('crypto')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 4016

const reactionsByTweetId = {}

app.post('/tweets/:id/reactions', (request, response) => {
    const { reaction } = request.body
    console.log(request.body)
    const id = request.params.id
    const reactionId = randomBytes(4).toString('hex')
    const reactions = reactionsByTweetId[id] || []

    reactions.push({ id: reactionId, reaction })

    reactionsByTweetId[id] = reactions

    response.status(201).json(reactions)
})

app.get('/tweets/:id/reactions', (request, response) => {
    const id = request.params.id
    response.send(reactionsByTweetId[id] || [])
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})