
import { h, render } from 'preact'
import App from 'components/App'

render(<App />, document.querySelector('#root'))

if ('serviceworker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function(reg) {
    console.log('◕‿◕', reg);
  }, function(err) {
    console.log('ಠ_ಠ', err);
  })
}
