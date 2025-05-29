import { useState } from "react"
import type { FormData } from "../utils/FormData";

const InputPage = () => {

  const [formData, setFormData] = useState<FormData>({
    username1: "",
    username2:""
  })
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData)=>({...prevFormData,[name]:value}))
  }
  return (
    <div className="flex items-center justify-center min-h-[100dvh]">
      <div className="">
        <form className="">
          <h1 className="text-blue-500 text-2xl">GitHub User Comparison</h1>
          <em>Enter the exact github usernames of the two geeks</em>
        <div className="h-10 w-90 border-2 border-black mb-4 p-2 rounded-lg">
          <input className="h-full w-full outline-none" name="username1" type="text" placeholder="Enter Github username of first user" value={formData.username1} onChange={handleFormChange}/>
        </div>
        <div className="h-10 w-90 border-2 border-black p-2 rounded-lg">
          <input className="w-full h-full outline-none" type="text" name="username2" placeholder="Enter Github username of second user" value={formData.username2} onChange={handleFormChange} />
          </div>
          </form>
      </div>
      
    </div>
  )
}

export default InputPage