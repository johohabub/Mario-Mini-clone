function startGame() {
    document.getElementById("start-screen").style.display = "none";
    const canvas = document.getElementById("gameCanvas");
    canvas.style.display = "block";
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.font = "30px Comic Sans MS";
    ctx.fillText("Spiel läuft ... (Demo)", 250, 240);
}