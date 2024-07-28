<!-- <div class="relative">
  <input
    v-model="password"
    :type="showPassword ? 'text' : 'password'"
    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md pl-10"
    placeholder="Password"
  />
  <button @click="togglePasswordVisibility" class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
    <svg
      v-if="showPassword"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="h-6 w-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="h-6 w-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M7 12a5 5 0 019.95 0M9 17.5l3 3m0 0l3-3m-3 3V9"
      />
    </svg>
  </button>
</div>
</template>

<script setup>
import { ref } from 'vue';

const password = ref('');
const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script> -->

<script setup>
import { ref, onMounted } from 'vue';
import { useLoginStore } from '../store/account/LoginPiniaStore';
import { useToast } from "vue-toast-notification"
const toast = useToast()

// const store = useLoginStore()
const { login } = useLoginStore()
var display = ref(true)
onMounted(() => {
  setTimeout(function () {
    display.value = false;
  }, 2000);
})
const email = ref('');
const password = ref('');

const submitLogin = async () => {
  const formData = {
    email: email.value,
    password: password.value
  }
  if (!email.value && !password.value) {
    toast.open({
      message: 'Email and password must be filled',
      position: 'top',
      type: 'error'
    })

    return
  }
  await login(formData).then(() => {

    toast.open({
      message: 'Login successfully',
      position: 'top',
      type: 'success'
    })
  })
    .catch((err) => {
      toast.open({
        message: 'incorrect Email or Password',
        position: 'top',
        type: 'error'
      })
    })

};

</script>
<template>
  <div>
    <div class="custom-loader grid grid-cols-1 place-items-center pt-10" v-if="display">
      <div class="justify-content-center mb-4">
        <h2 class="text-center">Loading App...</h2>
      </div>
    </div>
    <section class="flex flex-col md:flex-row h-screen items-center" v-if="!display">
      <div
        class="hidden lg:block w-full md:min-w-0 xl:w-2/3 h-screen  bg-gradient-to-r from-blue-500 via-blue-50   to-white ">

        <img src="../assets/pharm.webp" class="custom-image w-full h-full object-cover" />
      </div>
      <div class="   w-full md:max-w-md  lg:max-w-full md:mx-auto md:w-2/3 xl:w-1/3 h-screen p-2">
        <div class=" p-4 bg-white h-full">
          <div class=" d-flex text-center mt-2 text-2xl  font-extrabold">
            Welcome Back
          </div>

          <div>


            <div class=" mt-6 grid grid-cols-1 md:grid-cols-1 ">

              <FormKit v-model="email" validation="required|email" type="email" label="Email" />
              <FormKit v-model="password" validation="required|password" type="password" label="Password" />
              <!-- 
              <div class="relative">
                <label class="font-semibold text-slate-600 " for="">Password</label>

                <input v-model="password" :type="showPassword ? 'text' : 'password'"
                  class=" shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md pl-10"
                  placeholder="Password" />
                <button @click="togglePasswordVisibility"
                  class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                  <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" class="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    class="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 12a5 5 0 019.95 0M9 17.5l3 3m0 0l3-3m-3 3V9" />
                  </svg>
                </button>
              </div> -->
            </div>


            <button @click="submitLogin"
              class="bg-blue-500 w-full block hover:bg-blue-700  text-white font-semibold rounded-lg px-4 py-3 mt-6">
              Log In
            </button>

            <button type="button" disabled
              class="w-full mt-5 block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg   py-3 border border-gray-300">
              <div class="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="w-6 h-6"
                  viewBox="0 0 48 48">
                  <defs>
                    <path id="a"
                      d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
                  </defs>
                  <clipPath id="b">
                    <use xlink:href="#a" overflow="visible" />
                  </clipPath>
                  <path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
                  <path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
                  <path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
                  <path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
                </svg>
                <span class="ml-4"> Log in with Google</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.custom-loader {
  margin-top: 250px;
}
</style>