<template>
    <div style="overflow-y: auto; max-height: 400px">
        <div class="inf-pane">
            <div>
                <el-card shadow="always" style="border-radius: 10px; margin-top: 10px">
                    <template #header>
                        <el-button @click="createText">Create Text</el-button>
                        <el-button @click="createImage">Create Image</el-button>
                        <el-button @click="createInfos">update Infos</el-button>
                    </template>
                    <div ref="infpane">
                    </div>
                </el-card>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue'
import { useGlobalStore } from '../../../eventBus'
const globalStore = useGlobalStore()
const infPane = ref<HTMLElement | null>(null)
const index = ref(globalStore.Global.user.currentInfo.pointIndex)
const point = ref(await globalStore.Global.points.findPointInfo(index.value))
const infType = ref(globalStore.Global.user.currentInfo.infType)
import { InfoInfo } from '../../information/infoInfo'
const tempPoint = []

globalStore.$subscribe(async () => {
    infType.value = globalStore.Global.user.currentInfo.infType
    if (infType.value == 'points') {
        index.value = globalStore.Global.user.currentInfo.pointIndex
    } else {
        index.value = globalStore.Global.user.currentInfo.mapIndex
    }
    const point = ref(await globalStore.Global.points.findPointInfo(index.value))
    if (infPane.value) {
        infPane.value.innerHTML = '';
    }
    iteratePoints(point.value.info)
})
//遍历信息列表


function iteratePoints(infos) {
    if (infPane.value) {
        infos.forEach((inf) => {
            const pointCard = document.createElement('div')
            pointCard.style.border = '1px solid #ccc';
            pointCard.style.padding = '10px';
            pointCard.style.margin = '10px 0';

            const tempInf = globalStore.Global.informaitons.find(inf)
            if (tempInf.type == 'text') {
                // 这里tempInf的content就是一个text对象的序列化
                const textContent = JSON.parse(tempInf.infoString);
                const textElement = document.createElement('p');
                textElement.innerHTML = textContent.content;
                textElement.style.border = '1px solid #000';
                textElement.style.padding = '5px';

                const borderDiv = document.createElement('div');
                borderDiv.style.border = '1px solid #000';
                borderDiv.style.marginTop = '10px';
                borderDiv.appendChild(textElement)
                borderDiv.appendChild(ineratePoints(inf.infos))
                pointCard.appendChild(borderDiv);
            }
            if (tempInf.type == 'image') {
                const imageContent = JSON.parse(tempInf.infoString);
                const imageElement = document.createElement('img');
                imageElement.src = imageContent.src;
                imageElement.style.maxWidth = '100%';
                imageElement.style.height = 'auto';

                const borderDiv = document.createElement('div');
                borderDiv.style.border = '1px solid #000';
                borderDiv.style.marginTop = '10px';
                borderDiv.appendChild(imageElement)
                borderDiv.appendChild(ineratePoints(inf.infos))
                pointCard.appendChild(borderDiv);
            }
        }
        )
    }
    return pointCard;
}
// 创建信息 如何创建信息呢 限定输入文本和选择图片输入
function createInfos() {
    tempPoint.forEach((inf) => {
        if (inf.infomationType == 'text') {
            inf.uploadText()
        }
        if (inf.infomationType == 'image') {
            inf.uploadPicture()
        }
    })
}

import { textdata } from "../../information/cardInfo/text"
function createText() {
    const inputElement = document.createElement('input');
    const text = new textdata("");
    tempPoint.value.info.push(text);
    inputElement.type = 'text';
    inputElement.placeholder = '请输入文本信息';
    inputElement.style.margin = '10px 0';
    inputElement.style.padding = '5px';
    inputElement.style.border = '1px solid #ccc';

    inputElement.addEventListener('change', () => {
        textdata.context = inputElement.value;
    });

    if (infPane.value) {
        infPane.value.appendChild(inputElement);
    }
}

import { picture } from "../../information/cardInfo/picture"
import { el } from 'element-plus/es/locales.mjs';
function createImage() {
    const file = target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const contents = e.target.result;
            console.log('File contents:', contents);
        };
        reader.readAsText(file);

        const imageInfo = new picture(e.target.result);
        tempPoint.infos.push(imageInfo);
        const imageElement = document.createElement('img');
        imageElement.src = e.target.result;
        imageElement.style.maxWidth = '100%';
        imageElement.style.height = 'auto';
        if (infPane.value) {
            infPane.value.appendChild(imageElement);
        }
    } else {
        console.error('No file selected');
    }
}

onMounted(() => {
    if (infPane.value) {
        infPane.value.innerHTML = '';
    }
    iterateTitles(point.value.info)
})
</script>

<style scoped>
.inf-pane {
    padding: 20px;
    text-align: center;
}
</style>