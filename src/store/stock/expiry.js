import Axios from 'axios'
import { defineStore } from 'pinia'
export const useExpiryStore = defineStore('useExpiryStore', {
    id: 'expiry',
    state: () => ({
        expiries: "",
        isLoading: false,
        hasError: ""

    }),
    actions: {
        async fetchAllExpiring() {
            this.isLoading = true
            try {
                this.isLoading = false
                const response = await Axios.get('/stock/expiring')
                this.expiries = response.data.record
                console.log(response)
            } catch {
                (err) => {
                    this.isLoading = false
                    this.hasError = err.error.res.data.message

                }

            }
        }
    }
})