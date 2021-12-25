module.exports.handelResponse = (parmas = {}) => {
    let { code = 1, data = null, errorMessage = null } = parmas;
    return {
        code,
        data,
        errorMessage
    }
}