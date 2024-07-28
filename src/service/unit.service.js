import axios from "axios"
const createUnitService=async(formData)=>{
    const result=await axios.post('/unit/',formData)
    return result
}
const getAllUnitService=async()=>{
    const result=await axios.get('/units/')
    return result
}
const updateUnitService=async(formData)=>{
    const result=await axios.put(`/units/${formData._id}`,formData)
    return result
}
export const unitService={
    updateUnitService,
createUnitService,
getAllUnitService
}