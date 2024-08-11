<script setup lang="ts">
import {computed, ref, reactive} from "vue";
import {Algorithm, HashDTO} from "../models/hashDTO";
import {fetchHash} from "../services/hashService";
import SelectItem from "./SelectItem.vue";
import InputField from "./InputField.vue";

const hashDTO = reactive<HashDTO>({
  hash: '',
  algorithm: null
})
const result = ref<string>("");
const isErrorHash = ref<boolean>(false)
const isErrorAlgorithm = ref<boolean>(false)
const isLoading = ref<boolean>(false);
const algorithmKeys = Object.keys(Algorithm).filter(key => isNaN(Number(key)));

const isHashValid = computed(() => {
  return hashDTO.hash.trim().length > 0;
});

const isAlgorithmSelected = computed(() => {
  return hashDTO.algorithm != null;
})

const hasResult = computed(() => {
  return result.value.trim().length > 0;
});

const sendHash = async () => {
  if (!isHashValid.value) {
    isErrorHash.value = true;
    return;
  }

  if (!isAlgorithmSelected.value) {
    isErrorAlgorithm.value = true;
  }

  isErrorHash.value = false;
  isErrorAlgorithm.value = false;

  isLoading.value = true;
  try {
    const res = await fetchHash(hashDTO);
    console.log(res)
    result.value = res;
  } catch (err) {
    console.error('Error:', err);
  } finally {
    result.value = '';
    isLoading.value = false;
  }
};

</script>

<template>
  <div v-if="!isLoading && !hasResult" class="container">
    <div class="title-container">
      <h1 class="title">Brute Force Test</h1>
      <hr class="hr-line"/>
    </div>
    <form
        @submit.prevent="sendHash"
        method="post"
        class="inputs-container"
    >
      <InputField @update:modelValue="value => hashDTO.hash = value" :has-error="isErrorHash" error="Invalid hash!"/>
      <SelectItem :items="algorithmKeys" @update:-selected-value="value => hashDTO.algorithm = value"/>
      <button type="submit" class="btn">Decrypt</button>
    </form>
  </div>
  <div v-if="isLoading" class="loading">Decrypting...</div>
  <div v-if="!isLoading && hasResult"  class="container">
    <div class="title-container">
      <h1 class="title">Brute Force Test</h1>
      <hr class="hr-line"/>
    </div>
    <div class="result-container">
      <div class="hash">
        <div class="result-title">The hash:</div>
        {{ hashDTO.hash }}
      </div>
      <div class="result">
        <div class="result-title">The result:</div>
        {{ result }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 6px;
  margin: 1px;
  width: 100%;
  height: auto;
  border-width: 2px;
  border-style: solid;
  border-color: #334155;
  border-radius: 14px;
  text-align: center;
  gap: 8px;
}

.title-container {
  display: flex;
  flex-direction: column;
}

.title {
  font-family: 'RussoOne', sans-serif;
  font-size: 24px;
  font-weight: normal;
}

.hr-line {
  border: none;
  height: 1px;
  background-color: #334155;
  margin-top: 6px;
}

.inputs-container {
  width: auto;
  height: auto;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
}

.btn {
  background: transparent;
  color: #f1f5f9;
  border: solid 1px #334155;
  padding: 4px 2px 4px 2px;
  border-radius: 6px;
  width: 100%;
  height: 6vh;
  font-family: RussoOne, sans-serif;
  font-size: 20px;
  overflow-x: hidden;
  text-overflow: ellipsis;
}

.btn:hover {
  background: #f1f5f9;
  color: #0f172a;
  border: none;
  cursor: pointer;
}

.loading {
  font-size: 24px;
  font-family: 'RussoOne', sans-serif;
  animation: blink 2s infinite;
}

.result-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 12px;
  padding: 6px 4px 6px 4px;
}

.hash {
  display: flex;
  flex-direction: row;
  margin-top: 12px;
}

.result {
  display: flex;
  flex-direction: row;
}

.result-title {
  font-weight: bold;
  font-size: 20px;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

/* SM */
@media (max-width: 640px) {
  .container {
    width: 100%;
    margin: 3px;
  }

  .inputs-container {
    width: auto;
    height: auto;
    margin-top: 12px;
    padding: 4px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

}

/* MD */
@media (min-width: 768px) and (max-width: 1024px) {
  .container {
    width: 60%;
  }
}

/* LG */
@media (min-width: 1024px) {
  .container {
    width: 40%;
  }
}
</style>
