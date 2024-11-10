<template>
    <NavBar />
    <div class="container contenu">
        <h2>Gestion des Services</h2>
        <button type="button" class="btn btn-primary" @click="newDomain()">
    Ajouter <i class="fa fa-plus-circle" aria-hidden="true"></i>
</button>


    </div>
    
   <AddService v-if="add" :add="add" @close="add = false"/>
<ListService />
    
</template>

<script setup>


import { useGestionStore } from '../../store/gestion';
import { ref } from 'vue';
import ListService from './ListService.vue';
import AddService from './AddService.vue';


const store = useGestionStore()


const add = ref(false)

function newDomain(){
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
