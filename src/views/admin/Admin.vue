<template>
    <NavBar />
    <div class="container contenu">
        <h2>Gestion des Administrateurs</h2>
        <button type="button" class="btn btn-primary" @click="newAdmin()">
    Ajouter <i class="fa fa-plus-circle" aria-hidden="true"></i>
</button>


    </div>
    <ListAdmin />
    <AddAdmin v-if="add" :add="add" @close="add = false" ></AddAdmin>
   
    
</template>

<script setup>

import ListAdmin from './ListAdmin.vue';
import AddAdmin from './AddAdmin.vue'
import { useGestionStore } from '../../store/gestion';
import { ref } from 'vue';
const store = useGestionStore()


const add = ref(false)

function newAdmin(){
    add.value = true
}



</script>

<style scoped>
.contenu {
    margin-top: 100px;
}
.contenu button {
    margin-left: 90%;
}
</style>
