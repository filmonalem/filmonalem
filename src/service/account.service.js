import axios from "axios"
const createAccountService = async (formData) => {
    const result = await axios.post('signup', formData)
    return result
}
const getAllAccountService = async () => {
    const result = await axios.get('users')
    return result
}
const getAllActiveAccount = async () => {
    const result = await axios.get('/activeUsers')
    return result
}
const getAllInactiveUsersAccount = async () => {
    const result = await axios.get('/inactiveUser')
    return result
}
const disableAccount = async () => {
    const result = await axios.put('/deactivate/:id')
    return result
}
export const accountService = {
    createAccountService,
    getAllAccountService,
    getAllActiveAccount,
    getAllInactiveUsersAccount,
    disableAccount
}