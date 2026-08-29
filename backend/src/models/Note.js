// schema definition for notes..........................................

import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({             // creating schema for notes as noteSchema
    title: {
        type:String,
        required:true
    },
    content: {
        type:String,
        required:true
    },
},
    {timestamps: true}
);

const Note = mongoose.model("Note", noteSchema)      // creating model for Note with noteSchema
                                                    //later this model will be used for CRUD Operations
export default Note