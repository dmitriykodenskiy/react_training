const Notification = ({message}) => {
    if (!message) {
        return
    }
    const classList = message.type === 'error' ? 'error' : 'notification'

    return (
        <div className={classList}>
            {message.text}
        </div>
    )
}

export default Notification