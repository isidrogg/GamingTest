<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="container mx-auto flex justify-center">
    <div class="mt-32 w-2/4" v-if="!isLogged">
      <form @submit.prevent="login">
        <div class="shadow overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 bg-white sm:p-6">
            <div class="col-span-6 sm:col-span-3 mt-6">
              <label for="username" class="block text-sm font-medium text-gray-700">Usuario</label>
              <input type="text"
                     v-model="infoUser.username"
                     name="username"
                     id="username"
                     autocomplete="given-name"
                     class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            <div class="col-span-6 sm:col-span-3 mt-6">
              <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
              <input type="password"
                     v-model="infoUser.password"
                     name="password"
                     id="password"
                     autocomplete="family-name"
                     class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">

            <button
                type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
    <div v-else class="flex flex-wrap mt-6">
      {{games}}
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

const users = [
  {
    username: 'usuario1',
    password: '112345'
  },
  {
    username: 'usuario2',
    password: '212345'
  },
  {
    username: 'usuario3',
    password: '312345'
  }
]

const isLogged = ref(false);
const errorLogged = ref(false);
const infoUser = reactive({
  username: '',
  password: ''
});

const games = ref([]);


const fetchData = () => {
  fetch('https://my-json-server.typicode.com/isidrogg/GamingTest/db')
      .then(response => response.json())
      .then(json => games.value = json)
}



export default {
  setup() {
    const login = () => {
      if(users.some(item => item.username === infoUser.username && item.password === infoUser.password)) {
        isLogged.value = true;
        fetchData();
      } else {
        errorLogged.value = true;
      }
    };

    return {
      login,
      infoUser,
      isLogged,
      games
    }
  },
}
</script>
