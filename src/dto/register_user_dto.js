
export const registerUserDto = (user = {}) => {
    return {
        name: user.name,
        email: user.email,
        roles: user.roles || []
    }
}