class Drawable {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.offsets = {
            x: 0,
            y: 0
        }
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.className = "element " + this.constructor.name.toLowerCase();
        $('.elements').append(this.element);
    }

    update() {
        this.x += this.offsets.x;
        this.y += this.offsets.y;
    }

    draw() {
        this.element.style = `
        left: ${this.x}px;
        top: ${this.y}px;
        width: ${this.w}px;
        height: ${this.h}px;
        `;
    }

    isCollision(element) {
        let a = {
            x1: this.x,
            x2: this.x + this.w,
            y1: this.y,
            y2: this.y + this.h
        };
        let b = {
            x1: element.x,
            x2: element.x + element.w,
            y1: element.y,
            y2: element.y + element.h
        };
        return a.x1 < b.x2 && b.x1 < a.x2 && a.y1 < b.y2 && b.y1 < a.y2;
    }
}

class Fruits extends Drawable {
    constructor(game) {
        super(game);
        this.w = 70;
        this.h = 70;
        this.y = 60;
        this.x = random(0, window.innerWidth - this.w);
        this.offsets.y = 3;
        this.createElement();
    }
    update() {
        if (this.isCollision(this.game.player)) console.log('collision');
        super.update();
    }
}

class Banana extends Fruits {
    constructor(game) {
        super(game);
    }
}

class Apple extends Fruits {
    constructor(game) {
        super(game);
        this.offsets.y = 5;
    }
}

class Orange extends Fruits {
    constructor(game) {
        super(game);
        this.offsets.y = 7;
    }
}

class Player extends Drawable {
    constructor(game) {
        super(game);
        this.w = 244;
        this.h = 109;
        this.x = window.innerWidth / 2 - this.w / 2;
        this.y = window.innerHeight - this.h;
        this.speedPerFrame = 20;
        this.keys = {
            ArrowLeft: false,
            ArrowRight: false
        };
        this.createElement();
        this.bindKeyEvents();
    }

    bindKeyEvents() {
        document.addEventListener('keydown', ev => this.changeKeyStatus(ev.code, true));
        document.addEventListener('keyup', ev => this.changeKeyStatus(ev.code, false));
    }

    changeKeyStatus(code, value) {
        if (code in this.keys) {
            this.keys[code] = value;
        }
    }

    update() {
        if (this.keys.ArrowLeft && this.x > 0) this.offsets.x = -this.speedPerFrame;
        else if (this.keys.ArrowRight && this.x < window.innerWidth - this.w) this.offsets.x = +this.speedPerFrame;
        else this.offsets.x = 0;
        super.update();
    }
}

class Game {
    constructor() {
        this.name = name;
        this.elements = [];
        this.player = this.generate(Player);
        this.counterForTimer = 0;
        this.fruits = [Apple, Banana, Orange];
    }

    generate(className) {
        let element = new className(this);
        this.elements.push(element);
        return element;
    }

    start() {
        this.loop();
    }

    loop() {
        requestAnimationFrame(() => {
            this.counterForTimer++;
            if (this.counterForTimer % 60 === 0) {
                this.randomFruitGenerate();
            }
            this.updateElements();
            this.setParams();
            this.loop();
        })
    }

    randomFruitGenerate() {
        let ranFruit = random(0, 2);
        this.generate(this.fruits[ranFruit]);
    }

    updateElements() {
        this.elements.forEach((el) => {
            el.update();
            el.draw();
        })
    }

    setParams() {
        let params = ['name'];
        let values = [this.name];
        params.forEach((el, index) => {
            $(`#${el}`).innerHTML = values[index];
        })
    }
}