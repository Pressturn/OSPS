import { Link } from 'react-router-dom'
import "./WelcomePage.css"

function WelcomePage() {
    return (
        <div className="welcome-container">
            <div className="welcome-box">
                <h1 className="welcome-title">Welcome to OSPS</h1>
                <p className="welcome-subtitle">Online Split Payment System</p>
                <p className="welcome-subtitle">Chase your friends for money with ease</p>
                <div className="welcome-buttons">
                    <Link to="/signup" className="welcome-btn btn-signup">
                        Sign Up
                    </Link>
                    <Link to="/signin" className="welcome-btn btn-signin">
                        Sign In
                    </Link>
                </div >
            </div >
        </div >
    )
}

export default WelcomePage