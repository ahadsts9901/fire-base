import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { collection, addDoc, getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    databaseURL: "your-database-url",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id",
    measurementId: "your-measurement-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function makeCard(event) {
    event.preventDefault();

    let container = document.querySelector(".mainContainer");
    container.style.display = "flex";
    let name = document.querySelector("#name");
    let father = document.querySelector("#fatherName");
    let age = document.querySelector("#age");
    let rollNo = document.querySelector("#rollNo");

    let card = document.createElement("div");
    card.className += " column card";
    container.appendChild(card);

    let heading = document.createElement("h3");
    heading.className = "pink";
    heading.textContent = name.value;
    card.appendChild(heading);

    let ul = document.createElement("ul");
    card.appendChild(ul);

    let nameLi = document.createElement("li");
    nameLi.className += " row-left";
    nameLi.textContent = `Name : ${name.value}`;
    ul.appendChild(nameLi);

    let fatherLi = document.createElement("li");
    fatherLi.className += " row-left";
    fatherLi.textContent = `Father Name : ${father.value}`;
    ul.appendChild(fatherLi);

    let ageLi = document.createElement("li");
    ageLi.className += " row-left";
    ageLi.textContent = `Age : ${age.value}`;
    ul.appendChild(ageLi);

    let rollNoLi = document.createElement("li");
    rollNoLi.className += " row-left";
    rollNoLi.textContent = `SMIT Roll No : ${rollNo.value}`;
    ul.appendChild(rollNoLi);

    let para = document.createElement("p");
    para.className += " center";
    para.style.fontSize = "0.8em";
    para.style.marginTop = "0.5em";
    para.innerHTML = "Regards! <i>Muhammad Ahad&copy;</i>";
    card.appendChild(para);

    let nameDB = document.getElementById('name').value
    let fatherDB = document.getElementById('fatherName').value
    let ageDB = document.getElementById('age').value
    let rollNoDB = document.getElementById('rollNo').value

    try {
        const docRef = await addDoc(collection(db, "users"), {
            nameDB: nameDB,
            fatherDB: fatherDB,
            ageDB: ageDB,
            rollNoDB: rollNoDB
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

document.getElementById('myForm').addEventListener("submit", function(event) {
    event.preventDefault();
    makeCard(event);
});