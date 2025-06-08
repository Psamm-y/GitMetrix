import { useRef, useState } from "react"
import type { FormData } from "../utils/FormData";
import UserCard from "./UserCard";
import { FaGithub } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowBackIos } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { FaCrosshairs } from "react-icons/fa6";



const InputPage = () => {
  const [showCards, setShowCards] = useState(false);
  const formRef = useRef(null);
  const [formData, setFormData] = useState<FormData>({
    username1: "",
    username2: ""
  })
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.username1 && formData.username2) {
      setShowCards(true);
    }

  }

  return (
    <>
{/* {!showCards &&      <FallingText className="" text={`GitMetrix is a platform where users can view and compare their github stats and even download them`} highlightWords={["view", "compare", "stat","download"]} fontSize="1.5rem" trigger={"auto"} />}    */}
      <AnimatePresence mode="wait">
        {!showCards ? (
        <motion.div
          key="input"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center min-h-[100dvh]"
        >
            <div ref={formRef} className="h-[30rem] backdrop-blur-xl p-4 rounded-2xl border-1 border-gray-500" >
              
            <form className="" onSubmit={handleSubmit}>
              <h1 className="text-blue-500 text-2xl font-bold mb-20 text-center font-Raleway">GitMetrix</h1>
              <em>Enter the exact github usernames of the two geeks</em>
              <div className="h-10 w-90 border-2 border-black mb-4 relative rounded-lg pl-2">
                <span className="absolute top-[50%] -translate-y-[50%] "><FaGithub /></span>
                <input required className="peer h-full w-[95%] outline-none p-2 rounded-lg pl-5 " name="username1" type="text" placeholder="Enter Github username of first user" value={formData.username1} onChange={handleFormChange} />
                <button onClick={()=>setFormData((prevFormData)=>({...prevFormData,"username1":""}))} className="h-full hover:block text-gray-400 hidden peer-hover:block absolute top-[50%] -translate-y-[50%] right-1 transition duration-75"><IoIosCloseCircle /></button>
              </div>
              <div className="h-10 w-90 border-2 border-black mb-4 relative rounded-lg pl-2">
                <span className="absolute top-[50%] -translate-y-[50%] "><FaGithub /></span>
                <input required className="peer w-[95%] h-full outline-none p-2 rounded-lg pl-5" type="text" name="username2" placeholder="Enter Github username of second user" value={formData.username2} onChange={handleFormChange} />
                <button onClick={()=>setFormData((prevFormData)=>({...prevFormData,"username2":""}))} className="h-full hover:block text-gray-400 hidden peer-hover:block absolute top-[50%] -translate-y-[50%] right-1 transition duration-75"><IoIosCloseCircle /></button>

              </div>
              <div className="w-full flex justify-center">
                <button type="submit" className="bg-blue-500 text-white px-10 py-2 rounded-full mt-4 shadow-xs hover:bg-blue-400 active:shadow-none shadow-black flex items-center" ><FaCrosshairs/> Compare</button>
              </div>
            </form>
          </div>

        </motion.div>
      ) : (
        <motion.div
          key="cards"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.2 }}
          className="min-h-[100dvh] flex items-center justify-center"
        >
          <div className="flex gap-6">

            <UserCard username={formData?.username1} />
            <UserCard username={formData?.username2} />
            <button className="absolute left-3 bg-blue-500 p-2 px-4 rounded-[0.5em]  text-white top-2 flex items-center" onClick={()=>setShowCards(false)}> <span><MdArrowBackIos className="mt-[0.1em]"/></span>Compare Again</button>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
      </>
  )
}

export default InputPage