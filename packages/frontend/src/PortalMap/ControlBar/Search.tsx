import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Button, FormControl, IconButton, Modal } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { Zone } from '@portaler/types'

import { DEFAULT_ZONE } from '../../common/data/constants'
import useCurrentZones from '../../MapInfo/useCurrentZones'
import { PortalMapActionTypes } from '../../reducers/portalMapReducer'
import ZoneSearch from '../../ZoneSearch'
import styles from './styles.module.scss'

const Search = () => {
  const curZones = useCurrentZones()
  const dispatch = useDispatch()
  const [zoneSearch, setZoneSearch] = useState<Zone>(DEFAULT_ZONE)
  const [open, setOpen] = useState<boolean>(false)

  const handleSearch = useCallback(() => {
    dispatch({ type: PortalMapActionTypes.CENTER, centerZone: zoneSearch })
    setOpen(false)
  }, [zoneSearch, dispatch])

  useEffect(() => {
    if (!open) {
      setZoneSearch(DEFAULT_ZONE)
    }
  }, [open])

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
                onClick={handleSearch}
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
