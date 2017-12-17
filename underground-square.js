const h = window.innerHeight*0.9,w = window.innerWidth
class UndergroundSquare {
    constructor(i) {
        this.createDom(i)
    }
    createDom(i) {

        this.h = 0
        this.div = document.createElement('div')
        this.div.style.border = '5px solid #311B92'
        this.div.style.width = 100
        this.div.style.position = 'absolute'
        this.div.style.top = i*100
        this.div.style.left = w/2 -50
        this.div.style.height = 0
        this.div.style.borderRadius = '15px'
        document.body.appendChild(this.div)

    }
    update(stopcb) {
        this.h += 10
        this.div.style.height = this.h
        if(parseInt(this.div.style.height) >= 100) {
            stopcb()
            this.div.style.fontSize = 30
            this.div.style.textAlign = 'center'
            this.div.innerHTML = `${parseInt(this.div.style.top)/100}`
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
        this.curr = new UndergroundSquare(this.squares.length)
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
const container = new UndergroundSquareContainer()
const controller = new LoopController()
container.create()
window.onmousedown = () => {
    console.log("clicked")
    controller.start((cb)=>{
        container.update(cb)
    },()=>{
        if(parseInt(container.curr.div.style.top) >= h) {
            window.scrollBy(0,110)
        }
        container.create()
    })
}
