const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const PORT = 4018

app.use(express.json())

app.post('/events', async (request, response) => {

    console.log(request.body)
    const event = request.body
    const { type, data } = event

    try {
        if (type === 'ReactionCreated') {
            const { id, reaction, tweetId, status } = data
            const statusValue = reaction.includes('sex') ? 'rejected' : 'approved'

            await axios.post(`http://localhost:4020/events`,
            {
                type: 'ReactionModerated',
                data: { id, reaction, tweetId, status: statusValue }
            })
        }

        response.send({})
    } catch (error) {

    }
})

app.get('', (request, response) => {

})

app.listen(PORT, () => {
    console.log(`server runnin on port ${PORT}`)
})