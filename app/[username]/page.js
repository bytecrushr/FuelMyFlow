"use client"
import Payment from '@/components/myPage/PaymentSection';
import SocialLink from '@/components/myPage/SocialLink';
import Image from 'next/image';
import React, { use, useEffect, useState } from 'react'

const Username = ({ params }) => {
    const { username } = use(params);
    const [igniters, setIgniters] = useState([])
    const [pageform, setPageform] = useState({})
    const [profileexist, setProfileexist] = useState(null)
    const [showAll, setShowAll] = useState(false)
    const [recentIgniters, setRecentIgniters] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`/api/profile/page/${username}`, {
                    method: "GET",
                });

                if (!res.ok) {
                    setProfileexist(false);
                    return;
                }

                const data = await res.json();
                setPageform(data);
                setProfileexist(true);
            } catch (err) {
                alert("Error fetching profile:", err);
                setProfileexist(false);
            }
        };
        fetchProfile();

        const fetchIgniters = async () => {
            try {
                const res = await fetch(`/api/profile/igniters/${username}`, {
                    method: "GET",
                });

                if (!res.ok) {
                    return;
                }

                const data = await res.json();
                const sorted = [...data.igniters].sort(
                    (a, b) => new Date(b.paidAt) - new Date(a.paidAt)
                );

                setIgniters(sorted);//data obtained is object and need to extract array to map

            } catch (err) {
                console.error("Error fetching igniters:", err);
            }
        };
        fetchIgniters();
    }, [username, loading]);

    useEffect(() => {
        const recent = [...igniters]
            .sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt))
            .slice(0, 4);
        setRecentIgniters(recent)
    }, [igniters]);
    return (
        <>
            {/* loading screen */}
            {profileexist === null &&
                <div style={{ height: "calc(100vh - 160px)" }} className='w-full flex justify-center items-center'>
                    <div className='w-full sm:max-w-1/4 sm:min-w-1/4 flex flex-col justify-center items-center p-10 m-10 bg-indigo-950/30 rounded-md '>
                    <p>Loading, Please wait</p>
                    <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    </div>
                </div>}

            {/* profilepage */}
            {profileexist === true &&
                <div>
                    <div className='flex flex-col items-center'>
                        <div className='cover w-full '>
                            <Image
                                className="object-cover w-full max-h-[400px]"
                                src={pageform.coverImage}
                                alt="Cover image"
                                width={2000}
                                height={400}
                                quality={100}
                            />
                        </div>
                        <div className='cover rounded-md  '>
                            <Image
                                width={500}
                                height={500}
                                quality={100}
                                className='object-cover border border-zinc-400 rounded-md w-[150px] h-[150px] -mt-[75px]' src={pageform.profileImage} alt="Profile Image" />
                        </div>
                    </div>
                    <div className='w-full h-fit gap-2 flex flex-col items-center my-3'>
                        <h2 className='text-4xl font-semibold'>{pageform.name ? pageform.name : pageform.username}</h2>
                        <h6 className='text-sm'>{igniters.length} Igniters 🔥
                        </h6>

                        <div className='flex flex-wrap justify-center gap-3 w-1/2 sm:w-fit'>
                            {/* SocialLinks  */}
                            <SocialLink
                                website={pageform.website}
                                behance={pageform.behance}
                                discord={pageform.discord}
                                github={pageform.github}
                                facebook={pageform.facebook}
                                instagram={pageform.instagram}
                                linkedin={pageform.linkedin}
                                pinterest={pageform.pinterest}
                                telegram={pageform.telegram}
                                youtube={pageform.youtube}
                                snapchat={pageform.snapchat}
                                reddit={pageform.reddit}
                                x={pageform.x}
                                whatsapp={pageform.whatsapp}
                            />
                        </div>

                    </div>
                    <div className='flex flex-col lg:flex-row items-center lg:items-start justify-center h-fit w-full px-5 '>
                        <div className=' w-full md:w-2/3 lg:w-1/3 h-fit m-5 bg-indigo-950/60 p-5 rounded-lg' >
                            <h3 className='text-xl font-bold'>About {pageform.name ? pageform.name : pageform.username}</h3>
                            <p className='my-3 '>
                                {pageform.title}
                            </p>
                            {pageform.introLink &&
                                <div className='cover rounded-md w-full'>
                                    <iframe
                                        className='w-full h-[250px] rounded-md'
                                        src={`${pageform.introLink}?autoplay=0`}
                                        title="YouTube video"
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            }

                            <p className='my-3 '>{pageform.about}</p>
                            <hr className="border-t border-gray-300" />
                            <h3 className='text-xl font-bold my-3'>Recent Igniters</h3>
                            <ul >
                                {recentIgniters && recentIgniters.length > 0 ? (
                                    recentIgniters.map(igniter => (
                                        <li key={igniter.paidAt} className='flex items-center gap-3 mb-5'>
                                            <div className='min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] cover rounded-full flex'>
                                                <Image
                                                    width={500}
                                                    height={500}
                                                    quality={100}
                                                    className='object-cover rounded-full' src="/profile/default.png" alt="" />
                                            </div>
                                            <div className='w-full'>
                                                <p><span className='font-bold'>{igniter.senderName}</span> fueled your work with {igniter.amount / igniter.fuelCost} boosts.</p>
                                                {igniter.message && <p className='bg-white/80 text-black p-2 mt-2 rounded-md'>{igniter.message}</p>}
                                                {igniter.comment && <div className='  p-2 mt-2 rounded-md flex gap-3'>
                                                    <div className='min-w-[30px] min-h-[30px] max-w-[30px] max-h-[30px] cover rounded-full flex items-center'>
                                                        <Image
                                                            width={500}
                                                            height={500}
                                                            quality={100}
                                                            className='object-cover rounded-full' src="/profile.png" alt="profile" />
                                                    </div>
                                                    <p> : {igniter.comment}</p>
                                                </div>}
                                            </div>
                                        </li>
                                    ))) : (
                                    <li className='text-lg py-2'>No Igniters🔥 yet — be the first to fuel their journey!</li>
                                )}
                            </ul>

                            <button onClick={() => setShowAll(true)} className="text-indigo-950 bg-amber-300 border hover:bg-amber-400  rounded-full px-5 py-3 w-full m-2 font-semibold ">
                                Show More
                            </button>

                            {/* Show All Section  */}
                            {showAll &&
                                <div className='w-screen h-screen flex flex-col justify-center items-center fixed top-0 left-0 bg-black/80 z-15'>
                                    <div className='w-full sm:w-2/3 h-[600px]  bg-indigo-950 px-3 py-[25px] rounded-lg'>
                                        <ul className='px-5 h-[550px] overflow-y-auto' >
                                            <li className='text-lg font-semibold text-center'>Total {igniters.length} Igniters have fueled your work.</li>

                                            <hr className='my-4 border-zinc-700' />
                                            {igniters && igniters.length > 0 &&
                                                igniters.map(igniter => (
                                                    <li key={igniter.paidAt} className='flex items-center gap-3 mb-5'>
                                                        <div className='min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] cover rounded-full flex'>
                                                            <Image
                                                                width={500}
                                                                height={500}
                                                                quality={100}
                                                                className='object-cover rounded-full' src="/profile/default.png" alt="" />
                                                        </div>
                                                        <div className='w-full'>
                                                            <p><span className='font-bold'>{igniter.senderName}</span> fueled your work with {igniter.amount / igniter.fuelCost} boosts.</p>
                                                            {igniter.message && <p className='bg-white/80 text-black p-2 mt-2 rounded-md'>{igniter.message}</p>}
                                                            {igniter.comment && <div className='  p-2 mt-2 rounded-md flex gap-3'>
                                                                <div className='min-w-[30px] min-h-[30px] max-w-[30px] max-h-[30px] cover rounded-full flex items-center'>
                                                                    <Image
                                                                        width={500}
                                                                        height={500}
                                                                        quality={100}
                                                                        className='object-cover rounded-full' src="/profile.png" alt="profile" />
                                                                </div>
                                                                <p> : {igniter.comment}</p>
                                                            </div>}
                                                        </div>

                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                    <button onClick={() => setShowAll(false)} className='px-3 m-3 py-2 rounded-xl bg-white text-black hover:bg-amber-300'>
                                        Close X
                                    </button>
                                </div>
                            }
                        </div>
                        <div className='w-full md:w-2/3 lg:w-1/3 h-fit m-5 rounded-lg' >
                            <Payment
                                email={pageform.email}
                                name={pageform.name ? pageform.name : pageform.username}
                                username={pageform.username}
                                fuelCost={pageform.fuelCost}
                                id={pageform.id}
                                loading={loading}
                                setLoading={setLoading} />
                            <div>


                            </div>

                        </div>
                    </div>
                </div>
            }

            {/* Profile do not exist */}
            {profileexist === false &&
                <div style={{ height: "calc(100vh - 160px)" }} className='w-full flex justify-center items-center'>
                    <div className='w-full sm:max-w-1/4 sm:min-w-1/4 flex justify-center items-center p-10 m-10 bg-indigo-950/30 text-center rounded-md'>
                        Profile with username-{username} doesnt exist.
                    </div>
                </div>}

        </>
    )
}

export default Username