import Account from "../models/Account.js"
import Member from "../models/Member.js"
import List from "../models/List.js"
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken"
import secret from "../config.js"


class memberController {
    async addNewMember(req, res){
        try{
            const errors = validationResult(req);
            console.log(errors)
            if(!errors.isEmpty()){
                return res.status(400).json({message: 'We cann`t create new member', errors})
            }
            const {userName, status} = req.body;
            const member = new Member({ userName: userName, status: status});
            await member.save();

            const memberId = member._id

            const list = new List({ _id: member._id, todo: []});
            await list.save();

            const token = req.headers.authorization.split(" ")[1];
            const decodedData = jwt.verify(token, secret.secret);
        
            const account_information = await Account.findOne(decodedData._id);
            account_information.members.push(memberId);
            await account_information.save();

            return res.status(200).json({ message: 'New member created successfully', member });

        }
        catch(error){
            console.log(error);
            res.status(400).json({message: 'We cann`t create new member'});
        }
    }
    async getMember(req, res){
        try {
            const memberId = req.params.userId.slice(1);

            const token = req.headers.authorization.split(" ")[1];
            
            const decodedData = jwt.verify(token, secret.secret);
        
            const account_information = await Account.findOne(decodedData._id);
            if(!account_information.members.includes(memberId)){
                return  res.status(401).json({message: 'This member is member of another family'});
            }

            const member = await Member.findOne({ _id: memberId });

            return res.status(200).json({ message: 'Member is found', member });
            
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'We cann`t find this member'});
        }
    }

    // async deleteMember(req, res){}

    // async updateMember(req, res){}

}

export default new memberController()