import mongoose from "mongoose";

// user interface
interface UserAttrs {
    email: string;
    password: string;
};

// user model interface
interface UserModel extends mongoose.Model<any> {
    build(userAttrs: UserAttrs): any;
}

const userScheme = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


// to allow type checking while working with mongoose
// use this builder to create users
// userAttrs: UserAttrs will type check the args
userScheme.statics.build = (userAttrs: UserAttrs) => {
    return new User(userAttrs);
};

const User = mongoose.model<any, UserModel>('User', userScheme);

User.build({

});

export { User };
