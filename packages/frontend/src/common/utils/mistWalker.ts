const mistWalkerUtil = (): {
  showSidebar: boolean
  isWalker: boolean
  showSide: boolean
} => {
  const isWalker = window.location.host.split('.')[0] === 'map'

  const params = new URLSearchParams(document.location.search.substring(1))
  const showSide = params.get('showSide') === 'true'

  const showSidebar = !isWalker || (isWalker && showSide)

  return {
    showSidebar,
    isWalker,
    showSide,
  }
}

const mistWalker = mistWalkerUtil()

export default mistWalker
