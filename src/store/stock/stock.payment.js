import Axios from 'axios'
import { defineStore } from "pinia"
export const useStockPaymentStore = defineStore('useStockPaymentStore', {
    id: 'purchase',
    state: () => ({
        purchase: null,
        purchases: null,
        message: "",
        medicines: '',
        hasError: "",
        status: '',
        isLoading: false
    }),
    actions: {
        async addPayment(formData) {
            this.isLoading = true
            try {
                this.isLoading = false
                const response = await Axios.post('/stock/credit/payment', formData)
                this.purchases.push(response.data.record)
                this.message = response.data.message
                this.status = response.data.status

            }
            catch {
                (err) => {
                    this.isLoading = false;
                    this.hasError = err.error.res.data.message;
                    this.status = err.response.data.status

                }

            }
        },
        async fetchStockDetails(id) {
            this.isLoading = true
            await Axios.get(`/stock/detail/${id}`).then((response) => {
                this.isLoading = false
                this.purchase = response.data.record
                this.message = response.data.message
                this.status = response.data.status
            }).catch((err) => {
                this.isLoading = false;
                this.hasError = err.error.response.data.message;
                this.status = err.response.data.status

            });
        },
        async fetchAllStockPaymentList() {
            this.isLoading = true
            await Axios.get("/stock/payment/list").then((response) => {
                this.isLoading = false
                this.purchases = response.data.record
                this.message = response.data.message
                this.status = response.data.status

            }).catch((err) => {
                this.isLoading = false;
                this.hasError = err.error.response.data.message;
                this.status = err.response.data.status

            });
            // try {
            //     const response = await Axios.get("/stock/payment/list")
            //     this.isLoading = false
            //     this.purchases = response.data.record
            //     this.message = response.data.message
            //     this.status = response.data.status

            // }
            // catch {
            //     (err) => {
            //         this.isLoading = false;
            //         this.hasError = err.error.res.data.message;
            //         this.status = err.response.data.status


            //     }
            // }
            // this.isLoading = true

        },

    }
})