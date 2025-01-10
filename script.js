
var file = document.getElementById("file");
var ranking = document.getElementById("ranking");

file.onchange = _ => {
    const reader = new FileReader();
    reader.addEventListener("load", _ => {
        let disponibilitat = new Object();
        let lines = reader.result.replace("\r","").split("\n");
        let days = [];
        for (let i = 0; i < lines.length; i++) {
            let values = [];
            let current = "";
            let inQuotes = false;
            for (let j = 0; j < lines[i].length; j++) {
                if (lines[i][j] === "\"")
                    inQuotes = !inQuotes;
                else if (!inQuotes && lines[i][j] === ",") {
                    if (i == 0)
                        days.push(current)
                    else
                        values.push(current);
                    current = "";
                }
                else
                    current += lines[i][j];
            }
            for (let j = 3; j < values.length - 1; j++) {
                if (values[j] !== "") {
                    for (let value of values[j].split(", ")) {
                        let key = days[j].split("[")[1].split("]")[0] + " " + value;
                        if (disponibilitat[key] === undefined)
                            disponibilitat[key] = []
                        disponibilitat[key].push(values[1]);
                    }
                }
            }
        }
        array = Object.keys(disponibilitat).map(key => [key, disponibilitat[key]]);
        array.sort((a, b) => b[1].length - a[1].length);
        for (let dispon of array) {
            let row = document.createElement("tr");
            let day = document.createElement("td");
            let time = document.createElement("td");
            let num = document.createElement("td");
            day.textContent = dispon[0].split(" ")[0];
            time.textContent = dispon[0].split(" ")[1];
            num.textContent = dispon[1].length;
            row.appendChild(day);
            row.appendChild(time);
            row.appendChild(num);
            for (let disp of dispon[1])
            {
                let gent = document.createElement("td");
                gent.textContent = disp;
                row.appendChild(gent);
            }
            ranking.appendChild(row);
        }
        console.log(disponibilitat);
    });
    reader.readAsText(file.files[0]);
};