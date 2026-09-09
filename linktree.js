// --- Fonctions d'affichage ---
function addapp(image, nom, url) {
    const template = document.getElementById("template");
    const main = document.querySelector("main");

    const clone = template.content.cloneNode(true);
    const a = clone.querySelector("a");
    const img = a.querySelector("img");
    const h1 = a.querySelector("h1");

    a.href = url;
    img.src = image;
    img.style.height = "2rem";
    img.style.width = "2rem";
    h1.textContent = nom;

    main.appendChild(clone);
}

function addContactButton(email) {
    const main = document.querySelector("main");
    const button = document.createElement("a");
    button.className = "app";
    button.href = `mailto:${email}`;
    button.textContent = "Contact-me";
    main.appendChild(button);
}

function addbackground(image, nombre) {
    const background = document.getElementById("background");

    function createBalloon(initial) {
        const img = document.createElement("img");
        img.src = image;

        const taille = Math.floor(Math.random() * 100) + 50;
        const y = Math.floor(Math.random() * 100);
        const spinDuree = Math.floor(Math.random() * 2) + 1;
        const driftDuree = Math.floor(Math.random() * 10) + 10;
        const driftDelai = initial
            ? Math.floor(Math.random() * -driftDuree)
            : 0;

        img.style.width = taille + "px";
        img.style.height = taille + "px";
        img.style.top = y + "%";
        img.style.setProperty("--spin-duree", spinDuree + "s");
        img.style.setProperty("--drift-duree", driftDuree + "s");
        img.style.animationDelay = driftDelai + "s";

        img.addEventListener("click", () => {
            img.style.left = getComputedStyle(img).left;

            const angle = Math.random() * Math.PI * 2;
            const kick = 70;
            img.style.setProperty("--kx", Math.cos(angle) * kick + "px");
            img.style.setProperty("--ky", Math.sin(angle) * kick + "px");

            img.classList.add("tapped");
            img.addEventListener("animationend", () => {
                img.remove();
                setTimeout(() => createBalloon(false), 800 + Math.random() * 1200);
            }, { once: true });
        });

        background.appendChild(img);
    }

    for (let i = 0; i < nombre; i++) createBalloon(true);
}

// --- Exécution synchrone ---
appsData.forEach(app => addapp(app.image, app.nom, app.url));
addContactButton(contactData.email);
addbackground("mikasa.png", 12);

// --- Pop-up volley ---
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");
const popupBtns = document.getElementById("popup-btns");

function setPopup(texte, boutons) {
    popupText.textContent = texte;
    popupBtns.innerHTML = "";
    boutons.forEach(({ label, onClick }) => {
        const btn = document.createElement("button");
        btn.textContent = label;
        btn.addEventListener("click", onClick);
        popupBtns.appendChild(btn);
    });
    popup.classList.remove("hide");
}

function showVolley() {
    setPopup("Tu aimes le volley ?", [
        {
            label: "Oui",
            onClick: () => {
                popup.classList.add("hide");
                setTimeout(showInscription, 250);
            },
        },
        {
            label: "Non",
            onClick: () => {
                popup.classList.add("hide");
                setTimeout(showVolley, 1000);
            },
        },
    ]);
}

function showInscription() {
    setPopup("Alors inscris-toi", [
        {
            label: "Ok tout de suite",
            onClick: () => {
                popup.classList.add("hide");
            },
        },
        {
            label: "Plus tard",
            onClick: () => {
                popup.classList.add("hide");
                setTimeout(showInscription, 1000);
            },
        },
    ]);
}

showVolley();