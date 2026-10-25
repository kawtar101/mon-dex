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
import { creatures } from "./data.js";
const grid = document.getElementById("grid");


const searchInput = document.getElementById("search-input");
let selectedType = "Tous";
// Display creatures in the grid
function displayCreatures(list) {
    let i = 0;
    let cards = "";

    while (i < list.length) {
        const creature = list[i];

        const total =
            creature.stats.hp +
            creature.stats.attack +
            creature.stats.defence;

        cards += `
            <article
                data-creature-id="${creature.id}"
                class="flex flex-col gap-3 rounded-card bg-white p-3 pb-4 cursor-pointer">

                <div class="relative flex h-36 items-center justify-center rounded-xl bg-brand-light">
                    <img src="${creature.image}"
                         alt="${creature.name}"
                         class="h-28 w-28 object-contain">

                    <span class="absolute left-3 top-2 font-mono text-sm text-muted">
                        ${creature.id}
                    </span>
                </div>

                <div class="flex items-center justify-between gap-2">
                    <h3 class="font-display text-xl font-semibold">
                        ${creature.name}
                    </h3>

                    <span class="rounded-full bg-brand-light px-3 py-1 text-sm font-bold text-ink">
                        ${creature.type}
                    </span>
                </div>

                <p class="text-sm text-muted">
                    Niveau ${creature.level} · Total ${total}
                </p>

                <button type="button" class="btn-outline">
                    Ajouter à l'équipe
                </button>
            </article>
        `;

        i++;
    }

    grid.innerHTML = cards;
}

// Display all creatures when the page opens
displayCreatures(creatures);

// Search as the user types
searchInput.addEventListener("input", function() {
    const searchText = searchInput.value.toLowerCase();

    let results = [];
    let i = 0;

    while (i < creatures.length) {
        if (creatures[i].name.toLowerCase().includes(searchText)) {
            results.push(creatures[i]);
        }

        i++;
    }

    displayCreatures(results);
});


grid.innerHTML = cards;
// Get the details panel elements
const detailImage = document.getElementById("detail-image");
const detailName = document.getElementById("detail-name");
const detailType = document.getElementById("detail-type");
const detailDescription = document.getElementById("detail-description");

const detailHp = document.getElementById("detail-hp");
const detailAttack = document.getElementById("detail-attack");
const detailDefence = document.getElementById("detail-defence");

const detailHpBar = document.getElementById("detail-hp-bar");
const detailAttackBar = document.getElementById("detail-attack-bar");
const detailDefenceBar = document.getElementById("detail-defence-bar");

// Listen for clicks inside the grid
grid.addEventListener("click", function(event) {

    // Find the card that was clicked
    const card = event.target.closest("article");

    // If the click was not inside a card, stop
    if (card === null) {
        return;
    }

    // Get the creature ID from the card
    const creatureId = card.dataset.creatureId;

    // Find the creature in the array
    let selectedCreature = null;
    let j = 0;

    while (j < creatures.length) {
        if (creatures[j].id === creatureId) {
            selectedCreature = creatures[j];
            break;
        }

        j++;
    }

    // Stop if the creature was not found
    if (selectedCreature === null) {
        return;
    }

        // Stop if the creature was not found
    if (selectedCreature === null) {
        return;
    }

    // Update the image and text
    detailImage.src = selectedCreature.image;
    detailImage.alt = selectedCreature.name;

    detailName.textContent = selectedCreature.name;
    detailType.textContent = selectedCreature.type;
    detailDescription.textContent = selectedCreature.description;

    // Update the stat numbers
    detailHp.textContent = selectedCreature.stats.hp;
    detailAttack.textContent = selectedCreature.stats.attack;
    detailDefence.textContent = selectedCreature.stats.defence;

    // Update the stat bars
    detailHpBar.style.width =
        Math.min(selectedCreature.stats.hp, 200) / 200 * 100 + "%";

    detailAttackBar.style.width =
        Math.min(selectedCreature.stats.attack, 200) / 200 * 100 + "%";

    detailDefenceBar.style.width =
        Math.min(selectedCreature.stats.defence, 200) / 200 * 100 + "%";

});