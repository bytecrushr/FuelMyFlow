"use client"
import React, { useState, useEffect } from 'react'
import { signIn, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'
import Image from 'next/image'


const Loginpage = () => {
    const [loginform, setLoginform] = useState({ email: "", password: "" })
    const [emailexist, setEmailexist] = useState()
    const [loading, setLoading] = useState(false);

    const router = useRouter()

    const { data: session } = useSession();
    useEffect(() => {
        if (session) {
            router.push("/account/dashboard");
        }
    }, [session]);

    const handleChange = (e) => {
        setLoginform({ ...loginform, [e.target.name]: e.target.value })
    }

    const handleContinue = async () => {
        try {
            setLoading(true)
            const res = await fetch("/api/account/check-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginform),
            });

            const data = await res.json();

            if (res.ok && data.exists) {
                setLoading(false)
                setEmailexist(true);
            } else {
                setLoading(false)
                setEmailexist(false);
            }
        } catch (err) {
            setLoading(false)
            console.error(err);
            toast("Something went wrong.");
        }
    }

    const handleLogin = async () => {
        try {
            setLoading(true)
            const res = await signIn("credentials", {
                redirect: false,
                email: loginform.email,
                password: loginform.password,
            });

            if (res.ok) {
                setLoading(false)
                router.push("/account/dashboard");
            } else {
                setLoading(false)
                toast("Invalid email or password");
            }

        } catch (err) {
            setLoading(false)
            console.error(err);
            toast("Something went wrong.");
        }
    };

    return (
        <div className='flex justify-center items-center h-screen relative'>
            <ToastContainer/>
            <div className=' w-full sm:max-w-2/4 sm:min-w-2/4  lg:max-w-2/5 lg:min-w-2/5  flex flex-col items-center gap-5 p-10 m-10 bg-indigo-950/30  '>
                <Link href={"/"}>
                <Image
                    width={70}
                    height={70}
                    quality={100}
                    src="/logo.png" alt="Logo" /></Link>
                 
                <h1 className='text-3xl font-bold'>Welcome Back</h1>
                <h2 className='text-2xl font-bold'>Log in</h2>
                <input onChange={handleChange} type="email" name="email" value={loginform.email} placeholder='Email Address' className='px-2 py-2 bg-zinc-300 w-full rounded-md text-black' />
                {emailexist === true &&
                    <input onChange={handleChange} type="password" name="password" value={loginform.password} placeholder='Password' className='px-2 py-2 bg-zinc-300 w-full rounded-md text-black' />}
                {/* continue button */}

                {emailexist ? (
                    <>
                        <button
                            disabled={!loginform.email || !loginform.password || loading}
                            onClick={() => handleLogin()}
                            className={`w-1/2 py-2 font-semibold flex justify-center text-center text-black rounded-full ${loginform.email && loginform.password ? "bg-amber-300 hover:bg-amber-400" : "bg-gray-300 cursor-not-allowed"
                                }`}>
                            {loading ? 
                            <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            : "Login"}
                        </button>
                        <Link href={"/auth/forgotpassword"} className='underline'>Forgot password?</Link>
                    </>
                ) : (
                    <button
                        disabled={!loginform.email || loading}
                        onClick={() => handleContinue()}
                        className={`w-1/2 py-2 font-semibold flex justify-center text-center text-black rounded-full ${loginform.email ? "bg-amber-300 hover:bg-amber-400" : "bg-gray-300 cursor-not-allowed"
                            }`}>
                        {loading ?
                            <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>

                            : "Continue"}
                    </button>

                )}

                <p>
                    {emailexist === false && (
                        <Link href="/auth/signup" className="text-blue-500 underline">
                            Account not found. Click here to sign up.
                        </Link>
                    )}
                </p>

                <p>or</p>

                <button onClick={() => { signIn("google", { callbackUrl: "/account/dashboard" }) }}
                    type="button" className="min-w-[210px] w-fit text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex  items-center dark:focus:ring-[#4285F4]/55">
                    <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                        <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
                    </svg>
                    Sign in with Google
                </button>

                {/* <button type="button" className="min-w-[210px] w-fit text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex  items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 ">
                    <svg className="w-5 h-5 me-2 -ms-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg>
                    Sign in with Apple
                </button> */}

                {/* <button type="button" className="min-w-[210px] w-fit text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex  items-center dark:focus:ring-[#3b5998]/55 ">
                    <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                        <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
                    </svg>
                    Sign in with Facebook
                </button> */}

                {/* <button  type="button" 
                className="min-w-[210px] w-fit text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 me-2 text-white" fill="white" viewBox="0 0 50 50">
                        <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z" fill="white"></path>
                    </svg>
                    Sign in with X
                </button> */}

                <button onClick={() => { signIn("github", { callbackUrl: "/account/dashboard", prompt: "login", }) }} type="button"
                    className="min-w-[210px] w-fit text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30">
                    <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                        viewBox="0 0 20 20">
                        <path fillRule="evenodd"
                            d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                            clipRule="evenodd" />
                    </svg>
                    Sign in with Github
                </button>
            </div>

        </div>
    )
}

export default Loginpage