import axios from "axios"
import { useEffect, useState } from "react"
import CreateReaction from "./CreateReactions"
import ReactionsList from "./ReactionsList"

export default function TweetsList() {

    const [tweets, setTweets] = useState([])

    useEffect(() => {
        async function fetchTweets() {
            const res = await axios.get('http://localhost:4017/tweets')
            setTweets(Object.values(res.data))
            console.log(Object.values(res.data))
        }

        fetchTweets()
    }, [])

    if (tweets.length === 0) {
        return <h1>Loading...</h1>
    }

    const tweetElements = tweets.map(tweet => {
        return (<div className="tweet-item" key={tweet.tweetId}>
            <h2>{tweet.tweet}</h2>
            <ReactionsList reactions={tweet.reactions}/>
            <CreateReaction tweetId={tweet.tweetId}/>
        </div>)
    })

    return (
        <div className="tweets-list">
            {tweetElements}
        </div>
    )
}