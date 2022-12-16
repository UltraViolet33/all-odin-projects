var container = document.querySelector("#container");
initGrid();
function initGrid() {
    var grid_container = document.createElement("div");
    grid_container.classList.add("grid");
    for (var i = 0; i < 16; i++) {
        for (var j = 0; j < 16; j++) {
            var square = document.createElement("div");
            square.classList.add("square");
            grid_container.appendChild(square);
        }
    }
    container.appendChild(grid_container);
}
