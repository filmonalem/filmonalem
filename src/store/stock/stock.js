import Axios from 'axios'
import { defineStore } from "pinia"
export const usePurchaseStore = defineStore('usePurchaseStore', {
    id: 'stock',
    state: () => ({
        purchase: "",
        purchases: "",
        stocks: '',
        message: "",
        medicines: '',
        hasError: "",
        status: '',
        isLoading: false
    }),
    actions: {
        async addStock(formData) {
            this.isLoading = true
            try {
                this.isLoading = false
                const response = await Axios.post('stock/create', formData)
                this.purchase.push(response.data.record)
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
        async fetchAllStocks() {
            this.isLoading = true
            try {
                this.isLoading = false
                const response = await Axios.get('stocks/list')
                this.purchases = response.data.record
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
        async fetchStockReport(formData) {
            this.isLoading = true
            try {
                this.isLoading = false

                const res = await Axios.post('/stock/search/date')
                this.purchase.push(response.data.record)
                const response = await Axios.get('/stock/search/date', formData)
                this.purchases = res.data.record
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
        async fetchDailyStock() {
            this.isLoading = true
            try {
                this.isLoading = false
                const response = await Axios.get('/stocks/list')
                this.purchases = response.data.record
                this.message = response.data.message
                this.status = response.data.status
                console.log(response.data.record);

            }
            catch {
                (err) => {
                    this.isLoading = false;
                    this.hasError = err.error.res.data.message;
                    this.status = err.response.data.status

                }
            }
        },

        async fetchAllMedicines() {
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
        async fetchExpiringStock() {
            this.isLoading = true
            try {
                this.isLoading = false
                const response = await Axios.get('/stock/expiring')
                this.stocks = response.data.record
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
        async fetchBalanceStock() {
            this.isLoading = true
            try {
                this.isLoading = false
                const response = await Axios.get("/stocks/balance")
                this.stocks = response.data.record
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


    }
})