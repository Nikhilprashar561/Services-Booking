import { adminModel } from "../models/admin.model.js"
import { ApiErrors } from "../utils/ApiError.js"
import { ApiRes } from "../utils/ApiRes.js"
import { passwordHashing } from "../utils/passwordHashing.js"

const adminRegister = async (req, res) => {
    try {
        const {fullname, email, password, verifyCode} = req.body

        if(!fullname || !email || !password || !verifyCode){
            throw new ApiErrors(400,"Please fill all fields")
        }

        const checkAlready = await adminModel.countDocuments()
        if(checkAlready >= 1) throw new ApiErrors(400,"Sorry to says but Admin already created");

        const existingUser = await adminModel.findOne({email})
        if(existingUser){
            throw new ApiErrors(400,"With this email Admin Already Created")
        }
        
        const adminSecretCode = process.env.ADMIN_SECRET_CODE;
        console.log("Check Secrte Code Aya ya nahi",adminSecretCode);

        if(parent(verifyCode) !== adminSecretCode) throw new ApiErrors(400, "Check Verify Code. Invalid Code");

        const hashPassword = await passwordHashing(password)
        const role = "Admin"

        const createAdmin = await adminModel.create({
            fullname,
            email,
            password: hashPassword,
            verifyCode: adminSecretCode,
            role: role
        })

        if(!createAdmin) throw new ApiErrors(400, "Failed to register admin data.");
        
        return res.status(201).json(new ApiRes(201, createAdmin, "Admin Register SuccessFully"))

    } catch (error) {
        throw new ApiErrors(500,`Some Problem while register time ${error}`)
    }
}
const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body
    } catch (error) {
        
    }
}

const adminLogout = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export {adminRegister, adminLogin, adminLogout}
