<template>
  <div class="flex justify-center md:justify-start min-h-screen px-8 md:px-16">
    <div class="flex flex-col py-8 w-full max-w-md text-sm">
      <div class="w-full">
        <label for="date" class="block font-medium mb-1"
          >Date in the future</label
        >
        <input
          id="date"
          type="date"
          :min="minDate"
          v-model="moment.futureDate"
          class="border border-[#707070] p-2 w-full rounded appearance-none"
        />
        <p v-if="errors.futureDate" class="text-red-500 text-xs mt-1">
          {{ errors.futureDate }}
        </p>
      </div>

      <div class="w-full mt-4">
        <label for="title" class="block font-medium mb-1">Title</label>
        <input
          id="title"
          type="text"
          v-model="moment.title"
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
          @click="updateMoment"
          class="bg-blue-500 text-white text-sm px-8 py-3 rounded-lg w-full sm:w-auto flex justify-center items-center text-center hover:bg-blue-600 transition duration-300 active:scale-95"
        >
          Update
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/utils/api";

const route = useRoute();
const router = useRouter();
const moment = ref({
  futureDate: "",
  title: "",
  details: "",
});

const today = new Date();
const minDate = computed(() => today.toISOString().split("T")[0]);

// Validation errors
const errors = ref({
  futureDate: "",
  title: "",
  details: "",
});

// Format date for input
const formatDate = (isoString) => {
  return isoString ? isoString.split("T")[0] : "";
};

// Fetch moment details
const fetchMoment = async () => {
  try {
    const { data } = await api.get(`/moment/${route.params.id}`);
    if (data.status_code === 200) {
      Object.assign(moment.value, {
        title: data.data.title,
        details: data.data.details,
        futureDate: formatDate(data.data.futureDate),
      });
    } else {
      router.push("/my-bucket");
    }
  } catch (error) {
    console.error("Error fetching moment:", error);
    router.push("/my-bucket");
  }
};

// Validate form inputs
const validateForm = () => {
  errors.value.futureDate = moment.value.futureDate
    ? ""
    : "Future date is required.";
  errors.value.title = moment.value.title.trim() ? "" : "Title is required.";
  errors.value.details = moment.value.details.trim()
    ? ""
    : "Details are required.";
};

// Computed property to check form validity
const isFormValid = computed(() => {
  return (
    moment.value.futureDate &&
    moment.value.title.trim() &&
    moment.value.details.trim()
  );
});

// Update moment function with validation
const updateMoment = async () => {
  validateForm();

  if (!isFormValid.value) {
    return; // Stop submission if the form is invalid
  }

  try {
    console.log("Sending payload:", moment.value);

    const response = await api.patch(`/moment/${route.params.id}`, {
      title: moment.value.title,
      details: moment.value.details,
      futureDate: moment.value.futureDate
        ? new Date(moment.value.futureDate).toISOString()
        : null,
    });

    console.log("Update response:", response.data);
    router.push("/my-bucket");
  } catch (error) {
    console.error("Error saving moment:", error.response?.data || error);
    errors.value.futureDate =
      error.response?.data?.message || "Failed to save moment.";
  }
};

onMounted(fetchMoment);
</script>

<!-- <template>
  <div class="flex justify-center md:justify-start min-h-screen px-8 md:px-16">
    <div class="flex flex-col py-8 w-full max-w-md text-sm">
      <div class="w-full">
        <label for="date" class="block font-medium mb-1">Date in the future</label>
        <input
          id="date"
          type="date"
          :min="minDate"
          v-model="moment.futureDate"
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
          type="text"
          v-model="moment.title"
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
          @click="updateMoment"
          class="bg-blue-500 text-white text-sm px-8 py-3 rounded-lg w-full sm:w-auto flex justify-center items-center text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Update
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/utils/api";

const route = useRoute();
const router = useRouter();
const moment = ref({
  futureDate: "",
  title: "",
  details: "",
});

const today = new Date();
const minDate = computed(() => today.toISOString().split("T")[0]);

// Validation errors
const errors = ref({
  futureDate: "",
  title: "",
  details: "",
});

// Format date for input
const formatDate = (isoString) => {
  return isoString ? isoString.split("T")[0] : "";
};

