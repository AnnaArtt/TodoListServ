import Account from "../models/Account.js"
import Member from "../models/Member.js"
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken"
import secret from "../config.js"

function generateAccessToken(id, members){
    const peyload = {
        id, 
        members
    }

    return jwt.sign(peyload, secret.secret, {expiresIn: "24h"})
}


class authorizationController{
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            console.log(errors)
            if(!errors.isEmpty()){
                return res.status(400).json({message: 'Registration error', errors})
            }
            const {login, password} = req.body;
            const candidate = await Account.findOne({login});

            if(candidate){
                return res.status(400).json({message: 'Account with this login exist'})
            }

            const account = new Account({login, password})
            await account.save()
            return res.json({message: 'Successful registration'})
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'Registration error'});
        }
    }

    async login(req, res) {
        try {
            const {login, password} = req.body;
            const account = await Account.findOne({login})
            if(!account){
                return res.status(400).json({message: 'Account doesn`t exist'});
            }

            if(password != account.password){
                return res.status(400).json({message: 'Password error'});
            }

            const token = generateAccessToken(account._id, account.members)
            return res.json({token})

        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'Login error'});
        }
    }

    async getAccountsLists(req, res) {
        try {
            // const member = new Member({ userName: "Andrew", status: "father"});
            // await member.save();

            const token = req.headers.authorization.split(" ")[1];
            const decodedData = jwt.verify(token, secret.secret);


            const account_information = await Account.findOne(decodedData._id);

            const members = account_information.members;

            const members_information = await Member.find({ _id: { $in: members } })
            //const members
            //req.account = decodedData

            // получаем id

            // запрос на получение членов семьи в бд

            // запрос на поиск их в бд

            res.json({members, members_information});
            
            // res.json("ok");
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'Login error'});
        }
    }
}

export default new authorizationController()