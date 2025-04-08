<template>
  <div class="admin">
    <h1>Yahor Paulson — ADMIN</h1>

    <div class="action">
      <button @click="showSlugInput = true">Change project</button>
    </div>

    
    <div v-if="showSlugInput" class="slug-search">
      <input v-model="slugInput" placeholder="Enter project slug..." />
      <button @click="findProject">Change</button>
    </div>

    
    <div v-if="projectFound" class="edit-context-menu">
      <h2>Editing: {{ editableProject.slug }}</h2>
      
      <select v-model="editableProject.field">
        <option value="title">Title</option>
        <option value="description">Description</option>
        <option value="shortDescription">Short Description</option>
        <option value="link">Link</option>
        <option value="tags">Tags</option>
        <option value="inProgress">In Progress</option>
        <option value="slug">Slug</option>
      </select>

      <div v-if="['title', 'description', 'shortDescription'].includes(editableProject.field)">
  ...
  <input
    v-model="editableProject[editableProject.field][editableProject.language]"
    type="text"
    :id="editableProject.field"
  />
</div>

<!-- Обработка остальных полей -->
<div v-else-if="editableProject.field === 'inProgress'" class="field-row">
  <label for="inProgress">In Progress</label>
  <input
    type="checkbox"
    id="inProgress"
    v-model="editableProject.inProgress"
  />
</div>

<div v-else-if="editableProject.field === 'link' || editableProject.field === 'slug'" class="field-row">
  <label :for="editableProject.field">{{ editableProject.field }}</label>
  <input
    type="text"
    :id="editableProject.field"
    v-model="editableProject[editableProject.field]"
  />
</div>

<!-- tags (массив строк) -->
<div v-else-if="editableProject.field === 'tags'" class="field-row">
  <label for="tags">Tags (comma separated)</label>
  <input
    type="text"
    id="tags"
    v-model="tagsInput"
    @change="updateTags"
  />
</div>


      <button class="save" @click="submitChange"> Save</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// UI state
const showSlugInput = ref(false)
const slugInput = ref('')
const projectFound = ref(false)

const mockProjectDb = [
  {
    _id: '67e1ad60263d7179696b4f37',
    title: {
      en: 'Full-Stack Portfolio',
      de: 'Full-Stack-Portfolio',
      be: 'Поўны стек партфоліа'
    },
    description: {
      en: 'A web-based showcase app',
      de: '',
      be: ''
    },
    link: 'https://github.com/yahorpaulson/profile_website',
    tags: ['Vue', 'Node.js', 'MongoDB'],
    inProgress: true,
    slug: 'full-stack-portfolio'
  }
]

const editableProject = reactive<any>({})

function findProject() {
  const found = mockProjectDb.find(p => p.slug === slugInput.value.trim())
  if (found) {
    Object.assign(editableProject, JSON.parse(JSON.stringify(found)))
    projectFound.value = true
  } else {
    alert('Project not found')
  }
}



function submitChange() {

  console.log('🔧 Submitting changes:', editableProject)
}
</script>

<style scoped>
.admin {
  padding: 2rem;
  font-family: sans-serif;
}

.action button {
  padding: 8px 16px;
}

.slug-search {
  margin: 1rem 0;
  display: flex;
  gap: 10px;
}

.edit-context-menu {
  margin-top: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1.5rem;
  background: #f9f9f9;
  max-width: 700px;
}

.field-row {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
}

.field-row label {
  width: 150px;
  font-weight: bold;
}

.field-row input[type='text'],
.subfield input {
  flex: 1;
  padding: 6px;
}

.subfield {
  display: flex;
  gap: 1rem;
  margin-left: 2rem;
  margin-bottom: 0.5rem;
}

.subfield label {
  width: 100px;
}



.save {
  margin-top: 2rem;
  padding: 10px 20px;
}
</style>
