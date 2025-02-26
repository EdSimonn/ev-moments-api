<template>
  <div class="py-10 md:px-16 px-8">
    <h1 class="text-3xl font-bold">{{ moment.title }}</h1>
    <p class="text-blue-500 text-sm mt-1">
      {{ formattedDate(moment.createdAt) }}
    </p>

    <div class="mt-4 space-y-4">
      <p class="text-[#000000] break-words overflow-hidden flex-1">
        {{ moment.details }}
      </p>
    </div>

    <div class="flex gap-4 mt-6">
      <RouterLink
        :to="`/my-bucket/edit-item/${moment._id}`"
        class="bg-[#06C3B4] text-white text-sm px-8 py-2 rounded-lg"
        >Edit</RouterLink
      >
      <button
        @click="deleteMoment"
        class="bg-[#C34F06] text-white text-sm px-8 py-2 rounded-lg"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/utils/api";

const route = useRoute();
const router = useRouter();
const moment = ref({});

const formattedDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
};

const fetchMoment = async () => {
  if (!route.params.id) {
    console.error("ID is missing from the route!");
    router.push("/my-bucket");
    return;
  }

  try {
    const { data } = await api.get(`/moment/${route.params.id}`);
    if (data.status_code === 200) {
      moment.value = data.data;
    }
  } catch (error) {
    console.error("Error fetching moment:", error);
    router.push("/my-bucket");
  }
};

const deleteMoment = async () => {
  try {
    await api.delete(`/moment/${route.params.id}`);
    // alert("Moment deleted successfully");
    router.push("/my-bucket");
  } catch (error) {
    console.error("Error deleting moment:", error);
    // alert("Failed to delete moment");
  }
};

onMounted(fetchMoment);
</script>
