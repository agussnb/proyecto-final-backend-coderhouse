import mongoose from 'mongoose';

const collection = "users";
const schema = mongoose.Schema({
    first_name: String,
    last_name: String,
    fullName: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    age: {
        type: Number
    },
    password: {
        type: String
    },
    cart: {
        products: {
            type: Array
        }
    },
    cartId: {
        type: String
    }
});

const userModel = mongoose.model(collection, schema);
export default userModel;
