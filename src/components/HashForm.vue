<script setup lang="ts">
import { computed, ref, reactive } from "vue";
import { Algorithm, HashDTO } from "../models/hashDTO";
import { fetchHash } from "../services/hashService";
import Input from "./InputField.vue";
import SelectItem from "./SelectItem.vue";
import InputField from "./InputField.vue";

const hashDTO = reactive<HashDTO>({
  hash: '',
  algorithm: Algorithm.MD5
})
const result = ref<string>("");
const isErrorHash = ref<boolean>(false)
const isErrorAlgorithm= ref<boolean>(false)
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

  if(!isAlgorithmSelected.value) {
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
    <div class="container">
        <div class="title-container">
            <h1 class="title">Brute Force Test</h1>
            <hr class="hr-line" />
        </div>
        <form
            @submit.prevent="sendHash"
            method="post"
            class="inputs-container"
        >
          <InputField @update:value="hashDTO.hash" />
          <SelectItem :items="['TESTE1', 'TESTE2']"  placeholder="Select encryption algorithm"/>
          <button type="submit" class="btn">Decrypt</button>
        </form>
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
  flex-direction: row;
  gap: 12px;
}

.btn {
  background: transparent;
  color: #f1f5f9;
  border: solid 1px #334155;
  padding: 4px 2px 4px 2px;
  margin: 0 0 0 32px;
  border-radius: 6px;
  min-width: 25%;
  height: auto;
  font-family: RussoOne, sans-serif;
}

.btn:hover {
  background: #f1f5f9;
  color: #0f172a;
  border: none;
  cursor: pointer;
}

/* SM */
@media (max-width: 640px) {
  .container {
    width: 100%;
    margin: 3px;
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
