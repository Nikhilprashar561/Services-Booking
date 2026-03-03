import {bookingRequestModel} from "../models/bookingRequest.model.js"
import { ApiErrors } from "../utils/ApiError.js"
import { ApiRes } from "../utils/ApiRes.js"

const createBookingRequest = async (req, res) => {
    try {
      const {providerUsername, serviceCategory, description, bookingDate, price } = req.body  
    } catch (error) {
        
    }
}
const isAcceptedLocalProvider = async (req, res) => {
    try {

    } catch (error) {
        
    }
}
const isJobStatusLocalProvider = async (req, res) => {
    try {

    } catch (error) {
        
    }
}
const bookingDateLocalProvider = async (req, res) => {
    try {

    } catch (error) {
        
    }
}
const statusLocalProvider = async (req, res) => {
    try {

    } catch (error) {
        
    }
}
const isPaymentLocalProvider = async (req, res) => {
    try {

    } catch (error) {
        
    }
}
const isCancelLocalProvider = async (req, res) => {
    try {

    } catch (error) {
        
    }
}
const finalPostLocalProvider = async (req, res) => {
    try {

    } catch (error) {
        
    }
}
const reviewLocalProvider = async (req, res) => {
    try {

    } catch (error) {
        
    }
}


export { 
    createBookingRequest,
    isAcceptedLocalProvider,
    isCancelLocalProvider,
    isJobStatusLocalProvider,
    isPaymentLocalProvider,
    bookingDateLocalProvider,
    statusLocalProvider,
    finalPostLocalProvider,
    reviewLocalProvider
  }