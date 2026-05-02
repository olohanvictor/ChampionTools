import { Pokedex } from "../data/pokedex";
import { Natures } from "../data/natures";

const BTNSEARCH = document.getElementById("btnSearch") as HTMLButtonElement;
const INPUTSEARCHPKM = document.getElementById("pokeNameInput") as HTMLInputElement;
const SELECT_NATURE = document.getElementById("natureSelect") as HTMLSelectElement;
const TOTAL_DISPLAY = document.getElementById("totalPointsDisplay") as HTMLParagraphElement;


const INP_HP = document.getElementById("hpPoints") as HTMLInputElement;
const INP_ATK = document.getElementById("atkPoints") as HTMLInputElement;
const INP_DEF = document.getElementById("defPoints") as HTMLInputElement;
const INP_SPA = document.getElementById("spaPoints") as HTMLInputElement;
const INP_SPD = document.getElementById("spdPoints") as HTMLInputElement;
const INP_SPE = document.getElementById("spePoints") as HTMLInputElement;

const RES_HP = document.getElementById("resultHp") as HTMLSpanElement;
const RES_ATK = document.getElementById("resultAtk") as HTMLSpanElement;
const RES_DEF = document.getElementById("resultDef") as HTMLSpanElement;
const RES_SPA = document.getElementById("resultSpa") as HTMLSpanElement;
const RES_SPD = document.getElementById("resultSpd") as HTMLSpanElement;
const RES_SPE = document.getElementById("resultSpe") as HTMLSpanElement;

// Variável pra guardar o Pokémon que foi buscado
let currentPokemon: any = null;

//POPULAR AS NATURES NO SELECT
Object.keys(Natures).forEach(key => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = (Natures as any)[key].name;
    SELECT_NATURE.appendChild(option);
});

//Calculo de Stats
const updateCalculation = () => {
    // Se não buscou um pokémon ainda, não faz nada
    if (!currentPokemon) return;

    // 1. Pegar valores dos inputs de pontos (Garante que se tiver vazio vira 0)
    const pHP = Number(INP_HP.value) || 0;
    const pATK = Number(INP_ATK.value) || 0;
    const pDEF = Number(INP_DEF.value) || 0;
    const pSPA = Number(INP_SPA.value) || 0;
    const pSPD = Number(INP_SPD.value) || 0;
    const pSPE = Number(INP_SPE.value) || 0;

    // 2. Checar limite de 66 pontos
    const total = pHP + pATK + pDEF + pSPA + pSPD + pSPE;
    TOTAL_DISPLAY.textContent = `Total Points: ${total} / 66`;

    if (total > 66) {
        TOTAL_DISPLAY.style.color = "red";
        TOTAL_DISPLAY.style.fontWeight = "bold";
    } else {
        TOTAL_DISPLAY.style.color = "unset";
        TOTAL_DISPLAY.style.fontWeight = "normal";
    }

    // 3. Pegar bônus da Natureza
    const natureKey = SELECT_NATURE.value;
    const nature = (Natures as any)[natureKey];

    // --- CÁLCULOS INDIVIDUAIS ---

    // HP: Base + 75 + Pontos
    RES_HP.textContent = (currentPokemon.baseStats.hp + 75 + pHP).toString();

    // ATK
    let modAtk = 1.0;
    if (nature.plus === "atk") modAtk = 1.1;
    if (nature.minus === "atk") modAtk = 0.9;
    RES_ATK.textContent = Math.floor((currentPokemon.baseStats.atk + 20 + pATK) * modAtk).toString();

    // DEF
    let modDef = 1.0;
    if (nature.plus === "def") modDef = 1.1;
    if (nature.minus === "def") modDef = 0.9;
    RES_DEF.textContent = Math.floor((currentPokemon.baseStats.def + 20 + pDEF) * modDef).toString();

    // SPA
    let modSpa = 1.0;
    if (nature.plus === "spa") modSpa = 1.1;
    if (nature.minus === "spa") modSpa = 0.9;
    RES_SPA.textContent = Math.floor((currentPokemon.baseStats.spa + 20 + pSPA) * modSpa).toString();

    // SPD
    let modSpd = 1.0;
    if (nature.plus === "spd") modSpd = 1.1;
    if (nature.minus === "spd") modSpd = 0.9;
    RES_SPD.textContent = Math.floor((currentPokemon.baseStats.spd + 20 + pSPD) * modSpd).toString();

    // SPE
    let modSpe = 1.0;
    if (nature.plus === "spe") modSpe = 1.1;
    if (nature.minus === "spe") modSpe = 0.9;
    RES_SPE.textContent = Math.floor((currentPokemon.baseStats.spe + 20 + pSPE) * modSpe).toString();
};

// --- EVENTOS ---

// Quando clica em Search
BTNSEARCH.addEventListener("click", () => {
    const pokemonName = INPUTSEARCHPKM.value.toLowerCase().replace(/[^a-z0-9]/g, "");
    currentPokemon = (Pokedex as any)[pokemonName];

    if (currentPokemon) {
        updateCalculation();
    } else {
        alert("Pokémon not found!");
    }
});
