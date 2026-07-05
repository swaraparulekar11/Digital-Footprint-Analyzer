const form = document.getElementById("footprintform");
const score = document.getElementById("score");
const riskLevel = document.getElementById("riskLevel");
const analysisList = document.getElementById("analysis-list");
const recommendationList = document.getElementById("recommendationList");
form.addEventListener("submit", analyzeFootprint);
function analyzeFootprint(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    console.log(name);
    console.log(email);
    console.log(username);
    let risk = 0;
    analysisList.innerHTML = "";
    recommendationList.innerHTML = "";
    if (
        username.includes("0") ||
        username.includes("1") ||
        username.includes("2") ||
        username.includes("3") ||
        username.includes("4") ||
        username.includes("5") ||
        username.includes("6") ||
        username.includes("7") ||
        username.includes("8") ||
        username.includes("9")
    ) {
        risk += 10;
        const li = document.createElement("li");
        li.textContent = "Username contains numbers. If they represent your birth year or birth date, they may reveal personal information.";
        analysisList.appendChild(li);
        const rec = document.createElement("li");
        rec.textContent = "Avoid using your birth year or other personal numbers in your username.";
        recommendationList.appendChild(rec);
    }
    const firstName = name.split(" ")[0];
    const lastName = name.split(" ")[1];
    if (
        username.toLowerCase().includes(firstName.toLowerCase()) || username.toLowerCase().includes(lastName.toLowerCase())
    ) {
        risk += 20;
        const li = document.createElement("li");
        li.textContent = "Username contains your name.";
        analysisList.appendChild(li);
        const rec = document.createElement("li");
        rec.textContent = "Avoid using your name in your username.";
        recommendationList.appendChild(rec);
    }
    if (username.length < 6) {
        risk += 10;
        const li = document.createElement("li");
        li.textContent = "Username is too short.";
        analysisList.appendChild(li);
        const rec = document.createElement("li");
        rec.textContent = "Choose a username with at least 6 characters.";
        recommendationList.appendChild(rec);
    }
    if (
        email.toLowerCase().includes(firstName.toLowerCase()) || email.toLowerCase().includes(lastName.toLowerCase())
    ) {
        risk += 20;
        const li = document.createElement("li");
        li.textContent = "Email contains your name that may reveal personal information.";
        analysisList.appendChild(li);
        const rec = document.createElement("li");
        rec.textContent = "Avoid using your name in your email address.";
        recommendationList.appendChild(rec);
    }
    const emailName = email.split("@")[0];
    if (username.toLowerCase() === emailName.toLowerCase()) {
        risk += 15;
        const li = document.createElement("li");
        li.textContent = "Username and email are the same.";
        analysisList.appendChild(li);
        const rec = document.createElement("li");
        rec.textContent = "Use different usernames for different online accounts.";
        recommendationList.appendChild(rec);
    }
    if (risk === 0) {
        const li = document.createElement("li");
        li.textContent = "No major privacy risks detected.";
        analysisList.appendChild(li);
    }
    score.textContent = risk + "/100";
    if (risk <= 20) {
        riskLevel.textContent = "🟢 Low Risk"
        riskLevel.style.color = "green";
        score.style.color = "green";
    }
    else if (risk <= 50) {
        riskLevel.textContent = "🟠 Medium Risk"
        riskLevel.style.color = "orange";
        score.style.color = "orange";
    }
    else {
        riskLevel.textContent = "🔴 High Risk";
        riskLevel.style.color = "red";
        score.style.color = "red";
    }
    form.reset();
}