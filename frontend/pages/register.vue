<script setup lang="ts">
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import RegisterValidate from './RegisterValidate.vue';

const formData = reactive({
        username: '',
        email: '',
        password: '',
        confirmPassword: null,
});
const rules = computed(() => {
  return {
    email: { required, email },
    username: { required, lengthCheck: minLength(3) },
    password: { required, lengthCheck: minLength(6)},
    confirmPassword: { required, lengthCheck: minLength(6), passwordMatch: sameAs(formData.password) },
  };
});


const v$ = useVuelidate(rules, formData);

const { register } = useStrapiAuth()

const err = ref<any>(null)

const onSubmit = async () => {
  try {
    await register({ username: formData.username, email: formData.email, password: formData.password})
    navigateTo('/')
  } catch (e) {
    e ? err.value = e.error.message : null
    
  }
}

</script>
<template>
  
<section class="bg-gray-50 dark:bg-gray-900">
 
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create and account
              </h1>
              <form class="space-y-4 md:space-y-6" @submit.prevent="onSubmit">
                <div 
                v-if="err"
                class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                >
                  {{ err }}
                </div>
                  <div class="relative">
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input v-model="v$.email.$model" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" 
                      :class="{'dark:border-red-500 ': v$.email.$error,'dark:border-green-400 ': !v$.email.$error && formData.email !== ''}" >
                      <ValidateIcon :error="v$.email.$error" :invalid="v$.email.$invalid"/>
                      <div class="h-5 text-xs text-red-400 absolute right-0">
                      <div v-if="v$.email.$error">
                        <span v-if="v$.email.$errors[0].$validator === 'email'">
                          email adress is invalid
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="relative">
                      <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                      <input v-model="v$.username.$model" type="text" name="username" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name"
                      :class="{'dark:border-red-500 dark:border-red-500': v$.username.$error,'dark:border-green-400 ': !v$.username.$error && formData.username !== ''}">
                      <ValidateIcon :error="v$.username.$error" :invalid="v$.username.$invalid"/>
                      <div class="h-5 text-xs text-red-400 absolute right-0">
                      <div v-if="v$.username.$error">
                        <span v-if="v$.username.$errors[0].$validator === 'lengthCheck'">
                          username is too short
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="relative">
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input v-model="v$.password.$model" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      :class="{'dark:border-red-500 ': v$.password.$error,'dark:border-green-400 ': !v$.password.$error && formData.password !== ''}">
                      <ValidateIcon :error="v$.password.$error" :invalid="v$.password.$invalid"/>
                      <div class="h-5 text-xs text-red-400 absolute right-0">
                      <div v-if="v$.password.$error">
                        <span v-if="v$.password.$errors[0].$validator === 'lengthCheck'">
                          password is too short
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="relative">
                      <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input v-model="v$.confirmPassword.$model" type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      :class="{'dark:border-red-500 ': v$.confirmPassword.$error,'dark:border-green-400 ': !v$.confirmPassword.$error && formData.confirmPassword !== null}" >
                      <ValidateIcon :error="v$.confirmPassword.$error" :invalid="v$.confirmPassword.$invalid"/>
                      <div class="h-5 text-xs text-red-400 absolute right-0">
                      <div v-if="v$.confirmPassword.$error">
                        <span v-if="v$.confirmPassword.$errors[0].$validator === 'lengthCheck'">
                          password is too short
                        </span>
                        <span v-if="v$.confirmPassword.$errors[0].$validator === 'passwordMatch'">
                          Passwords do not match.
                        </span>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div> -->
                  <button type="submit" :disabled="v$.email.$invalid || v$.username.$invalid || v$.password.$invalid || v$.confirmPassword.$invalid"
                  :class="{'opacity-30' : v$.email.$invalid || v$.username.$invalid || v$.password.$invalid || v$.confirmPassword.$invalid}"
                   class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                   >Create an account</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <NuxtLink to="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</NuxtLink>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
</template>