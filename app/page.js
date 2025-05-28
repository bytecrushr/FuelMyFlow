"use client"
import FeatureCarousel from "@/components/FeatureCarousel";
import Link from "next/link";
import { useSession } from "next-auth/react"
import { ToastContainer } from "react-toastify";
 
export default function Home() {

    const { data: session } = useSession();
    return (
        <div className="">
            <ToastContainer/>
            <div className="flex flex-col justify-center items-center gap-5 p-5 m-5 sm:p-10 sm:m-10 sm:bg-indigo-950/30  ">
                <h1 className="text-3xl font-bold">Fuel My Flow</h1>
                <p className="text-lg text-center">FuelMyFlow is a creator support platform that enables individuals to receive direct contributions from audience</p>
                {session ? (
                    <Link href={"/account/dashboard"}><button type="button" className="text-white bg-indigo-950 hover:bg-white border border-indigo-500 hover:text-black font-semibold rounded-lg px-5 py-2.5 w-fit ">
                        Go to Dashboard
                    </button></Link>
                ) : (
                    <>
                        <Link href={"/auth/signup"}><button type="button" className="text-white bg-indigo-950 hover:bg-white border border-indigo-500 hover:text-black font-semibold rounded-lg px-5 py-2.5 w-fit ">
                            Get Started
                        </button></Link>
                        <p className="text-lg text-center">It’s free and takes less than a minute!</p>
                        <div className="flex flex-col items-center justify-center sm:gap-3 sm:flex-row ">
                            <span className="text-zinc-400">Already have an account?</span>
                            <Link href="/auth/login" className="underline" >Log in</Link>
                        </div>
    
                    </>
                )}


            </div>

            <FeatureCarousel />

        </div>

    );
}
