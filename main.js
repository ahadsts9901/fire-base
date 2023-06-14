let timerInterval;
Swal.fire({ title: "Loading...", html: "I will close in <b></b> milliseconds.", timer: 3e3, timerProgressBar: !0, didOpen: () => { Swal.showLoading(); const e = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => { e.textContent = Swal.getTimerLeft() }, 100) }, willClose: () => { clearInterval(timerInterval) } }).then(e => { e.dismiss, Swal.DismissReason.timer });
var firebaseConfig = { apiKey: "AIzaSyD0dJrEkEoq9hpWmjFTq4NI1bWwpgPJ40E", authDomain: "simple-database-b15ab.firebaseapp.com", projectId: "simple-database-b15ab", storageBucket: "simple-database-b15ab.appspot.com", messagingSenderId: "374723832608", appId: "1:374723832608:web:1fbfe6a876a1107a1b0545" };
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

function makeCard(e) { e.preventDefault(); var t = document.getElementById("name").value,
        a = document.getElementById("fatherName").value,
        n = document.getElementById("age").value,
        l = document.getElementById("rollNo").value,
        r = firebase.firestore.Timestamp.now().toMillis();
    db.collection("users").add({ name: t, father: a, age: n, rollNo: l, timestamp: r }).then(function(e) { let t;
        Swal.fire({ title: "Adding...", html: "I will close in <b></b> milliseconds.", timer: 1e3, timerProgressBar: !0, didOpen: () => { Swal.showLoading(); const e = Swal.getHtmlContainer().querySelector("b");
                t = setInterval(() => { e.textContent = Swal.getTimerLeft() }, 100) }, willClose: () => { clearInterval(t) } }).then(e => { e.dismiss, Swal.DismissReason.timer }), renderCards() }).catch(function(e) { console.error("Error adding document: ", e) }), document.getElementById("name").value = "", document.getElementById("fatherName").value = "", document.getElementById("age").value = "", document.getElementById("rollNo").value = "" }

function renderCards() { var e = document.querySelector(".mainContainer");
    e.style.display = "flex", e.innerHTML = "", db.collection("users").orderBy("timestamp", "asc").get().then(function(t) { 0 === t.size ? e.innerHTML = "<div class='blue'>No Users found</div>" : t.forEach(function(t) { var a = t.data(),
                n = document.createElement("div");
            n.className = "column card", e.appendChild(n); var l = document.createElement("h3");
            l.className = "pink", l.textContent = a.name, n.appendChild(l); var r = document.createElement("ul");
            n.appendChild(r); var o = document.createElement("li");
            o.className = "row-left", o.textContent = "Name: " + a.name, r.appendChild(o); var i = document.createElement("li");
            i.className = "row-left", i.textContent = "Father: " + a.father, r.appendChild(i); var s = document.createElement("li");
            s.className = "row-left", s.textContent = "Age: " + a.age, r.appendChild(s); var d = document.createElement("li");
            d.className = "row-left", d.textContent = "Roll No: " + a.rollNo, r.appendChild(d); var c = document.createElement("div");
            c.className = "row para-row", c.style.fontSize = "0.8em", c.style.marginTop = "0.5em", n.appendChild(c); var m = document.createElement("p");
            m.innerHTML = "Regards! <i>Muhammad Ahad&copy;</i>", c.appendChild(m); var u = document.createElement("i");
            u.className += " bi bi-pencil-fill buttons", u.addEventListener("click", async function(e) { e.preventDefault(); const { value: n } = await Swal.fire({ title: "Enter Your Password", input: "password", inputLabel: "Password", inputPlaceholder: "Enter Your Password", confirmButtonColor: "#0d86ff", confirmButtonText: "Submit", inputAttributes: { maxlength: 10, autocapitalize: "off", autocorrect: "off" } }); if ("48597555" === n) { let e = a.name,
                        n = a.father,
                        l = a.age,
                        r = a.rollNo; const { value: o } = await Swal.fire({ title: "Edit Student", html: `<input value="${e}" type="text" id="swal-input1" class="swal2-input nameSwal" placeholder="Name...">` + `<input value="${n}" type="text" id="swal-input2" class="swal2-input fatherSwal" placeholder="Father Name...">` + `<input value="${l}" type="number" id="swal-input3" class="swal2-input ageSwal" placeholder="Age...">` + `<input value="${r}" type="number" id="swal-input4" class="swal2-input rollNoSwal" placeholder="Roll No...">`, confirmButtonColor: "#0d86ff", confirmButtonText: "Edit", focusConfirm: !1, preConfirm: () => { const e = document.getElementById("swal-input1").value,
                                t = document.getElementById("swal-input2").value,
                                a = document.getElementById("swal-input3").value,
                                n = document.getElementById("swal-input4").value; return "" === e.trim() || "" === t.trim() || "" === a.trim() || "" === n.trim() ? (Swal.showValidationMessage("Please enter a value for each field"), !1) : [e, t, a, n] } }); if (o) { Swal.fire({ title: "Editing...", html: "I will close in <b></b> milliseconds.", timer: 3e3, timerProgressBar: !0, didOpen: () => { Swal.showLoading(); const e = Swal.getHtmlContainer().querySelector("b");
                                timerInterval = setInterval(() => { e.textContent = Swal.getTimerLeft() }, 100) }, willClose: () => { clearInterval(timerInterval) } }); let e = t.id;
                        db.collection("users").doc(e).update({ name: o[0], father: o[1], age: o[2], rollNo: o[3] }).then(() => { renderCards(), Swal.fire({ icon: "success", title: "Edited", confirmButtonText: "OK", confirmButtonColor: "#0d86ff" }) }).catch(e => { console.error("Error updating document: ", e) }) } } else Swal.fire({ icon: "error", title: "Access Denied", confirmButtonText: "OK", confirmButtonColor: "#0d86ff" }) }), c.appendChild(u); var f = document.createElement("i");
            f.className += " bi bi-trash-fill buttons", f.addEventListener("click", async function(e) { e.preventDefault(); const { value: a } = await Swal.fire({ title: "Enter Your Password", input: "password", inputLabel: "Password", inputPlaceholder: "Enter Your Password", confirmButtonColor: "#0d86ff", confirmButtonText: "Delete Card", inputAttributes: { maxlength: 10, autocapitalize: "off", autocorrect: "off" } }); "48597555" === a ? Swal.fire({ title: "Do You Want To Delete It ?", showDenyButton: !0, confirmButtonText: "Delete", denyButtonText: "Don't Delete", confirmButtonColor: "#0d86ff", denyButtonColor: "#f46856" }).then(e => { if (e.isConfirmed) { Swal.fire({ icon: "success", title: "Deleted", confirmButtonText: "OK", confirmButtonColor: "#0d86ff" }); let e = t.id;
                        db.collection("users").doc(e).delete() }
                    renderCards() }) : Swal.fire({ icon: "error", title: "Access Denied", confirmButtonText: "OK", confirmButtonColor: "#0d86ff" }) }), c.appendChild(f) }) }).catch(function(e) { console.log("Error getting documents: ", e) }) }
document.addEventListener("readystatechange", function() { "complete" === document.readyState && renderCards() });