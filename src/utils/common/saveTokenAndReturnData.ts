import { filterUserData } from "./filterUserData"
import { generateTokens, saveToken } from "../auth/tokenService"


export const saveTokenAndReturnData = async (user: any) =>{
    const userData = filterUserData(user)
    const tokens = generateTokens({...userData})
    await saveToken(userData.id, tokens.refreshToken)

    return {
        ...tokens,
        user: userData
    }
}
