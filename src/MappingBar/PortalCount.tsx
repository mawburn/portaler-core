import { ButtonGroup, Button } from '@material-ui/core'
import React, { FC } from 'react'

interface PortalCountProps {
  selected: number
  update: (count: number) => void
}

const getVariant = (
  sel: number,
  item: number
): 'contained' | 'outlined' | 'text' =>
  sel === item ? 'contained' : 'outlined'

const maxPortals = [...Array(7)].map((_, i) => ++i)

/**
 * Would like to make this support multiple portals at once, but we can do that later
 * so I backed out and just commented out the changes. The to state needs to be a bit more
 * complex to handle size and time
 */
const PortalCount: FC<PortalCountProps> = ({ selected = 1, update }) => (
  <ButtonGroup color="primary" aria-label="primary button group">
    {maxPortals.map((i) => (
      <Button
        key={`portal-btn-${i}`}
        variant={getVariant(selected, i)}
        onClick={() => update(i)}
      >
        {i}
      </Button>
    ))}
  </ButtonGroup>
)

export default PortalCount
