import { useEffect, useState } from "react"
import { AiOutlineLoading } from "react-icons/ai";
import type { GitHubUser } from "../utils/GitHubUser"
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
      <div className="flex justify-center items-center "> <p className="text-xl text-green-400 "><span className="animate-spin"><AiOutlineLoading/></span> Retrieving Info </p></div>
      ) :
        
        (<div className="h-130 w-90 backdrop-blur-2xl  p-1 relative gradient_background shadow-black shadow-2xl rounded-lg" >
         
          <div className="bg-white/0.5 p-4 h-full w-full rounded-lg " >
         {/* <div className=" left-0 right-0 before:-top-4 before:bottom-0 bg-white before:absolute w-full h-full"></div> */}
        <div className="h-30 w-full flex justify-center items-center ">
          {user.avatar_url ? (<img src={user.avatar_url} alt="" className="w-25 h-25 object-cover rounded-full border-[0.1em] border-white " />) : null}
          </div>
        <div className="text-white">
          <p className="text-center ">{user?.name}</p>
          <p className="text-center text-gray-400">{user?.login} </p>
        </div>
        <div className="text-white flex justify-between">
          <div className="border-r-1 border-white pr-2">
            <p className="text-center text-sm text-gray-200"><span className="text-2xl font-medium text-white">{user?.public_repos}</span> <br /> repositories</p>
          </div> 
          <div className="">
            <p className="text-center text-sm text-gray-200">
              <span className="text-2xl font-medium text-white">{user.followers}</span><br /> followers
            </p>
          </div>
          <div className="border-l-1 border-white pl-2">
                <p className="text-center text-sm text-gray-200"><span className="text-2xl font-medium text-white">{contributions}</span><br /> contributions</p>
          </div>

        </div>
        </div>
        </div>)}

    </section>
  )
}

export default UserCard