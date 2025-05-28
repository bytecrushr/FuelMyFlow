"use client"
import React, { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import Link from 'next/link'
import { toast } from 'react-toastify';

const AccountSetting = ({ setActiveComponent }) => {
    const [accountdetails, setAccountdetails] = useState({ name: "", username: "", email: "", })
    const { data: session, update } = useSession();
    const [active, setActive] = useState("general");
    const [passwordform, setPasswordform] = useState({ oldPassword: "", newPassword: "", confirmPassword: "", id: "" })
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setAccountdetails({
            name: session.user.name || "",
            username: session.user.username || "",
            email: session.user.email || "",
            updatedAt: session.user.updatedAt,
            id: session.user.id
        });
        setPasswordform({ ...passwordform, id: session.user.id })
    }, [session]);

    const handleGeneralChange = (e) => {
        setAccountdetails({ ...accountdetails, [e.target.id]: e.target.value })
    }

    const handlePasswordChange = (e) => {
        setPasswordform({ ...passwordform, [e.target.name]: e.target.value })
    }

    //General Setting
    const handleSave = async () => {
        try {
            setLoading(true)
            const res = await fetch("/api/dashboard/accountsetting/general", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(accountdetails),
            });

            const data = await res.json();

            if (res.ok) {
                update()
                setLoading(false)
                toast("Account Setting updated!");
                setActiveComponent("home")
            } else {
                setLoading(false)
                toast(data.error || "Failed to update Account.");
            }
        } catch (err) {
            setLoading(false)
            console.error(err);
            toast("Something went wrong.");
        }
    };

    //Password setting
    const handleUpdate = async () => {
        try {
            setLoading(true)
            const res = await fetch("/api/dashboard/accountsetting/password", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(passwordform),
            });

            const data = await res.json();

            if (res.ok) {
                setLoading(false)
                toast("Password updated!");
                setActive("general")
            } else {
                setLoading(false)
                toast(data.error || "Failed to update password.");
            }
        } catch (err) {
            setLoading(false)
            console.error(err);
            toast("Something went wrong.");
        }

    }

    return (
        <div className='py-10 sm:px-10 lg:px-25 w-full xl:w-1/2 xl:px-0 h-fit'>
            <h1 className='text-2xl font-bold px-3 '>Account Setting</h1>
            <div className='px-3 text-lg font-semibold my-2 flex gap-5'>
                <h2 onClick={() => setActive("general")} className={`${active === "general" ? "text-white" : "text-zinc-400"} cursor-pointer`}>General Setting</h2>
                <h2 onClick={() => setActive("password")} className={`${active === "password" ? "text-white" : "text-zinc-400"} cursor-pointer`}>Change Password</h2>
            </div>

            {/* //Generaltab */}
            {active === "general" &&
                <div className='p-10  bg-indigo-950/60 rounded-lg'>
                    <label className='text-lg' htmlFor="name">Name <span className='text-red-400'>{accountdetails.name ? "" : "* required"}</span></label>
                    <input onChange={handleGeneralChange} value={accountdetails.name} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg  ' placeholder='Name' type="text" name="name" id="name" />

                    <label className='text-lg' htmlFor="username">Username <span className='text-red-400'>{accountdetails.username ? "" : "* required"}</span></label>
                    <input onChange={handleGeneralChange} value={accountdetails.username} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg  ' placeholder='Username' type="text" id="username" />

                    <label className='text-lg' htmlFor="email">Email <span className='text-red-400'>{accountdetails.email ? "" : "* required"}</span></label>
                    <input onChange={handleGeneralChange} value={accountdetails.email} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg  ' placeholder='Email' type="email" id="email" />

                    <button disabled={!accountdetails.name || !accountdetails.email || !accountdetails.username} onClick={() => handleSave()}
                        className="disabled:bg-zinc-500 text-black bg-amber-300 border hover:bg-amber-400  rounded-full px-5 py-3 w-full mx-2 my-5 font-semibold flex justify-center gap-2">
                        {loading ?
                            <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg> :
                            <span>Save</span>
                        }
                    </button>
                </div>
            }

            {/* pass change tab */}
            {active === "password" &&
                <div className='p-10  bg-indigo-950/60 rounded-lg'>
                    <p className='text-sm'>*Setting password for first time?<Link className='underline' href={"/auth/forgotpassword"} > Click here</Link></p>
                    {passwordform.oldPassword === passwordform.newPassword && passwordform.oldPassword && passwordform.newPassword &&
                        <p className={`text-sm text-red-400`}>
                            *Old Password and New password cannot be same.</p>
                    }
                    {/* <p className={`text-sm ${passwordform.oldPassword === passwordform.newPassword?"text-red-400":"text-white"}`}>
                        *Old Password and New password cannot be same.</p> */}

                    <label className='text-lg' htmlFor="oldPassword">Old Password</label>
                    <input onChange={handlePasswordChange} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg  ' placeholder='Old Password' type="password" name="oldPassword" />
                    <label className='text-lg' htmlFor="newPassword">New Password</label>
                    <input onChange={handlePasswordChange} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg  ' placeholder='New Password' type="password" name="newPassword" />
                    <label className='text-lg' htmlFor="confirmPassword">Conifrm Password</label>
                    <input onChange={handlePasswordChange} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg  ' placeholder='Confirm Password' type="password" name="confirmPassword" />
                    {passwordform.confirmPassword !== passwordform.newPassword && passwordform.newPassword && passwordform.confirmPassword &&
                        <p className='text-sm text-red-400'>Confirm Password not same as New Password.</p>}
                    <button disabled={!passwordform.oldPassword || !passwordform.newPassword || !passwordform.confirmPassword || passwordform.confirmPassword !== passwordform.newPassword} onClick={() => handleUpdate()}
                        className="disabled:bg-zinc-500 text-black bg-amber-300 border hover:bg-amber-400  rounded-full px-5 py-3 w-full mx-2 my-5 font-semibold flex justify-center gap-2">
                        {loading ?
                            <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg> :
                            <span>Update</span>
                        }
                    </button>
                </div>
            }
        </div>
    )
}

export default AccountSetting