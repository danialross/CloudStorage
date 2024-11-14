export type ResponseMessage = {
    message: string
}

export type JwtPayload = {
    user: { name: string, id: string },
    sub: string,
    iat: number,
    exp: number
}