const h = window.innerHeight*9/10
class UndergroundSquare {
    constructor(i) {
        this.createDom(i)
    }
    createDom(i) {

        this.y = h - i*100
        this.oy = this.y
        this.div = document.createElement('div')
        this.div.style.borderTop = '1px solid green'
        this.div.style.borderBottom = '1px solid red'
        this.div.style.width = 100
        this.div.style.position = 'absolute'
        this.div.style.top = this.y
        this.div.style.left = w/2 -50
        this.div.style.height = 0
        this.div.style.borderRadius = '15px'
    }
    update(stopcb) {
        this.y -= 10
        this.div.style.top = this.y
        this.div.style.height = this.oy - this.y
        if(parseInt(this.div.style.height) >= 100) {
            stopcb()
        }
    }
}
class UndergroundSquareContainer {
    constructor() {
        this.squares = []

    }
    update(stopcb) {
        if(this.curr) {
            this.curr.update(stopcb)
        }
    }
    create() {
        this.curr = new UndergroundSquare()
        this.squares.push(this.curr)
    }
}
class LoopController {
    constructor() {
        this.started = false
        this.worker = new Worker('usq_worker.js')
    }
    start(updatecb,stopcb){
        if(!this.started) {
            this.started = true
            this.worker.postMessage('start')
            this.worker.onmessage = (message)=> {
                const data = message.data
                if(data == 'update') {
                    updatecb(()=>{
                        this.started = false
                        this.worker.postMessage('stop')
                    })
                }
                if(data == 'stop') {
                    stopcb()
                    this.started = false
                }
            }
        }
    }
}
