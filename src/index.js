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
            for (let x in snapshot.val()) {
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
    cardDiv.setAttribute("class", "card");

    const cardInnerDiv = document.createElement("div");
    cardInnerDiv.setAttribute("class", "inner-div");

    cardInnerDiv.appendChild(buildCardImage(cache.ImageId));
    cardInnerDiv.appendChild(buildCardTitle(cache.title));
    cardInnerDiv.appendChild(buildCardDescription(cache.desc));

    cardDiv.appendChild(cardInnerDiv);

    // buttonline

    // div button line

    const buttonLineDiv = document.createElement("div");
    buttonLineDiv.setAttribute("class", "button-line");

    const div1 = document.createElement("div");
    const link1 = document.createElement("a");
    link1.setAttribute("href", "#");
    const img1 = document.createElement("img");
    img1.setAttribute("src", "icons/edit.svg");
    link1.appendChild(img1);
    div1.appendChild(link1);
    
    const div2 = document.createElement("div");
    const link2 = document.createElement("a");
    link2.setAttribute("href", "#");
    const img2 = document.createElement("img");
    img2.setAttribute("src", "icons/trash-2.svg");
    link2.appendChild(img2);
    div2.appendChild(link2);

    buttonLineDiv.appendChild(div1);
    buttonLineDiv.appendChild(div2);

    cardDiv.appendChild(buttonLineDiv);

    document.getElementById("cards").appendChild(cardDiv);


}

function buildCardImage(ImageId) {
    // To be updated with the correct image.
    const cardImage = document.createElement("img");
    cardImage.setAttribute("class", "card-image");
    cardImage.setAttribute("src", "icons/placeholder.png");
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
    const buttonLineDiv = document.createElement("div");
    buttonLineDiv.setAttribute("class", "button-line");

    const editButton = document.createElement("a");
    editButton.setAttribute("href", "details.html");
    const editIcon = document.createElement("img");
    editIcon.setAttribute("src", "icons/edit.svg");
    editIcon.setAttribute("alt", "Edit");
    editButton.appendChild(editIcon);

    const removeButton = document.createElement("a");
    removeButton.setAttribute("href", "#");
    const removeIcon = document.createElement("img");
    removeIcon.setAttribute("src", "icons/trash-2.svg");
    removeIcon.setAttribute("alt", "Remove");
    removeButton.appendChild(removeIcon);


    buttonLineDiv.appendChild(editButton);
    buttonLineDiv.appendChild(removeButton);

    return buttonLineDiv;
}




onLoad();