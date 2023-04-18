


export const login = async(username: string, password: string) => {
    const response = await fetch('/api/v1/login',{method: 'POST', body: JSON.stringify({username, password})})
    if (response.status !== 200){
        throw new Error("login failed")
    }
}