import { useState } from "react"


export default function CreateReaction() {
    const [reaction,setReaction] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()
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