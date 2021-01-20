const getTier = (input: string | number): string => {
  if (typeof input === 'string' && !input.trim().length) {
    return '?'
  }

  let tier: number | null = null

  if (typeof input === 'string' && input.length > 1) {
    const parts = input.split('_')

    for (const part of parts) {
      if (part.length === 2 && part.startsWith('T')) {
        tier = Number(part.substring(1))
        break
      }
    }
  } else {
    tier = Number(input)
  }

  switch (tier) {
    case 1:
      return 'I'
    case 2:
      return 'II'
    case 3:
      return 'III'
    case 4:
      return 'IV'
    case 5:
      return 'V'
    case 6:
      return 'VI'
    case 7:
      return 'VII'
    case 8:
      return 'VIII'
    default:
      return '?'
  }
}

export default getTier
