<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';
import { ChevronDown, ChevronUp } from "lucide-vue-next";

const { items } = defineProps({
  items: {
    type: Array<string>,
    default: () => []
  }
});

const emit = defineEmits<{
  (e: 'update:SelectedValue', value: string): void;
}>();

const selectedItem = ref<string>('');

const isOpen = ref<boolean>(false);

const handleBtn = () => {
  isOpen.value = !isOpen.value;
}

const onSelectChange = (value: string): void => {
  if(value === selectedItem.value) {
    selectedItem.value = '';
  } else {
    selectedItem.value = value;
  }
  emit('update:SelectedValue', selectedItem.value);
  isOpen.value = false;
};

</script>

<template>
  <div class="select-box-container">
    <div class="select-box" @click="handleBtn">
      <div v-if="!selectedItem" class="text-box">
        Select encryption
      </div>
      <div v-else class="selected-item">
        {{ selectedItem }}
      </div>
      <span class="separator" />
      <ChevronDown v-if="!isOpen" class="arrow-icon" />
      <ChevronUp v-if="isOpen" class="arrow-icon" />
    </div>

    <div v-if="isOpen" class="item-list">
      <div
          v-for="(i, idx) in items"
          :key="i"
          @click="onSelectChange(i)"
          class="item"
          :class="{
            'item-border': idx < items.length - 1,
            'item-selected': selectedItem == i,
          }"
      >
        {{ i }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.select-box-container {
  position: relative;
  display: inline-block;
  width: 100%;
  height: auto;
}

.select-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 44px;
  padding: 6px;
  border: 1px solid #334155;
  border-radius: 6px;
  cursor: pointer;
  background: transparent;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.text-box {
  font-size: 16px;
  color: #cccccc;
  opacity: 60%;
}

.selected-item {
  font-size: 14px;
  font-family: 'RussoOne', sans-serif;
}

.item-list {
  position: absolute;
  top: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid #334155;
  border-radius: 6px;
  color: #f1f5f9;
  background-color: #0f172a;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  width: 100%;
  margin-top: 3px;
  font-family: 'RussoOne', sans-serif;
}

.item {
  padding: 6px;
  cursor: pointer;
  background-color: transparent;
  border-bottom: 1px solid transparent;
  transition: background-color 0.3s, opacity 0.3s;
}

.item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.item-selected {
  background-color: #f1f5f9;
  color: #0f172a;
}

.separator {
  flex-grow: 1;
}

.arrow-icon {
  color: #f1f5f9;
  width: 20px;
  height: 20px;
}

</style>
