document.body.onload = addElement;

function addElement() {
    const TASK = document.createElement("div");

    TASK.innerHTML = "<p>" + document.getElementById("name").value + "</p>";

    // add the text node to the newly created div
    document.body.appendChild(TASK);

    const currentDiv = document.getElementById("div1");
    document.body.insertBefore(TASK, currentDiv);
}
document.getElementById("name")