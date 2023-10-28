import {Schema, model} from 'mongoose'

const Member = new Schema({
    userName : {type: String, required: true},
    status : {type: String, required: true},
})

export default model('Member', Member)