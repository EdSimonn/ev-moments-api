<template>
  <div
    class="flex flex-col h-full border p-4 space-y-4 shadow-lg hover:bg-[#FFF5A7] transition-all cursor-pointer"
    @click="goToMoment"
  >
    <h3 class="text-xl font-bold">{{ title }}</h3>
    <p class="leading-loose break-words overflow-hidden flex-1">
      {{ detail.length > 500 ? detail.substring(0, 500) + "..." : detail }}
    </p>
    <div class="flex justify-between items-center">
      <RouterLink :to="`/my-bucket/${id}`" class="text-[#5271FF]"
        >View Details</RouterLink
      >
      <div class="flex justify-between items-center gap-4">
        <p class="text-[#B2B2B2]">{{ date1 }}</p>
        <p>{{ date2 }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  id: String,
  title: String,
  detail: String,
  date1: String,
  date2: String,
});

const router = useRouter();

const goToMoment = () => {
  if (!props.id) {
    console.error("ID is missing, cannot navigate!");
    return;
  }
  router.push(`/my-bucket/${props.id}`);
};
</script>
