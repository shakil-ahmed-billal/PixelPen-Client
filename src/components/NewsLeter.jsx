
import {AiOutlineMail} from "react-icons/ai";
import toast from "react-hot-toast";

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
        <section className="w-full rounded-xl py-[20px]">
            <div className="flex lg:flex-row flex-col items-center justify-between gap-[20px]">
                <div className="w-full sm:w-[80%] lg:w-[50%]">
                    <img src="https://i.ibb.co/WkhTsW1/undraw-Mailbox-re-dvds.png" alt="image"
                        className="w-full" />
                </div>

                <div className="w-full lg:w-[50%]">
                    <b className="text-[1rem] sm:text-[1.8rem] text-text">Subscribe to our</b>
                    <h1 className="text-[2rem] sm:text-[3rem] font-[800] capitalize text-text leading-[50px]">newsletter</h1>
                    <p className="text-[1.1rem] mt-3">Get weekly updates on the newest design
                        stories, case studies and tips right
                        in your mailbox. <b>Subscribe now!</b></p>

                    <form className="mt-5" onSubmit={handleForm}>
                        <div className="relative">
                            <input placeholder="Email Address"
                                name="email"
                                className="w-full py-3 pr-4 pl-14 outline-none focus:ring-0 border rounded-md border-[#00b0ff]" />
                            <AiOutlineMail
                                className="absolute top-[50%] transform translate-y-[-50%] left-3 text-[#00b0ff] text-[1.7rem]" />
                        </div>

                        <button 
                            className="w-full py-3 rounded-md bg-[#00b0ff] hover:bg-[#029de0] text-white mt-4">Submit
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default NewsLetter;
