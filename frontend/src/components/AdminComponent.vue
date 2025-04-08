<template>
  <div class="login-form" v-if="!isLoggedIn">
    <h1>Admin Login</h1>
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login(username, password)">Login</button>
  </div>
  <div class="admin" v-if="isLoggedIn">

    <h1>Yahor Paulson — ADMIN</h1>


    <button class="logout" @click="logout">Logout</button>



    

    <div class="action">
      <button class="change" @click="startAction('edit')">Change project</button>
      <button class="add" @click="startAction('add')">Add project</button>
      <button class="delete" @click="startAction('delete')">Delete project</button>
    </div>


    
    <div v-if="showSlugInput" class="slug-search">
      <input v-model="slugInput" placeholder="Enter project slug..." />
      <button @click="handleSlugSubmit">{{ currentAction === 'delete' ? 'Delete' : 'Change' }}
      </button>

    </div>


    <!-- ADD FIELD -->
    <div v-if="currentAction === 'add' && !projectFound" class="edit-context-menu">
      <h2>Adding a new project</h2>
      <div class="field-row">
        <label for="slug">Slug</label>
        <input v-model="addProject.slug" type="text" id="slug" />
        <div class="field-row">
          <label>Title (EN)</label>
          <input v-model="addProject.title.en" />
          <label>Title (DE)</label>
          <input v-model="addProject.title.de" />
          <label>Title (BE)</label>
          <input v-model="addProject.title.be" />
        </div>

        <div class="field-row">
          <label>Short Description (EN)</label>
          <input v-model="addProject.shortDescription.en" />
          <label>Short Description (DE)</label>
          <input v-model="addProject.shortDescription.de" />
          <label>Short Description (BE)</label>
          <input v-model="addProject.shortDescription.be" />
        </div>


        <label for="tags">Tags</label>
        <input v-model="addProject.tags" type="text" id="tags" placeholder="Tags" />
        <label for="inProgress">In Progress</label>
        <input v-model="addProject.inProgress" type="checkbox" id="inProgress" placeholder="In Progress" />
        
        <div class="field-row">
          <label>Description (EN)</label>
          <input v-model="addProject.description.en" />
          <label>Description (DE)</label>
          <input v-model="addProject.description.de" />
          <label>Description (BE)</label>
          <input v-model="addProject.description.be" />
        
        </div>


        <title>Link</title>
        <input v-model="addProject.link" type="text" id="link" placeholder="Link" />
      </div>
      <button class="save" @click="submitChange"> Save</button>





      <!-- EDIT FIELD -->
    
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
          <label for="language">Language:</label>
          <select id="language" v-model="editableProject.language">
            <option value="en">EN</option>
            <option value="de">DE</option>
            <option value="be">BE</option>
          </select>
        </div>


        <div  v-if="editableProject.field && editableProject.language" class="field-row">
          <label :for="editableProject.field">{{ editableProject.field }}</label>
          <input
            v-model="editableProject[editableProject.field][editableProject.language]"
            :type="editableProject.field === 'inProgress' ? 'checkbox' : 'text'"
            :id="editableProject.field"
          />
        </div>

        <button class="save" @click="submitChange"> Save</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'

  const isLoggedIn = ref<boolean>(!!localStorage.getItem('adminToken'));
  


  const username = ref('')
  const password = ref('')
  const token = localStorage.getItem('adminToken')
  // UI state
  const showSlugInput = ref(false)
  const slugInput = ref('')
  const projectFound = ref(false)

  const currentAction = ref<'edit' | 'delete' | 'add' | null>(null)

  

  const editableProject = reactive<any>({})

  const addProject = reactive<any>({      //initialized cannot be null
    title: { en: '', de: '', be: '' },
    shortDescription: { en: '', de: '', be: '' },
    tags: '',
    inProgress: false,
    language: 'en',
    description: '',
    link: '',
    slug: ''
  });



  function logout() {
    localStorage.removeItem('adminToken')
    isLoggedIn.value = false
  }

  async function handleSlugSubmit() {
    const slug = slugInput.value.trim();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${slug}`);
      if (!res.ok) throw new Error('Not found');
      const project = await res.json();
      Object.assign(editableProject, JSON.parse(JSON.stringify(project)));
      projectFound.value = true;
    } catch {
      alert('Project not found');
    }
  }


  async function login(username:string, password: string){

    try {
      const url = `${import.meta.env.VITE_API_URL}/api/projects/admin/login`
      console.log('Login request to:', url)

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      localStorage.setItem('adminToken', data.token);
      isLoggedIn.value = true;

    } catch {
      console.log("Error sending POST method");
    }
  }

  async function createProject() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(addProject),
      });


      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(`[ERROR]: ${errMsg}`);
      }

      startAction(null);

    } catch (error) {
      console.error('[ERROR]: Error adding project', error);
      
    }
  }



  async function deleteProject() {
    const slug = slugInput.value.trim()
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${slug}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      })
      if (!res.ok) throw new Error('Failed to delete project')
      alert('Project deleted successfully')
    } catch (error) {
      console.error('Error deleting project:', error)
      
    }
  }




  async function editProject() {
    const slug = slugInput.value.trim()
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${slug}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(editableProject),
      })
      if (!res.ok) throw new Error('Failed to edit project')
      alert('Project edited successfully')
    } catch (error) {
      console.error('Error editing project:', error)
    }
  }


  function startAction(action: 'edit' | 'delete' | 'add' | null) {
  currentAction.value = action
  showSlugInput.value = action !== 'add'
  slugInput.value = ''
  projectFound.value = false

  Object.keys(editableProject).forEach(key => delete editableProject[key])
  Object.keys(addProject).forEach(key => delete addProject[key])

  if (action === 'add') {
    showSlugInput.value = false
    projectFound.value = false

    
    Object.assign(addProject, {
      title: { en: '', de: '', be: '' },
      shortDescription: { en: '', de: '', be: '' },
      tags: '',
      inProgress: false,
      language: 'en',
      description: '',
      link: '',
      slug: ''
    })

    Object.assign(editableProject, {
      slug: ''
    })
  }
}

  


  function submitChange() {

    if (currentAction.value === 'delete') {
      deleteProject()
    } else if (currentAction.value === 'edit') {
      editProject()
    } else if (currentAction.value === 'add') {
      createProject()
    }
  
    
  }
</script>

<style scoped>
.edit-context-menu {
  margin-top: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 2rem;
  background: #f9f9f9;
  max-width: 800px;
  font-family: 'Courier New', monospace;
}

.field-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.field-row label {
  min-width: 140px;
  font-weight: bold;
  margin-bottom: 0.3rem;
}

.field-row input[type='text'],
.field-row input[type='checkbox'],
.field-row select {
  flex: 1 1 200px;
  padding: 6px;
  font-family: inherit;
}

button.save {
  margin-top: 2rem;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #aaa;
  background-color: #fff;
  cursor: pointer;
}

button.save:hover {
  background-color: #f0f0f0;
}

.logout {
  margin-bottom: 1rem;
}

</style>
