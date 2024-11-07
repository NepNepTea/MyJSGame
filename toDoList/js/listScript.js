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

    removeElement() {
        this.element.remove();
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
        if (this.isCollision(this.game.player)) this.takePoint();
        if (this.y > window.innerHeight) this.takeDamage();
        super.update();
    }

    takePoint() {
        if (this.game.remove(this)) {
            this.removeElement();
            this.game.points++;
        }
    }

    takeDamage() {
        if (this.game.remove(this)) {
            this.removeElement();
            this.game.hp--;
        }
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

class Game {
    constructor() {
        this.name = name;
        this.elements = [];
        this.player = this.generate(Player);
        this.counterForTimer = 0;
        this.fruits = [Apple, Banana, Orange];
        this.keyEvents();
    }

    generate(className) {
        let element = new className(this);
        this.elements.push(element);
        return element;
    }

    start() {
        this.loop();
    }

    keyEvents() {
        addEventListener('keydown', ev => {
            if (ev.code === "Escape") this.pause = !this.pause;
        })
    }

    loop() {
        requestAnimationFrame(() => {
            if (!this.pause) {
                this.counterForTimer++;
                if (this.counterForTimer % 60 === 0) {
                    this.randomFruitGenerate();
                    this.timer();
                }
                if (this.hp <= 0) this.end();
                $('.pause').style.display = 'none';
                this.updateElements();
                this.setParams();
            } else if (this.pause) {
                $('.pause').style.display = 'flex';
            }
            if (!this.ended) this.loop();
        })
    }


    updateElements() {
        this.elements.forEach((el) => {
            el.update();
            el.draw();
        })
    }

    remove(el) {
        let idx = this.elements.indexOf(el);
        if (idx !== -1) {
            this.elements.splice(idx, 1);
            return true;
        }
        return false;
    }

    setParams() {
        let params = ['name', 'points', 'hp'];
        let values = [this.name, this.points, this.hp];
        params.forEach((el, index) => {
            $(`#${el}`).innerHTML = values[index];
        })
    }

}