import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button" // make sure your Button is JS version          
import { Link } from "react-router-dom"
import { signupUser } from "../services/userService"

const Signup = () => {
            const [name, setName] = useState("")
            const [email, setEmail] = useState("")
            const [password, setPassword] = useState("")

            const handleSignup = async (e) => {
                        try {
                                    e.preventDefault()
                                    const userData = { name, email, password }
                                    const { data } = await signupUser(userData);
                                    console.log(data)
                        } catch (error) {
                                    console.log("Signup error", error);
                        }

            }

            return (
                        <div className="flex items-center justify-center min-h-screen bg-gray-50">
                                    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                                                <h2 className="text-2xl font-bold mb-6 text-center">Create your account</h2>
                                                <form onSubmit={handleSignup} className="flex flex-col gap-4">
                                                            <Input
                                                                        placeholder="Full Name"
                                                                        value={name}
                                                                        onChange={(e) => setName(e.target.value)}
                                                            />
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
                                                                        Signup
                                                            </Button>
                                                </form>
                                                <p className="text-sm text-gray-500 mt-4 text-center">
                                                            Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                                                </p>
                                    </div>
                        </div>
            )
}

export default Signup
