import {Schema, model} from 'mongoose'

const TeamSchema = new Schema({
    trainerName: {
        type: String
    },
    team: [
        {
            name: String
        }
    ]
}, {timestamps: true})

export default model('Teams', TeamSchema)