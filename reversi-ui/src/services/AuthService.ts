
export const login = async(username: string, password: string) => {
    const response = await fetch('/api/v1/login',{
        method: 'POST',   
        headers: {
            "Content-Type": "application/json",
        },    
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin",
        body: JSON.stringify({username, password})
    })
    if (response.status !== 200){
        throw new Error("login failed")
    }
}

export const logout = async() => {
    const response = await fetch('/api/v1/logout',{
        method: 'POST',   
        headers: {
            "Content-Type": "application/json",
        },    
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin",
    })
    return await response.json()
}

export const checkIsLoggedIn = async(): Promise<boolean> => {
    const response = await fetch('/api/v1/me')
    if(response.status === 200){
        return true
    }
    return false
}

export const getUserId = async(): Promise<number> => {
    const response = await fetch('/api/v1/me')
    return await response.json()
}