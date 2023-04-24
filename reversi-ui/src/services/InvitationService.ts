export const createInvitation = async(username: string, gameSettings: any) => {
    // console.log(username)
    const response = await fetch('/api/v1/invites',{
        method: 'POST',   
        headers: {
            "Content-Type": "application/json",
        },    
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin",
        body: JSON.stringify({ sendTo: username, gameSettings })
    })
    return await response.json()
}

export const getInvitations = async() => {
    const response = await fetch('/api/v1/invites')
    return await response.json()
}

export const acceptInvitation = async(invitationId: number) => {
    const res = await fetch(`/api/v1/invites/${invitationId}/accept`,{
        method: 'POST',   
        headers: {
            "Content-Type": "application/json",
        },    
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin",
    })

    return await res.json()
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