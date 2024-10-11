import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpire: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[]; // This is a subdocument array of Message 
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
    },
    
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\../, "Please enter a valid email address"],
    },

    password: {
        type: String,
        required: [true, "Password is required"],
    },

    verifyCode: {
        type: String,
        required: [true, "Verify code is required"],
    },

    verifyCodeExpire: {
        type: Date,
        required: [true, "Verify code expire date is required"],
    },

    isVerified: {
        type: Boolean,
        required: true,
        default: false,
    },

    isAcceptingMessage: {
        type: Boolean,
        required: true,
        default: true,
    },

    messages: [MessageSchema] 
})


const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;