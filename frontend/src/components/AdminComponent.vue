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
      <button class="feedback" @click="startAction('read')">Read feedbacks</button>
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

      <div class="field-row">
        <label>Goals (EN)</label>
        <input v-model="addProject.goals.en" />
        <label>Goals (DE)</label>
        <input v-model="addProject.goals.de" />
        <label>Goals (BE)</label>
        <input v-model="addProject.goals.be" />
      </div>


      <div class="field-row">
        <label>Insights (EN)</label>
        <input v-model="addProject.insights.en" />
        <label>Insights (DE)</label>
        <input v-model="addProject.insights.de" />
        <label>Insights (BE)</label>
        <input v-model="addProject.insights.be" />
      </div>


      <label for="tags">Tags (comma separated)</label>
      <input v-model="tagsInput" type="text" id="tags" placeholder="e.g. vue, vite, typescript" />

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
  </div>
  <!-- END ADD FIELD -->





  <!-- EDIT FIELD -->
    
    <div v-if="currentAction === 'edit' && projectFound" class="edit-context-menu">
      <h2>Editing: {{ editableProject.slug }}</h2>
      
      <select v-model="editableProject.field">
        <option value="title">Title</option>
        <option value="description">Description</option>
        <option value="shortDescription">Short Description</option>
        <option value="link">Link</option>
        <option value="insights">Insights</option>
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

      

      <button class="save" @click="submitChange">Save</button>
    </div>
  </div>
  <!-- END EDIT FIELD -->

  <!-- DELETE FIELD -->
  <div v-if="currentAction === 'delete' && projectFound" class="edit-context-menu">
    
    <h2>Deleting: {{ editableProject.slug }}</h2>
    <button class="save" @click="submitChange">Delete</button>
  </div>
  <!-- END DELETE FIELD -->


  <!-- FEEDBACK FIELD -->
  <div v-if="currentAction === 'read'" class="edit-context-menu">
    <h2>Feedbacks</h2>
    <ul v-if="feedbackList.length">
      <li v-for="(f, i) in feedbackList" :key="i">
        ⭐ {{ f.mark }} — "{{ f.message || 'No message' }}"<br />
        <small>{{ new Date(f.time).toLocaleString() }}</small>
      </li>
    </ul>
    <p v-else> No feedbacks yet.</p>
  </div>


</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { onMounted } from 'vue'

  const isLoggedIn = ref(false)
  


  const username = ref('')
  const password = ref('')
  const token = ref<string | null>(null)

  // UI state
  const showSlugInput = ref(false)
  const slugInput = ref('')
  const tagsInput = ref('')
  //const inProgressInput = ref(false)
  const projectFound = ref(false)

  const currentAction = ref<'edit' | 'delete' | 'add' |'read' |null>(null)

  

  const editableProject = reactive<any>({})

  const addProject = reactive<any>({
    title: { en: '', de: '', be: '' },
    shortDescription: { en: '', de: '', be: '' },
    tags: [],
    inProgress: false,
    language: 'en',
    description: { en: '', de: '', be: '' },
    insights: { en: [], de: [], be: [] },
    goals: { en: [], de: [], be: [] },
    link: '',
    slug: ''
  });


  
  onMounted(() => {
    token.value = localStorage.getItem('adminToken')
    isLoggedIn.value = !!token.value
  })


  const feedbackList = ref<any[]>([])

  async function fetchFeedbacks() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/feedback`)
      const data = await res.json()
      feedbackList.value = data.reverse() // апошнія першыя
    } catch (err) {
      console.error('[ERROR]: Failed to load feedbacks', err)
    }
  }


  function logout() {
    token.value = null
    localStorage.removeItem('adminToken')
    isLoggedIn.value = false
  }

  async function handleSlugSubmit() {
    const slug = slugInput.value.trim();
    console.log('[DEBUG] handleSlugSubmit called with slug:', slug);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${slug}`);
      if (!res.ok) throw new Error('Not found');
      const project = await res.json();
      console.log('[DEBUG] Project fetched:', project);
      Object.assign(editableProject, JSON.parse(JSON.stringify(project)));
      projectFound.value = true;
      
    } catch {
      alert('Project not found');
    }
  }


  async function login(username: string, password: string) {
    try {
      const url = `${import.meta.env.VITE_API_URL}/api/projects/admin/login`
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`Login failed: ${errorText}`)
      }

      const data = await res.json()
      if (!data.token) throw new Error('No token received')

      localStorage.setItem('adminToken', data.token)
      token.value = data.token
      isLoggedIn.value = true

    } catch (err) {
      alert('Login failed. Please check your username and password.')
      console.error('[Login error]:', err)
      localStorage.removeItem('adminToken')
      token.value = null
      isLoggedIn.value = false
    }
  }

  

  async function createProject() {
    addProject.tags = tagsInput.value.split(',').map(t => t.trim()).filter(Boolean);
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`
      },
      body: JSON.stringify(addProject)
     });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`[ADD ERROR]: ${err}`);
    }

    alert('Project created');
    resetState();
  }




  
  async function deleteProject() {
    const slug = slugInput.value.trim();

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/admin/${slug}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token.value}`
      }
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`[DELETE ERROR]: ${err}`);
    }

    alert('Project deleted');
    resetState();
  }


  async function fetchProjects(slug: string) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${slug}`);
    if (!res.ok) throw new Error('Not found');
    const project = await res.json();
    console.log('[DEBUG] Project fetched:', project);
    
  }

    
  async function editProject() {
    

    const slug = slugInput.value.trim();
    
    const update = { ...editableProject };
    delete update._id;
    console.log('[DEBUG] Editable fields:', update);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/admin/${slug}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`
      },
      body: JSON.stringify(update)
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`[EDIT ERROR]: ${err}`);
    }

    

    alert('Project updated');
    resetState();
  }



  function resetState() {
    slugInput.value = ''
    tagsInput.value = ''
    projectFound.value = false
    showSlugInput.value = false
    currentAction.value = null
    Object.keys(editableProject).forEach(key => delete editableProject[key])
    Object.keys(addProject).forEach(key => delete addProject[key])
  }



  function startAction(action: 'edit' | 'delete' | 'add' |'read' |null) {

    console.log('[DEBUG] startAction called with:', action);
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
        tags: [],
        inProgress: false,
        language: 'en',
        description: { en: '', de: '', be: '' },
        insights: { en: [], de: [], be: [] },
        goals: { en: [], de: [], be: [] },
        link: '',
        slug: ''
      })

      Object.assign(editableProject, {
        slug: ''
      })
    }

    if (action === 'edit') {
      Object.assign(editableProject, {
        slug: '',
        field: 'title',
        language: 'en'
      });
      showSlugInput.value = true;
      projectFound.value = false;
    }

    if (action === 'delete') {
      Object.assign(editableProject, {
        slug: ''
      });
      showSlugInput.value = true;
      projectFound.value = false;
    }

    if (action === 'read') {
      
      console.log('Reading feedbacks...');
      fetchFeedbacks()
      
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
