import React, { useState } from 'react'

import { Button, FormControl, IconButton, Modal } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import MapSearch from '../../MapInfo'
import styles from './styles.module.scss'

const Search = () => {
  const [open, setOpen] = useState<boolean>(false)

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
            <MapSearch />
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
