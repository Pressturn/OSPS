import axios from "axios"
const BASE_URL = "http://localhost:3000";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

const signIn = async (email, password) => {
    try {
        const response = await api.post("/auth/signin", { email, password })

        localStorage.setItem("token", response.data.token)
        localStorage.setItem("userId", response.data.user._id)

        return response.data
    } catch (error) {
        console.error("Error signing in:", error)
        throw error
    }
}