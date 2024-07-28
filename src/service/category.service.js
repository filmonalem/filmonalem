import axios from "axios"
const createCategoryService = async (formData) => {
    const result = await axios.post('category/create', formData)
    return result
}
const getAllCategoryService = async () => {
    const result = await axios.get('categories/list')
    return result
}
export const categoryService = {
    createCategoryService,
    getAllCategoryService
}