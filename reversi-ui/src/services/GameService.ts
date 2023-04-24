

export const getGameById = async(gameId: any) => {
    const res = await fetch(`/api/v1/games/${gameId}`);
    return await res.json()
}

export const makeMove = async(gameId: any, position: {row: number, col: number}) => {
    const response = await fetch(`/api/v1/games/${gameId}/move`,{
        method: 'POST',   
        headers: {
            "Content-Type": "application/json",
        },    
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin",
        body: JSON.stringify({ position })
    })
    return await response.json()
}