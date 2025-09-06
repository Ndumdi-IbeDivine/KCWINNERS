import { nanoid } from 'nanoid'
import ContributionAccount from '../models/contribution.model.js';

const generateReferralCode = async () => {
  let code;
  let exists = true;

  while (exists) {
    code = `REF-${nanoid(6).toUpperCase()}`; // Example: REF-1A2B3C
    exists = await ContributionAccount.findOne({ referralCode: code });
  }

  return code;
};

export default generateReferralCode;