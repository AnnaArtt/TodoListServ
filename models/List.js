import {Schema, model} from 'mongoose'
import Todo from './Todo.js'

const List = new Schema({
    _id: { type: String, required: true },
    todo : [{ type: Schema.Types.ObjectId, ref: Todo, required: true }],
})

export default model('List', List)