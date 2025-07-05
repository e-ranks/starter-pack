import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import React, { useState } from "react"

const SignIn: React.FC = () => {
    const router = useRouter()
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        const res = await signIn('credentials', {
            redirect: false,
            email,
            password
        })

        if (res?.ok) return router.push('/')
        setError('invalid credentials')
        alert('invalid credentials')
    }

    return (
        <div className="flex min-h-screen bg-gray-800 text-white items-center justify-center" >
            <div className="border-2 border-blue-500 shadow-2xl   h-[500px] w-[500px] rounded-sm flex flex-col items-center text-white p-4">
                <h1 className="uppercase font-semibold">Sign In</h1>
                <div className="flex flex-col items-center justify-center mt-4 w-full">
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        type="text"
                        className="border-2  border-blue-500 rounded-sm p-4 w-full focus:border-gray-800 focus:border-2"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                        className="mt-3 border-2  border-blue-500 rounded-sm p-4 w-full focus:border-gray-800 focus:border-2"
                    />

                    <button
                        onClick={handleSubmit}
                        type="button"
                        className="bg-blue-600 w-full mt-5 uppercase font-semibold py-4 px-6 cursor-pointer hover:bg-blue-700"
                    >
                        signin
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SignIn