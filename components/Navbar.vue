<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, watch, onMounted } from "vue";

const router = useRouter();
const route = useRoute();
const authToken = ref(null);

const logout = () => {
  if (process.client) {
    localStorage.removeItem("authToken");
    authToken.value = null;
    router.push("/");
  }
};

onMounted(() => {
  if (process.client) {
    authToken.value = localStorage.getItem("authToken");
  }
});

// Watch route changes to refresh authToken
watch(route, () => {
  if (process.client) {
    authToken.value = localStorage.getItem("authToken");
  }
});
</script>

<template>
  <nav class="bg-teal-700 text-white md:px-16 px-8 py-4 flex justify-between">
    <NuxtLink v-if="authToken" to="/my-bucket" class="font-bold text-lg">
      Eventful Moments.
    </NuxtLink>
    <span v-else class="font-bold text-lg cursor-not-allowed">
      Eventful Moments.
    </span>

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
