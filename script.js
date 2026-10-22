// =============================================================
// script.js — Mon Dex
// =============================================================
// Les données viennent de data.js (la constante `creatures`).
// Écrivez votre code ici, fonctionnalité par fonctionnalité.
// Une carte GitHub Projects et au moins un commit par fonctionnalité.


// -------------------------------------------------------------
// 1. AFFICHAGE
// Supprimez les cartes écrites à la main dans index.html et
// construisez la grille à partir du tableau `creatures`.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 2. DÉTAIL
// Un clic sur une carte ouvre le panneau de détail :
// image, description, et statistiques affichées en barres.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 3. RECHERCHE
// La liste se met à jour pendant la saisie d'un nom
// (sans tenir compte des majuscules).
// -------------------------------------------------------------


// -------------------------------------------------------------
// 4. FILTRE
// Les boutons de type n'affichent que les créatures de ce type ;
// « Tous » réinitialise le filtre.
// La recherche et le filtre fonctionnent ENSEMBLE.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 5. CRÉER UNE CRÉATURE
// Validez chaque champ du formulaire avec une expression régulière
// (voir le tableau du brief). Affichez le message d'erreur sous le
// champ, et n'ajoutez jamais une créature invalide.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 6. MON ÉQUIPE
// Boutons « Ajouter à l'équipe » et « Retirer », gérés avec UN SEUL
// écouteur sur la grille et UN SEUL sur l'équipe (délégation).
// -------------------------------------------------------------


// -------------------------------------------------------------
// 7. RÈGLES DE L'ÉQUIPE
// 6 créatures au maximum, pas de doublon, un message clair quand
// une action est refusée, et un compteur (x/6).
// -------------------------------------------------------------


// -------------------------------------------------------------
// BONUS : LocalStorage, Fetch API, tri, comparaison
// -------------------------------------------------------------

const grid = document.getElementById("grid");

let i = 0;

while (i < creatures.length) {
    const creature = creatures[i];

    // Create the card
    const card = document.createElement("article");
    card.className = "flex flex-col gap-3 rounded-card bg-white p-3 pb-4";

    // Picture area
    const pictureBox = document.createElement("div");
    pictureBox.className = "relative flex h-36 items-center justify-center rounded-xl bg-brand-light";

    const image = document.createElement("img");
    image.src = creature.image;
    image.alt = creature.name;
    image.className = "h-28 w-28 object-contain";

    const id = document.createElement("span");
    id.textContent = creature.id;
    id.className = "absolute left-3 top-2 font-mono text-sm text-muted";

    pictureBox.appendChild(image);
    pictureBox.appendChild(id);

    // Name and type
    const info = document.createElement("div");
    info.className = "flex items-center justify-between gap-2";

    const name = document.createElement("h3");
    name.textContent = creature.name;
    name.className = "font-display text-xl font-semibold";

    const type = document.createElement("span");
    type.textContent = creature.type;
    type.className = "rounded-full bg-brand-light px-3 py-1 text-sm font-bold text-ink";

    info.appendChild(name);
    info.appendChild(type);

    // Level and total
    const level = document.createElement("p");

    const total = creature.stats.hp +
                  creature.stats.attack +
                  creature.stats.defence;

    level.textContent = "Niveau " + creature.level + " · Total " + total;
    level.className = "text-sm text-muted";

    // Add to team button
    const button = document.createElement("button");
    button.textContent = "Ajouter à l'équipe";
    button.type = "button";
    button.className = "btn-outline";

    // Put everything inside the card
    card.appendChild(pictureBox);
    card.appendChild(info);
    card.appendChild(level);
    card.appendChild(button);

    // Put the card inside the grid
    grid.appendChild(card);

    i++;
}
   
  


