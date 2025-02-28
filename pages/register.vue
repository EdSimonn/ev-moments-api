<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="flex flex-col max-w-md w-full px-8">
      <h2 class="text-3xl font-bold mb-4 text-left">Create an account,</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label class="block mb-1">Full Name</label>
          <input
            v-model="fullname"
            type="text"
            class="border p-3 w-full rounded-lg"
            placeholder="Enter your full name"
          />
          <p v-if="errors.fullname" class="text-red-500 text-sm">
            {{ errors.fullname }}
          </p>
        </div>
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
            Create
          </button>
        </div>
        <p v-if="errors.general" class="text-red-500 text-sm mt-2">
          {{ errors.general }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import api from "@/utils/api";

const toast = useToast();

const fullname = ref("");
const email = ref("");
const password = ref("");
const errors = ref({});
const router = useRouter();

const register = async () => {
  errors.value = {};
  if (!fullname.value) errors.value.fullname = "Enter fulname";
  if (!email.value) errors.value.email = "Enter email";
  if (!password.value) errors.value.password = "Enter password";
  if (Object.keys(errors.value).length) return;

  try {
    const { data } = await api.post("/users/signup", {
      fullname: fullname.value,
      email: email.value,
      password: password.value,
    });
    if (data.status_code === 200) {
      toast.success("Registration successful!");
      router.push("/");
    }
  } catch (error) {
    toast.error("Registration failed. Please try again.");
    errors.value.general = "Registration failed";
  }
};
</script>

