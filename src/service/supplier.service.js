import axios from "axios"
const createSupplierService = async (formData) => {
    const result = await axios.post('supplier/create', formData)
    return result
}
const getAllSupplierService = async () => {
    const result = await axios.get('suppliers/list')
    return result
}
const updateSupplierService = async (formData) => {
    const result = await axios.put(`/suppliers/${formData._id}`, formData)
    return result
}
export const supplierService = {
    updateSupplierService,
    createSupplierService,
    getAllSupplierService
}