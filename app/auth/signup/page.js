"use client"
import React, { useState ,useEffect} from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'
import Image from 'next/image'

const Signuppage = () => {
    const [signupform, setSignupform] = useState({email:"",password:"",confirmpassword:""})
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
        setSignupform({...signupform,[e.target.name]:e.target.value})
    }

    const handleContinue = async () => {
        try {
            setLoading(true)
            const res = await fetch("/api/account/check-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupform),
            });

            const data = await res.json();

            if (res.ok && data.exists) {
                setEmailexist(true);
                setLoading(false)
            } else {
                setEmailexist(false);
                setLoading(false)
            }
        } catch (err) {
            setLoading(false)
            console.error(err);
            toast("Something went wrong.");
        }
    }

    const handleSignup = async () => {
        try {
            setLoading(true)
            const res = await fetch("/api/account/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupform),
            });

            const data = await res.json();

            if (res.ok) {
                setLoading(false)
                toast("Signup Successful!");
                router.push("/auth/login");
            } else {
                setLoading(false)
                toast(data.error || "Failed to Signup.");
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
            <div className=' w-full sm:max-w-1/4 sm:min-w-1/4 flex flex-col items-center gap-5 p-10 m-10 bg-indigo-950/30  '>
                <Link href={"/"}><Image
                width={70} 
                height={70} 
                quality={100}
                src="/logo.png" alt=""  /></Link>
                <div className='flex flex-col items-center'>
                <h1 className='text-3xl font-bold'>Welcome</h1>
                <h2 className='text-2xl font-bold'>Sign up</h2>
                </div>
                <input onChange={handleChange} type="email" name="email" value={signupform.email} placeholder='Email Address' className='px-2 py-2 bg-zinc-300 w-full rounded-md text-black' />
                {emailexist && <Link href={"/auth/login"} className='text-sm text-red-400 underline'>Email Already exist, click here to login</Link>}

                {emailexist===false &&
                <>
                <input onChange={handleChange} type="password" name="password" value={signupform.password} placeholder='Password' className='px-2 py-2 bg-zinc-300 w-full rounded-md text-black' />
                <input onChange={handleChange} type="password" name="confirmpassword" value={signupform.confirmpassword} placeholder='Conifrm Password' className='px-2 py-2 bg-zinc-300 w-full rounded-md text-black' />
                {signupform.confirmpassword!= signupform.password && <p className='text-sm text-red-400'>Password do not match</p>}

                </>}

                {/* continue button */}

                {emailexist===false?(
                    <>
                <button
                    disabled={!signupform.email || !signupform.password || !signupform.confirmpassword || loading}
                    onClick={() => handleSignup()}
                    className={`w-1/2 py-2 font-semibold flex justify-center text-center text-black rounded-full ${signupform.email && signupform.password &&signupform.confirmpassword && signupform.password===signupform.confirmpassword ? "bg-amber-300 hover:bg-amber-400" : "bg-gray-300 cursor-not-allowed"
                        }`}>
                    {loading?
                    <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    :"Sign up"}
                </button>
                <Link href={"/auth/forgotpassword"} className='underline'>Forgot password?</Link>
                </>
                ):(
                <button
                    disabled={!signupform.email || loading}
                    onClick={() => handleContinue()}
                    className={`w-1/2 py-2 font-semibold flex justify-center text-center text-black rounded-full ${signupform.email ? "bg-amber-300 hover:bg-amber-400" : "bg-gray-300 cursor-not-allowed"
                        }`}>
                    {loading?
                    <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                    :"Continue"}
                </button>

                )}  
            </div>

        </div>
    )
}

export default Signuppage