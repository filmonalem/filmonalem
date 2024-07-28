// import { salesService } from "../../service/sales.service"
// import { defineStore } from "pinia"
// export const useSalesStore = defineStore('useSalesStore', {
//     id: 'sale',
//     state: () => ({
//         sale: "",
//         sales: "",
//         message: "",
//         medicines: '',
//         hasError: "",
//         isLoading: false
//     }),

//     actions: {
//         async addSale(formData) {
//             console.log(formData, 0)
//             this.isLoading = true
//             await salesService.createSalesService(formData).then((response) => {
//                 this.isLoading = false,
//                     this.sales.push(response.data.record)
//                 this.message = response.data.message

//             })
//                 .catch((err) => {
//                     this.isLoading = false
//                     this.message = err.response.data.message
//                 })


//         },
//         async fetchAllSales() {
//             this.isLoading = true
//             await salesService.getAllSalesMedicine().then((response) => {
//                 this.isLoading = false,
//                     this.sales = response.data.record
//             }).catch((err) => {
//                 this.isLoading = false
//                 this.message = err.response.data.message
//             });
//         },


//         async fetchAllMedicine() {
//             this.isLoading = true
//             await salesService.getAllSalesMedicine().then((response) => {
//                 this.isLoading = false,
//                     this.medicines = response.data.record
//             }).catch((err) => {
//                 this.message = err.response.data.message
//             })


//         }

//     }

// })

import Axios from 'axios'
import { defineStore } from "pinia"
export const useSalesStore = defineStore('useSalesStore', {
    id: 'sale',
    state: () => ({
        sale: "",
        sales: "",
        message: "",
        medicines: '',
        hasError: "",
        isLoading: false
    }),
    actions: {
        async addSale(formData) {
            this.isLoading = true
            try {
                this.isLoading = false
                const response = await Axios.post('/stock/create', formData)
                this.sale.push(response.data.record)
                this.message = response.data.message
            }
            catch {
                (err) => {
                    this.isLoading = false;
                    this.hasError = err.error.res.data.message;
                }

            }
        },
        async fetchAllSales() {
            this.isLoading = true
            try {
                this.isLoading = false
                const response = await Axios.get('/stocks/list')
                this.sales = response.data.record
                this.message = response.data.message
            }
            catch {
                (err) => {
                    this.isLoading = false;
                    this.hasError = err.error.res.data.message;
                }
            }
        },
        async fetchAllMedicine() {
            this.isLoading = true
            try {
                this.isLoading = false
                const response = await Axios.get('/medicines/list')
                this.medicines = response.data.record
                this.message = response.data.message
            }
            catch {
                (err) => {
                    this.isLoading = false;
                    this.hasError = err.error.res.data.message;
                }
            }
        },
        async fetchDailySales() {
            this.isLoading = true
            try {
                this.isLoading = false
                const response = await Axios.get('/salesByDate')
                this.sales = response.data.record
                this.message = response.data.message
            }
            catch {
                (err) => {
                    this.isLoading = false;
                    this.hasError = err.error.res.data.message;
                }
            }
        },

    }
})