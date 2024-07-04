<template>
    <div class="container">
        <div class="title">
            <h1>
                Brute Force Test
            </h1>
            <hr />
        </div>
        <form 
            method="post"
            action="submit"
        >
            <div class="input-group">
                <label for="hash">Encrypted Password:</label>
                <input 
                    type="text" 
                    id="hash" 
                    name="hash"
                    placeholder="Insert a hash of any type of encryption..."
                />
                <span class="error-input">Please, insert a valid hash!</span>
            </div>
            <div class="button-group">
                <button type="submit">Decrypt</button>
            
            </div>
        </form>
        <div class="span-area">
            <span class="loading">Decoding...</span>
            <span class="equal-sign">=</span>
        </div>
        <div class="result-area">
            <div class="result">
                Decrypted Password:
                <div class="decrypted">
                    Hello, World!
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const hash = ref<string>('');
const result = ref<string>('');

const hasHash = (): boolean => {
    return hash.value.trim() !== '' && hash.value.length > 0;
}

const hasResult = (): boolean => {
    return result.value.trim() !== '' && result.value.length > 0;
}

const fetchHash = async () => {

}

</script>

<style  scoped>
    .container {
        padding: 1em;
        margin: 3px;
        width: 35%;
        height: 40vh;
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
        margin-bottom: 3px
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

    form > * + * {
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
        margin-left: 6px
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
        font-family: 'Courier New', Courier, monospace;
        font-weight: normal;
        font-size: 1rem;
        width: 100%;
        height: 28px;
        box-sizing: border-box;
    }

    input::placeholder {
        font-size: 0.8rem
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
        font-family: 'Courier New', Courier, monospace;
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
        font-family: 'Courier New', Courier, monospace;
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
        font-size: 1xrem;
        font-weight: bold;
        font-family: 'Courier New', Courier, monospace;
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
        font-family: 'Courier New', Courier, monospace;
        font-weight: bold;
        color: #dc2626;
        margin-left: 12px;
    }

</style>