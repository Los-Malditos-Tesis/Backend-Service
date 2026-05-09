export const generalResponse = (res, statusCode, code, message, data) => {
    res.status(statusCode).json({
        success: true,
        message,
        code,
        data
    })
}