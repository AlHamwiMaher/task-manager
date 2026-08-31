export function decodeToken(token){
    try {
        let codedToken = token.split('.')[1]
        const tokenFix1 = codedToken.replaceAll('-' , '+')
        const tokenFix2 = tokenFix1.replaceAll('_' , '/')
        const payload = JSON.parse(atob(tokenFix2))
        return payload   
    } catch (error) {
        return undefined
    }
}