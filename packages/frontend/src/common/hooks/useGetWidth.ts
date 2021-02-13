import { useEffect, useState } from 'react'

const rootElm = document.getElementById('root')

const useGetWidth = () => {
  const [width, setWidth] = useState(rootElm?.clientWidth ?? 0)

  useEffect(() => {
    const updateSize = () => setWidth(rootElm?.clientWidth ?? 0)

    window.addEventListener('resize', updateSize)

    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return width
}

export default useGetWidth
