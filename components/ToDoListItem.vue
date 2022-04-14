<script setup>
defineProps(["produit"]);
</script>

<template>
  <br>
  <li>{{ produit.pourAfficher() }} <!-- On aligne les boutons de modification d'un produit en liant aux fonctions -->
    <button class="bouton" @click = "$emit('eventAjouter1', produit)">+1</button>
    <button class="bouton" @click = "$emit('eventEnlever1', produit)">-1</button>
    <button class="bouton" @click = "$emit('eventSupprimer', produit._id)">Supprimer</button>
  </li>
</template>

<style>
  li{
    text-align: center;
    list-style-image: url('../assets/Images/Brochette.png'); /* Je voulais à l'origine customiser chaque puce, mais je n'ai aucune idée (et mes recherches n'ont rien donné) de comment faire cela. C'est pourquoi il y a de nombreuses images inutilisées dans Images.*/
  }
  .bouton{
    display: inline-block;
    background-color: aliceblue;
    border-radius: 10px;
    border: 1px double coral;
    color: coral;
    text-align: center;
    cursor: pointer;
  }
  .bouton:hover { /* :hover me permet de modifier le survol du bouton, c'est plus visuel et donc plus intuitif.*/
  background-color: aquamarine;
  }
</style>