<template>
  <div class="py-8 md:px-16 px-8">
    <div
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center items-start"
    >
      <div>
        <h2 class="text-3xl font-bold">Welcome {{ capitalizeFullname }},</h2>
        <p class="text-sm">Here are items in your eventful moment bucket.</p>
      </div>
      <NuxtLink
        to="/my-bucket/add-item"
        class="bg-blue-500 text-white text-sm px-8 py-3 rounded-lg mt-4 sm:mt-0 w-full sm:w-auto flex justify-center items-center text-center hover:bg-blue-600 transition duration-300 active:scale-95"
      >
        Add Item
      </NuxtLink>
    </div>

    <div v-if="moments.length === 0" class="mt-4 text-gray-500">
      <p>Your bucket is empty.</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 text-sm">
      <ItemCard
        v-for="moment in visibleMoments"
        :key="moment._id"
        :id="moment._id"
        :title="moment.title"
        :detail="moment.details"
        :date1="formatDate(moment.createdAt)"
        :date2="formatDate(moment.updatedAt)"
      />
    </div>

    <!-- Show More / Show Less Button -->
    <div
      v-if="moments.length > 4"
      class="flex justify-center my-0 mt-4 sm:my-16"
    >
      <button
        @click="showAll = !showAll"
        class="bg-blue-500 text-white text-sm px-8 py-3 rounded-lg mt-4 sm:mt-0 w-full sm:w-auto flex justify-center items-center text-center hover:bg-blue-600 transition duration-300 active:scale-95"
      >
        {{ showAll ? "Load Less" : "Load More" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "@/utils/api";
import ItemCard from "@/components/ItemCard.vue";

const user = ref({});
const moments = ref([]);
const showAll = ref(false);
const router = useRouter();

const fetchUserData = async () => {
  try {
    const { data } = await api.get("/users/me");

    if (data.status_code === 200) {
      user.value = data.data[0];
      moments.value = user.value.moments || [];
    }
  } catch (error) {
    console.error("Error fetching user data:", error);

    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      router.push("/");
    }
  }
};

// Capitalize full name initials
const capitalizeFullname = computed(() => {
  if (!user.value.fullname) return "";
  return user.value.fullname
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
});

// Computed property to handle visible moments
const visibleMoments = computed(() => {
  return showAll.value ? moments.value : moments.value.slice(0, 4);
});

// Function to format date as DD/MM/YYYY
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
};

onMounted(fetchUserData);
</script>
