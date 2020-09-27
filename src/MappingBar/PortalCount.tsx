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
