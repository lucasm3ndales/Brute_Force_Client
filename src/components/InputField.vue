<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()

const { hasError } = defineProps({
  hasError: {
    value: Boolean,
    default: false,
  }
})

const handleInput = (e: Event): void => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}

</script>

<template>
  <div class="input-box">
    <input class="input-element" @input="(e) => handleInput(e)" placeholder="Insert some hash" />
    <span v-if="hasError" class="error">Invalid hash!</span>
  </div>
</template>

<style scoped>
.input-box {
  display: flex;
  width: auto;
  height: auto;
  flex-direction: column;
  align-items: start;
}

.input-element {
  padding: 6px 4px 6px 4px;
  width: 100%;
  min-height: 44px;
  background: transparent;
  color: #f1f5f9;
  font-size: 16px;
  border: solid 1px #334155;
  border-radius: 6px;
  caret-color: #f1f5f9;
}

.input-element::placeholder {
  font-size: 16px;
  color: #cccccc;
  opacity: 60%;
  text-overflow: ellipsis;
}

.input-element:focus {
  outline: #f1f5f9;
  border: solid 1px #f1f5f9;
}

.error {
  color: red;
  font-family: Merriweather, sans-serif;
  font-size: 12px;
  margin-top: 5px;
  margin-left: 8px;
}

/* SM */
@media (max-width: 640px) {

}

/* MD */
@media (min-width: 768px) and (max-width: 1024px) {

}

/* LG */
@media (min-width: 1024px) {

}

</style>