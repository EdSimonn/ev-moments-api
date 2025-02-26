<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const logout = () => {
  localStorage.removeItem("authToken");
  router.push("/");
};
</script>

<template>
  <nav class="bg-teal-700 text-white md:px-16 px-8 py-4 flex justify-between">
    <h1 class="font-bold">Eventful Moments.</h1>
    <div>
      <template v-if="route.path === '/' || route.path === '/register'">
        <NuxtLink to="/" class="mr-4">Login</NuxtLink>
        <NuxtLink to="/register">Register</NuxtLink>
      </template>
      <template v-else>
        <button @click="logout" class="mr-4">Logout</button>
        <NuxtLink to="/my-bucket">My Bucket</NuxtLink>
      </template>
    </div>
  </nav>
</template>
