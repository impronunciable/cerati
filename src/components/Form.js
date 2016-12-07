
import { h } from 'preact'

export default ({ onAudioChange, onThemeChange }) => (
  <div>
    <label>Audio</label>
    <input type='file' onChange={onAudioChange} />

    <label>Theme</label>
    <select onChange={onThemeChange}>
      <option>Red</option>
      <option>Blue</option>
    </select>
  </div>
)
