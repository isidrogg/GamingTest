<template>
  <div class="h-screen bg-gray-100">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">
          <span class="block xl:inline">Taller</span>
          <span class="block text-indigo-600 xl:inline">Cypress</span>
        </h1>
      </div>
    </header>
    <Testing/>
  </div>
</template>

<script setup>
import Testing from "./components/Testing.vue";
</script>
