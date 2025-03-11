<template>
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h2 class="text-lg leading-6 font-medium text-gray-900">Usuarios</h2>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">Listado de usuarios del sistema</p>
        </div>
        <div class="w-64">
          <SearchBar v-model="searchQuery" placeholder="Buscar usuarios..." />
        </div>
      </div>
      
      <div v-if="isLoading" class="flex justify-center py-10">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500"></div>
      </div>
      
      <div v-else-if="error" class="p-4 text-red-500 text-center">
        {{ error }}
      </div>
      
      <ul v-else class="divide-y divide-gray-200">
        <li v-for="user in filteredUsers" :key="user.id">
          <UserCard :user="user">
            <template #actions>
              <router-link 
                :to="`/users/${user.id}`" 
                class="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Editar
              </router-link>
              <button 
                @click="deleteUser(user.id)" 
                class="ml-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Eliminar
              </button>
            </template>
          </UserCard>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useUserStore } from '../stores/user';
  import UserCard from '../components/UserCard.vue';
  import SearchBar from '../components/SearchBar.vue';
  
  const userStore = useUserStore();
  const searchQuery = ref('');
  const isLoading = ref(true);
  const error = ref(null);
  
  // Computed property para filtrar usuarios según la búsqueda
  const filteredUsers = computed(() => {
    if (!searchQuery.value) return userStore.users;
    
    const query = searchQuery.value.toLowerCase();
    return userStore.users.filter(user => 
      user.name.toLowerCase().includes(query) || 
      user.email.toLowerCase().includes(query)
    );
  });
  
  // Cargar usuarios al montar el componente
  onMounted(async () => {
    try {
      await userStore.fetchUsers();
    } catch (err) {
      error.value = 'Error al cargar los usuarios. Intente nuevamente.';
    } finally {
      isLoading.value = false;
    }
  });
  
  // Método para eliminar un usuario
  const deleteUser = async (id) => {
    if (confirm('¿Está seguro que desea eliminar este usuario?')) {
      try {
        await userStore.deleteUser(id);
      } catch (err) {
        alert('Error al eliminar el usuario');
      }
    }
  };
  </script>