import { useEffect, useState } from 'react'

interface Config {
  publicRead: boolean
}

const useGetConfig = (): Config => {
  const [config, setConfig] = useState<Config>({ publicRead: false })

  useEffect(() => {
    fetch('/api/config')
      .then((r) => r.json())
      .then(setConfig)
  }, [])

  return config
}

export default useGetConfig
