const successResponse = ({data = null, message = ""}) => {
    return {
        status: 'success',
        data,
        message
    }
}

const errorResponse = ({message = ""}) => {
    return {
        status: 'error',
        data: null,
        message
    }
}

module.exports = {
    successResponse,
    errorResponse
}