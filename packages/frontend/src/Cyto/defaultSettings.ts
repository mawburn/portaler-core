import { CytoscapeOptions } from 'cytoscape'

const defaultSettings: CytoscapeOptions = {
  pan: { x: 0, y: 0 },
  minZoom: 0.15,
  maxZoom: 1.75,
  zoomingEnabled: true,
  userZoomingEnabled: true,
  panningEnabled: true,
  userPanningEnabled: true,
  boxSelectionEnabled: true,
  selectionType: 'single',
  touchTapThreshold: 8,
  desktopTapThreshold: 4,
  autolock: false,
  autoungrabify: false,
  autounselectify: false,
  // @ts-ignore
  layout: {
    // @ts-ignore
    name: 'cose-bilkent',
    nodeDimensionsIncludeLabels: true,
    // @ts-ignore
    idealEdgeLength: 125,
    fit: true,
    padding: 42,
    animationDuration: 250,
  },
  headless: false,
  styleEnabled: true,
  hideEdgesOnViewport: false,
  textureOnViewport: false,
  motionBlur: false,
  motionBlurOpacity: 0.2,
  wheelSensitivity: 1,
  pixelRatio: 'auto',
}

export default defaultSettings
