<script setup>
    defineProps(["produit"]);
</script>

<template>
    <form @submit.prevent="$emit('eventRechercheProduits', nom)"> <!-- On crée le formulaire de recherche -->
        <input id = "nomProduit" type="search" v-model="nom" placeholder="Rechercher un produit dans le frigo"/>
        <input type="submit" value="valider" />
    </form>
    <div id = "resultatRecherche"></div>
</template>