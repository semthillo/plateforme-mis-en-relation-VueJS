<template>
    <NavBar />
    <div class="container contenu">
        <h2>Gestion des Domaines</h2>
        <button type="button" class="btn btn-primary" @click="newDomain()">
    Ajouter <i class="fa fa-plus-circle" aria-hidden="true"></i>
</button>


    </div>
    
   
    <ListDomain />
    <AddDomain v-if="add" :add="add" @close="add = false" />
    
</template>

<script setup>


import { useGestionStore } from '../../store/gestion';
import { ref } from 'vue';
import ListDomain from './ListDomain.vue';
import AddDomain from './AddDomain.vue';

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
