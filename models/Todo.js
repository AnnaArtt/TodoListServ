import {Schema, model} from 'mongoose'

const Todo = new Schema({
    title : {type: String, required: true},
    description : {type: String, required: true},
    type : {type: String, required: true},
    status : {type: String, required: true},
    userId : {type: String, required: true},
})

export default model('Todo', Todo)


// "id": 1683159173745,
//           "title": "Some",
//           "description": "New",
//           "type": "vacation",
//           "status": "process"