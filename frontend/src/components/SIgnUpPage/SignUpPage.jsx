import { useState } from "react"
import { signUp } from "../../services/authService"

function signUpPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await signUp(name, email, password)
            setSusccess("Account created, directing to sign in")
            window.location.href = "/signin"
        } catch (error) {
            setError("Signup Failed. Email is in use")
            console.error(error)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button type="submit">Sign Up</button>
            </form>
        </>
    )
}

export default signUpPage