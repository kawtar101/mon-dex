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
     <img src="${creature.image}"   alt="${creature.name}"
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
   <button type="button" data-action="add" class="btn-outline">
     Ajouter à l'équipe
          </button>
    </article>       `;
        i++;
    }
    grid.innerHTML = cards;
}
// Search and type filter
function filterCreatures() {
    let i = 0;
    //empty array for storing pokemon that match the search
    let results = [];
    // checking every creature
    while (i < creatures.length) {
        const creature = creatures[i];
        if (
            creature.name.toLowerCase().includes(searchInput.value.toLowerCase()) &&
            (selectedType === "Tous" || creature.type === selectedType)
        ) {
            results.push(creature);
        }
        i++;
    }
    displayCreatures(results);
}
// Search while typing
searchInput.addEventListener("input", filterCreatures);

// Type filters
const filters = document.getElementById("filters");//this

filters.addEventListener("click", function(event) {//this
    if (event.target.tagName === "BUTTON") {
        selectedType = event.target.dataset.type;
        filterCreatures();
    }
});

// Display all creatures when the page opens
displayCreatures(creatures);

// Get the details panel elements
//We select all these elements because we need to  update them when someone clicks a creature.
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

// Éléments de l'équipe
        const teamSlots = document.getElementById("team-slots");
    const teamMessage = document.getElementById("team-message");
const teamCount = document.getElementById("team-count");
        const teamCountSection = document.getElementById("team-count-section");
// Tableau des créatures de l'équipe (6 maximum)
let team = [];

// Cherche une créature dans le tableau à partir de son id
function findCreature(id) {
    let j = 0;
    while (j < creatures.length) {
        if (creatures[j].id === id) {
            return creatures[j];
        }
        j++;
    }
    return null;
}
// Listen for clicks inside the grid
// (UN SEUL écouteur : détail + bouton "Ajouter à l'équipe")
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
    const selectedCreature = findCreature(creatureId);

    // Stop if the creature was not found
    if (selectedCreature === null) {
        return;
    }

    //  "Ajouter à l'équipe" we ajout and then w stop
    if (event.target.closest("button") !== null) {
        addToTeam(selectedCreature);
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

// ----------------- MON ÉQUIPE -----------------

// Redessine les 6 emplacements de l'équipe
function displayTeam() {
    let html = "";
    let i = 0;

    while (i < 6) {
        const creature = team[i];

        if (creature) {
            html += `
                <div class="flex flex-col items-center gap-1 rounded-xl border-2 border-line p-2 text-center text-sm">
                    <img src="${creature.image}" alt="${creature.name}" class="h-14 w-14 object-contain">
                    <span class="font-bold">${creature.name}</span>
                    <button type="button" data-action="remove" data-creature-id="${creature.id}" class="btn-outline px-3 text-xs">
                        Retirer
                    </button>
                </div>
            `;
        } else {
            html += `
                <div class="flex min-h-20 items-center justify-center rounded-xl border-2 border-dashed border-line p-3 text-center text-sm text-muted">
                    Emplacement ${i + 1}
                </div>
            `;
        }
        i++;
    }

    teamSlots.innerHTML = html;

    // Compteur (x/6)
    teamCount.textContent = team.length;
    teamCountSection.textContent = team.length;
}

// Essaie d'ajouter une créature à l'équipe
function addToTeam(creature) {
    // Règle 1 : 6 créatures maximum
    if (team.length >= 6) {
        teamMessage.textContent = "L'équipe est complète (6/6).";
        return;
    }

    // Règle 2 : pas de doublon
    let i = 0;
    while (i < team.length) {
        if (team[i].id === creature.id) {
            teamMessage.textContent = creature.name + " est déjà dans l'équipe.";
            return;
        }
        i++;
    }

    team.push(creature);
    teamMessage.textContent = creature.name + " a rejoint l'équipe.";
    displayTeam();
}

// Retire une créature de l'équipe
function removeFromTeam(id) {
    const newTeam = [];
    let removedName = "";
    let i = 0;

    while (i < team.length) {
        if (team[i].id === id) {
            removedName = team[i].name;
        } else {
            newTeam.push(team[i]);
        }
        i++;
    }

    team = newTeam;
    teamMessage.textContent = removedName + " a été retiré de l'équipe.";
    displayTeam();
}

// UN SEUL écouteur sur l'équipe (bouton "Retirer")
teamSlots.addEventListener("click", function(event) {
    const button = event.target.closest("button");

    if (button === null) {
        return;
    }

    if (button.dataset.action === "remove") {
        removeFromTeam(button.dataset.creatureId);
    }
});

// Affiche l'équipe vide au départ
displayTeam();

// ----------------- FORMULAIRE -----------------

// Get the creation form
const creatureForm = document.getElementById("creature-form");    //this
const idRegex = /^#\d{3}$/;
const nameRegex = /^[A-Za-zÀ-ÿ '-]{2,30}$/;
const idInput = creatureForm.elements["id"];
const nameInput = creatureForm.elements["name"];
const typeInput = creatureForm.elements["type"];

const typeRegex = /^(Feu|Eau|Plante|Électrik|Glace|Ténèbres|Fée)$/;
const levelRegex = /^[A-Za-zÀ-ÿ0-9 ]{2,30}$/;
const statRegex = /^\d{1,3}$/;
const imageRegex = /^https:\/\/\S+$/;
const descriptionRegex = /^[\s\S]{10,200}$/;

// Vérifie un champ : affiche le message et colore la bordure (rouge / vert)
function checkField(input, regex, message) {
    const errorMessage = input.parentElement.querySelector(".error-message");
    const isValid = regex.test(input.value.trim());

    if (isValid) {
        errorMessage.textContent = "";
        input.classList.remove("border-red-500");
        input.classList.add("border-green-500");
    } else {
        errorMessage.textContent = message;
        input.classList.remove("border-green-500");
        input.classList.add("border-red-500");
    }

    return isValid;
}

idInput.addEventListener("blur", function() {      // this
    checkField(idInput, idRegex, "Le numéro doit respecter le format #001.");
});
nameInput.addEventListener("blur", function() {                             // this
    checkField(nameInput, nameRegex, "Le nom doit contenir entre 2 et 30 lettres.");
});

// Envoi du formulaire
creatureForm.addEventListener("submit", function(event) {
    // empêche le rechargement de la page
    event.preventDefault();

    const f = creatureForm.elements;

    const results = [
        checkField(f["id"], idRegex, "Le numéro doit respecter le format #001."),
        checkField(f["name"], nameRegex, "Le nom doit contenir entre 2 et 30 lettres."),
        checkField(f["type"], typeRegex, "Choisissez un type."),
        checkField(f["level"], levelRegex, "Le niveau doit contenir entre 2 et 30 caractères."),
        checkField(f["stat1"], statRegex, "Entrez un nombre entre 0 et 999."),
        checkField(f["stat2"], statRegex, "Entrez un nombre entre 0 et 999."),
        checkField(f["stat3"], statRegex, "Entrez un nombre entre 0 et 999."),
        checkField(f["image"], imageRegex, "Le lien doit commencer par https://"),
        checkField(f["description"], descriptionRegex, "La description doit contenir entre 10 et 200 caractères.")
    ];

    // Si un seul champ est invalide, on n'ajoute rien
    if (results.includes(false)) {
        return;
    }

    // Pas deux créatures avec le même numéro
    if (findCreature(f["id"].value.trim()) !== null) {
        f["id"].parentElement.querySelector(".error-message").textContent = "Ce numéro existe déjà.";
        f["id"].classList.remove("border-green-500");
        f["id"].classList.add("border-red-500");
        return;
    }

    // Création du nouvel objet créature
    const newCreature = {
        id: f["id"].value.trim(),
        name: f["name"].value.trim(),
        type: f["type"].value,
        level: f["level"].value.trim(),
        stats: {
            hp: Number(f["stat1"].value),
            attack: Number(f["stat2"].value),
            defence: Number(f["stat3"].value)
        },
        image: f["image"].value.trim(),
        description: f["description"].value.trim()
    };

    // Ajout au tableau puis à la grille
    creatures.push(newCreature);
    filterCreatures();
    document.getElementById("creature-count").textContent = creatures.length;

    // On remet le formulaire à zéro
    creatureForm.reset();

    // On enlève les couleurs de bordure
    const fields = creatureForm.querySelectorAll("input, select, textarea");
    let k = 0;
    while (k < fields.length) {
        fields[k].classList.remove("border-red-500", "border-green-500");
        k++;
    }

    // On vide les messages d'erreur
    const errors = creatureForm.querySelectorAll(".error-message");
    k = 0;
    while (k < errors.length) {
        errors[k].textContent = "";
        k++;
    }
});