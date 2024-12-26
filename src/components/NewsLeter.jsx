
import React from "react";
import toast from "react-hot-toast";
import { MdOutlineMail } from "react-icons/md";

const NewsLetter = () => {


    const handleForm = (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
      
        if (email) {
            toast.success(`Send ${email}Thank you for subscribing to our newsLater`)
        } else {
            toast.error('You are not Provide Email Sorry')
        }
    }

    return (
        <section
            className="w-full rounded-xl py-[20px] sm:py-[40px] px-[40px] sm:px-[80px] bg-gradient-to-br from-[#161819] to-[#5C26B5] relative overflow-hidden">
            <div className="w-full sm:w-[60%]">
                <div className="w-full sm:w-[60%]">
                    <h1 className="text-[2rem] sm:text-[2.8rem] text-[#71ECD2] font-[400] leading-[45px]">Subscibe
                        to Our
                        Newsletter</h1>
                    <p className="text-[0.9rem] text-[#CBCBCB] mt-5">Get weekly update about our
                        product
                        on your email, no spam guaranteed we promise ✌️</p>
                </div>

                <form onSubmit={handleForm} className="relative mt-12 mb-6">
                    <input className="py-3 pr-4 pl-12 w-full outline-none"
                        name="email" placeholder="Email Address" />

                    <MdOutlineMail
                        className="p-1.5 bg-[#F8F8F8] text-[#6C777C] text-[2rem] absolute top-[50%] left-2 transform translate-y-[-50%]" />

                    <button
                        className="absolute bottom-[-20px] right-[-20px] bg-[#825FF1] hover:bg-[#7755e8] text-white py-3 px-8">subscribe
                    </button>
                </form>
            </div>

            <MdOutlineMail
                className="text-[30rem] absolute top-[-100px] right-[-100px] text-white opacity-10 rotate-[-30deg]" />
        </section>
    );
};

export default NewsLetter;
