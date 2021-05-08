<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <header class="bg-white shadow space-x-4">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900">
        <span class="block xl:inline">Taller</span>
        <span class="block text-indigo-600 xl:inline">Cypress</span>
      </h1>
      <div v-if="isLogged" data-cypress="contador">
        Contador {{ getNumSelectedGames() }}
      </div>
    </div>
  </header>
  <div class="container mx-auto flex justify-center">
    <div class="mt-32 w-2/4" v-if="!isLogged">
      <form @submit.prevent="login" id="form-login">
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
            <div class="col-span-6 sm:col-span-3 mt-6 text-red-600 flex flex-nowrap" v-if="errorLogged" id="error">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              error en las credenciales
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
    <div v-else class="flex flex-wrap mt-6" id="list-games">
      <div v-for="game in games" class="flex items-center justify-center w-1/4 mb-3 p-4 h-1/3">
        <div class="bg-white w-full p-8 h-full border-2 border-blue-600 rounded-md">
          <div class="h-5/6">
            <img class="mx-auto h-12 w-auto" :src="game.thumbnail" alt="Workflow" />
            <p class="mt-6 text-center font-medium text-indigo-600 hover:text-indigo-500">
              {{ game.title }}
            </p>
            <p class="mt-2 text-center text-sm text-gray-600 h-3/6">
              {{ game.short_description }}
            </p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg"
               v-if="game.selected"
               @click="selectGame(game)"
               class="h-5 w-5  fill-current text-red-600"
               viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg"
               v-if="!game.selected"
               @click="selectGame(game)"
               class="h-5 w-5 fill-current text-green-600"
               viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
        </div>
      </div>
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
      .then(json => games.value = json.games)
}

const getNumSelectedGames = () => games.value.filter(game => game.selected).length;

const selectGame = (game) => {
  game.selected = !game.selected;
  console.log(game);
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
      errorLogged,
      games,
      selectGame,
      getNumSelectedGames
    }
  },
}
</script>
