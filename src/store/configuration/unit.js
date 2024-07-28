import Axios from "axios"
import { defineStore } from "pinia"
export const useUnitsStore = defineStore('useUnitsStore', {
    id: "unit",
    state: () => ({
        unit: '',
        units: '',
        isLoading: false,
        hasError: '',
        message: '',
        status: ''
    }),


    actions: {
        async addUnit(formData) {
            this.isLoading = true
            await new Promise(resolve => setTimeout(resolve, 2000));
            await Axios.post('unit/create', formData)
                .then((res) => {
                    this.isLoading = false
                    this.units.unshift(res.data.record)
                    this.message = res.data.message
                    this.status = res.data.status

                })
                .catch(err => {
                    this.isLoading = false
                    this.hasError = err.res.data.message
                    this.status = err.res.data.status
                    console.log(err)
                })


        },

        async fetchAllUnit() {
            this.isLoading = true
            try {
                this.isLoading = false
                const response = await Axios.get('units/list')
                this.units = response.data.record
                this.status = response.data.status
                this.message = response.data.message
            } catch {
                (err) => {
                    this.isLoading = false;
                    this.status = err.res.data.status
                    this.hasError = err.res.data.message;
                }
            }
        }
    }
})

// import Axios from "axios"
// import { defineStore } from "pinia"
// export const useUnitsStore = defineStore('useUnitsStore', {
//     id: "unit",
//     state: () => ({
//         unit: '',
//         units: '',
//         isLoading: false,
//         hasError: '',
//         message: '',
//         status: ''
//     }),

//     actions: {
//         async addUnit(formData) {
//             this.isLoading = true
//             try {
//                 this.isLoading = false
//                 const response = await Axios.post('unit/create', formData)
//                 this.units.unshift(response.data.record)
//                 this.message = response.data.message
//             } catch {
//                 (err) => {
//                     this.isLoading = false;
//                     this.hasError = err.res.data.message;
//                 }
//             }
//         },
//         async fetchAllUnit() {
//             this.isLoading = true
//             try {
//                 this.isLoading = false
//                 const response = await Axios.get('units/list')
//                 this.units = response.data.record
//                 this.message = response.data.message
//             } catch {
//                 (err) => {
//                     this.isLoading = false;
//                     this.hasError = err.res.data.message;
//                 }
//             }
//         }
//     }
// })