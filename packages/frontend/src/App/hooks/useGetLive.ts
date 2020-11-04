import { useEffect, useState } from 'react'

const getLive = async (): Promise<boolean> => {
  const res = await fetch(
    `https://doom-kinghts-albion.netlify.app/.netlify/functions/twitch`
  ).then((res) => res.json())

  return (res.live as boolean) ?? false
}

const useGetLive = (): boolean => {
  const [isLive, setIsLive] = useState<boolean>(false)

  useEffect(() => {
    getLive().then((isLive) => setIsLive(isLive))

    const interval = setInterval(async () => {
      const isLive = await getLive()

      setIsLive(isLive)
    }, 1800 * 60)

    return () => clearInterval(interval)
  }, [])

  return isLive
}

export default useGetLive
