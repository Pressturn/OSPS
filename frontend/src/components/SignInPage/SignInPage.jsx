import { useState } from "react"
import { signIn } from "../../services/authService"
import { Link } from "react-router-dom"
import "./SignInPage.css"

function signInPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await signIn(email, password)
            window.location.href = "/dashboard"
        } catch (error) {
            setError("Invalid credentials")
            console.error(error)
        }
    }

    return (
        <div className="signin-container">
            <div className="signin-box">
                <h1 className="signin-title">Welcome Back</h1>
                <p className="signin-subtitle">Sign in to your OSPS account</p>
                <form onSubmit={handleSubmit} className="signin-form">
                    <input
                        types="email"
                        placeholder="Email"
                        className="form-input"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="form-input"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <button type="submit" className="signin-btn"
                    >Sign In
                    </button>
                </form>

                {error && <p className="error-message">{error}</p>}
                <p className="signin-link">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    )
}

export default signInPage