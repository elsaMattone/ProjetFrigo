<script setup> // Code JavaScript
import Produit from "../Produit.js";
import { reactive, onMounted } from 'vue';
import ToDoListItem from "./ToDoListItem.vue";
import ToDoForms from "./ToDoForms.vue";
import Search from "./Search.vue";
const listeP = reactive([]);

//J'ai pris pour base le dernier TP vue fait en cours puisque les méthodes se ressemblaient.

function handlerDelete(id) { // Le but de cette méthode est de supprimer complètement un produit de l'API.
    console.log(id); // Cette demande sert à vérifier que la fonction se lance bien.
    const fetchOptions = {method : "DELETE"};
        fetch(url+"/"+id, fetchOptions)
            .then((response) => {
                return response.json();
            }) 
            .then((dataJSON) => {
                console.log(dataJSON);
                getTodos()
            })
            .catch((error) => console.log(error));
}

function handlerAdd(nom, qte) { // On simule ici l'achat d'un produit. L'utilisateur peut d'ailleurs en choisir la quantité.
    console.log(nom);
    console.log(qte);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
        const fetchOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({ nom : nom, qte : qte }),
    };
    fetch(url, fetchOptions)
    .then((response) => {
        return response.json();
    })
    .then((dataJSON) => {
        console.log(dataJSON);
        getTodos()
    })
    .catch((error) => {
        console.log(error)
    })
}

function handlerAdd1(produit) { // Cette fonction sert à incrémenter la quantité d'un produit en particulier
    console.log(produit)
    produit._qte+=1;
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
        const fetchOptions = {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify({ id : produit._id, nom : produit._nom, qte : produit._qte }),
    };
    fetch(url, fetchOptions)
    .then((response) => {
        return response.json();
    })
    .then((dataJSON) => {
        console.log(dataJSON);
        getTodos()
    })
    .catch((error) => {
        console.log(error)
    })
}

function handlerLess1(produit) { // Cette fonction sert à décrémenter la quantité d'un produit en particulier
    console.log(produit);
    produit._qte --;
    if (produit._qte<=0){ // On s'assure, de plus, qu'une fois que la quantité du-dit produit atteint 0, il soit supprimé.
        handlerDelete(produit._id);
    }
    else { // Sinon, on lui retire 1.
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
        const fetchOptions = {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify({ id : produit._id, nom : produit._nom, qte : produit._qte }),
    };
    fetch(url, fetchOptions)
    .then((response) => {
        return response.json();
    })
    .then((dataJSON) => {
        console.log(dataJSON);
        getTodos()
    })
    .catch((error) => {
        console.log(error)
    })
    }
}

function handlerSearch(nom){ // Cette fontion sert à rechercher un produit en particulier dans notre frigo.
    let recherche = document.getElementById("nomProduit").value;
    const fetchOptions = {method: "GET"};
    fetch(url+"?search="+ recherche, fetchOptions)
    .then((response) => {
        return response.json();
    })
    .then((dataJSON) => {
        console.log(dataJSON); 
        let resultat = "";
        if (dataJSON[0]){ // Si le produit est dans la liste de produits recherchés, on le retiens.
            resultat = resultat +'<div>'+ dataJSON[0].nom +'</div>'; 
        } else { // Sinon c'est qu'il n'existe pas dans le frigo
            resultat = resultat +'<div>'+ "Le produit n'est pas dans le frigo!" +'</div>';
        }
        document.getElementById('resultatRecherche').innerHTML = resultat; // On affiche ici le résultat retenu.

    })

    .catch((error) => {
        console.log(error);
    })
}


const url = "https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/23/produits"; // Lien vers l'API

onMounted(() => {
    console.log("onmounted")
    getTodos()
});

function getTodos() {
    const fetchOptions = {method: "GET" };
    fetch(url, fetchOptions)
    .then((response) => {
        return response.json();
    })
    .then((dataJSON) => {
        console.log(dataJSON);
        listeP.splice(0, listeP.length)
        dataJSON.forEach((v) => listeP.push(new Produit(v.id, v.nom, v.qte)));
    })
    .catch((error) => console.log(error));
}
</script>


<template> 
<!-- Code HTML -->

    <h1> Liste des produits </h1>

    <ToDoForms 
        :nom = "nom"
        :qte = "qte"
        @addC = "handlerAdd"
    />

    <!-- On associe à la page ToDoForms qui gère les ajouts à l'API la fonction d'ajout -->

    <ToDoListItem
        v-for="(produit) of listeP"
        :key="[produit._id]"
        :produit = "produit"
        @eventSupprimer = "handlerDelete"
        @eventAjouter1 = "handlerAdd1"
        @eventEnlever1 = "handlerLess1"
    />

    <!-- On associe à la page ToDoListItem qui gère les modifications de l'API les fonctions +1, -1 et supprimer -->

    <Search
        class = "recherche"
        @eventRechercher = "handlerSearch"
    />

    <!-- On associe à la page Search la fonction de recherche -->
    
</template>

<style> /* Code CSS lié au template */
    h1{
        text-align: center;
        text-transform: capitalize;
        font-size: large;
    }
    .recherche{
        position: bottom;
    }
</style>