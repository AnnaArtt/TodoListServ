import {Schema, model} from 'mongoose'

const Account = new Schema({
    login : {type: String, unique: true, required: true},
    password : {type: String, required: true},
    members : [{type: String, ref: 'Member'}]
})

export default model('Account', Account)