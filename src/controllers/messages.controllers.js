const MessagesServices = require("../services/messages.services")

const createMessage = async (req, res) => {
    const {id} = req.params;
    const data = req.body;
    try {
        await MessagesServices.setMessage(id, data)
        res.json()
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = {
    createMessage,
}