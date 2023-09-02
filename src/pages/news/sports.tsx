import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { Link, Outlet } from "react-router-dom";
type Games = {
    id: number;
    name: string;
    location: string;
    sportName: string;
    isRunning: any;

}
function LiveGames() {
    const [Games, setGames] = useState<Games[]>([]);
    useEffect(() => {
        const fetchGames = async () => {
            const response = await fetch(
                `${API_ENDPOINT}/matches`
            );
            const data = await response.json();
            console.log(data)
            setGames(data.matches);
        }
        fetchGames();
    })
    const sortedGames = [...Games].sort((a, b) => (b.isRunning - a.isRunning));

    return (
        <div>
            <h1 className="text-xl p-2 text-justify font-mono font-semibold"> Live Games</h1>
      
      <div className="flex gap-4 overflow-x-auto w-full">
            {sortedGames.map((Game) => (
            <Link to={`/matches/${Game.id}`} key={Game.id} className="flex-shrink-0 bg-white p-3 rounded-md text-black" >
                <div className=" px-3 py-3 bg-white rounded-lg flex-shrink-0 shadow text-sm  border border-black" >
                    <div className="text-justify text-purple-500 text-sm">   {Game.sportName} </div>
                    <div className="text-xl py-2 font-medium">{Game.name.split("VS")[0]} VS { Game.name.split("VS")[1].split('at')[0]} </div>
                    <div className="text-justify text-xs  flex"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
</svg>
 {Game.location} </div>
                </div>
                </Link>

            ))}
        </div>
                <Outlet />
        </div>

    )
}
export default LiveGames;