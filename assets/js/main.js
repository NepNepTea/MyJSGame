let name = '';
let game = {};
let panel = 'start';
let $ = function(domElement) { return document.querySelector(domElement); }

let nav = () => {
    document.onclick = (ev) => {
        ev.preventDefault();
        switch (ev.target.id) {
            case "startGame":
                go('game', 'd-block');
                break;
            case "restart":
                go('game', 'd-block');

                break;
        }
    }
}

let go = (page, attribute) => {
    let pages = ['start', 'game', 'end'];
    panel = page;
    $(`#${page}`).setAttribute('class', attribute);
    pages.forEach(el => {
        if(page !== el) $(`#${el}`).setAttribute('class', 'd-none');
    })
}

window.onload = () => {
    nav();
    let inter = setInterval(() => {
        if(panel === 'game') {
            game = new Game();
            game.start();
            panel = 'game process';
            clearInterval(inter);
        }
    }, 500)
}