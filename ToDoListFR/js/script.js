let addNew
window.addEventListener('load', function() {
    addNew = document.querySelector(".addNote");
});
function addElement() {
    const TASK = document.createElement("div");

    TASK.innerHTML = "<p>" + document.getElementById("name").value + "</p>";

    // add the text node to the newly created div
    document.body.appendChild(TASK);

    const currentDiv = document.getElementById("div1");
    document.body.insertBefore(TASK, currentDiv);
}


function hide () {
    addNew.setAttribute("style", "display:none");
}

function show () {
    addNew.setAttribute("style", "display:flex");
}