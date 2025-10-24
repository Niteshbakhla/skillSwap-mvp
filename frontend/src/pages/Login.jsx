import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { loginUser } from "../services/userService"

const Login = () => {
            const [email, setEmail] = useState("")
            const [password, setPassword] = useState("")

            const handleLogin = async (e) => {
                        e.preventDefault()
                        try {
                                    // console.log({ email, password })
                                    const userData = { email, password }
                                    const { data } = await loginUser(userData)
                                    console.log(data)
                        } catch (error) {
                                    console.error("Login error", error)
                        }
            }

            return (
                        <div className="flex items-center justify-center min-h-screen bg-gray-50">
                                    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                                                <h2 className="text-2xl font-bold mb-6 text-center">Login to your account</h2>
                                                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                                                            <Input
                                                                        type="email"
                                                                        placeholder="Email"
                                                                        value={email}
                                                                        onChange={(e) => setEmail(e.target.value)}
                                                            />
                                                            <Input
                                                                        type="password"
                                                                        placeholder="Password"
                                                                        value={password}
                                                                        onChange={(e) => setPassword(e.target.value)}
                                                            />
                                                            <Button type="submit" className="mt-2">
                                                                        Login
                                                            </Button>
                                                </form>
                                                <p className="text-sm text-gray-500 mt-4 text-center">
                                                            Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Signup</Link>
                                                </p>
                                    </div>
                        </div>
            )
}

export default Login
