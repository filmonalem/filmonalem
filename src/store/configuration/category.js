// import { categoryService } from "../../service/category.service"
// import { defineStore } from "pinia"
// export const useCategoriesStore = defineStore('useCategoriesStore', {
//     id: "category",
//     state: () => ({
//         category: '',
//         categories: '',
//         message: '',
//         hasError: '',
//         isLoading: false,
//         status: ''
//     }),

//     actions: {
//         async addCategory(formData) {
//             this.isLoading = true;
//             await categoryService.createCategoryService(formData).then((response) => {
//                 this.categories.push(response.data.record)
//                 this.message = response.data.message
//                 this.status = res.data.status

//             }).catch((err) => {
//                 this.isLoading = false
//                 this.hasError = err.response.data.message
//                 this.status = err.res.data.status

//             });

//         },
//         async fetchAllCategory() {
//             this.isLoading = true;
//             await categoryService.getAllCategoryService().then((response) => {
//                 this.isLoading = false,
//                     this.categories = response.data.record
//                 this.status = res.data.status

//             }).catch((err) => {
//                 this.isLoading = false
//                 this.hasError = err.response.data.message
//                 this.status = err.res.data.status

//             });

//         }
//     }
// })

import Axios from "axios"
import { defineStore } from "pinia"
export const useCategoriesStore = defineStore('useCategoriesStore', {
    id: "category",
    state: () => ({
        category: '',
        categories: '',
        message: '',
        hasError: '',
        isLoading: false,
        status: ''
    }),

    actions: {


        async addCategory(formData) {
            this.isLoading = true;
            await new Promise(resolve => setTimeout(resolve, 2000));

            try {
                this.isLoading = false;
                const response = await Axios.post('category/create', formData)
                this.categories.push(response.data.record)
                this.message = response.data.message
                this.status = res.data.status

            } catch {
                (err) => {
                    this.status = err.res.data.status;
                    this.isLoading = false;
                    this.hasError = err.res.data.message;
                }
            }
        },
        async fetchAllCategory() {
            this.isLoading = true;

            try {
                this.isLoading = false;
                const response = await Axios.get('categories/list')
                this.categories = response.data.record
                this.message = response.data.message
                this.status = err.res.data.status


            } catch {
                (err) => {
                    this.isLoading = false;
                    this.hasError = err.res.data.message;
                }

            }
        }
    }
})