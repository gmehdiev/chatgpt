interface payload {
    uuid: string,   
    name: string | null,  
    createdAt:Date | null,
    // message: IMessage[] | null,      
}

interface IMessage {
    uuid:      string ,
    role:      string,
    content:   string,
    createdAt:Date,
    updatedAt: Date,
    chatUuid: string,
}




export const filterChatData = (payload: payload[]) =>{
    const clearChat = payload.map(({createdAt, user, ...other})=>{
        const {uuid,name, message} = other
        const clearMessage = message?.map(({uuid, updatedAt,chatUuid, ...other})=>other)
        return {
            uuid,
            name,
            messages: clearMessage
        }
    })
    // const clearMessage = payload.message?.map(({uuid, updatedAt,chatUuid, ...other})=>other)
    // return {
    //     id: payload.uuid,
    //     name: payload.name,
    //     messages: {clearMessage},
    // } 
 
}