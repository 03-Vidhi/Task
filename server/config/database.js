import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() =>{console.log("connected successfully")})
.catch((error) =>{
    console.log("received an error");
    console.error(error.message);
    process.exit(1);
});
}

export default dbConnect