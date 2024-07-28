import Axios from 'axios';
import { defineStore } from 'pinia';
export const useLoginStore = defineStore('useLoginStore', {
    id: 'login',
    state: () => ({
        user: [],
        token: localStorage.getItem('token'),
        message: '',
        status: 'error'
    }),
    getters: {
        getAuth() {
            return this.token
        },
        getUser() {
            return  this.user
            },
            getMessage() {

                return this.message
            },
            getStatus(){
                return this.status
            }
        },
    
    actions: {
        async login(formData) {
            try {
                console.log(formData)
                const res = await Axios.post('/login', formData)
                if (res) {
                    console.log(res)
                    const changeToken = res.data.result.accessToken
                    localStorage.setItem('token', changeToken)
                    const changeUser = res.data.result.user
                    localStorage.setItem('user', changeUser)
                    //    push('/BaseMaster')
                    window.location.reload()
                }
            } catch {
                this.message = error.res.data.result.message
    windows.location.reload
            }
        }
    }
})