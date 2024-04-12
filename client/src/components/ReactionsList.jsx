

export default function ReactionsList({reactions}) {
    let content

    let reactionStyling
    
    const reactionElements = reactions.map(item => {
        if (item.status === 'approved') {
            content = item.reaction
            reactionStyling = {color: 'blue'}
        }

        if (item.status === 'pending') {
            content = 'This reaction is awaiting moderation'
            reactionStyling = {color: 'green'}
        }

        if (item.status === 'rejected') {
            content = 'This reaction has been flagged as inappropriate'
            reactionStyling = {color: 'red',style: 'italic'}
        }

        return (<li key={item.id} style={reactionStyling}>{content}</li>)
    })
    return (
        <div className="reactions-list">
            {reactionElements}
        </div>
    )
}