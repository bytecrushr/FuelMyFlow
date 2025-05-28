"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Creatorspage = () => {
    const [loading, setLoading] = useState(true)
    const [trendingCreators, setTrendingCreators] = useState([])
    useEffect(() => {
        const fetchCreators = async () => {
            try {
                const res = await fetch(`/api/creators`);

                const data = await res.json();

                if (!res.ok) {
                    toast("Error fetching creators");
                    return;
                }

                setTrendingCreators(data);
                setLoading(false);
            } catch (err) {
                toast(`Error fetching creators: ${err.message}`);
            }
        };

        fetchCreators();
    }, []);


    return (
        <div style={{ height: "calc(100vh - 160px" }} className='flex justify-center items-center relative'>
            {loading ?
                <div className='flex flex-col justify-center items-center'>
                    <p>Loading, Please wait</p>
                    <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                </div> :

                <div className=' w-full sm:max-w-2/4 sm:min-w-2/4 flex flex-col items-center m-5 sm:m-10 bg-white rounded-lg '>
                    <div className='p-5 rounded-t-lg bg-gray-300 w-full flex items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none">
                            <path d="M17 17L21 21" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        <input className='px-3 w-full border-none focus:outline-none focus:ring-0 focus:border-transparent text-zinc-700' type="text" id="search" placeholder='Search Creators' />
                    </div>
                    <div className='w-full py-2'>
                        <div className='flex gap-2 w-full items-center p-3' >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ae6518" fill="none">
                                <path d="M12 22C16.1421 22 19.5 18.6421 19.5 14.5C19.5 13.5 19.5 11.5 17.5 9C17.5 9 17.4004 11.8536 15.4262 11.4408C12.2331 10.7732 16.3551 4.50296 10.5 2C10.5 7 4.5 8.5 4.5 14.5C4.5 18.6421 7.85786 22 12 22Z" stroke="#d38b0f" strokeWidth="1.5" strokeLinejoin="round"></path>
                                <path d="M12 19.0011C13.933 19.0011 15.5 16.9864 15.5 14.5011C12.3 15.7011 11.1667 12.9379 11 11C9.55426 11.5532 8.5 13.8256 8.5 15C8.5 17.4853 10.067 19.0011 12 19.0011Z" stroke="#d38b0f" strokeWidth="1.5" strokeLinejoin="round"></path>
                            </svg>
                            <span className='text-[#ae6518] text-sm'>Trending</span>
                        </div>
                        <div className='text-black h-[60vh] sm:h-[55vh]  overflow-y-auto'>
                            <ul>
                                {trendingCreators.map((creator, index) => (
                                    <li key={index}>
                                        <Link href={`/${creator.username}`} className='flex items-center gap-3 px-3 py-2 hover:bg-gray-100 '>
                                            <span className='text-xs md:text-sm'>#{index + 1}</span>
                                            <div className='min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] cover rounded-full flex'>
                                                <Image
                                                    src={creator.profileImage || "/profile.png"}
                                                    width={500}
                                                    height={500}
                                                    quality={100}
                                                    className='object-cover rounded-full' alt="profile" />
                                            </div>
                                            <div>
                                                <p className='text-sm md:text-base'>{creator.name || creator.username}</p>
                                                <p className='text-xs md:text-sm text-zinc-700'>{creator.title || "*Please setup your profile*"}</p>
                                            </div>
                                        </Link>
                                    </li>

                                ))}

                            </ul>
                        </div>
                    </div>

                </div>
            }
        </div>
    )
}

export default Creatorspage