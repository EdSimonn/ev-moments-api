<template>
  <div class="flex justify-center md:justify-start min-h-screen px-8 md:px-16 ">
    <div class="flex flex-col py-8 w-full max-w-md text-sm">
      <div class="w-full">
        <label for="date" class="block font-medium mb-1"
          >Date in the future</label
        >
        <input
          id="date"
          v-model="moment.futureDate"
          type="date"
          :min="minDate"
          class="border border-[#707070] p-2 w-full rounded"
        />
        <p v-if="errors.futureDate" class="text-red-500 text-xs mt-1">
          {{ errors.futureDate }}
        </p>
      </div>

      <div class="w-full mt-4">
        <label for="title" class="block font-medium mb-1">Title</label>
        <input
          id="title"
          v-model="moment.title"
          type="text"
          class="border border-[#707070] p-2 w-full rounded"
        />
        <p v-if="errors.title" class="text-red-500 text-xs mt-1">
          {{ errors.title }}
        </p>
      </div>

      <div class="w-full mt-4">
        <label for="details" class="block font-medium mb-1">Details</label>
        <textarea
          id="details"
          v-model="moment.details"
          class="border border-[#707070] p-2 w-full rounded"
          rows="12"
        ></textarea>
        <p v-if="errors.details" class="text-red-500 text-xs mt-1">
          {{ errors.details }}
        </p>
      </div>

      <div class="w-full flex justify-center mt-4">
        <button
          @click="saveMoment"
          :disabled="!isFormValid"
          class="bg-blue-500 text-white text-sm px-8 py-3 rounded-lg w-full sm:w-auto flex justify-center items-center text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import api from "@/utils/api";

const router = useRouter();
const moment = ref({
  title: "",
  details: "",
  futureDate: "",
});

const today = new Date();
const minDate = computed(() => today.toISOString().split("T")[0]);

const errors = ref({
  title: "",
  details: "",
  futureDate: "",
});

const validateForm = () => {
  errors.value.title = moment.value.title.trim() ? "" : "Title is required.";
  errors.value.details = moment.value.details.trim()
    ? ""
    : "Details are required.";
  errors.value.futureDate = moment.value.futureDate
    ? ""
    : "Future date is required.";
};

const isFormValid = computed(() => {
  return (
    moment.value.title.trim() &&
    moment.value.details.trim() &&
    moment.value.futureDate
  );
});

const saveMoment = async () => {
  validateForm();

  if (!isFormValid.value) {
    return;
  }

  try {
    const { data } = await api.post("/moment", {
      title: moment.value.title,
      details: moment.value.details,
      futureDate: new Date(moment.value.futureDate).toISOString(),
    });

    if (data.status_code === 200) {
      // alert("Moment saved successfully!");
      router.push("/my-bucket");
    }
  } catch (error) {
    console.error("Error saving moment:", error.response?.data || error);
    // alert("Failed to save moment. Please try again.");
  }
};
</script>
