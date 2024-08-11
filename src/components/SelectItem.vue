<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';

const { items } = defineProps<{
  items: {
    type: Array<String>,
    default: () => []
  };
}>();

const emit = defineEmits<{
  (e: 'update:SelectedValue', value: string): void;
}>();

const selectedItem = ref<string>('');

const isOpen = ref<boolean>(false);

const handleBtn = () => {
  isOpen.value = !isOpen.value;
}

const onSelectChange = (value: string): void => {
  selectedItem.value = value;
  emit('update:SelectedValue', value);
};

const clearSelection = (): void => {
  selectedItem.value = '';
  emit('update:SelectedValue', '');
};
</script>

<template>
  <div class="select-box-container">
    <div class="select-box" @click="handleBtn">
      <div v-if="!selectedItem" class="text-box">
        Select encryption algorithm
      </div>
      <div v-else class="selected-item">
        {{ selectedItem }}
      </div>
    </div>

    <div v-if="isOpen" class="item-list">
      <div
          v-for="(i, idx) in items"
          :key="i"
          @click="onSelectChange(i)"
          class="item"
          :class="{'item-border': idx < items.length - 1}"
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
  width: 50%;
  height: auto;
}

.select-box {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100%;
  height: auto;
  padding: 6px 4px;
  border: solid 1px #334155;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
  background: transparent;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: relative;
}

.text-box {
  font-size: 16px;
  color: #cccccc;
  opacity: 60%;
}

.selected-item {
  font-size: 14px;
  font-weight: bold;
  font-family: 'RussoOne', sans-serif;
}

.item-list {
  position: absolute;
  top: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  border: solid 1px #334155;
  border-radius: 6px;
  color: #f1f5f9;
  background-color: #0f172a;
  max-height: 200px;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 10;
  width: 100%;
}

.item {
  padding: 6px;
  cursor: pointer;
}

.item:hover {
  background-color: #f1f5f9;
  color: #0f172a;
}

.item-border {
  border-bottom: solid 1px #f1f5f9;
}

.item:hover + .item-border {
  display: none;
}

.item-selected {
  background-color: red;
}
</style>
