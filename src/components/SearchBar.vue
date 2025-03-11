<template>
    <div class="relative">
      <input 
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        type="text" 
        :placeholder="placeholder" 
        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
      />
    </div>
  </template>
  
  <script setup>
  defineProps({
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Buscar...'
    }
  });
  
  defineEmits(['update:modelValue']);
  </script>