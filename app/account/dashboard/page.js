"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import AccountSetting from '@/components/myDashboard/AccountSetting'
import Sidebar from '@/components/myDashboard/Sidebar'
import Home from '@/components/myDashboard/Home'
import MyProfile from '@/components/myDashboard/MyProfile'
import Payout from '@/components/myDashboard/Payout'
import { ToastContainer} from 'react-toastify';

const Dashboard = () => {
    const [activeComponent, setActiveComponent] = useState("home")
    const [clientConsole, setClientConsole] = useState(false)
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push("/auth/login");
        }
    }, [session, status,router])

    if (status === "loading" || !session) {
        return null;
      }


    const renderComponent = () => {
        switch (activeComponent) {
            case 'home':
                return <Home />;
            case 'accountSetting':
                return <AccountSetting setActiveComponent={setActiveComponent} />;
            case 'myProfile':
                return <MyProfile activeComponent={activeComponent} setActiveComponent={setActiveComponent} />;
            case 'payout':
                return <Payout />;
            default:
                return null;
        }
    };

    return (
        <div>
            <ToastContainer/>
            <div className=' sm:hidden w-full flex justify-center mt-5'>
                <div onClick={() => setClientConsole(!clientConsole)} className='w-fit flex items-cente'>
                    <h3>Client Console</h3>
                    {clientConsole ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                            <path d="M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                            <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                </div>
            </div>

            <div style={{ height: "calc(100vh - 160px)" }} className='w-full flex '>
                <div className={`${clientConsole===true?"block px-10":"hidden"} bg-indigo-950/30 my-5 ml-5 w-full sm:block sm:w-3/10 lg:w-5/20 xl:w-1/5 p-3`}>
                    <Sidebar setClientConsole={setClientConsole} activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
                </div>

                <div className={`${clientConsole===false?"block":"hidden"} bg-indigo-950/30 my-5  mx-5 w-full sm:w-7/10 lg:w-15/20 xl:w-4/5 flex justify-center overflow-y-auto`}>
                    {renderComponent()}
                </div>
            </div>
        </div>
    )
}

export default Dashboard