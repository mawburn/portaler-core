import { useEffect, useState } from 'react'

interface Config {
  publicRead: boolean
}

const useGetConfig = () => {
  const [config, setConfig] = useState<Config | null>(null)

  useEffect(() => {
    fetch('/api/config').then(r => r.json()).then(setConfig);
  }, [])

  return config
}

export default useGetConfig
