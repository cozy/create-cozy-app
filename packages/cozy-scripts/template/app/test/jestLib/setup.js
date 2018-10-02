require('babel-polyfill')

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

// polyfill for requestAnimationFrame
/* istanbul ignore next */
global.requestAnimationFrame = cb => {
  setTimeout(cb, 0)
}
