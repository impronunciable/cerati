
import { h, Component } from 'preact'
import Form from 'components/Form'
import Player from 'components/Player'
import Actions from 'components/Actions'

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      audio: null,
      theme: null,
      capturing: false
    }

    this.onAudioChange = this.onAudioChange.bind(this)
    this.onThemeChange = this.onThemeChange.bind(this)
    this.onDownload = this.onDownload.bind(this)
    this.onStop = this.onStop.bind(this)
  }

  onDownload (canvas) {
    this.setState({
      capturing: true
    })
  }

  onStop (canvas) {
    this.setState({
      capturing: false,
      audio: null
    })
  }

  onThemeChange () {

  }

  onAudioChange (e) {
    const file = e.currentTarget.files[0]
    const objectUrl = URL.createObjectURL(file)
    this.setState({ audio: objectUrl })
  }

  render (props, { audio, capturing }) {
    return (
      <div>
        <h1>Cerati</h1>
        <Form
          onAudioChange={this.onAudioChange}
          onThemeChange={this.onThemeChange} />
        <Player audio={audio} capture={capturing} />
        <Actions onStop={this.onStop} onDownload={this.onDownload} />
      </div>
    )
  }
}
