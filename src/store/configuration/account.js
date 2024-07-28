import Axios from "axios";
// import { accountService } from "../../service/account.service"
import { defineStore } from "pinia"
export const useAccountsStore = defineStore('useAccountsStore', {
    id: "account",
    state: () => ({
        account: '',
        accounts: '',
        message: '',
        hasError: "",
        status: '',
        isLoading: false
    }),
    // actions: {
    //     async addAccount(formData) {
    //         this.isLoading = true
    //         await accountService.createAccountService(formData).then((response) => {
    //             this.account.push(response.data.record)
    //             this.message = response.data.message

    //         }).catch((err) => {
    //             this.isLoading = false
    //             this.hasError = err.response.data.message

    //         });
    //     },
    //     async fetchAllAccounts() {
    //         this.isLoading = true
    //         await accountService.getAllAccountService().then((response) => {
    //             this.isLoading = false,
    //                 this.accounts = response.data.record
    //         }).catch((err) => {
    //             this.isLoading = false
    //             this.hasError = err.response.data.message
    //         });
    //     },
    //     async fetchAllActiveAccount() {
    //         this.isLoading = true
    //         await accountService.getAllActiveAccount().then((response) => {
    //             this.isLoading = false,
    //                 this.accounts = response.data.users
    //         }).catch((err) => {
    //             this.isLoading = false
    //             this.hasError = err.response.data.message

    //         });
    //     },
    //     async fetchAllInactiveUserAccount() {
    //         this.isLoading = true
    //         await accountService.getAllInactiveUsersAccount().then((response) => {
    //             this.isLoading = false,
    //                 this.accounts = response.data.users
    //         }).catch((err) => {
    //             this.isLoading = false
    //             this.hasError = err.response.data.message

    //         });
    //     },
    //     async deactivateAccount() {
    //         this.isLoading = true
    //         await accountService.disableAccount().then((response) => {
    //             this.isLoading = false,
    //                 this.accounts = response.data.users
    //         }).catch((err) => {
    //             this.isLoading = false
    //             this.hasError = err.response.data.message

    //         });
    //     }
    // }
    actions: {
        async addAccount(formData) {
            this.isLoading = true;
            try {
                this.isLoading = false;
                const response = await Axios.post('user/create', formData)
                this.accounts.push(response.data.user)
                this.message = response.data.message
                this.status = response.data.status
            } catch {
                (err) => {
                    this.isLoading = false;
                    this.status = response.data.status
                    this.hasError = err.error.res.data.message;
                }
            }
        },
        async fetchAllAccounts() {
            this.isLoading = true;
            try {
                this.isLoading = false;
                const response = await Axios.get('users/list')
                this.accounts = response.data.users
                this.message = response.data.message
                this.status = response.data.status
            } catch {
                (err) => {
                    this.isLoading = false;
                    this.status = response.data.status
                    this.hasError = err.error.res.data.message;
                }
            }
        },
        async fetchAllActiveAccount() {
            this.isLoading = true;
            try {
                this.isLoading = false;
                const response = await Axios.get('/activeUsers')
                this.accounts = response.data.users
                this.message = response.data.message

            } catch {
                (err) => {
                    this.isLoading = false;
                    this.hasError = err.error.res.data.message;

                }
            }
        },

        async fetchAllInactiveUsersAccount() {
            this.isLoading = true;
            try {
                this.isLoading = false;
                const response = await Axios.get('/inactiveUsers')
                this.accounts = response.data.users
                this.message = response.data.message

            } catch {
                (err) => {
                    this.isLoading = false;
                    this.hasError = err.error.res.data.message;
                }
            }
        },

        async deactivateAccount(id) {
            this.isLoading = true
            try {
                this.isLoading = false;
                const response = await Axios.put(`/user/deactivate/${id}`)
                console.log(id)
                this.account = response.data.users
                this.message = response.data.message
            } catch {
                (err) => {
                    this.isLoading = false;
                    this.hasError = err.error.res.data.message;
                }
            }
        }
    }
})