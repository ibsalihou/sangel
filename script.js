/* =====================================================
   SANG'EL
   JAVASCRIPT
===================================================== */


/* =====================================================
   MENU MOBILE
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", function () {

    navbar.classList.toggle("active");

    const isOpen = navbar.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';

});


/* Fermer le menu après clic */

document.querySelectorAll(".navbar a").forEach(function(link) {

    link.addEventListener("click", function() {

        navbar.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

    });

});



/* =====================================================
   SIMULATEUR D'ÉLIGIBILITÉ
===================================================== */

const eligibilityForm =
    document.getElementById("eligibilityForm");

const resultDefault =
    document.getElementById("resultDefault");

const resultMessage =
    document.getElementById("resultMessage");

const resultIcon =
    document.getElementById("resultIcon");

const resultLabel =
    document.getElementById("resultLabel");

const resultTitle =
    document.getElementById("resultTitle");

const resultText =
    document.getElementById("resultText");

const nextDate =
    document.getElementById("nextDate");

const nextDateText =
    document.getElementById("nextDateText");


/* Fonction formatage date */

function formatDate(date) {

    return date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

}


/* Ajouter des mois */

function addMonths(date, months) {

    const result = new Date(date);

    result.setMonth(result.getMonth() + months);

    return result;

}


/* Formulaire */

eligibilityForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const age =
        Number(document.getElementById("age").value);

    const weight =
        Number(document.getElementById("weight").value);

    const gender =
        document.querySelector(
            'input[name="gender"]:checked'
        )?.value;

    const lastDonationValue =
        document.getElementById("lastDonation").value;


    /* Reset */

    nextDate.hidden = true;


    /* Validation */

    if (!age || age < 1 || age > 120) {

        showResult(
            "error",
            "Donnée incorrecte",
            "Veuillez saisir un âge valide."
        );

        return;

    }


    if (!weight || weight < 1 || weight > 300) {

        showResult(
            "error",
            "Poids incorrect",
            "Veuillez saisir un poids valide."
        );

        return;

    }


    if (!gender) {

        showResult(
            "error",
            "Information manquante",
            "Veuillez sélectionner votre sexe."
        );

        return;

    }


    /* =================================================
       CRITERE AGE
    ================================================= */

    if (age < 18) {

        showResult(
            "error",
            "Vous n'êtes pas éligible",
            "Le critère simplifié du challenge exige un âge d'au moins 18 ans."
        );

        return;

    }


    if (age > 65) {

        showResult(
            "error",
            "Vous n'êtes pas éligible",
            "Le critère simplifié du challenge limite l'âge à 65 ans révolus."
        );

        return;

    }


    /* =================================================
       CRITERE POIDS
    ================================================= */

    if (weight < 50) {

        showResult(
            "error",
            "Vous n'êtes pas éligible",
            "Le poids minimum retenu par le test simplifié est de 50 kg."
        );

        return;

    }


    /* =================================================
       CRITERE DERNIER DON
    ================================================= */

    if (lastDonationValue) {

        const lastDonation =
            new Date(lastDonationValue);

        const monthsRequired =
            gender === "homme" ? 3 : 4;

        const nextEligibleDate =
            addMonths(
                lastDonation,
                monthsRequired
            );

        const today = new Date();


        if (today < nextEligibleDate) {

            showResult(
                "warning",
                "Délai non encore écoulé",
                "Les critères d'âge et de poids sont respectés, mais le délai simplifié depuis votre dernier don n'est pas encore écoulé."
            );


            nextDate.hidden = false;

            nextDateText.textContent =
                formatDate(nextEligibleDate);

            return;

        }

    }


    /* =================================================
       ELIGIBLE
    ================================================= */

    showResult(
        "success",
        "Vous semblez éligible",
        "Selon les critères simplifiés du challenge, votre situation respecte les conditions d'âge, de poids et de délai."
    );

});


/* =====================================================
   AFFICHAGE RESULTAT
===================================================== */

