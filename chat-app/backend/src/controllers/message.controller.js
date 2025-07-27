import Message from "../models/message.model.js";
import User from "../models/user.mdel.js";

import cloudinary from "../lib/cloudidary.js";

export const getUserForSidebar= async (req, res) => {
    
    try {
        const loggedInUserId = req.user._id;
        const filterUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');
        return res.status(200).json({ filterUsers });
    } catch (error) {
        console.error('Error fetching users for sidebar:', error.message);
        return res.status(500).json({ message: error.message });
    }
}

export const getMessageById = async (req, res) => {
    try {
        const {id:userToChatId}= req.params;
        const myId = req.user._id;
        //sender receiver ()
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        }).sort({ createdAt: 1 });
        res.status(200).json({ messages });
    } catch (error) {
        console.error('Error fetching messages:', error.message);
        return res.status(500).json({ message: error.message });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { image, text } = req.body;
        const { id: receiverId } = req.params;

        const senderId = req.user._id;
        let imageUrl = '';
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        res.status(201).json({ message: newMessage });
        await newMessage.save();

        //
    } catch (error) {
        console.error('Error sending message:', error.message);
        return res.status(500).json({ message: error.message });
    }
}
