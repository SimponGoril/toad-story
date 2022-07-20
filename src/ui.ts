import { Engine } from "excalibur"

export class Ui {
    private jumpUi = document.getElementById('jump-ui') || document.createElement('div')
    private scoreUi = document.getElementById('score-ui') || document.createElement('div')

    constructor (engine: Engine) {
        const canvasWidth = Number(engine.canvas.style.width.replace('px', ''))
        this.scoreUi.style.left = (canvasWidth / 2) + 'px'
    }

    public setScore(newScore: string) {
        this.scoreUi.innerHTML = newScore
    }

    public setJumpBar(power: number) {
        let color = "green"
        if (power > 4) color = "yellow"
        if (power > 7) color = "red"

        this.jumpUi.style.display = "inline-block"
        this.jumpUi.style.backgroundColor = color
        this.jumpUi.style.height = power * 10 + "px"
    }

    public hideJumpBar() {
        this.jumpUi.style.height = "0px"
        this.jumpUi.style.display = "none"
    }
}