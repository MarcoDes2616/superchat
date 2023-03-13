const ConversationsServices = require("../services/conversations.services");
const MembersServices = require("../services/members.services");


const createConversationSingle = async (req, res) => {
    try {
        const { title, user_creator, user_guest } = req.body  // title, creator, guest,
        if (user_creator === user_guest) {
            res.status(400).json("creator must be different from guest")
        }

        const data = {
            "title": title,
            "type_id": 1
        }
        const result = await ConversationsServices.create(data)

        if (result) {
            const { id } = result
            const [dataCreator, dataGuest] = [
                {
                    "conversation_id": id,
                    "user_id": user_creator,
                    "state_id": 1
                },
                {
                    "conversation_id": id,
                    "user_id": user_guest,
                    "state_id": 2
                }
            ]
            await MembersServices.create(dataCreator, dataGuest)
        } else {
            res.status(500).json(error)
        }

        res.status(201).json();
    } catch (error) {
        res.status(400).json(error)
    }
}

const getConversationByUserId = async (req, res) => {
    const { id } = req.params;

    try {
        const results = await MembersServices.getById(id);
        res.json(results);
    } catch (error) {
        res.status(400).json(error)
    }
}

const getConversationData = async (req, res) => {
    const { id } = req.params;
    try {
        const results = await ConversationsServices.getData(id)
        res.json(results)
    } catch (error) {
        res.status(400).json(error)
    }
}

const deleteConversation = async (req, res) => {
    const { id } = req.params;
    try {
        await ConversationsServices.delete(id)
        res.status(201).json()
    } catch (error) {
        res.status(400).json(error)
    }
}

const createConversationGroup = async (req, res) => {
    const { iduser } = req.params;
    const { participants, title } = req.body;
    let opTitle
    try {
        if (!title) {
            opTitle = "Conversations Group"
        } else {
            opTitle = title
        }
        const data = {
            "title": opTitle,
            "type_id": 2
        }
        const result = await ConversationsServices.create(data)
        if (!result) {
            res.status(500).json()
        }
        const { id } = result
        let dataCreator = {
            "conversation_id": id,
            "user_id": iduser,
            "state_id": 1
        }
        await MembersServices.createGroup(dataCreator)

        participants.forEach( async (participant) => {
            let dataGuest = {
                "conversation_id": id,
                "user_id": participant,
                "state_id": 2
            }
            await MembersServices.createGroup(dataGuest)
        });


        res.status(201).json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}



module.exports = {
    createConversationSingle,
    getConversationByUserId,
    getConversationData,
    deleteConversation,
    createConversationGroup,
}