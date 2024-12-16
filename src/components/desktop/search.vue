<template>
  <el-card shadow="always" style="border-radius: 10px; margin-top: 10px" @enter="search">
    <template #header>
      <h2>Search Content</h2>
      <div class="search">
        <el-input v-model="searchValue" placeholder="Please Input" clearable />
      </div>
    </template>
    <div ref="searchResults" class="search-results">
    </div>
  </el-card>


  <el-card shadow="always" style="border-radius: 10px; margin-top: 10px">
    <template #header>
      <h2>Search Keywords</h2>
      <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px">
        <div style="flex: 3">
          <el-autocomplete v-model="newOption" :fetch-suggestions="querySearch" :trigger-on-focus="false" clearable
            class="inline-input w-50" placeholder="Please Input" />
        </div>
        <div style="flex: 1; display: flex; align-items: center">
          <el-button style="margin-left: auto; color: black" @click="addNewOptionFromInput">
            Add New Option
          </el-button>
        </div>
      </div>
    </template>
    <el-checkbox-group v-model="selectedStrings">
      <div v-for="(item, index) in candidateList" :key="index">
        <el-checkbox :value="item" size="large" border style="width: 100%">{{ item }}</el-checkbox>
      </div>
    </el-checkbox-group>
  </el-card>

</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
// import keyword_exechange from './keyword_exechange.vue'

import { useGlobalStore } from '../../eventBus'
const globalStore = useGlobalStore()
const candidateList = ref(globalStore.Global.user.keywordsList.candidates)
const selectedStrings = ref(globalStore.Global.user.keywordsList.selected)
const searchValue = ref('')
const searchResults = ref<HTMLElement | null>(null)
function search() {
  // Send searchValue to the server for fuzzy search
  fetch('https://your-server-endpoint/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: searchValue.value }),
  })
    .then(response => response.json())
    .then(data => {
      // Handle the search results returned from the server

      const searchResultsDiv = document.createElement('div')
      data.forEach((item: any) => {
        const resultCard = document.createElement('div')
        resultCard.innerHTML = `
            <div>${item.type} : ${item.name} - Keywords: ${item.keywords.join(', ')}</div>
          `
        searchResultsDiv.appendChild(resultCard)
      })

      if (searchResults.value) {
        searchResults.value.innerHTML = '' // Clear previous results
        searchResults.value.appendChild(searchResultsDiv)
      }

      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  console.log(searchValue.value)
}
globalStore.$subscribe(() => {
  candidateList.value = globalStore.Global.user.keywordsList.candidates
  selectedStrings.value = globalStore.Global.user.keywordsList.selected
})

watch(selectedStrings, (newVal) => {
  globalStore.Global.user.keywordsList.selected = newVal
})

const newOption = ref('')
interface RestaurantItem {
  value: string
  link: string
}

const restaurants = ref<RestaurantItem[]>([])

const querySearch = (queryString: string, cb: (results: RestaurantItem[]) => void) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  // call callback function to return suggestions
  cb(results)
}

const createFilter = (queryString: string) => {
  return (restaurant: RestaurantItem) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  }
}

const addNewOptionFromInput = () => {
  if (newOption.value.trim() !== '') {
    candidateList.value.push(newOption.value.trim())
    newOption.value = ''
  }
}
</script>
