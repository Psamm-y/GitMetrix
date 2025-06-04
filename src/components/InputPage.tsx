import {useState} from "react"
import type { FormData } from "../utils/FormData";
import UserCard from "./UserCard";
import { FaGithub } from "react-icons/fa";


const InputPage = () => {
   const [showCards, setShowCards] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username1: "",
    username2:""
  })
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData)=>({...prevFormData,[name]:value}))
  }
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.username1 && formData.username2) {
      setShowCards(true);
    }
    
  }

  return (
    <>
      {!showCards &&  <div className="flex items-center justify-center min-h-[100dvh]">
      <div className="h-[30rem] backdrop-blur-xl p-4 rounded-2xl border-1 border-gray-500" >
        <form className="" onSubmit={handleSubmit}>
          <h1 className="text-blue-500 text-2xl font-bold mb-20 text-center">GitHub User Comparison</h1>
          <em>Enter the exact github usernames of the two geeks</em>
            <div className="h-10 w-90 border-2 border-black mb-4 relative rounded-lg pl-2">
             <span className="absolute top-[50%] -translate-y-[50%] "><FaGithub /></span> 
          <input required className="h-full w-full outline-none p-2 rounded-lg pl-5" name="username1" type="text" placeholder="Enter Github username of first user" value={formData.username1} onChange={handleFormChange}/>
        </div>
            <div className="h-10 w-90 border-2 border-black mb-4 relative rounded-lg pl-2">
            <span className="absolute top-[50%] -translate-y-[50%] "><FaGithub /></span> 
          <input required className="w-full h-full outline-none p-2 rounded-lg pl-5" type="text" name="username2" placeholder="Enter Github username of second user" value={formData.username2} onChange={handleFormChange} />
          </div>
          <div className="w-full text-center">
            <button type="submit" className="bg-blue-500 text-white px-10 py-2 rounded-full mt-4">Compare</button>
</div>
          </form>
      </div>
     
      </div>}
   
       {showCards ? (
        <div className="min-h-[100dvh] flex items-center justify-center">
          <div className="flex gap-6">
            
          <UserCard username={formData?.username1} />
              <UserCard username={formData?.username2} />
              
        </div>
        </div>
      ):""}
    </>
  )
}

export default InputPage