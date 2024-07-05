<template>
    <div class="container">
        <div class="title">
            <h1>Brute Force Test</h1>
            <hr />
        </div>
        <form method="post" action="submit" @submit.prevent="sendHash">
            <div class="input-group">
                <label for="hash">Encrypted Password:</label>
                <input type="text" id="hash" name="hash" v-model="hashDTO.hash"
                    placeholder="Insert a hash of any type of encryption..." />
                <span v-if="isErrorHash" class="error-input">Please, insert a valid hash!</span>
            </div>
            <span class="separator"/>
            <div class="input-group">
                <label for="type">Cryptography Type:</label>
                <select 
                    id="type" 
                    name="type" 
                    v-model="hashDTO.algorithm" 
                >
                    <option v-for="key in algorithmKeys" :key="key" :value="Algorithm[key]">
                        {{ key.toLowerCase() }}
                    </option>
                </select>
                <span v-if="isErrorAlgorithm" class="error-input">Please, select a algorithm type!</span>
            </div>
            <div class="button-group">
                <button type="submit">Decrypt</button>
            </div>
        </form>
        <div class="span-area">
            <span v-if="isLoading" class="loading">Decoding...</span>
            <span v-if="!isLoading && hasResult" class="equal-sign">=</span>
        </div>
        <div v-if="hasResult" class="result-area">
            <div class="result">
                Decrypted Password:
                <div class="decrypted">{{ result }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from "vue";
import { Algorithm, HashDTO } from "../models/hashDTO";
import { fetchHash } from "../services/hashService";

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

<style scoped>
.container {
    padding: 1em;
    margin: 3px;
    width: 35%;
    height: auto;
    border-width: 1.5px;
    border-style: solid;
    border-color: #334155;
    border-radius: 14px;
    text-align: center;
    gap: 8px;
}

.title {
    display: flex;
    flex-direction: column;
}

hr {
    border: none;
    height: 1.5px;
    background-color: #334155;
    margin-top: 6px;
}

h1 {
    font-size: 1.5rem;
    font-weight: bolder;
    margin-bottom: 3px;
}

form {
    margin: 9px;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: auto;
    height: auto;
}

form>*+* {
    margin-left: 6px;
}

.input-group {
    display: flex;
    width: 60%;
    height: auto;
    padding: 3px;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 9px;
}

label {
    font-size: 1rem;
    font-weight: normal;
    margin-left: 6px;
}

input {
    background-color: transparent;
    color: #f1f5f9;
    border-color: #334155;
    border-style: solid;
    border-width: 1.5px;
    border-radius: 14px;
    padding-top: 18px;
    padding-bottom: 18px;
    padding-left: 12px;
    font-family: "Courier New", Courier, monospace;
    font-weight: normal;
    font-size: 1rem;
    width: 100%;
    height: 28px;
    box-sizing: border-box;
}

input::placeholder {
    font-size: 0.8rem;
}

input:focus {
    border-color: #f1f5f9;
    outline: none;
}

.button-group {
    display: flex;
    width: 40%;
    height: auto;
    padding: 3px;
    flex-direction: column;
    justify-content: center;
    align-items: end;
}

button {
    padding: 16px;
    margin-top: 9px;
    font-size: 1rem;
    width: 150px;
    height: auto;
    font-weight: bolder;
    font-family: "Courier New", Courier, monospace;
    background-color: transparent;
    color: #f1f5f9;
    border-style: solid;
    border-color: #334155;
    border-width: 1.5px;
    border-radius: 14px;
    cursor: pointer;
}

button:hover {
    background-color: #f1f5f9;
    color: #0f172a;
}

.equal-sign {
    color: #f1f5f9;
    font-size: 2rem;
    font-weight: bold;
    font-family: "Courier New", Courier, monospace;
    margin: 5px;
    padding: 1px;
}

.span-area {
    margin: 9px;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: auto;
    height: auto;
}

.loading {
    color: #f1f5f9;
    font-size: 1rem;
    font-weight: bold;
    font-family: "Courier New", Courier, monospace;
    margin: 5px;
    padding: 1px;
}

.result-area {
    margin: 9px;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: auto;
    height: auto;
}

.result {
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    align-items: center;
    gap: 12px;
}

.decrypted {
    padding: 1em;
    margin: 3px;
    width: auto;
    height: auto;
    border-width: 1.5px;
    border-style: solid;
    border-color: #334155;
    border-radius: 14px;
}

.error-input {
    font-size: 0.8rem;
    font-family: "Courier New", Courier, monospace;
    font-weight: bold;
    color: #dc2626;
    margin-left: 12px;
}

.separator {
    margin-left: 5px;
}

select {
    background-color: transparent;
    color: #f1f5f9;
    border: 1.5px solid #334155;
    border-radius: 14px;
    padding: 8px;
    font-family: "Courier New", Courier, monospace;
    font-size: 1rem;
    width: 60%;
    position: relative;
}

select option {
    position: absolute;
    top: 20px;
    background-color: #0f172a;
    border: 1.5px solid #334155;
    color: #f1f5f9;
    font-family: "Courier New", Courier, monospace;
    font-size: 1rem;
}
</style>
