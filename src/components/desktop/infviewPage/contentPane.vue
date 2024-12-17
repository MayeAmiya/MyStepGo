<template>
    <div class="content-pane">
        <h2>信息编辑页面</h2>
        <div class="editor">
            <label for="text">文本:</label>
            <textarea id="text" v-model="text"></textarea>
        </div>
        <div class="editor">
            <label for="image">图片 URL:</label>
            <input type="text" id="image" v-model="imageUrl" />
            <div v-if="imageUrl">
                <img :src="imageUrl" alt="Image Preview" />
            </div>
        </div>
        <div class="editor">
            <label for="quote">引用:</label>
            <textarea id="quote" v-model="quote"></textarea>
        </div>
        <button @click="saveContent">保存</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const text = ref('');
const imageUrl = ref('');
const quote = ref('');

const saveContent = () => {
    // Implement save logic here
    console.log('Text:', text.value);
    console.log('Image URL:', imageUrl.value);
    console.log('Quote:', quote.value);
};
</script>

<style scoped>
.content-pane {
    padding: 20px;
}

.editor {
    margin-bottom: 20px;
}

img {
    max-width: 100%;
    height: auto;
    margin-top: 10px;
}
</style>
