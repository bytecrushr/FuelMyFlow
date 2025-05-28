import React, { useState ,useEffect} from 'react'
import { useSession } from "next-auth/react"
import { toast } from 'react-toastify';
import { set } from 'mongoose';

const MyProfile = ({activeComponent,setActiveComponent}) => {
    const { data: session } = useSession();

    const [profileForm, setProfileForm] = useState({
        id:"",profileImage:"",
        coverImage:"",title:"",about:"",fuelCost:"",
        introLink:"",website:"",behance:"",discord:"",github:"",facebook:"",instagram:"",linkedin:"",
        pinterest:"",telegram:"",youtube:"",snapchat:"",reddit:"",x:"",whatsapp:""
    })

    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        const initForm = async () => {
            const savedForm = JSON.parse(localStorage.getItem("profileForm"));
    
            if (savedForm?.id) {
                setProfileForm(savedForm);
            } else if (session?.user?.id) {
                try {
                    const res = await fetch("/api/dashboard/myprofile", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: session.user.id }),
                    });
    
                    const data = await res.json();
                    if (res.ok) {
                        setProfileForm({
                            id: data._id || "",
                            profileImage: data.profileImage || "/profile.png",
                            coverImage: data.coverImage || "/cover.png",
                            title: data.title || "",
                            about: data.about || "",
                            fuelCost: data.fuelCost || "",
                            introLink: data.introLink || "",
                            website: data.website || "",
                            behance: data.behance || "",
                            discord: data.discord || "",
                            github: data.github || "",
                            facebook: data.facebook || "",
                            instagram: data.instagram || "",
                            linkedin: data.linkedin || "",
                            pinterest: data.pinterest || "",
                            telegram: data.telegram || "",
                            youtube: data.youtube || "",
                            snapchat: data.snapchat || "",
                            reddit: data.reddit || "",
                            x: data.x || "",
                            whatsapp: data.whatsapp || "",
                        });
                    }
                } catch (err) {
                    console.error(err);
                    alert("Something went wrong.");
                }
            }
        };
    
        initForm();
    }, [session]);

    useEffect(() => {
        const savedForm = JSON.parse(localStorage.getItem("profileForm"));
        if (savedForm) {
            setProfileForm(savedForm);
        }
    }, []);

    useEffect(() => {
        return () => {
            localStorage.removeItem("profileForm");
        };
    }, []);
    
    useEffect(() => {
        localStorage.setItem("profileForm", JSON.stringify(profileForm));
    }, [profileForm]);

    
   
    const handleChange = (e) => {
        setProfileForm({ ...profileForm, [e.target.id]: e.target.value })
    }

    const handleSave=async()=>{
        try {
            setLoading(true)
            const res = await fetch("/api/dashboard/myprofile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profileForm),
            });

            const data= await res.json();

            if(res.ok){
                setLoading(false)
                toast("Profile Updated");
                localStorage.removeItem("profileForm");
                setActiveComponent("home")

            }else{
                setLoading(false)
                toast(data.error)
            }
        }catch (err) {
            setLoading(false)
            console.error(err);
            toast("Something went wrong.");
        }
    
    }

    return (
        <div className='py-10 sm:px-10 lg:px-25 w-full xl:w-1/2 xl:px-0  h-fit'>
            <h1 className='text-2xl font-bold p-3 '>Edit Profile</h1>
            <div className='p-10  bg-indigo-950/60 rounded-lg'>
                <label className='text-lg' htmlFor="coverImage">Cover Image Link</label>
                <input onChange={handleChange} value={profileForm.coverImage} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='' type="text" id="coverImage" />

                <label className='text-lg' htmlFor="profileImage">Profile Image Link</label>
                <input onChange={handleChange} value={profileForm.profileImage} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='' type="text" id="profileImage" />

                <label className='text-lg' htmlFor="title">Title</label>
                <input onChange={handleChange} value={profileForm.title} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='For about section...' type="text" id="title" />
                
                <label className='text-lg' htmlFor="name">About</label>
                <textarea onChange={handleChange} value={profileForm.about}
                    id="about"
                    placeholder="Write something about yourself, so your audience can know you better.."
                    className='mt-3 mb-5 w-full h-[200px] p-3 text-lg bg-gray-300 text-gray-700 rounded-lg resize-none'
                />

                <label className='text-lg' htmlFor="introLink">Introduction Video Link</label>
                <input onChange={handleChange} value={profileForm.introLink} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='Youtube video link...' type="text" id="introLink" />

                <label className='text-lg' htmlFor="fuelCost">Fuel Cost</label>
                <input onChange={handleChange} value={profileForm.fuelCost} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='Enter cost a single fuel, minimum ₹100...' type="number" id="fuelCost" />

                <hr className="border-t border-gray-400 my-4" />

                <h3 className='text-lg font-bold my-3 '>Link your Social Accounts</h3>

                <label className='text-lg' htmlFor="website">Website</label>
                <input onChange={handleChange} value={profileForm.website} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="website" />
                
                <label className='text-lg' htmlFor="discord">Discord</label>
                <input onChange={handleChange} value={profileForm.discord} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="discord" />

                <label className='text-lg' htmlFor="github">Github</label>
                <input onChange={handleChange} value={profileForm.github} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="github" />
                
                <label className='text-lg' htmlFor="facebook">Facebook</label>
                <input onChange={handleChange} value={profileForm.facebook} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="facebook" />
                
                <label className='text-lg' htmlFor="instagram">Instagram</label>
                <input onChange={handleChange} value={profileForm.instagram} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="instagram" />
                
                <label className='text-lg' htmlFor="linkedin">Linkedin</label>
                <input onChange={handleChange} value={profileForm.linkedin} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="linkedin" />

                <label className='text-lg' htmlFor="pinterest">Pinterest</label>
                <input onChange={handleChange} value={profileForm.pinterest} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="pinterest" />
                
                <label className='text-lg' htmlFor="telegram">Telegram</label>
                <input onChange={handleChange} value={profileForm.telegram} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="telegram" />

                <label className='text-lg' htmlFor="youtube">Youtube</label>
                <input onChange={handleChange} value={profileForm.youtube} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="youtube" />
                
                <label className='text-lg' htmlFor="snapchat">Snapchat</label>
                <input onChange={handleChange} value={profileForm.snapchat} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="snapchat" />
                
                <label className='text-lg' htmlFor="reddit">Reddit</label>
                <input onChange={handleChange} value={profileForm.reddit} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="reddit" />
                
                <label className='text-lg' htmlFor="x">{"X (Twitter)"}</label>
                <input onChange={handleChange} value={profileForm.x} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="x" />
                
                <label className='text-lg' htmlFor="whatsapp">Whatsapp</label>
                <input onChange={handleChange} value={profileForm.whatsapp} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="whatsapp" />

                <button onClick={()=>{handleSave()}}
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
            <p className='p-3'>*{session.user.id}</p>
        </div>
    )
}

export default MyProfile