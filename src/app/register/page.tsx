"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../firebase";
import { useRouter } from "next/navigation";
import { addUser } from "../../../firestore";
import { createBridgeUser, getBridgeToken } from "../../../bridge";


export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const [name, setName] = useState("")

    async function handleSubmit(event: FormEvent) {
        event.preventDefault(); setError("");
        if (password !== confirmation) {
            setError("Passwords don't match");
            return;
        }
        try {
            const userInfo = await createUserWithEmailAndPassword(getAuth(app), email, password);
            const credential = await signInWithEmailAndPassword( getAuth(app), email, password );
            const idToken = await credential.user.getIdToken();
            const bridgeUser = await createBridgeUser()
            const bridgeToken = await getBridgeToken(bridgeUser.uuid)
            await addUser(userInfo.user.uid, name, email, bridgeUser.uuid, bridgeToken.access_token, bridgeToken.expires_at )
            await fetch("/api/login", {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            });
            router.push("/");
        } catch (e) {
            setError((e as Error).message);
        }

    } return ( 
        <main className="flex min-h-screen flex-col items-center justify-center p-8">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Pray tell, who be this gallant soul seeking entry to mine humble abode?
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#" >
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                                Your email
                            </label>
                            <input 
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                                Your name
                            </label>
                            <input 
                                type="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                                Confirm password
                            </label>
                            <input
                                type="password"
                                name="confirm-password"
                                value={confirmation}
                                onChange={(e) => setConfirmation(e.target.value)}
                                id="confirm-password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                />
                        </div> 
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert" >
                                <span className="block sm:inline">
                                    {error}
                                </span>
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
                        >
                            Create an account
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account?{" "}
                        <Link href="/login" className="font-medium text-gray-600 hover:underline dark:text-gray-500" >
                            Login here
                        </Link>
                        </p>
                    </form>
                </div>
            </div>
        </main>
    );
}
