import bcrypt from "bcryptjs"
import User from "@/models/User"
import dbConnect from "@/lib/mongoose"
import apiHandler from "@/lib/apiHandler"

export default apiHandler().post(async (req, res) => {
    const { name, email, password, role, isActive, allowedPaths, image } = req.body

    if (!name || !email || !password || !role || !isActive) return res.status(400).json({
        message: `${name || email || password || role || isActive || allowedPaths} is required`,
        status: false
    })

    try {
        await dbConnect()

        const userExists = await User.findOne({ email }).sort({ createdAt: 1 })

        if (userExists) return res.status(400).json({
            status: false,
            message: 'User already exists',
            data: userExists
        })

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            isActive,
            allowedPaths,
            image
        })

        return res.status(201).json({
            status: true,
            message: 'User created successfully',
            data: user,
        })
    } catch (error: unknown) {
        console.log(`[DEBUG] AUTH/REGISTER | POST | ERROR | ${error}`)
        return res.status(500).json({
            message: 'Internal Server Error',
            status: false
        })
    }
})