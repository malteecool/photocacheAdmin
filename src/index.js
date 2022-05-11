import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js';
import { get, getDatabase, ref, child } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyCqnYvcans3bXosGh9k24hruUv0LKGHq8U",
    authDomain: "photocache-fc3d8.firebaseapp.com",
    databaseURL: "https://photocache-fc3d8.firebaseio.com",
    projectId: "photocache-fc3d8",
    storageBucket: "photocache-fc3d8.appspot.com",
    messagingSenderId: "325834001642",
    appId: "1:325834001642:web:82eea001a887c73fd81b93",
    measurementId: "G-G6JYQBC5KJ"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function onLoad() {
    const dbRef = ref(db);
    get(child(dbRef, 'cache')).then((snapshot) => {
        if (snapshot.exists()) {
            for(let x in snapshot.val()) {
                var child = snapshot.child(x);
                console.log(child.val());
                fillCacheData(child.val());
            }
        }
        else {
            console.log("Wrong path or no data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}


function fillCacheData(cache) {

    const cardDiv = document.createElement("div");

    cardDiv.appendChild(buildCardImage(cache.imageID));
    cardDiv.appendChild(buildCardTitle(cache.title));
    cardDiv.appendChild(buildCardDescription(cache.desc));
    cardDiv.setAttribute("onclick", "location.href='details.html'");
    cardDiv.setAttribute("class", "cardDivInner");

    const cardDivOuter = document.createElement("div");
    cardDivOuter.setAttribute("class", "card");
    cardDivOuter.appendChild(cardDiv);
    cardDivOuter.appendChild(buildButtonLine());

    const contentDiv = document.getElementById("cards").appendChild(cardDivOuter);
}

function buildCardImage(ImageId) {
    // To be updated with the correct image.
    const cardImage = document.createElement("img");
    cardImage.setAttribute("class", "card-image");
    cardImage.setAttribute("src", "placeholder.png");
    cardImage.setAttribute("width", "200px");
    cardImage.setAttribute("height", "200px");
    return cardImage;
}

function buildCardTitle(title) {
    const cardTitle = document.createElement("p");
    cardTitle.setAttribute("class", "card-title");
    cardTitle.appendChild(document.createTextNode(title));
    return cardTitle;
}

function buildCardDescription(desc) {
    const cardDescription = document.createElement("p");
    cardDescription.setAttribute("class", "card-desc");
    cardDescription.appendChild(document.createTextNode(desc));
    return cardDescription;
}

function buildButtonLine() {
    // Update for a pic later

    const buttonLineDiv = document.createElement("div");
    buttonLineDiv.setAttribute("class", "button-line");

    const cardButtonRemove = document.createElement("button");
    cardButtonRemove.appendChild(document.createTextNode("Remove"));
    cardButtonRemove.setAttribute("onclick", "#");

    buttonLineDiv.appendChild(cardButtonRemove);

    return buttonLineDiv;
}

onLoad();