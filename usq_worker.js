class Looper {
    constructor() {
        this.animated = false
    }
    start() {
        if(!this.animated) {
            this.animated = true
            this.interval = setInterval(()=>{
                postMessage('update')
            },50)
        }
    }
    stop() {
        if(this.animated) {
            this.animated = false
            clearInterval(this.interval)
            postMessage('stop')
        }
    }
}
const looper = new Looper()
self.onmessage = (message) => {
    const data = message.data
    if(message === 'start') {
        looper.start()
    }
    else if(message == 'stop') {
        looper.stop()
    }
}
