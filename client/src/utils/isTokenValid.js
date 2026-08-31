import { decodeToken } from "./decodeToken"

export function isTokenValid(token){
    if (!token) return false

    const payload = decodeToken(token)
    if (payload){
        const tokenExpiaryDate = payload.exp
        const dateNow = Date.now() / 1000
        if (dateNow < tokenExpiaryDate){
                return true
        }
    }
    
    return false
    
}