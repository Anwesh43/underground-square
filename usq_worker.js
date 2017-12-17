const worker = self
class Looper {
    constructor() {
        this.animated = false
    }
    start() {
        console.log("started")
        if(!this.animated) {
            this.animated = true
            this.interval = setInterval(()=>{
                console.log("stopped")
                worker.postMessage('update')
            },50)
        }
    }
    stop() {
        if(this.animated) {
            this.animated = false
            clearInterval(this.interval)
            worker.postMessage('stop')
        }
    }
}
const looper = new Looper()
self.onmessage = (message) => {
    console.log(message)
    const data = message.data
    if(data === 'start') {
        looper.start()
    }
    else if(data === 'stop') {
        looper.stop()
    }
}
