import mongoose from "mongoose"

const connectionDB = async ()=>{
    try {
        const instance = await mongoose.connect(process.env.MONGODB_URL)
        if(instance){
            console.log(`DataBase Connected Successfully at || =>>>>   ${instance.connection.host}`);
        }
    } catch (error) {
         console.log("Error while connecting with DataBase ", error.message);
    }

}

export default connectionDB
