import { useState } from "react"
import { signIn } from "../../services/authService"

function signInPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await signIn(email, password)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Sign In</button>
            </form>
        </>
    )
}

export default signInPage