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
class Player extends Drawable {
    constructor(game) {
        super(game);
        this.w = 244;
        this.h = 109;
        this.x = window.innerWidth / 2 - this.w / 2;
        this.y = window.innerHeight - this.h;
        this.speedPerFrame = 20;
        this.skillTimer = 0;
        this.couldTimer = 0;
        this.keys = {
            ArrowLeft: false,
            ArrowRight: false,
            Space: false
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
        if (this.keys.Space && this.couldTimer === 0) {
            this.skillTimer++;
            $('#skill').innerHTML = `осталось ${Math.ceil((240 - this.skillTimer) / 60)}`;
            this.applySkill();
        }
        if (this.skillTimer > 240 || (!this.keys.Space && this.skillTimer > 1)) {
            this.couldTimer++;
            $('#skill').innerHTML = `в откате еще ${Math.ceil((300 - this.couldTimer) / 60)}`;
            this.keys.Space = false;
        }
        if (this.couldTimer > 300) {
            this.skillTimer = 0;
            this.couldTimer = 0;
            $('#skill').innerHTML = 'Готово';
        }
        super.update();
    }
}

class Game {
    constructor() {
        this.name = name;
        this.elements = [];
        this.points = 0;
        this.ended = false;
        this.pause = false;
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