import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Verify webhook signature
        const payload = JSON.stringify(req.body);
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        await whook.verify(payload, headers);

        const { data, type } = req.body;

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses?.[0]?.email_address || '',
                    name: `${data.first_name || ''} ${data.last_name || ''}`.trim() || 'Unknown',
                    imageUrl: data.image_url || '',
                    enrolledCourses: []
                };
                await User.create(userData);
                return res.status(201).json({ success: true, message: 'User created successfully' });
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_addresses?.[0]?.email_address || '',
                    name: `${data.first_name || ''} ${data.last_name || ''}`.trim() || 'Unknown',
                    imageUrl: data.image_url || '',
                };
                await User.findByIdAndUpdate(data.id, userData, { upsert: true });
                return res.json({ success: true, message: 'User updated successfully' });
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                return res.json({ success: true, message: 'User deleted successfully' });
            }

            default: {
                return res.json({ success: true, message: `Webhook received: ${type}` });
            }
        }

    } catch (error) {
        console.error('Webhook error:', error);
        return res.status(400).json({ 
            success: false, 
            message: error.message 
        });
    }
};