// Fetch moment details
const fetchMoment = async () => {
  try {
    const { data } = await api.get(`/moment/${route.params.id}`);
    if (data.status_code === 200) {
      Object.assign(moment.value, {
        title: data.data.title,
        details: data.data.details,
        futureDate: formatDate(data.data.futureDate),
      });
    } else {
      router.push("/my-bucket");
    }
  } catch (error) {
    console.error("Error fetching moment:", error);
    router.push("/my-bucket");
  }
};

// Validate form inputs
const validateForm = () => {
  errors.value.futureDate = moment.value.futureDate
    ? ""
    : "Future date is required.";
  errors.value.title = moment.value.title.trim() ? "" : "Title is required.";
  errors.value.details = moment.value.details.trim()
    ? ""
    : "Details are required.";
};

// Computed property to check form validity
const isFormValid = computed(() => {
  return (
    moment.value.futureDate &&
    moment.value.title.trim() &&
    moment.value.details.trim()
  );
});

// Update moment function with validation
const updateMoment = async () => {
  validateForm();

  if (!isFormValid.value) {
    return; // Stop submission if the form is invalid
  }

  try {
    console.log("Sending payload:", moment.value);

    const response = await api.patch(`/moment/${route.params.id}`, {
      title: moment.value.title,
      details: moment.value.details,
      futureDate: moment.value.futureDate
        ? new Date(moment.value.futureDate).toISOString()
        : null,
    });

    console.log("Update response:", response.data);
    router.push("/my-bucket");
  } catch (error) {
    console.error(
      "Error updating moment:",
      error.response ? error.response.data : error
    );
  }
};

onMounted(fetchMoment);
</script> -->

<!-- <template>
  <div class="flex justify-center md:justify-start min-h-screen px-8 md:px-16">
    <div class="flex flex-col py-8 w-full max-w-md text-sm">
      <div class="w-full">
        <label for="date" class="block font-medium mb-1"
          >Date in the future</label
        >
        <input
          id="date"
          type="date"
          :min="minDate"
          v-model="moment.futureDate"
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
          type="text"
          v-model="moment.title"
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
          @click="updateMoment"
          class="bg-blue-500 text-white text-sm px-8 py-3 rounded-lg w-full sm:w-auto flex justify-center items-center text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Update
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/utils/api";

const route = useRoute();
const router = useRouter();
const moment = ref({
  futureDate: "",
  title: "",
  details: "",
});

const today = new Date();
const minDate = computed(() => today.toISOString().split("T")[0]);

// Validation errors
const errors = ref({
  futureDate: "",
  title: "",
  details: "",
});

// Format date for input
const formatDate = (isoString) => {
  return isoString ? isoString.split("T")[0] : "";
};

// Fetch moment details
const fetchMoment = async () => {
  try {
    const { data } = await api.get(`/moment/${route.params.id}`);
    if (data.status_code === 200) {
      moment.value = {
        ...data.data,
        futureDate: formatDate(data.data.futureDate),
      };
    } else {
      router.push("/my-bucket");
    }
  } catch (error) {
    console.error("Error fetching moment:", error);
    router.push("/my-bucket");
  }
};

// Validate form inputs
const validateForm = () => {
  errors.value.futureDate = moment.value.futureDate
    ? ""
    : "Future date is required.";
  errors.value.title = moment.value.title.trim() ? "" : "Title is required.";
  errors.value.details = moment.value.details.trim()
    ? ""
    : "Details are required.";
};

// Computed property to check form validity
const isFormValid = computed(() => {
  return (
    moment.value.futureDate &&
    moment.value.title.trim() &&
    moment.value.details.trim()
  );
});

// Update moment function with validation
const updateMoment = async () => {
  validateForm();

  if (!isFormValid.value) {
    return; // Stop submission if the form is invalid
  }

  try {
    console.log("Sending payload:", moment.value);

    const response = await api.patch(`/moment/${route.params.id}`, {
      title: moment.value.title,
      details: moment.value.details,
      futureDate: moment.value.futureDate
        ? new Date(moment.value.futureDate).toISOString()
        : null,
    });

    console.log("Update response:", response.data);
    // alert("Moment updated successfully");
    router.push("/my-bucket");
  } catch (error) {
    console.error(
      "Error updating moment:",
      error.response ? error.response.data : error
    );
    // alert("Failed to update moment. Check console for details.");
  }
};

onMounted(fetchMoment);
</script> -->
