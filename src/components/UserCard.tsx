import { useEffect, useState } from "react"
import type { GitHubUser } from "../utils/GitHubUser"
interface UserCardProps{
  username:string
}
const UserCard = ({username}:UserCardProps) => {
  const [user, setUser] = useState<GitHubUser>({
    name: "",
    login: "",
    avatar_url: "",
    public_repos: 0,
    followers:0
  })
  const GITHUB_API = import.meta.env.VITE_GITHUB_API;
  useEffect(() => {
    if (!username) return
    try {
      fetch(`${GITHUB_API}/${username}`)
        .then((res) => res.json())
        .then((data) => setUser({
          name: data.name,
          login: data.login,
          avatar_url: data.avatar_url,
          followers: data.followers,
          public_repos:data.public_repos
        }));
    
    } catch (err) {
      console.log("Oops", err);
    }
  },[username])
  return (
    <section className="min-h-[100dvh] flex justify-center items-center">
      <div className="h-130 w-90 bg-blue/[.2]  p-4 relative">
        {/* <div className=" left-[50%] before:top-0 before:bottom-0 bg-white absolute w-1 h-full"></div> */}
        <div className="h-40 w-full flex justify-center items-center ">
          {user.avatar_url ?(<img src={user.avatar_url} alt="" className="w-25 h-25 object-cover rounded-full" />) :null}

        </div>
        <div className="text-white">
          <p className="text-center ">{user?.name}</p>
          <p className="text-center text-gray-500">{user?.login} </p>
        </div>
        <div className="text-white flex justify-between">
          <div className="">
            <p className="text-center text-sm"><span className="text-2xl font-medium">{user?.public_repos}</span> <br /> repositories</p>
          </div>
          <div className="">
            <p className="text-center text-sm">
              <span className="text-2xl font-medium">{user.followers}</span><br /> followers
            </p>
          </div>
          <div className="">
            <p className="text-center text-sm"><span className="text-2xl font-medium">693</span><br /> contributions</p>
          </div>
          
        </div>
        </div>
    
   </section>
  )
}

export default UserCard