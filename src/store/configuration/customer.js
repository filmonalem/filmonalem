
import Axios from 'axios'
import { defineStore } from 'pinia'

export const useCustomersStore = defineStore('useCustomersStore', {
    id: 'customer',
    state: () => ({
        customers: '',
        customer: '',
        message: '',
        hasError: '',
        isLoading: false,
    }),


    actions: {
        async addCustomer(formData) {
            this.isLoading = true;
            try {
                this.isLoading = false;
                const response = await Axios.post('customer/create', formData)
                this.customer.push(response.data.record)
                this.message = response.data.message;
            }
            catch {
                (err) => {
                    this.isLoading = false;
                    this.hasError = err.res.data.message
                }
            }
        },

        async fetchAllCustomers() {
            this.isLoading = true;
            try {
                this.isLoading = false
                const response = await Axios.get('customers/list')
                this.customers = response.data.record

            }
            catch {
                (err) => {
                    this.isLoading = false;
                    this.hasError = err.res.data.message;
                }
            }
        },


        async latestCustomer(formData) {
            this.isLoading = true
            try {

                this.isLoading = false
                const response = await Axios.put(`/customer/update/:id${formData._id}`, formData)
                this.customer = response.data.record
            } catch {
                (err) => {
                    this.isLoading = false;
                    this.hasError = err.res.data.message;
                }
            }
        },
        async removeCustomer(id) {

            try {
                const response = await Axios.delete(`customer/${id}`)
                console.log(response)
                this.customers = response.data.record
            } catch {
                (error) => console.log(error, "error")
            }
        }
    }

})
