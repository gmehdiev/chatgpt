import { filterUserData } from "../filterUserData"
import { generateTokens, saveToken } from "../tokenService"


export const saveTokenAndReturnData = async (user: any) =>{
    console.log(user)
    const userData = filterUserData(user)
    const tokens = generateTokens({...userData})
    console.log(userData)
    await saveToken(userData.id, tokens.refreshToken)

    return {
        ...tokens,
        user: userData
    }
}
