// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD0dJrEkEoq9hpWmjFTq4NI1bWwpgPJ40E",
    authDomain: "simple-database-b15ab.firebaseapp.com",
    //   databaseURL: "https://simple-database-b15ab-default-rtdb.firebaseio.com",
    projectId: "simple-database-b15ab",
    storageBucket: "simple-database-b15ab.appspot.com",
    messagingSenderId: "374723832608",
    appId: "1:374723832608:web:1fbfe6a876a1107a1b0545",
    //   measurementId: "G-0N19V5LFCN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

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
        let nameDB = document.getElementById('name').value;
        let fatherDB = document.getElementById('fatherName').value;
        let ageDB = document.getElementById('age').value;
        let rollNoDB = document.getElementById('rollNo').value;

        // Creating a data object with the values
        let data = {
            name: nameDB,
            father: fatherDB,
            age: ageDB,
            rollNo: rollNoDB
        };

        // Adding data to Firestore collection
        await db.collection("users").add(data);
        console.log("Document added successfully");

        // Clearing input fields after successful submission
        document.getElementById('name').value = '';
        document.getElementById('fatherName').value = '';
        document.getElementById('age').value = '';
        document.getElementById('rollNo').value = '';
    } catch (data) {
        console.error("Error adding document: ", data);
    }

}