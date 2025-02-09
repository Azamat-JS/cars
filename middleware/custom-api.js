class CustomAPIError extends Error {
    constructor(message){
        super(message)
        this.status = status
    }
}

module.exports = CustomAPIError