import Axios from 'axios'
import { defineStore } from 'pinia'
// import { supplierService } from "../../service/supplier.service.js"
export const useSupplierStore = defineStore('useSupplierStore', {
    id: 'supplier',
    state: () => ({
        suppliers: '',
        supplier: '',
        message: '',
        hasError: '',
        isLoading: false,
        status: '',
    }),


    //     actions: {
    //         async addSupplier(formData) {
    //             this.isLoading = true
    //             await supplierService.createSupplierService(formData).then((response) => {
    //                 this.suppliers.push(response.data.record)
    //                 this.message = response.data.result.message
    // this.status = response.data.status
    //             }).catch((err) => {
    //                 this.isLoading = false
    //                 this.hasError = err.response.data.message

    //             });
    //         },
    //         async fetchAllSuppliers() {
    //             this.isLoading = true
    //             await supplierService.getAllSupplierService().then((response) => {
    //                 this.isLoading = false,
    //                     this.suppliers = response.data.record
    //                 this.message = response.data.message
    //                 this.status = response.data.status
    //                 this.hasError = err.res.data.message

    //             }).catch((err) => {
    //                 this.isLoading = false
    //                 this.hasError = err.res.data.message
    //             });
    //         },
    //     }
    // })
    actions: {
        async addSupplier(formData) {

            this.isLoading = true;

            try {
                this.isLoading = false;

                const response = await Axios.post('supplier/create', formData)
                console.log(formData)
                this.suppliers.push(res.data.record)
                this.message = response.data.message
                this.status = response.data.status

            }

            catch (err) {
                this.isLoading = false
                this.hasError = err.error.response.data.message
                this.status = err.response.data.status

            }
        },

        async fetchAllSuppliers() {
            this.isLoading = true
            try {

                const response = await Axios.get('suppliers/list')
                this.isLoading = false

                this.suppliers = response.data.record
                this.message = response.data.message
                this.status = response.data.status

            }
            catch {
                (err) => {
                    this.isLoading = false;
                    this.status = response.data.status
                    this.hasError = err.error.res.data.message;
                }
            }
        },
        async latestSupplier(formData) {
            try {
                const response = await Axios.put(`/supplier/${formData._id}`, formData)
                this.supplier = response.data.record
                this.message = response.data.message
                this.status = response.data.status

            }
            catch {
                this.isLoading = false
                this.hasError = err.error.res.data.message
                this.status = err.res.data.status
            }
        }
    }

})