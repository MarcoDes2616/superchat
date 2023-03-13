const Members = require("../models/members.models");
const UserState = require("../models/userState.models");

class MembersServices {
    static async create(dataCreator, dataGuest) {
        try {
            console.log(dataCreator);
            console.log(dataGuest);
            await Members.create(dataCreator)
            await Members.create(dataGuest)
        } catch (error) {
            throw error;
        }
    }

    static async getById(id) {
        try {
            const results = await Members.findAll({
                where: {"user_id": id},
                attributes: {
                    exclude: ["state_id", "user_id"]
                },
                include: {
                    model: UserState,
                    attributes: ["name"]
                }
            })
            return results
        } catch (error) {
            throw error
        }
    }

    static async createGroup(data) {
        try {
            return await Members.create(data)
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MembersServices;