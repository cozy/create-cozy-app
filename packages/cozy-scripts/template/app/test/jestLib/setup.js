require('@babel/polyfill')

// polyfill for requestAnimationFrame
/* istanbul ignore next */
global.requestAnimationFrame = cb => {
  setTimeout(cb, 0)
}

/* Fix error: "Material-UI: The color provided to augmentColor(color) is invalid.
The color object needs to have a `main` property or a `500` property."*/
jest.mock('cozy-ui/transpiled/react/utils/color', () => ({
  getCssVariableValue: () => '#fff',
  getInvertedCssVariableValue: () => '#000'
}))

window.cozy = {
  bar: {
    BarLeft: () => null,
    BarCenter: () => null,
    BarRight: () => null
  }
}
