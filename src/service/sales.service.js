import axios from "axios";
const createSalesService = async (formData) => {
    const result = await axios.post('sale/create', formData)
    return result
}
const getAllSalesService = async () => {
    const result = await axios.get('sale/list')
    return result
}
const getAllSalesMedicine = async () => {
    const result = await axios.get('/medicines/list')
    return result
}
const updateSalesService = async (formData) => {
    const result = await axios.put(`/stocks/${formData._id}`, formData)
    return result
}
export const salesService = {
    updateSalesService,
    createSalesService,
    getAllSalesService,
    getAllSalesMedicine
}