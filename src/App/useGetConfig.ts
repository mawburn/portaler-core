import { useEffect, useState } from 'react'

interface Config {
  publicRead: boolean
}

const useGetConfig = () => {
  const [config, setConfig] = useState<Config | null>(null)

  useEffect(() => {
    ;(async () => {
      const res = await fetch('/api/config').then((r) => r.json())
      setConfig(res)
    })()
  }, [])

  return config
}

export default useGetConfig
