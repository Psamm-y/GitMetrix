import { useState } from "react"
import type { GitHubUser } from "../utils/GitHubUser"
interface UserCardProps{
  username:string
}
const UserCard = ({username}:UserCardProps) => {
  const [users, setUsers] = useState<GitHubUser>({
    name: "",
    login: "",
    avatar_url: "",
    public_repos: 0,
    followers:0
    
})
  return (
    <section className="min-h-[100dvh] flex justify-center items-center">
      <div className="h-130 w-90 gradient_background p-4 relative">
        {/* <div className=" left-[50%] before:top-0 before:bottom-0 bg-white absolute w-1 h-full"></div> */}
      <div className="h-40 w-full flex justify-center items-center ">
        <img src="/ghibli.png" alt="" className="w-25 h-25 object-cover rounded-full" />
        </div>
        <div className="text-white flex justify-between">
          <div className="">
            <p className="text-center text-sm"><span className="text-2xl font-medium">30</span> <br /> repositories</p>
          </div>
          <div className="">
            <p className="text-center text-sm">
              <span className="text-2xl font-medium">19 </span><br /> followers
            </p>
          </div>
          <div className="">
            <p className="text-center text-sm"><span className="text-2xl font-medium">896</span><br /> contributions</p>
          </div>
          
        </div>
        </div>
    
   </section>
  )
}

export default UserCard