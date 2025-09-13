import {Webhook} from 'svix'
import userModel from '../models/userModel.js';


//Api controller function to manage db

const clerkWebhooks = async (req, res) => {
    try {
        console.log("Webhook endpoint hit");
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        const payload = req.body; // Buffer from express.raw
        console.log("Raw payload:", payload.toString());
        await whook.verify(payload, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });
        const { data, type } = JSON.parse(payload);
        console.log("Webhook type:", type, "Data:", data);

        switch(type){
            case "user.created":{
                const userData={
                    clerkId:data.id,
                    email:data.email_addresses[0].email_address,
                    firstName:data.first_name,
                    lastName:data.last_name,
                    photo:data.image_url
                }
                console.log("Attempting to create user:", userData);
                const createdUser = await userModel.create(userData);
                console.log("User created:", createdUser);
                res.json({})
                break;
            }
            case "user.updated":{
                const userData={
                    email:data.email_addresses[0].email_address,
                    firstName:data.first_name,
                    lastName:data.last_name,
                    photo:data.image_url
                }
                console.log("Attempting to update user with clerkId:", data.id, userData);
                const updatedUser = await userModel.findOneAndUpdate({clerkId:data.id},userData);
                console.log("User updated:", updatedUser);
                res.json({})
                break;
            }
            case "user.deleted":{
                console.log("Attempting to delete user with clerkId:", data.id);
                const deletedUser = await userModel.findOneAndDelete({clerkId:data.id});
                console.log("User deleted:", deletedUser);
                res.json({})
                break;
            }
            default: {
                res.json({}); // Always respond
            }
        }

    } catch (error) {
        console.log("Webhook error:", error.message);
        res.json({success:false,message:error.message})
    }
}
export{clerkWebhooks}