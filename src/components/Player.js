
import { h, Component } from 'preact'
import capture from 'ccapture.js'

export default class Player extends Component {
  constructor (props) {
    super(props)

    this.width = 600
    this.height = 400
  }

  componentDidUpdate () {
    if (!(this.props.audio && this.props.capture)) return


    this.ctx = this.canvas.getContext('2d')

    const audioCtx = this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    const source = this.source = audioCtx.createMediaElementSource(this.audioTag)
    this.getAnalyser()
    source.connect(this.analyser)
    this.analyser.connect(audioCtx.destination)

    this.capturer = new CCapture({ format: 'webm' })
    setTimeout(() => {
      this.capturer.stop()
      this.capturer.save()
      this.props.onStop()
    }, 1000 * this.audioTag.duration)

    this.visualize()

    this.audioTag.play()

  }

  getAnalyser () {
    const analyser = this.analyser = this.audioCtx.createAnalyser()
    analyser.minDecibels = -90
    analyser.maxDecibels = -10
    analyser.smoothingTimeConstant = 0.85
  }

  visualize () {
    const analyser = this.analyser
    const WIDTH = this.width
    const HEIGHT = this.height
    const ctx = this.ctx
    const canvas = this.canvas
    const capturer = this.capturer
    console.log(capturer, canvas)

    analyser.fftSize = 256
    let drawVisual
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    this.capturer.start()

    const draw = () => {
      drawVisual = requestAnimationFrame(draw)
      analyser.getByteFrequencyData(dataArray)

      ctx.fillStyle = 'rgb(0, 0, 0)'
      ctx.fillRect(0, 0, WIDTH, HEIGHT)

      const barWidth = (WIDTH / bufferLength) * 2.5
      let barHeight
      let x = 0

      for(let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i]

        ctx.fillStyle = `rgb(${barHeight+100},50,50)`
        ctx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2)

        x += barWidth + 1
      }
      if (this.props.capture) capturer.capture(canvas)
    }

    draw()
  }

  render ({ audio }) {
    return (
     <div>
      <canvas ref={el => {this.canvas = el}} width={this.width} height={this.height} />
      <audio src={audio} ref={el => {this.audioTag = el}} />
     </div>
    )
  }
}
