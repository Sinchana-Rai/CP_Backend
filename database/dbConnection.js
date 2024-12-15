import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGODB_URI,{dbName: "MERN_DB"})
    .then(() => {
        console.log("Connected to database.")
    }).catch(e => {
        console.log("Some Error Occured...", err)
    })
}
