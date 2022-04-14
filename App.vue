<script setup>
    import ToDoList from "./components/ToDoList.vue";
</script>

<template>
    <ToDoList></ToDoList> <!-- C'est l'équivalent du main en vue. On le connecte à la page ToDoList qui contient toutes les fonctions -->
</template>

<style>
    body{
        background-color: aquamarine;
        background-image: url('./assets/Images/FrigoOuvert.png');
        background-size: 36%;
        background-repeat: no-repeat;
        background-position: 60% top; /* Ne sachant pas centrer mon image (la position center soit ne fonctionnait pas, soit ne me plaisait pas) j'ai adapté à l'oeil.*/
    }
</style>
