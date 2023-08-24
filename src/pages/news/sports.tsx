import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
type Games={
    id:number;
    name:string;
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
    return (
        <ul>
            {Games.map((Game) => (
                <li key={Game.id}>{Game.name} {Game.id}</li>
            ))}
        </ul>
    )
}
export default LiveGames;