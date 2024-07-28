import axios from "axios"
const createCustomerService=async(formData)=>{
    const result=await axios.post('/customer/',formData)
    return result
}
const getAllCustomerService=async()=>{
    const result=await axios.get('/customers/')
    return result
}
const updateCustomerService=async(formData)=>{
    const result=await axios.put(`/customers/${formData._id}`,formData)
    return result
}
export const customerService={
    updateCustomerService,
createCustomerService,
getAllCustomerService
}