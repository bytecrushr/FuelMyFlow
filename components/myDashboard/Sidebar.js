import Link from 'next/link'
import React from 'react'
import { useSession} from "next-auth/react"

const Sidebar = ({setActiveComponent,activeComponent,setClientConsole}) => {
    const { data: session } = useSession();
    return (
        <>
            {/* home */}
            <button onClick={()=>{setActiveComponent("home"); setClientConsole(false);}} className={`transition-all duration-500 cursor-pointer flex gap-3 items-center w-full py-2 px-5 mb-3 rounded-full ${activeComponent==="home"?"bg-gray-500/50":""} hover:bg-gray-500/50`} >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none">
                    <path d="M7.08848 4.76243L6.08847 5.54298C4.57181 6.72681 3.81348 7.31873 3.40674 8.15333C3 8.98792 3 9.95205 3 11.8803V13.9715C3 17.7562 3 19.6485 4.17157 20.8243C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8243C21 19.6485 21 17.7562 21 13.9715V11.8803C21 9.95205 21 8.98792 20.5933 8.15333C20.1865 7.31873 19.4282 6.72681 17.9115 5.54298L16.9115 4.76243C14.5521 2.92081 13.3724 2 12 2C10.6276 2 9.44787 2.92081 7.08848 4.76243Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M15 16.5H17V18.5M15 16.5V18.5H17M15 16.5L17 18.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <h4>Home</h4>
            </button>
            {/* my page  */}
            
            <Link onClick={()=>setClientConsole(false)} href={session ? `/${session.user.username}` : "/login"} target='_blank' className='transition-all duration-500 cursor-pointer flex gap-3 items-center w-full py-2 px-5 mb-3 rounded-full hover:bg-gray-500/50'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none">
                    <path d="M3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28248 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28248 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M2.5 9L21.5 9" stroke="#ffffff" strokeWidth="1.5"></path>
                </svg>
                <h4>My Page</h4>
            </Link>

             {/*  myProfile */}
             <button onClick={()=>{setActiveComponent("myProfile"); setClientConsole(false);}} className={`transition-all duration-500 cursor-pointer flex gap-3 items-center w-full py-2 px-5 mb-3 rounded-full ${activeComponent==="myProfile"?"bg-gray-500/50":""} hover:bg-gray-500/50`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none">
                    <path d="M15.5 8C15.5 5.23858 13.2614 3 10.5 3C7.73858 3 5.5 5.23858 5.5 8C5.5 10.7614 7.73858 13 10.5 13C13.2614 13 15.5 10.7614 15.5 8Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M3.5 20C3.5 16.134 6.63401 13 10.5 13C11.775 13 12.9704 13.3409 14 13.9365" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M20.1887 14.9339L19.5661 14.3113C19.151 13.8962 18.478 13.8962 18.0629 14.3113L14.7141 17.6601C14.269 18.1052 13.9656 18.6722 13.8421 19.2895L13.5 21L15.2105 20.6579C15.8278 20.5344 16.3948 20.231 16.8399 19.7859L20.1887 16.4371C20.6038 16.022 20.6038 15.349 20.1887 14.9339Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <h4>My Profile</h4>
            </button>

            {/* account setting */}
            <button onClick={()=>{setActiveComponent("accountSetting"); setClientConsole(false);}} className={`transition-all duration-500 cursor-pointer flex gap-3 items-center w-full py-2 px-5 mb-3 rounded-full ${activeComponent==="accountSetting"?"bg-gray-500/50":""} hover:bg-gray-500/50`} >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none">
                    <path d="M10.125 15L10.125 9M12 9V7.5M12 16.5V15M10.125 12H13.875M13.875 12C14.4963 12 15 12.5037 15 13.125V13.875C15 14.4963 14.4963 15 13.875 15H9M13.875 12C14.4963 12 15 11.4963 15 10.875V10.125C15 9.50368 14.4963 9 13.875 9H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21.011 14.0968C21.5329 13.9561 21.7939 13.8857 21.8969 13.7511C22 13.6166 22 13.4001 22 12.9672V11.0335C22 10.6006 22 10.3841 21.8969 10.2496C21.7938 10.115 21.5329 10.0446 21.011 9.90389C19.0606 9.37789 17.8399 7.33882 18.3433 5.40118C18.4817 4.8683 18.5509 4.60186 18.4848 4.4456C18.4187 4.28933 18.2291 4.18164 17.8497 3.96627L16.125 2.98704C15.7528 2.7757 15.5667 2.67003 15.3997 2.69253C15.2326 2.71503 15.0442 2.90304 14.6672 3.27904C13.208 4.73479 10.7936 4.73473 9.33434 3.27895C8.95743 2.90294 8.76898 2.71494 8.60193 2.69243C8.43489 2.66993 8.24877 2.7756 7.87653 2.98694L6.15184 3.96617C5.77253 4.18154 5.58287 4.28922 5.51678 4.44546C5.45068 4.60171 5.51987 4.86818 5.65825 5.40111C6.16137 7.3388 4.93972 9.37794 2.98902 9.9039C2.46712 10.0446 2.20617 10.115 2.10308 10.2495C2 10.3841 2 10.6006 2 11.0335V12.9672C2 13.4001 2 13.6166 2.10308 13.7511C2.20615 13.8857 2.46711 13.9561 2.98902 14.0968C4.9394 14.6228 6.16008 16.6619 5.65672 18.5995C5.51829 19.1324 5.44907 19.3988 5.51516 19.5551C5.58126 19.7114 5.77092 19.8191 6.15025 20.0344L7.87495 21.0137C8.24721 21.225 8.43334 21.3307 8.6004 21.3082C8.76746 21.2857 8.95588 21.0977 9.33271 20.7216C10.7927 19.2647 13.2088 19.2646 14.6689 20.7215C15.0457 21.0976 15.2341 21.2856 15.4012 21.3081C15.5682 21.3306 15.7544 21.2249 16.1266 21.0136L17.8513 20.0343C18.2307 19.819 18.4204 19.7113 18.4864 19.555C18.5525 19.3987 18.4833 19.1323 18.3448 18.5995C17.8412 16.6619 19.0609 14.6229 21.011 14.0968Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <h4>Account Setting</h4>
            </button>
            {/* Payout */}
            <button onClick={()=>{setActiveComponent("payout"); setClientConsole(false);}} className={`transition-all duration-500 cursor-pointer flex gap-3 items-center w-full py-2 px-5 mb-3 rounded-full ${activeComponent==="payout"?"bg-gray-500/50":""} hover:bg-gray-500/50`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none">
                    <path d="M19.7453 13C20.5362 11.8662 21 10.4872 21 9C21 5.13401 17.866 2 14 2C10.134 2 7 5.134 7 9C7 10.0736 7.24169 11.0907 7.67363 12" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M14 6C12.8954 6 12 6.67157 12 7.5C12 8.32843 12.8954 9 14 9C15.1046 9 16 9.67157 16 10.5C16 11.3284 15.1046 12 14 12M14 6C14.8708 6 15.6116 6.4174 15.8862 7M14 6V5M14 12C13.1292 12 12.3884 11.5826 12.1138 11M14 12V13" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path>
                    <path d="M3 14H5.39482C5.68897 14 5.97908 14.0663 6.24217 14.1936L8.28415 15.1816C8.54724 15.3089 8.83735 15.3751 9.1315 15.3751H10.1741C11.1825 15.3751 12 16.1662 12 17.142C12 17.1814 11.973 17.2161 11.9338 17.2269L9.39287 17.9295C8.93707 18.0555 8.449 18.0116 8.025 17.8064L5.84211 16.7503M12 16.5L16.5928 15.0889C17.407 14.8352 18.2871 15.136 18.7971 15.8423C19.1659 16.3529 19.0157 17.0842 18.4785 17.3942L10.9629 21.7305C10.4849 22.0063 9.92094 22.0736 9.39516 21.9176L3 20.0199" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <h4>Payout</h4>
            </button>
        </>
    )
}

export default Sidebar