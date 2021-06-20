import { Schema, model, Model } from "mongoose"

export interface IUserModel extends Document {
    uuid: string,
    name?: string,
    gender?: string,
    dob?: string,
    phone: number,
    picture?: string
}

const userSchema:Schema = new Schema({
    _id: false,
    uuid: {
        type: String,
        unique: true,
        index: true,
        required: true,
    },
    name: {
        type: String,
        required: false
    }, gender: {
        type: String,
        required: false
    }, dob: {
        type: Date,
        required: false
    }, phone: {
        type: Number,
        required: true
    }, picture: {
        type: String,
        required: false
    }
}, { timestamps: true })

export const UserModel: Model<IUserModel> = model<IUserModel>("User", userSchema)