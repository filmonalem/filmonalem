import { medicineService } from '../../service/medicine.service'
import { defineStore } from 'pinia'

export const useMedicinesStore = defineStore('useMedicinesStore', {
    id: 'customer',
    state: () => ({
        medicines: '',
        medicine: '',
        message: '',
        hasError: '',
        status: '',
        isLoading: false,
    }),


    actions: {
        async addMedicine(formData) {
            this.isLoading = true
            await medicineService.createMedicineService(formData).then((response) => {
                this.medicines.push(response.data.record)
                this.message = response.data.message
                console.log(response.data.message)
                this.status = response.data.status
            }).catch((err) => {
                this.isLoading = false
                this.hasError = err.error.response.data.message

            });

        },

        async fetchAllMedicines() {
            this.isLoading = true
            await medicineService.getAllMedicineService().then((response) => {
                this.isLoading = false,
                    this.medicines = response.data.record
                this.status = response.data.status

            }).catch((err) => {
                this.isLoading = false
                this.hasError = err.error.response.data.message
            });

        },


        async latestMedicine(formData) {
            this.isLoading = true
            await medicineService.updateMedicineService().then((response) => {
                this.isLoading = false,
                    this.medicines = response.data.record
                this.status = response.data.status
            }).catch((err) => {
                this.isLoading = false
                this.hasError = err.error.response.data.message
            });

        },

    }

})
