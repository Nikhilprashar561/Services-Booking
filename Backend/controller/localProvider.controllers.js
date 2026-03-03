import { localProviderModel } from "../models/localProvider.model.js"
import { ApiErrors } from "../utils/ApiError.js"
import { ApiRes } from "../utils/ApiRes.js"

const localProviderRegister = async (req, res) => {
    try {
        const {fullname, email, password, role, city, category,pricePerHour, experience } = req.body;
    } catch (error) {
        
    }
}
const localProviderLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
    } catch (error) {
        
    }
}
const localProviderAddress = async (req, res) => {
    try {
        const { address } = req.body;
    } catch (error) {
        
    }
}
const localProviderLogout = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export { localProviderRegister, localProviderLogin, localProviderAddress, localProviderLogout }
