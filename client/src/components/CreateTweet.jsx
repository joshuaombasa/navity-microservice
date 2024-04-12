import axios from "axios"
import { useState } from "react"


export default function CreateTweet() {
    const [tweet, setTweet] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()
        const res = await axios.post(`http://localhost:4015/tweets`, { tweet: tweet })
        setTweet('')
    }

    return (
        <div className="create-tweet">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={tweet}
                    placeholder="write tweet ..."
                    onChange={e => setTweet(e.target.value)}
                />
                <button>Tweet</button>
            </form>
        </div>
    )
}