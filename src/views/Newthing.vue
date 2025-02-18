<template>
  <div class="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
    <div class="bg-white shadow-md rounded-lg p-8 max-w-7xl w-full">
      <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">
        New Things We Do or Learn
      </h1>
      <button
        @click="showForm = !showForm"
        class="w-full bg-gray-800 text-white p-3 rounded-lg font-semibold hover:bg-gray-700 transition duration-300 mb-6"
      >
        {{ showForm ? "Close" : "Add New Thing" }}
      </button>
      <form v-if="showForm" @submit.prevent="addnewthing" class="mb-6">
        <div class="mb-6">
          <label class="block text-gray-700 font-semibold">Thing Name</label>
          <input
            v-model="thingName"
            type="text"
            class="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Enter thing name"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-gray-800 text-white p-3 rounded-lg font-semibold hover:bg-gray-700 transition duration-300"
        >
          {{ isEditing ? "Update Thing" : "Add Thing" }}
        </button>
      </form>
      <div class="mt-8">
        <h2 v-if="things.length" class="text-2xl font-bold mb-4 text-center text-gray-800">
          Things
        </h2>
        <ul class="space-y-4">
          <li
            v-for="thing in things"
            :key="thing.id"
            class="p-6 rounded-lg bg-gray-100 shadow-md hover:shadow-lg flex justify-between transition-shadow duration-300"
          >
            <div>
              <blockquote class="text-gray-800 italic mb-4">
              "{{ thing.name }}"
            </blockquote>
            <p class="text-gray-600 mb-4">
              <strong>Date:</strong> {{ formatDate(thing.date) }}
            </p>
            </div>
            <div class="flex justify-end space-x-4">
              <button
                @click="editThing(thing)"
                class="text-blue-500 hover:text-blue-600 transition duration-300"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                @click="deleteThing(thing.id)"
                class="text-red-500 hover:text-red-600 transition duration-300"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Cookies from "universal-cookie";
import '@fortawesome/fontawesome-free/css/all.css';

const cookies = new Cookies();
const token = cookies.get("authToken");

const showForm = ref(false);
const thingName = ref("");
const things = ref([]);
const isEditing = ref(false);
const currentThingId = ref(null);
const apiUrl = import.meta.env.VITE_APP_API_URL;

const addnewthing = async () => {
  if (isEditing.value) {
    await updateThing(currentThingId.value, thingName.value);
  } else {
    const response = await fetch(`${apiUrl}/newthing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: thingName.value }),
    });

    if (response.ok) {
      const data = await response.json();
      things.value = [...things.value, data.data];
    }
  }

  thingName.value = "";
  isEditing.value = false;
  currentThingId.value = null;
  showForm.value = false;
};

const editThing = (thing) => {
  thingName.value = thing.name;
  isEditing.value = true;
  currentThingId.value = thing.id;
  showForm.value = true;
};

const removeThing = (id) => {
  things.value = things.value.filter((thing) => thing.id !== id);
};

const formatDate = (date) => {
  if (!date) return "No date provided";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
};

const fetchThings = async () => {
  const response = await fetch(`${apiUrl}/newthing`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  things.value = data.data;
  console.log(data.data);
};

const deleteThing = async (id) => {
  const response = await fetch(`${apiUrl}/newthing/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    things.value = things.value.filter((thing) => thing.id !== id);
  }
};

const updateThing = async (id, name) => {
  const response = await fetch(`${apiUrl}/newthing/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  if (response.ok) {
    const index = things.value.findIndex((thing) => thing.id === id);
    if (index !== -1) {
      things.value[index].name = name;
    }
  }
};

onMounted(() => {
  fetchThings();
});
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>