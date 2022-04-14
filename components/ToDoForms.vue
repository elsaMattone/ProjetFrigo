<script setup>
</script>

<template>
 <form @submit.prevent="$emit('addC', nom, qte)"> <!-- On crée le formulaire correspondant à l'achat -->
    <input type="text" v-model="nom" placeholder="Produit à acheter?" /><br>
    <input type="text" v-model="qte" placeholder="Quantité à acheter?" /><br>
    <input class="bouton" type="submit" value="valider" /> <!-- C'est ce bouton qui assure l'envoi à l'API -->
 </form>
</template>

<style>
   form{
      text-align: center;
   }
</style>