//un produit
export default class Produit{
    constructor (id, nom, qte){
        this._nom = nom;
        this._qte = qte;
        this._id = id;
        }
    get nom() {
        return this._nom;
    }
    get id() {
        return this._id
    }
    get qte() {
        return this._qte
    }
    // modifier le texte
    set nom(nom) {
        this._nom = nom;
    }
    pourAfficher() {
        return `${this._qte} ${this._nom}`;
    }
}