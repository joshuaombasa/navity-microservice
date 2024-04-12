import { useState } from "react"
import axios from "axios"

export default function CreateReaction({tweetId}) {
    const [reaction,setReaction] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()
        const res = await axios.post(`http://localhost:4016/tweets/${tweetId}/reactions`, { reaction })
        setReaction('')
    }

    return (
        <div className="create-reaction">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={reaction}
                    onChange={e => setReaction(e.target.value)}
                />
                <button>React</button>
            </form>
        </div>
    )
}