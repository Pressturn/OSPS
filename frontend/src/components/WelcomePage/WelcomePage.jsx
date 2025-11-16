import { Link } from 'react-router-dom'

function WelcomePage() {
    return (
        <div>
            <h1>Welcome to OSPS</h1>
            <p>Chase your friends for money with ease</p>
            <div>
                <Link to="/signup">
                    <button>Sign Up</button>
                </Link>
                <Link to="/signin">
                    <button>Sign In</button>
                </Link>
            </div >
        </div >
    )
}

export default WelcomePage