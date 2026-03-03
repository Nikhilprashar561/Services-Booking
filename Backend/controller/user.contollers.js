import {UserModel} from "../models/user.model.js"
import { ApiErrors } from "../utils/ApiError.js"
import { ApiRes } from "../utils/ApiRes.js"

const userRegister = async (req, res) => {
    try {
        const {fullname, email, password, role, city} = req.body
    } catch (error) {
        
    }
}
const userLogin = async (req, res) => {
    try {
        const {email, password} = req.body
    } catch (error) {
        
    }
}
const userAddress = async (req, res) => {
    try {
        const { address } = req.body
    } catch (error) {
        
    }
}
const userLogout = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export {
    userRegister,
    userLogin,
    userAddress,
    userLogout
}
