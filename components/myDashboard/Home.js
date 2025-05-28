import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { formatLocalDate } from '@/utility/Date-Time';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


const Home = () => {
    const { data: session, status } = useSession();
    const [igniters, setIgniters] = useState([]);
    const [recentIgniters, setRecentIgniters] = useState([])
    const [amount, setAmount] = useState(0)
    const [amountfilterdropdown, setAmountfilterdropdown] = useState(false)
    const [amountfilter, setAmountfilter] = useState("Last 30 days")
    const [showAll, setShowAll] = useState(false)
    const [thankbox, setThankbox] = useState(false)
    const [thankyouID, setThankyouID] = useState("")
    const [thankyouMesasge, setThankyouMesasge] = useState("")
    const router = useRouter()

    useEffect(() => {
        if (status === "loading") return
        const fetchIgniters = async () => {
            try {
                const res = await fetch(`/api/profile/igniters/${session.user.username}`, {
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
    }, [session,thankbox])

    useEffect(() => {
        const recent = [...igniters]
            .sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt))
            .slice(0, 3);
        setRecentIgniters(recent)
    }, [igniters]);


    useEffect(() => {
        if (amountfilter === "All time") {
            const total = igniters.filter(item => item.amount)
                .reduce((sum, item) => sum + item.amount, 0);

            setAmount(total);
        } else if (amountfilter === "Last 90 days") {
            const now = new Date();
            const pastDate = new Date(now);
            pastDate.setDate(now.getDate() - 90);

            const filteredArray = igniters.filter(item => {
                const paidDate = new Date(item.paidAt);
                return paidDate >= pastDate && paidDate <= now;
            });

            const total = filteredArray.filter(item => item.amount)
                .reduce((sum, item) => sum + item.amount, 0);

            setAmount(total);
        } else {
            const now = new Date();
            const pastDate = new Date(now);
            pastDate.setDate(now.getDate() - 30);

            const filteredArray = igniters.filter(item => {
                const paidDate = new Date(item.paidAt);
                return paidDate >= pastDate && paidDate <= now;
            });

            const total = filteredArray.filter(item => item.amount)
                .reduce((sum, item) => sum + item.amount, 0);

            setAmount(total);
        }
    }, [amountfilter, igniters]);

    const copytoClipboard = (text) => {
        navigator.clipboard.writeText(text);
    }

    const handleSend = async () => {
        try {
            const res = await fetch('/api/profile/saveThankyou', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: thankyouMesasge, id: thankyouID }),
            });
            const data = await res.json();

            if (!res.ok) {
                toast(`Failed saving message: ${data.error}`)
            }

            toast('Message saved!');
            router.refresh()
            setThankyouMesasge("");
            setThankyouID("");
            setThankbox(false)
        } catch (error) {
            toast('Something went wrong');
            console.error(error);
        }
    };


    return (
        <div className='w-full flex flex-col items-center'>

            {status === "loading" ? (
                <div>loading....</div>
            ) : (
                <>
                    <div className='my-5 py-5 sm:px-10 lg:px-20 w-full xl:w-2/3 xl:px-0 h-fit bg-indigo-950/40 rounded-xl'>

                        <div className='flex flex-col lg:flex-row items-center justify-between px-4'>
                            <div className='flex flex-col lg:flex-row items-center gap-5'>
                                <div className='rounded-full cover'>
                                    <Image
                                        width={100}
                                        height={100}
                                        quality={100}
                                        className='object-cover w-[100px] h-[100px] rounded-full' src="/profile.png" alt="Profile" />
                                </div>
                                <div>
                                    <h2 className='font-semibold text-lg text-center lg:text-start'>Hi, {session.user.name || session.user.username}</h2>
                                    <h3 className='text-gray-300 text-center lg:text-start'>fuelmyflow.space/{session.user.username}</h3>
                                </div>
                            </div>
                            <button onClick={() => { copytoClipboard(`fuelmyflow.space/${session.user.username}`); toast("Copied to clipboard ") }} className='flex mt-5 lg:mt-0 items-center gap-2 text-black bg-white px-3 py-1 rounded-full hover:scale-105'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none">
                                    <path d="M8 7C8 7 10.1958 4.28386 11.4044 3.23889C11.5987 3.0709 11.8169 2.99152 12.0337 3.00072C12.2282 3.00897 12.4215 3.08844 12.5958 3.23912C13.8041 4.28428 16 7 16 7M12.0337 4L12.0337 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M8 11C6.59987 11 5.8998 11 5.36502 11.2725C4.89462 11.5122 4.51217 11.8946 4.27248 12.365C4 12.8998 4 13.5999 4 15V16C4 18.357 4 19.5355 4.73223 20.2678C5.46447 21 6.64298 21 9 21H15C17.357 21 18.5355 21 19.2678 20.2678C20 19.5355 20 18.357 20 16V15C20 13.5999 20 12.8998 19.7275 12.365C19.4878 11.8946 19.1054 11.5122 18.635 11.2725C18.1002 11 17.4001 11 16 11" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                                <span className='font-semibold transition-all duration-300 cursor-pointer'>Share Page</span>
                            </button>
                        </div>

                        <hr className='m-7 border-zinc-700' />

                        <div>
                            <div className='flex items-center gap-5 px-5 '>
                                <h3 className='text-3xl font-medium'>Earnings</h3>
                                <button onClick={() => setAmountfilterdropdown(!amountfilterdropdown)} onBlur={() => setTimeout(() => setAmountfilterdropdown(false), 100)}
                                    className='relative flex items-center px-3 py-1 rounded-full border-2 border-gray-400 hover:border-gray-500 cursor-pointer'>
                                    <span>{amountfilter}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="#ffffff" fill="none">
                                        <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    {amountfilterdropdown && <ul className="absolute top-10 left-0 w-40 bg-white text-black rounded-md shadow-lg p-2 space-y-1 z-50">
                                        <li onClick={() => { setAmountfilter("Last 30 days"); }} className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Last 30 days</li>
                                        <li onClick={() => { setAmountfilter("Last 90 days"); }} className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">Last 90 days</li>
                                        <li onClick={() => { setAmountfilter("All time"); }} className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">All time</li>
                                    </ul>}
                                </button>


                            </div>

                            <div className='px-5 mt-5'>
                                <h3 className='text-5xl font-semibold'>₹ {amount}</h3>
                            </div>

                            <div className='flex items-center gap-3 px-7 mt-3'>
                                <div className='w-[12px] h-[12px] bg-amber-300 '></div>
                                <span>{igniters.length} Supporters</span>
                            </div>
                        </div>
                    </div>


                    <div className='mb-5 py-5 sm:px-10 lg:px-25 w-full xl:w-2/3 xl:px-0 h-fit bg-indigo-950/40 rounded-xl'>
                        {recentIgniters.length > 0 ? (
                            <div className='w-full h-fit'>
                                <ul className='px-5' >
                                    {/* <li className='text-lg font-semibold'>Total {igniters.length} Igniters have fueled your work.</li> */}
                                    <li className='text-lg font-semibold'>Recent Igniters</li>
                                    <hr className='my-4 border-zinc-700' />
                                    {recentIgniters && recentIgniters.length > 0 &&
                                        recentIgniters.map(igniter => (
                                            <li key={igniter.paidAt} className='flex items-center gap-3 mb-7'>
                                                <div className='min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] cover rounded-full flex'>
                                                    <Image
                                                        width={500}
                                                        height={500}
                                                        quality={100}
                                                        className='object-cover rounded-full' src="/profile/default.png" alt="profile" />
                                                </div>
                                                <div className='w-full'>
                                                    <p><span className='font-bold'>{igniter.senderName}</span> fueled your work with ₹ {igniter.amount} on {formatLocalDate(igniter.paidAt)}</p>
                                                    {igniter.message && <p className='bg-white/80 text-black p-2 mt-2 rounded-md'>{igniter.message}</p>}
                                                    <div className='p-2 mt-2 rounded-md border border-zinc-700'>
                                                        {igniter.fromUseremail === "Anonymous" && igniter.fromUsername === "Anonymous" ? (
                                                            <p>This was a Anonymous support, Keep up good work! - <button onClick={() => { setThankbox(true); setThankyouID(igniter._id) }} className='ml-5 px-2 py-1 bg-amber-300 text-black rounded-full cursor-pointer hover:bg-amber-400'>Thank Them!</button></p>
                                                        ) : (
                                                            <>
                                                                <p>Appreciate your supporter - <button onClick={() => { setThankbox(true); setThankyouID(igniter._id) }} className='ml-5 px-2 py-1 bg-amber-300 text-black rounded-full cursor-pointer hover:bg-amber-400'>Thank Them!</button></p>
                                                                <p>Email - {igniter.fromUseremail}</p>
                                                                <p>User Page - <Link className='underline' target='_blank' href={`/${igniter.fromUsername}`}>{igniter.fromUsername}</Link></p>
                                                            </>
                                                        )}

                                                    </div>
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
                                {recentIgniters.length < 4 &&
                                    <div className='flex justify-center'>
                                        <button onClick={() => setShowAll(true)} className='px-3 py-2 rounded-xl cursor-pointer bg-white text-black hover:bg-amber-300'>
                                            Show All
                                        </button>
                                    </div>
                                }
                            </div>

                        ) : (
                            <div className='w-full h-[250px] flex flex-col items-center justify-center  gap-5'>
                                <p className='text-5xl'>🔥</p>
                                <h3 className='text-lg font-medium'>You dont have any igniters yet</h3>
                                <h3 className='text-gray-300'>Share your page with your audience to get started.</h3>
                            </div>
                        )}


                    </div >

                    {/* Show All Section  */}
                    {showAll &&
                        <div className='w-screen h-screen flex flex-col justify-center items-center fixed top-0 left-0 bg-black/80'>
                            <div className='w-full sm:w-2/3 h-[600px]  bg-indigo-950 px-3 py-[25px] rounded-lg'>
                                <ul className='px-5 h-[550px] overflow-y-auto' >
                                    <li className='text-lg font-semibold text-center'>Total {igniters.length} Igniters have fueled your work.</li>

                                    <hr className='my-4 border-zinc-700' />
                                    {igniters && igniters.length > 0 &&
                                        igniters.map(igniter => (
                                            <li key={igniter.paidAt} className='flex items-center gap-3 mb-7'>
                                                <div className='min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] cover rounded-full flex'>
                                                    <Image
                                                        width={500}
                                                        height={500}
                                                        quality={100}
                                                        className='object-cover rounded-full' src="/profile/default.png" alt="" />
                                                </div>
                                                <div className='w-full'>
                                                    <p><span className='font-bold'>{igniter.senderName}</span> fueled your work with ₹ {igniter.amount} on {formatLocalDate(igniter.paidAt)}</p>
                                                    {igniter.message && <p className='bg-white/80 text-black p-2 mt-2 rounded-md'>{igniter.message}</p>}
                                                    <div className='p-2 mt-2 rounded-md border border-zinc-700'>
                                                        {igniter.fromUseremail === "Anonymous" && igniter.fromUsername === "Anonymous" ? (
                                                            <p>This was a Anonymous support, Keep up good work! - <button onClick={() => { setThankbox(true); setThankyouID(igniter._id) }} className='ml-5 px-2 py-1 bg-amber-300 text-black rounded-full cursor-pointer hover:bg-amber-400'>Thank Them!</button></p>
                                                        ) : (
                                                            <>
                                                                <p>Appreciate your supporter - <button onClick={() => { setThankbox(true); setThankyouID(igniter._id) }} className='ml-5 px-2 py-1 bg-amber-300 text-black rounded-full cursor-pointer hover:bg-amber-400'>Thank Them!</button></p>
                                                                <p>Email - {igniter.fromUseremail}</p>
                                                                <p>User Page - <Link className='underline' target='_blank' href={`/${igniter.fromUsername}`}>{igniter.fromUsername}</Link></p>
                                                            </>
                                                        )}

                                                    </div>
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
                            <button onClick={() => setShowAll(false)} className='px-3 cursor-pointer m-3 py-2 rounded-xl bg-white text-black hover:bg-amber-300'>
                                Close X
                            </button>
                        </div>
                    }
                    {thankbox &&
                        <div className='w-screen h-screen flex flex-col justify-center items-center fixed top-0 left-0 bg-black/80'>
                            <div className='w-full sm:w-2/3 h-[300px]  bg-indigo-950 px-3 sm:px-10 py-[25px] rounded-lg flex flex-col items-center justify-center'>
                                <p className='text-xl font-semibold'>Thank your supporter</p>
                                <textarea onChange={(e) => setThankyouMesasge(e.target.value)} className='mt-3 mb-5 w-full h-1/3 p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='Appreciation message for your supporter' type="text" id="comment" />
                                <button disabled={!thankyouMesasge} onClick={() => { handleSend() }}
                                    className='w-fit px-10 py-2 disabled:bg-gray-400 bg-amber-300 text-black rounded-lg'>
                                    Save
                                </button>
                                <p className='text-sm py-2'>*This message will displayed publicly on your profile page, use email to send private message if given.</p>
                                <p className='text-sm py-2'>*Once posted cant be deleted.</p>
                            </div>
                            <button onClick={() => setThankbox(false)} className='px-3 cursor-pointer m-3 py-2 rounded-xl bg-white text-black hover:bg-amber-300'>
                                Close X
                            </button>
                        </div>
                    }
                </>
            )}

        </div >
    )

}

export default Home