export const createInvitation = async(userName: string) => {
    const response = await fetch('/api/v1/invitations',{
        method: 'POST',   
        headers: {
            "Content-Type": "application/json",
        },    
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin",
        body: JSON.stringify({ username: userName })
    })
    return await response.json()
}

export const getInvitations = async() => {
    const response = await fetch('/api/v1/invitations')
    return await response.json()
}

export const acceptInvitation = async(invitationId: number) => {
    await fetch(`/api/v1/invitations/${invitationId}/accept`,{
        method: 'POST',   
        headers: {
            "Content-Type": "application/json",
        },    
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin",
    })
}

export const declineInvitation = async(invitationId: number) => {
    await fetch(`/api/v1/invitations/${invitationId}/decline`,{
        method: 'POST',   
        headers: {
            "Content-Type": "application/json",
        },    
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin",
    })
}