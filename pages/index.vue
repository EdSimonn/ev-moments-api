<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="flex flex-col max-w-md px-8">
      <h2 class="text-3xl font-bold mb-4 text-left">Welcome back,</h2>
      <p class="text-sm mb-4">
        Hi, my name is Eventful Moments. I store awesome moments you will like
        to have in the coming years.
      </p>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            class="border p-3 w-full rounded-lg"
            placeholder="Enter your email"
          />
          <p v-if="errors.email" class="text-red-500 text-sm">
            {{ errors.email }}
          </p>
        </div>
        <div class="mb-4">
          <label class="block mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            class="border p-3 w-full rounded-lg"
            placeholder="Enter your password"
          />
          <p v-if="errors.password" class="text-red-500 text-sm">
            {{ errors.password }}
          </p>
        </div>
        <div class="flex justify-center mt-8">
          <button
            type="submit"
            class="px-8 py-3 bg-[#5271FF] text-white rounded-lg w-full sm:w-auto flex justify-center items-center text-center hover:bg-blue-600 transition duration-300 active:scale-95"
          >
            Login
          </button>
        </div>

        <p v-if="errors.general" class="text-red-500 text-sm mt-2">
          {{ errors.general }}
        </p>
        <!-- <p class="mt-4 text-center text-sm">
          Don't have an account?
          <NuxtLink to="/register" class="text-blue-500">Register</NuxtLink>
        </p> -->
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/utils/api";

const email = ref("");
const password = ref("");
const errors = ref({});
const router = useRouter();

const login = async () => {
  errors.value = {};
  if (!email.value) errors.value.email = "Enter email";
  if (!password.value) errors.value.password = "Enter password";
  if (Object.keys(errors.value).length) return;

  try {
    const { data } = await api.post("/users/login", {
      email: email.value,
      password: password.value,
    });

    if (data.status_code === 200 && data.token) {
      localStorage.setItem("authToken", data.token);
      router.push("/my-bucket");
    } else {
      errors.value.general = "Incorrect email or password";
    }
  } catch (error) {
    errors.value.general = "Login failed. Please check your credentials.";
  }
};
</script>
