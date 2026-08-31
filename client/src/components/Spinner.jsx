import '../styles/components/spinner.css'

function Spinner({ size = "large" }) {
    if (size === "large") {
        return (
            <div className="spinner-container">
                <div className="spinner spinner-large"></div>
            </div>
        )
    }

    return (
        <div className="spinner spinner-small"></div>
    )
}

export default Spinner