import axios from "axios"
import { useEffect, useState } from "react"
import CreateReaction from "./CreateReactions"

export default function TweetsList() {

    const [tweets, setTweets] = useState([])

    useEffect(() => {
        async function fetchTweets() {
            const res = await axios.get('http://localhost:4015/tweets')
            setTweets(Object.values(res.data))
            console.log(Object.values(res.data))
        }

        fetchTweets()
    }, [])

    if (tweets.length === 0) {
        return <h1>Loading...</h1>
    }

    const tweetElements = tweets.map(tweet => {
        console.log(tweet)
        return (<div className="tweet-item" key={tweet.id}>
            <h2>{tweet.tweet}</h2>
            <CreateReaction/>
        </div>)
    })

    return (
        <div className="tweets-list">
            {tweetElements}
        </div>
    )
}