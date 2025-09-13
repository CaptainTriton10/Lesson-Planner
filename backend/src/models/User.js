import mongoose, { model } from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: false },
});

const User = mongoose.model('User', userSchema);

export default User;
