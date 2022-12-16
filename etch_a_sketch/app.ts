

let container: HTMLDivElement = document.querySelector("#container") as HTMLDivElement


initGrid();

function initGrid(): void {
    
    let grid_container: HTMLDivElement = document.createElement("div");

    grid_container.classList.add("grid");

    for(let i = 0; i < 16; i++)
    {
        for(let j = 0; j < 16 ; j++)
        {
            let square: HTMLDivElement = document.createElement("div");
            square.classList.add("square");
            grid_container.appendChild(square);
        }
    }

    container.appendChild(grid_container);

}