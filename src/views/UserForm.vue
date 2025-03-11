<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        {{ isEditing ? 'Editar Usuario' : 'Nuevo Usuario' }}
      </h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">
        {{ isEditing ? 'Modifique los datos del usuario' : 'Complete los datos para crear un nuevo usuario' }}
      </p>
    </div>
    
    <div v-if="isLoading" class="flex justify-center py-10">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500"></div>
    </div>
    
    <form v-else @submit.prevent="saveUser" class="border-t border-gray-200">
      <div class="px-4 py-5 bg-white sm:p-6">
        <div class="grid grid-cols-6 gap-6">
          <div class="col-span-6 sm:col-span-3">
            <label for="name" class="block text-sm font-medium text-gray-700">Nombre completo</label>
            <input 
              v-model="user.name" 
              type="text" 
              id="name" 
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
              required
            />
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label for="username" class="block text-sm font-medium text-gray-700">Nombre de usuario</label>
            <input 
              v-model="user.username" 
              type="text" 
              id="username" 
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
              required
            />
          </div>

          <div class="col-span-6 sm:col-span-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input 
              v-model="user.email" 
              type="email" 
              id="email" 
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
              required
            />
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label for="phone" class="block text-sm font-medium text-gray-700">Teléfono</label>
            <input 
              v-model="user.phone" 
              type="text" 
              id="phone" 
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
            />
          </div>

          <div class="col-span-6">
            <label for="website" class="block text-sm font-medium text-gray-700">Sitio web</label>
            <input 
              v-model="user.website" 
              type="text" 
              id="website" 
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
            />
          </div>
        </div>
      </div>
      
      <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button 
          type="button" 
          @click="$router.push('/')" 
          class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Guardar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';

console.log('UserForm component is being initialized');

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const isLoading = ref(false);

// Determinar si estamos editando o creando
const isEditing = computed(() => {
  console.log('Route path:', route.path);
  console.log('Route name:', route.name);
  return route.name === 'user-edit';
});

// Objeto de usuario para el formulario
const user = ref({
  name: '',
  username: '',
  email: '',
  phone: '',
  website: ''
});

// Cargar datos del usuario si estamos editando
onMounted(async () => {
  console.log('Component mounted, isEditing:', isEditing.value);
  
  if (isEditing.value) {
    isLoading.value = true;
    try {
      const userData = await userStore.fetchUserById(route.params.id);
      if (userData) {
        user.value = { ...userData };
      } else {
        throw new Error('No se recibieron datos del usuario');
      }
    } catch (error) {
      console.error('Error al cargar usuario:', error);
      alert('Error al cargar los datos del usuario');
      router.push('/');
    } finally {
      isLoading.value = false;
    }
  }
});

// Guardar usuario (crear o actualizar)
const saveUser = async () => {
  isLoading.value = true;
  try {
    if (isEditing.value) {
      await userStore.updateUser({ ...user.value, id: route.params.id });
    } else {
      await userStore.createUser(user.value);
    }
    router.push('/');
  } catch (error) {
    console.error('Error al guardar usuario:', error);
    alert(`Error al ${isEditing.value ? 'actualizar' : 'crear'} el usuario`);
  } finally {
    isLoading.value = false;
  }
};
</script>