function showResult(type, title, message) {

    resultDefault.style.display = "none";

    resultMessage.style.display = "block";


    resultTitle.textContent = title;

    resultText.textContent = message;


    /* SUCCESS */

    if (type === "success") {

        resultIcon.innerHTML =
            '<i class="fa-solid fa-circle-check"></i>';

        resultIcon.style.background =
            "#eaf8ef";

        resultIcon.style.color =
            "#198754";

        resultLabel.textContent =
            "Éligibilité indicative";

        return;

    }


    /* WARNING */

    if (type === "warning") {

        resultIcon.innerHTML =
            '<i class="fa-solid fa-clock"></i>';

        resultIcon.style.background =
            "#fff8e7";

        resultIcon.style.color =
            "#b47b00";

        resultLabel.textContent =
            "Délai à respecter";

        return;

    }


    /* ERROR */

    resultIcon.innerHTML =
        '<i class="fa-solid fa-circle-xmark"></i>';

    resultIcon.style.background =
        "#fff1f2";

    resultIcon.style.color =
        "#d71920";

    resultLabel.textContent =
        "Éligibilité indicative";

}



/* =====================================================
   CENTRES DE DON
===================================================== */


/*
    Données de prototype.

    IMPORTANT :
    Pour la version finale du challenge, vérifie
    les coordonnées, horaires et modalités directement
    auprès des structures concernées.
*/

const centers = [

    {
        name: "Antenne de transfusion sanguine",
        type: "Antenne ANTS",
        city: "Cotonou",
        address: "Zone CNHU-HKM, Cotonou",
        phone: "À vérifier auprès du centre",
        hours: "Selon les horaires du service",
        status: "open",
        donations: ["sang-total", "plasma", "plaquettes"]
    },

    {
        name: "Centre hospitalier universitaire",
        type: "Structure hospitalière",
        city: "Abomey-Calavi",
        address: "Abomey-Calavi, Atlantique",
        phone: "À vérifier auprès du centre",
        hours: "Selon le service de transfusion",
        status: "open",
        donations: ["sang-total"]
    },

    {
        name: "Antenne de transfusion sanguine",
        type: "Antenne ANTS",
        city: "Porto-Novo",
        address: "Porto-Novo, Ouémé",
        phone: "À vérifier auprès du centre",
        hours: "Selon les horaires du service",
        status: "open",
        donations: ["sang-total", "plasma"]
    },

    {
        name: "Service de transfusion sanguine",
        type: "Service hospitalier",
        city: "Ouidah",
        address: "Ouidah, Atlantique",
        phone: "À vérifier auprès du centre",
        hours: "Selon le service",
        status: "closed",
        donations: ["sang-total"]
    },

    {
        name: "Antenne de transfusion sanguine",
        type: "Antenne ANTS",
        city: "Abomey",
        address: "Abomey, Zou",
        phone: "À vérifier auprès du centre",
        hours: "Selon les horaires du service",
        status: "open",
        donations: ["sang-total", "plasma"]
    },

    {
        name: "Poste de transfusion sanguine",
        type: "Service hospitalier",
        city: "Bohicon",
        address: "Bohicon, Zou",
        phone: "À vérifier auprès du centre",
        hours: "Selon le service",
        status: "open",
        donations: ["sang-total"]
    },

    {
        name: "Antenne départementale ANTS",
        type: "Antenne ANTS",
        city: "Parakou",
        address: "Secteur ORTB, Parakou",
        phone: "+229 23 61 21 64",
        hours: "Lundi à vendredi : 08h00–12h00",
        status: "open",
        donations: ["sang-total", "plasma", "plaquettes"]
    },

    {
        name: "Service de transfusion sanguine",
        type: "Antenne régionale",
        city: "Natitingou",
        address: "Natitingou, Atacora",
        phone: "À vérifier auprès du centre",
        hours: "Selon les horaires du service",
        status: "closed",
        donations: ["sang-total", "plasma"]
    }

];



/* =====================================================
   ELEMENTS FILTRES
===================================================== */

const centersGrid =
    document.getElementById("centersGrid");

const searchCenter =
    document.getElementById("searchCenter");

const cityFilter =
    document.getElementById("cityFilter");

const donationFilter =
    document.getElementById("donationFilter");

