import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js';
import { set, get, remove, getDatabase, ref, child } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js';

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
const dbRef = ref(db);

async function onLoad() {
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

    const buttonLineDiv = document.createElement("div");
    buttonLineDiv.setAttribute("class", "button-line");
    const div1 = document.createElement("div");
    const img1 = document.createElement("img");
    img1.setAttribute("src", "icons/edit.svg");
    div1.appendChild(img1);
    div1.onclick = function() {
        setFields(cache);
        openForm();
    };

    const div2 = document.createElement("div");
    const img2 = document.createElement("img");
    img2.setAttribute("src", "icons/trash-2.svg");
    div2.appendChild(img2);
    div2.onclick = function() {
        removeCache(cache.title);
    };

    buttonLineDiv.appendChild(div1);
    buttonLineDiv.appendChild(div2);

    cardDiv.appendChild(buttonLineDiv);

    document.getElementById("cards").appendChild(cardDiv);
    document.getElementById("addButton").onclick = function() {
        openForm();
    }
    document.getElementById("closeButton").onclick = function() {
        closeForm();
    }

    document.getElementById("saveButton").onclick = function() {
        addCache();
        console.log("Saved");
    }
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

function addCache() {
    // can be used for both edit and add
    set(child(dbRef, `cache/${document.getElementById("titleInput").value}`), {
        coords: document.getElementById("coordinatesInput").value,
        desc: document.getElementById("descriptionInput").value,
        id: -1,
        imageID: document.getElementById("imageInput").value,
        title: document.getElementById("titleInput").value
    });
    updateUI();
}

function removeCache(cacheTitle) {
    remove(child(dbRef, `cache/${cacheTitle}`)).then(() => {
        console.log("Cache removed.");
    }).catch((error) => {
        console.error(error);
    });
    updateUI();
}

function updateUI() {
    // build individual card?
    document.getElementById("cards").innerHTML = "";
    onLoad();

}

function setFields(cache) {
    document.getElementById("imageInput").value = cache.imageID;
    document.getElementById("titleInput").value = cache.title;
    document.getElementById("descriptionInput").value = cache.desc;
    document.getElementById("coordinatesInput").value = cache.coords;
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
  document.getElementById("addButton").style.display = "none";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  document.getElementById("addButton").style.display = "block";
  document.getElementById("imageInput").value = "";
  document.getElementById("titleInput").value = "";
  document.getElementById("descriptionInput").value = "";
  document.getElementById("coordinatesInput").value = "";
}

onLoad();