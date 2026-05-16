let startPage = document.querySelector("#startPage");
let navBar = document.querySelector("#navBar");
let pokemonGrid = document.querySelector("#pokemonGrid");
let gymCardContainer = document.querySelector("#gymCardContainer")
let chosenGen = seasons[0];
let gymPage = document.querySelector("#gymPage");

const pokemonPage = document.getElementById("pokemon-page");
const pokemonPicture = document.getElementById("pokemon-picture");
const pokemonLabelsContainer = document.getElementById("labels-container");
const pokemonNameLabel = document.getElementById("pokemon-name-label");
const pokemonGenLabel = document.getElementById("generation-label");
const trainerNameLabel = document.getElementById("trainer-name-label");
const trainerSkillLabel = document.getElementById("trainer-skill-label");

numberOfSeason = seasons.length;
let currentGen = seasons;

//STARTSIDA
//Skapa navBar 
seasons.forEach((generation, index) => {
    //Loopar igenom alla säsonger och bygger själva knappen. Använder forEach så att jag kan använda index.
    let genButton = document.createElement("button");
    genButton.textContent = `Gen ${generation.year + 1}`
    navBar.appendChild(genButton)

    genButton.addEventListener("click", () => {
        chosenGen = seasons[index];
        currentGen = [chosenGen];
        renderPokemonGrid(chosenGen);
    })
    //console.log(generation, index)
})

//Skapa gym korten. Funkar nästan exakt som funktionen nedan.
disciplines.forEach((gym) => {
    let gymCard = document.createElement("div");
    let gymImage = document.createElement("img");
    let gymName = document.createElement("p");
    gymCard.classList.add("gymCards");
    gymImage.classList.add("gymImages");
    gymName.classList.add("gymNames");

    //Append
    gymCardContainer.appendChild(gymCard);
    gymCard.appendChild(gymImage);
    gymCard.appendChild(gymName);

    gymImage.src = gym.image;
    gymName.textContent = gym.gymName;
    gymName.style.backgroundColor = gym.color;

    //Event listener
    gymCard.addEventListener("click", () => {
        renderGymPage(gym)
        //Här kanske man anropar någon funktion.
        //Kan till exempel stå renderGymPage(gym);
    })
})

//Skapade funktionen lite i efterhand för jag insåg att det blir mindre kod att bara anropa denna
//funktion när man ska bygga själva griden.
function createPokemonCards(pokemonArray) {
    pokemonGrid.innerHTML = "";
    pokemonArray.forEach((pokemon) => {
        //Skapar tre element för varje itteration
        let pokemonCard = document.createElement("div");
        let pokemonImg = document.createElement("img");
        let pokemonName = document.createElement("p");
        pokemonCard.classList.add("pokemonCard");
        pokemonImg.classList.add("pokemonCardImage");
        pokemonName.classList.add("pokemonName");

        //Appendar alla
        pokemonGrid.appendChild(pokemonCard);
        pokemonCard.appendChild(pokemonImg);
        pokemonCard.appendChild(pokemonName);
        console.log(pokemon);

        //Hämtar en url från funktionen getPokemonImageUrl och lägger in the på image soruce.
        let imageUrl = getPokemonImageUrl(pokemon.dexNumber);
        pokemonImg.src = imageUrl;
        pokemonName.textContent = pokemon.pokemonName;

        pokemonCard.addEventListener("click", function () {
            startPage.style.display = "none";
            pokemonPage.style.display = "flex";
            pokemonPicture.style.backgroundImage = `url(${imageUrl})`;

            renderPokemonPage(pokemon);
        })
    })
}


//Funktion för att göra om siffran till en sträng och sedan retunera url som vi hämtar pokemon namn + bild.
function getPokemonImageUrl(dexNumber) {
    let number = dexNumber.toString();
    //Kolla upp padStart om ni inte kan, väldigt simpelt. Jag anger bara att strängen ska max vara 4 tecken lång och fylla i med nollor tills det blir det.
    number = number.padStart(4, `0`);
    let url = `https://raw.githubusercontent.com/PMDCollab/SpriteCollab/master/portrait/${number}/Normal.png`
    return url
}

//Funktion som uppdaterar pokemon griden utefter vilken generation som är vald. Tar emot en 
//generation som argument. Tillexempel när användaren klickar på en generation så kommer denna att
//anropas.
function renderPokemonGrid(gen) {
    //Kollar om gen är null, om true så visar griden alla pokemons.
    if (gen === null) {
        createPokemonCards(participants);
    } else {
        //Mappar denna generations pokemons och skapar då en ny arrat med alla aktivas id
        let pokemonIdArray = gen.coaches.map((coach) => coach.participantId);
        console.log(pokemonIdArray)
        //Filtrerar participants för att se vilka id:en som matchar och retunerar en ny array med
        //alla pokemons där vilkoret uppfylls.
        let thisGenPokemons = participants.filter((pokemon) => pokemonIdArray.includes(pokemon.id));
        console.log(thisGenPokemons);
        createPokemonCards(thisGenPokemons);
    }
}

renderPokemonGrid(null);
// Detta är sebbes branch


























































































function renderPokemonPage(pokemon) {
    pokemonNameLabel.textContent = pokemon.pokemonName;

    const getCurrentGenNumber = currentGen.length === 1 ? currentGen.map(g => g.year + 1) : NaN; //Kollar först om vi valt en generation, då blir currentGen.length 1. Om vi inte valt någon generation visas alla vilket resulterar i att inget unikt number valts (därmed Not a Number)
    pokemonGenLabel.textContent = getCurrentGenNumber ? `Generation ${getCurrentGenNumber}` : "All Generations";
    /*   const currentCoachesId = currentGen.map(g => g.coaches.find(c => c.participantId === pokemon.id)).map(p => p.coachId);
      console.log(currentCoachesId)
      const coachNames = currentCoachesId.map(coach => coaches.find(c => c.id === coach)).map(c => c.name); */
    const currentTrainersId = currentGen.map(g => g.trainers.find(t => t.participantId === pokemon.id)).filter(t => t != undefined).map(t => t.trainerId);
    const trainerNames = currentTrainersId.map(trainer => trainers.find(t => t.id === trainer)).map(t => t.name);
    const amountOfTrainers = trainerNames.length;
    trainerNames.forEach(name => {
        const div = document.createElement("div");
        div.classList.add("label");
        div.classList.add("trainer-label")
        div.textContent = name;
        pokemonLabelsContainer.append(div);
    })
}
