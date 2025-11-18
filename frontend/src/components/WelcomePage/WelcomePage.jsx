import { Link } from 'react-router-dom'
import "./WelcomePage.css"

function WelcomePage() {
    return (
        <div className="page-container">
            <div className="page-box welcome-box">
                <h1 className="page-title welcome-title">Welcome to OSPS</h1>
                <p className="page-subtitle" >Online Split Payment System</p>
                <p className="welcome-description">Chase your friends for money with ease</p>
                <div className="welcome-buttons">
                    <Link to="/signup" className="btn-primary">
                        Sign Up
                    </Link>
                    <Link to="/signin" className="btn-secondary">
                        Sign In
                    </Link>
                </div >
            </div >
        </div >
    )
}

export default WelcomePage