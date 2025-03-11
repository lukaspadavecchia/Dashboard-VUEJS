<template>
    <div class="flex items-center justify-between p-4 hover:bg-gray-50">
      <div class="flex items-center">
        <div class="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
          <span class="text-indigo-700 font-medium">{{ user.name.charAt(0) }}</span>
        </div>
        <div class="ml-4">
          <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
          <div class="text-sm text-gray-500">{{ user.email }}</div>
        </div>
      </div>
      <div>
        <slot name="actions"></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    user: {
      type: Object,
      required: true
    }
  });
  </script>