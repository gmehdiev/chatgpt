// const userData = filterUserData(user)
// const tokens = generateTokens({...userData})

import { user } from "@prisma/client"
import { filterUserData } from "../filterUserData"
import { generateTokens, saveToken } from "../tokenService"

// await saveToken(userData.id, tokens.refreshToken)


// return {
//     ...tokens,
//     user: userData
// }

export const saveTokenAndReturnData = async (user: user) =>{
    const userData = filterUserData(user)
    const tokens = generateTokens({...userData})
    
    await saveToken(userData.id, tokens.refreshToken)
    
    
    return {
        ...tokens,
        user: userData
    }
    
}
