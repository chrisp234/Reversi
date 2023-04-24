export interface ILeader {
    username: string;
    elo: number;
}

export const fetchLeaderboard = async(): Promise<Array<ILeader>> => {
    const response = await fetch('/api/v1/leaderboard')

    const body = await response.json();
    

    return body
}

export const fetchOnlinePlayers = async(): Promise<Array<any>> => {
    const response = await fetch('/api/v1/online_players')

    const body = await response.json();
    return body;

}