const statusFilter =
    document.getElementById("statusFilter");

const centerCount =
    document.getElementById("centerCount");

const noResults =
    document.getElementById("noResults");

const clearFilters =
    document.getElementById("clearFilters");



/* =====================================================
   AFFICHER LES CENTRES
===================================================== */

function renderCenters(data) {

    centersGrid.innerHTML = "";


    if (data.length === 0) {

        noResults.style.display = "block";

        centerCount.textContent =
            "0 centre";

        return;

    }


    noResults.style.display = "none";


    centerCount.textContent =
        `${data.length} centre${data.length > 1 ? "s" : ""}`;


    data.forEach(function(center) {

        const card =
            document.createElement("article");

        card.className =
            "center-card";


        const statusText =
            center.status === "open"
                ? "Ouvert"
                : "Fermé";


        const statusClass =
            center.status === "open"
                ? "open"
                : "closed";


        const donationsHTML =
            center.donations
                .map(function(donation) {

                    let label = donation;

                    if (donation === "sang-total") {
                        label = "Sang total";
                    }

                    if (donation === "plasma") {
                        label = "Plasma";
                    }

                    if (donation === "plaquettes") {
                        label = "Plaquettes";
                    }

                    return `
                        <span class="donation-tag">
                            ${label}
                        </span>
                    `;

                })
                .join("");


        card.innerHTML = `

            <div class="center-top">

                <div>

                    <span class="center-type">
                        ${center.type}
                    </span>

                    <h3>
                        ${center.name}
                    </h3>

                </div>

                <span class="status ${statusClass}">
                    ${statusText}
                </span>

            </div>


            <div class="center-info">

                <div>

                    <i class="fa-solid fa-location-dot"></i>

                    <span>
                        ${center.address}
                    </span>

                </div>


                <div>

                    <i class="fa-solid fa-clock"></i>

                    <span>
                        ${center.hours}
                    </span>

                </div>


                <div>

                    <i class="fa-solid fa-phone"></i>

                    <span>
                        ${center.phone}
                    </span>

                </div>


                <div>

                    <i class="fa-solid fa-calendar-check"></i>

                    <span>
                        Accueil : selon les modalités du centre
                    </span>

                </div>

            </div>


            <div class="donation-tags">

                ${donationsHTML}

            </div>

        `;


        centersGrid.appendChild(card);

    });

}



/* =====================================================
   FILTRAGE
===================================================== */

function filterCenters() {

    const search =
        searchCenter.value
            .toLowerCase()
            .trim();

    const city =
        cityFilter.value;

    const donation =
        donationFilter.value;

    const status =
        statusFilter.value;


    const filtered =
        centers.filter(function(center) {

            const matchesSearch =
                center.name.toLowerCase().includes(search) ||
                center.city.toLowerCase().includes(search) ||
                center.address.toLowerCase().includes(search);


            const matchesCity =
                !city ||
                center.city === city;


            const matchesDonation =
                !donation ||
                center.donations.includes(donation);


            const matchesStatus =
                !status ||
                center.status === status;


            return (
                matchesSearch &&
                matchesCity &&
                matchesDonation &&
                matchesStatus
            );

        });


    renderCenters(filtered);

}


/* EVENTS */

searchCenter.addEventListener(
    "input",
    filterCenters
);

cityFilter.addEventListener(
    "change",
    filterCenters
);

donationFilter.addEventListener(
    "change",
    filterCenters
);

statusFilter.addEventListener(
    "change",
    filterCenters
);


/* RESET */

clearFilters.addEventListener(
    "click",
    function() {

        searchCenter.value = "";

        cityFilter.value = "";

        donationFilter.value = "";

        statusFilter.value = "";

        renderCenters(centers);

    }
);


/* PREMIER AFFICHAGE */

renderCenters(centers);



/* =====================================================
   RETOUR EN HAUT
===================================================== */

const backTop =
    document.getElementById("backTop");


window.addEventListener(
    "scroll",
    function() {

        if (window.scrollY > 500) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    }
);


backTop.addEventListener(
    "click",
    function() {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);
