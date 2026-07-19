const reisebeginn = new Date("2026-08-02");
const heute = new Date();

const diff = reisebeginn - heute;

const tage = Math.ceil(diff / (1000*60*60*24));

document.getElementById("countdown").innerHTML = tage + " Tage";

const heuteTitel = document.getElementById("todayTitle");
const heuteText = document.getElementById("todayText");

if(tage>0){

heuteTitel.innerHTML="Vorfreude";

heuteText.innerHTML=
"In wenigen Tagen startet euer Dänemark-Abenteuer 🇩🇰";

}
else{

heuteTitel.innerHTML="Urlaub";

let datum = new Date();

let tag = datum.getDate();
let monat = datum.getMonth()+1;


let heutePlan = "";


if(tag==2 && monat==8){

heutePlan="🚗 Anreise Soest → Dragør<br>⛴️ Fähre Puttgarden → Rødby";

}

else if(tag==3 && monat==8){

heutePlan="⚓ Dragør entdecken<br>🌊 Hafen, Altstadt & Strand";

}

else if(tag==4 && monat==8){

heutePlan="🇩🇰 Kopenhagen Tag 1<br>Nyhavn, Schlösser & Altstadt";

}

else if(tag==5 && monat==8){

heutePlan="🇸🇪 Ystad & Malmö<br>🚗 Tagesausflug mit dem Auto";

}

else if(tag==6 && monat==8){

heutePlan="🏰 Kopenhagen Tag 2<br>Schlösser & Genuss";

}

else if(tag==7 && monat==8){

heutePlan="🌊 Dragør Strand & Erholung";

}

else if(tag==8 && monat==8){

heutePlan="🌊 Klippen oder Schloss-Ausflug";

}

else{

heutePlan="Genießt euren Urlaub in Dragør 🇩🇰";

}


heuteText.innerHTML=heutePlan;



}

function openPage(page){



    document.querySelectorAll(".page").forEach(function(p){

        p.classList.remove("active");

    });


    document.getElementById(page).classList.add("active");

    if(page=="map" && !karte){

    setTimeout(karteStarten,100);

}

}
let startBudget = 1000;

let ausgaben = JSON.parse(localStorage.getItem("ausgaben")) || [];

let budget = startBudget - 
ausgaben.reduce((summe, ausgabe) => summe + ausgabe.betrag, 0);


function ausgabeHinzufuegen(){

    let kategorie = document.getElementById("kategorie").value;

    let betrag = Number(document.getElementById("betrag").value);


    if(betrag <= 0){
        alert("Bitte einen Betrag eingeben");
        return;
    }


    ausgaben.push({
        kategorie:kategorie,
        betrag:betrag
    });
localStorage.setItem(
    "ausgaben",
    JSON.stringify(ausgaben)
);

    budget = budget - betrag;


   budget = startBudget -
ausgaben.reduce((summe, ausgabe) => summe + ausgabe.betrag, 0);

document.getElementById("restBudget").innerHTML =
budget + " €";


    let liste = document.getElementById("ausgaben");


    let eintrag = document.createElement("li");

    eintrag.innerHTML =
    kategorie + ": " + betrag + " €";


    liste.appendChild(eintrag);


    document.getElementById("betrag").value="";

}
// 🗺️ Reisekarte

let karte;


function karteStarten(){

    karte = L.map("karte").setView([55.55, 12.55], 9);


    L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
            '&copy; OpenStreetMap'
        }
    ).addTo(karte);



    L.marker([55.59, 12.67])
    .addTo(karte)
    .bindPopup(
        "<b>🇩🇰 Dragør</b><br>Unser Urlaubsort<br>Hafen & Altstadt"
    );



    L.marker([55.6761, 12.5683])
    .addTo(karte)
    .bindPopup(
        "<b>🇩🇰 Kopenhagen</b><br>Nyhavn, Schlösser & Innenstadt"
    );



    L.marker([55.6050, 13.0038])
    .addTo(karte)
    .bindPopup(
        "<b>🇸🇪 Malmö</b><br>Tagesausflug am Abend"
    );



    L.marker([55.4295, 13.8200])
    .addTo(karte)
    .bindPopup(
        "<b>🇸🇪 Ystad</b><br>Altstadt & Hafen"
    );



    L.marker([55.2820, 12.4480])
    .addTo(karte)
    .bindPopup(
        "<b>🌊 Stevns Klint</b><br>Kreidefelsen & Küste"
    );



    L.marker([54.9600, 12.5500])
    .addTo(karte)
    .bindPopup(
        "<b>🌊 Møns Klint</b><br>Großes Naturerlebnis"
    );

}
// 📸 Reisetagebuch

let tagebuch = JSON.parse(localStorage.getItem("tagebuch")) || [];


function tagebuchSpeichern(){

    let titel =
    document.getElementById("tagebuchTitel").value;


    let text =
    document.getElementById("tagebuchText").value;


    let datei =
    document.getElementById("tagebuchBild").files[0];


    if(titel=="" || text==""){
        alert("Bitte Titel und Text eingeben");
        return;
    }


    if(datei){

        let reader = new FileReader();


        reader.onload = function(){

            speichereEintrag(
                titel,
                text,
                reader.result
            );

        };


        reader.readAsDataURL(datei);


    }
    else{

        speichereEintrag(
            titel,
            text,
            ""
        );

    }

}



function speichereEintrag(titel,text,bild){


   tagebuch.push({

    titel:titel,
    text:text,
    bild:bild,
    favorit:false

});


    localStorage.setItem(
        "tagebuch",
        JSON.stringify(tagebuch)
    );


    zeigeTagebuch();


    document.getElementById("tagebuchTitel").value="";
    document.getElementById("tagebuchText").value="";

}



function zeigeTagebuch(){

    let liste = document.getElementById("tagebuchListe");

    if(!liste){
        return;
    }


    liste.innerHTML="";


    tagebuch.forEach(function(eintrag,index){


        let box = document.createElement("div");


        box.className="card";


        let bildHTML="";


if(eintrag.bild){

    bildHTML=
    "<img src='"+eintrag.bild+"' style='width:100%; border-radius:15px;'>";

}


box.innerHTML=

"<h3>⭐ "+eintrag.titel+"</h3>"+
bildHTML+
"<p>"+eintrag.text+"</p>"+
"<button onclick='tagebuchLoeschen("+index+")'>🗑️ Löschen</button>";
box.innerHTML=

"<h3>"+(eintrag.favorit ? "⭐ " : "")+eintrag.titel+"</h3>"+
bildHTML+
"<p>"+eintrag.text+"</p>"+
"<button onclick='favoritSetzen("+index+")'>⭐ Highlight</button> "+
"<button onclick='tagebuchLoeschen("+index+")'>🗑️ Löschen</button>";

        liste.appendChild(box);


    });

}


zeigeTagebuch();
function tagebuchLoeschen(index){

    tagebuch.splice(index,1);


    localStorage.setItem(
        "tagebuch",
        JSON.stringify(tagebuch)
    );


    zeigeTagebuch();

}
function favoritSetzen(index){

    tagebuch[index].favorit =
    !tagebuch[index].favorit;


    localStorage.setItem(
        "tagebuch",
        JSON.stringify(tagebuch)
    );


    zeigeTagebuch();

}
if ("serviceWorker" in navigator) {

    navigator.serviceWorker
        .register("service-worker.js")
        .then(() => console.log("Service Worker registriert"))
        .catch(err => console.log(err));

}