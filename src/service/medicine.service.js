import axios from "axios"
const createMedicineService = async (formData) => {
    const result = await axios.post('medicine/create', formData)
    return result
}
const getAllMedicineService = async () => {
    const result = await axios.get('medicines/list')
    return result
}
const updateMedicineService = async (formData) => {
    const result = await axios.put(`/medicine/:id${formData._id}`, formData)
    return result
}
export const medicineService = {
    updateMedicineService,
    createMedicineService,
    getAllMedicineService
}