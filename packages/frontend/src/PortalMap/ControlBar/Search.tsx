import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Zone } from '@portaler/types'

import { Button, FormControl, IconButton, Modal } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import { DEFAULT_ZONE } from '../../common/data/constants'
import useCurrentZones from '../../MapInfo/useCurrentZones'
import ZoneSearch from '../../ZoneSearch'
import styles from './styles.module.scss'
import { PortalMapActionTypes } from '../../reducers/portalMapReducer'

const Search = () => {
  const curZones = useCurrentZones()
  const dispatch = useDispatch()
  const [zoneSearch, setZoneSearch] = useState<Zone>(DEFAULT_ZONE)
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    dispatch({ type: PortalMapActionTypes.CENTER, centerZone: zoneSearch })
  }, [zoneSearch, dispatch])

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        aria-label="home"
        title="focus home"
      >
        <SearchIcon fontSize="large" color="secondary" />
      </IconButton>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={styles.modalBody}>
          <div className={styles.innerModal}>
            <h2>Search for Zone</h2>
            <ZoneSearch
              zoneList={curZones}
              value={zoneSearch}
              update={setZoneSearch}
              label="Map Search"
            />
            <FormControl fullWidth className={styles.innerBtn}>
              <Button
                color="primary"
                variant="contained"
                size="large"
                onClick={() => setOpen(false)}
              >
                Search
              </Button>
            </FormControl>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Search
