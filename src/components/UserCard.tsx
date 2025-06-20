import { useEffect, useState } from "react"
import { AiOutlineLoading } from "react-icons/ai";
import type { GitHubUser } from "../utils/GitHubUser";
import CountUp from 'react-countup'
import { FaUser } from "react-icons/fa6";
interface UserCardProps {
  username: string
}
const UserCard = ({ username }: UserCardProps) => {
  const [user, setUser] = useState<GitHubUser>({
    name: "",
    login: "",
    avatar_url: "",
    public_repos: 0,
    followers: 0
  })
  const [loading, setLoading] = useState<boolean>(false);
  const GITHUB_API = import.meta.env.VITE_GITHUB_API;
  const [contributions, setContributions] = useState<number | null>(null);
  const BACKEND_API = import.meta.env.VITE_BACKEND_API;
 
  useEffect(() => {
    if (!username) return;
      setLoading(true);

    fetch(`${GITHUB_API}/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setUser({
          name: data.name,
          login: data.login,
          avatar_url: data.avatar_url,
          followers: data.followers,
          public_repos: data.public_repos
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Oops", err);
        setLoading(false);
      });
    fetch(`${BACKEND_API}/contributions/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setContributions(
          data.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions ?? 0
        )
      }).catch((err) => {
        console.error("Contributions error", err);
        setContributions(null);
    })
   
  }, [username])
  
  return (
    <section className="min-h-[100dvh] flex justify-center items-center font-Raleway relative">
    
      {loading ? (
      <div className="flex justify-center items-center "> <p className="text-xl text-blue-500 "><span className="animate-spin"><AiOutlineLoading/></span> Retrieving Info </p></div>
      ) :
        
        (<div className="h-130 w-90 backdrop-blur-2xl  p-1 relative gradient_background shadow-black shadow-2xl rounded-lg" >
         
          <div className="bg-white/0.5 p-4 h-full w-full rounded-lg " >
         {/* <div className=" left-0 right-0 before:-top-4 before:bottom-0 bg-white before:absolute w-full h-full"></div> */}
        <div className="h-30 w-full flex justify-center items-center ">
          {user.avatar_url ? (<img src={user.avatar_url} alt="" className="w-25 h-25 object-cover rounded-full border-[0.1em] border-white " />) : <FaUser className="text-white bg-black p-1 w-25 h-25 object-cover rounded-full border-[0.1em] border-white "/>}
          </div>
        <div className="text-white">
          <p className="text-center ">{user?.name}</p>
          <p className="text-center text-gray-400">{user?.login} </p>
        </div>
        <div className="text-white flex justify-between">
          <div className=" pr-2">
                <p className="text-center text-sm text-gray-200"><span className="text-2xl font-medium text-white">
                  <CountUp start={0} end={user?.public_repos ?? 0} duration={5} />  
                </span> <br /> repositories</p>
          </div> 
          <div className="">
            <p className="text-center text-sm text-gray-200">
              <span className="text-2xl font-medium text-white"> <CountUp start={0} end=  {user.followers ??  0} duration={5} /></span><br /> followers
            </p>
          </div>
          <div className="pl-2">
                <p className="text-center text-sm text-gray-200"><span className="text-2xl font-medium text-white"> <CountUp start={0} end={contributions ?? 0} duration={10} /> </span><br /> contributions</p>
          </div>
            </div>
           <div className="grid grid-cols-4 grid-rows-[3.5rem_3rem] gap-1 mt-2">
              <div className="border-blue-500 border-1 row-span-2 rounded-lg p-1 ">
                <div className="border-1 border-blue-500 w-full h-full rounded-lg"></div>
              </div>
              <div className="border-1 border-blue-500 col-span-2 rounded-lg p-1">
              <div className="border-1 border-blue-500 w-full h-full rounded-lg"></div>
              </div>
              <div className="border-1 border-blue-500 col-span-3 rounded-lg p-1">
              <div className="border-1 border-blue-500 w-full h-full rounded-lg"></div>

              </div>
            </div> 
        </div>
        </div>)}

    </section>
  )
}

export default UserCard