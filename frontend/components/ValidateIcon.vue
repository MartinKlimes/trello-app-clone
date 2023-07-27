<script setup>

defineProps({
    error: Boolean,
    invalid: Boolean
})
</script>


<template>
<Icon
v-if="!invalid || error"
class="absolute right-2 top-3 h-full text-xl text-green-500"
:class="{ 'text-green-500 ': !invalid, 'text-yellow-500': error }"
:name="!error ? 'line-md:confirm-circle' : 'ph:warning-bold'"
/>

</template>
