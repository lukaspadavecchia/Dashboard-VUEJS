import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: []
  }),
  
  actions: {
    async fetchUsers() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        this.users = response.data
        return response.data
      } catch (error) {
        console.error('Error fetching users:', error)
        throw error
      }
    },
    
    async fetchUserById(id) {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        return response.data
      } catch (error) {
        console.error(`Error fetching user ${id}:`, error)
        
        // Buscar en el store local como respaldo
        const localUser = this.users.find(user => user.id == id)
        if (localUser) {
          console.log('Usando datos locales como respaldo')
          return localUser
        }
        
        throw error
      }
    },
    
    async createUser(userData) {
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/users', userData)
        // JSONPlaceholder no guarda realmente los datos, así que lo simulamos
        this.users.push({ ...userData, id: response.data.id })
        return response.data
      } catch (error) {
        console.error('Error creating user:', error)
        throw error
      }
    },
    
    async updateUser(userData) {
      try {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${userData.id}`, userData)
        // Actualizar en el store local
        const index = this.users.findIndex(user => user.id == userData.id)
        if (index !== -1) {
          this.users[index] = userData
        }
        return response.data
      } catch (error) {
        console.error(`Error updating user ${userData.id}:`, error)
        throw error
      }
    },
    
    async deleteUser(id) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        // Eliminar del store local
        this.users = this.users.filter(user => user.id != id)
        return true
      } catch (error) {
        console.error(`Error deleting user ${id}:`, error)
        throw error
      }
    }
  }
})