import ContributionAccount from "../models/contribution.model.js";

const generateConCode = async (userId) => {
    const count = await ContributionAccount.countDocuments({userId});
       return `CON${String(count + 1).padStart(4, '0')}`;
}

export default generateConCode;