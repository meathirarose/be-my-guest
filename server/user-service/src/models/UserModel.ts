import mongoose, { Schema } from "mongoose";
import { Role, IUserAttrs, IUserDoc, IUserModel } from "../interfaces/IUserModel";

const userSchema: Schema = new Schema<IUserDoc>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.CUSTOMER
    },
    verified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    profileImage: {
        type: String,
    }
}, {
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  });

userSchema.statics.build = (attrs: IUserAttrs) => {
    return new User(attrs);
};
  
const User = mongoose.model<IUserDoc, IUserModel>("User", userSchema);
  
export { User };