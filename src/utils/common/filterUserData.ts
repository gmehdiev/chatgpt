interface payload {
    uuid: string,   
    email: string | null,  
    password:string | null,
    isActivated:  boolean | null  ,
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

export const filterAnonUserData = (uuid: string) =>{
    return {
        id: uuid
    }
}