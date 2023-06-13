//sweet alert

let timerInterval
Swal.fire({
    title: 'Loading...',
    html: 'I will close in <b></b> milliseconds.',
    timer: 3000,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
        }, 100)
    },
    willClose: () => {
        clearInterval(timerInterval)
    }
}).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
        // console.log('I was closed by the timer')
    }
})

// code start

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
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
var db = firebase.firestore();

function makeCard(event) {
    event.preventDefault();

    var nameDB = document.getElementById("name").value;
    var fatherDB = document.getElementById("fatherName").value;
    var ageDB = document.getElementById("age").value;
    var rollNoDB = document.getElementById("rollNo").value;
    var timestamp = firebase.firestore.Timestamp.now().toMillis();

    db.collection("users")
        .add({
            name: nameDB,
            father: fatherDB,
            age: ageDB,
            rollNo: rollNoDB,
            timestamp: timestamp
        })
        .then(function(docRef) {
            //sweet alert

            let timerInterval
            Swal.fire({
                title: 'Adding...',
                html: 'I will close in <b></b> milliseconds.',
                timer: 1000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    // console.log('I was closed by the timer')
                }
            })
            console.log("Document added successfully. ID:", docRef.id);
            renderCards(); // Call renderCards after adding the document
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });

    document.getElementById("name").value = ""
    document.getElementById("fatherName").value = ""
    document.getElementById("age").value = ""
    document.getElementById("rollNo").value = ""
}


function renderCards() {
    var container = document.querySelector(".mainContainer");
    container.style.display = "flex";
    container.innerHTML = "";

    db.collection("users")
        .orderBy("timestamp", "asc") //sort by time
        .get()
        .then(function(querySnapshot) {
            if (querySnapshot.size === 0) {
                container.innerHTML = "<div class='blue'>No Users found</div>";
            } else {
                querySnapshot.forEach(function(doc) {
                    var data = doc.data();

                    var card = document.createElement("div");
                    card.className = "column card";
                    container.appendChild(card);

                    var heading = document.createElement("h3");
                    heading.className = "pink";
                    heading.textContent = data.name;
                    card.appendChild(heading);

                    var ul = document.createElement("ul");
                    card.appendChild(ul);

                    var nameLi = document.createElement("li");
                    nameLi.className = "row-left";
                    nameLi.textContent = "Name: " + data.name;
                    ul.appendChild(nameLi);

                    var fatherLi = document.createElement("li");
                    fatherLi.className = "row-left";
                    fatherLi.textContent = "Father: " + data.father;
                    ul.appendChild(fatherLi);

                    var ageLi = document.createElement("li");
                    ageLi.className = "row-left";
                    ageLi.textContent = "Age: " + data.age;
                    ul.appendChild(ageLi);

                    var rollNoLi = document.createElement("li");
                    rollNoLi.className = "row-left";
                    rollNoLi.textContent = "Roll No: " + data.rollNo;
                    ul.appendChild(rollNoLi);

                    var para = document.createElement("div");
                    para.className = "row para-row";
                    para.style.fontSize = "0.8em";
                    para.style.marginTop = "0.5em";
                    card.appendChild(para);

                    var description = document.createElement("p")
                        // description.className += " center"
                    description.innerHTML = "Regards! <i>Muhammad Ahad&copy;</i>";
                    para.appendChild(description)

                    var edit = document.createElement("i")
                    edit.className += " bi bi-pencil-fill buttons"
                    edit.addEventListener("click", editDoc)
                    para.appendChild(edit)

                    var del = document.createElement("i")
                    del.className += " bi bi-trash-fill buttons"
                    del.addEventListener("click", delDoc)
                    para.appendChild(del)

                    //delete function

                    async function delDoc(event) {
                        event.preventDefault();
                        console.log("delete function detected");

                        const { value: password } = await Swal.fire({
                            title: 'Enter your password',
                            input: 'password',
                            inputLabel: 'Password',
                            inputPlaceholder: 'Enter your password',
                            confirmButtonColor: "#0d86ff",
                            confirmButtonText: "Delete Card",
                            inputAttributes: {
                                maxlength: 10,
                                autocapitalize: 'off',
                                autocorrect: 'off'
                            },
                            showCancelButton: true,
                            cancelButtonText: 'Cancel'
                        });

                        if (password) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Wrong Password!',
                                footer: 'Please Enter Correct Password!',
                                confirmButtonColor: "#0d86ff",
                                confirmButtonText: "OK"
                            });
                        }
                    }

                    //edit function

                    async function editDoc(event) {
                        event.preventDefault();
                        console.log("delete function detected");

                        const { value: password } = await Swal.fire({
                            title: 'Enter your password',
                            input: 'password',
                            inputLabel: 'Password',
                            inputPlaceholder: 'Enter your password',
                            confirmButtonColor: "#0d86ff",
                            confirmButtonText: " Submit",
                            inputAttributes: {
                                maxlength: 10,
                                autocapitalize: 'off',
                                autocorrect: 'off'
                            },
                            showCancelButton: true,
                            cancelButtonText: 'Cancel'
                        });

                        if (password) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Wrong Password!',
                                footer: 'Please Enter Correct Password!',
                                confirmButtonColor: "#0d86ff",
                                confirmButtonText: "OK"
                            });
                        }
                    }

                });
            }
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
}

document.addEventListener("readystatechange", function() {
    if (document.readyState === "complete") {
        renderCards();
    }
});