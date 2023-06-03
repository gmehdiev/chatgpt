interface payload {
    uuid: string,   
    email: string,  
    password:string
    isActivated:  boolean  
    activationLink?: string | null,
    token?: string | null,        
}


export const filterUserData = (payload: payload) =>{
    return {
        email:payload.email,
        id:payload.uuid,
        isActivated: payload.isActivated,
    }
}