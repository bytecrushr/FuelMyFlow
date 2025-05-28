import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { toast } from 'react-toastify';
import Image from 'next/image';

const Payment = ({email, name, username, fuelCost, id ,setLoading,loading}) => {
    const { data: session } = useSession();
    const [paymentform, setPaymentform] = useState({
        fuel: 1,
        amount: 0,
        senderName: "",
        fromUsername: "Anonymous",
        toUsername: username,
        fromUseremail: "Anonymous",
        message: "",
        toUserID: id})
    const [finalAmount, setFinalAmount] = useState(paymentform.fuel * fuelCost)

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'fuel') {
            if (/^\d*$/.test(value)) {
                setPaymentform({ ...paymentform, [name]: value });
            }
        } else {
            setPaymentform({ ...paymentform, [name]: value });
        }
    };

    const handlePay = async (e) => {
        setPaymentform(prev => ({ ...prev, amount: finalAmount * 100 }));
        try {
            setLoading(true)
            const res = await fetch("/api/razorpay/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "amount": finalAmount * 100,
                    "currency": "INR"
                }),
            });

            const orderData = await res.json();

            if (!orderData.id) {
                setLoading(false)
                toast("Fueling failed, please try again later.");
                return;
            }
            const options = {
                key: "rzp_test_Zspq4msi8V7uDL",
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Fuel My Flow",
                description: "Test Transaction",
                image: "/logo.png",
                order_id: orderData.id,
                handler: async function (response) {
                    const fullResponse = {
                        ...response,
                        receipt: orderData.receipt,
                        toUser: username,
                        toEmail:email,
                        amount: (orderData.amount) / 100,
                        currency: orderData.currency,
                        toUserID: paymentform.toUserID,
                        senderName: paymentform.senderName,
                        fromUsername: paymentform.fromUsername,
                        fromUseremail: paymentform.fromUseremail,
                        message: paymentform.message,
                        fuelCost:fuelCost
                    };
                    const verifyRes = await fetch("/api/razorpay/validate", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(fullResponse),
                    });

                    const verifyData = await verifyRes.json();

                    if (verifyData.success) {
                        setLoading(false)
                        toast("Payment verified successfully! Thank you for your Support.");
                        setTimeout(() => window.location.reload(), 2000);
                    } else {
                        setLoading(false)
                        toast("Payment verification failed. Please contact support.");
                        setTimeout(() => window.location.reload(), 2000);
                        }
                },
                prefill: {
                    name: paymentform.senderName,
                    email: "",
                    contact: "",
                },
                notes: {
                    message: "",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                setLoading(false)
                toast("Payment failed: " + response.error.description);
                setTimeout(() => window.location.reload(), 2000);

            });
            rzp.open();
        } catch (err) {
            setLoading(false)
            toast("Something went wrong - Fueling failed, please try again later.",err);
            setTimeout(() => window.location.reload(), 2000);

        }
    };

    useEffect(() => {
        if (session) {
            const fromUsername = session.user.username;
            const fromUseremail = session.user.email;
            setPaymentform(prev => ({ ...prev, fromUseremail, fromUsername }));
        }
    }, [session]);

    useEffect(() => {
        setFinalAmount(paymentform.fuel * fuelCost)
    }, [paymentform])



    return (
        <div className='w-full h-fit bg-indigo-950/60 p-5 rounded-lg'>
            <div className=' flex gap-2 items-center group'>
                <h2 className='text-2xl font-bold'>Fuel {name}&#39;s work </h2>
                <button className='relative'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="#ffffff" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 9.39815 13.8837 9.76913 13.6831 10.0808C13.0854 11.0097 12 11.8954 12 13V13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M11.992 17H12.001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                    <div className='text-sm p-2 rounded-xl border-2 border-indigo-500 hidden group-hover:block group-active:block w-[200px] h-fit bg-white text-black absolute -left-25 sm:left-0   bottom-6'>
                        It&#39;s a friendly metaphor, not real fuel. Each &#39;fuel&#39; is ₹{fuelCost}, and you can buy as many as you like.
                    </div>
                </button>
            </div>
            <div className='flex items-center justify-between sm:justify-center gap-3 sm:gap-5 my-3 p-4 border-2 border-indigo-500 rounded-lg bg-indigo-950'>
                <div className='w-[35px] sm:w-[50px]'>
                    <Image
                        className='w-[35px] sm:w-[50px]'
                        width={50}
                        height={50}
                        quality={100}
                        src="/logo.png" alt="logo" />
                </div>
                <h5 className='font-bold text-lg'>x</h5>
                <div onClick={() => setPaymentform(prev => ({ ...prev, fuel: 1 }))} className={`w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] ${paymentform.fuel === 1 ? " bg-amber-300 text-indigo-950" : "bg-indigo-950 text-white "} border-2 border-white rounded-full flex items-center justify-center`}>1</div>
                <div onClick={() => setPaymentform(prev => ({ ...prev, fuel: 3 }))} className={`w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] ${paymentform.fuel === 3 ? " bg-amber-300 text-indigo-950" : "bg-indigo-950 text-white "} border-2 border-white rounded-full flex items-center justify-center`}>3</div>
                <div onClick={() => setPaymentform(prev => ({ ...prev, fuel: 5 }))} className={`w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] ${paymentform.fuel === 5 ? " bg-amber-300 text-indigo-950" : "bg-indigo-950 text-white "} border-2 border-white rounded-full flex items-center justify-center`}>5</div>
                <input onChange={handleChange} value={paymentform.fuel} className='w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] text-center border-2 border-white rounded-xl' placeholder='10' type="number" step="1" min="0" name="fuel" />
            </div>
            <input onChange={handleChange} className='w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg mb-3 ' placeholder='Name (required)' type="text" name="senderName" />
            <input onChange={handleChange} className='w-full h-[100px] p-3 text-lg bg-gray-300 text-gray-700 rounded-lg mb-3 ' placeholder='Say something nice...(optional)' type="text" name="message" />
            <button disabled={ loading || !paymentform.senderName } onClick={() => handlePay()} className="disabled:cursor-not-allowed text-black bg-amber-300 border hover:bg-amber-400  rounded-full px-5 py-3 w-full m-2 font-semibold flex justify-center gap-2">
                <span>{loading ?
                    <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    : "Fuel"}</span><span>{loading ? "" : `₹${finalAmount}`}</span>
            </button>
        </div>
    )
}

export default Payment