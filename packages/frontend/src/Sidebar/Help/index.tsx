import React, { FC } from 'react'
import black from './black.png'
import blue from './blue.png'
import city from './city.png'
import deepHo from './deep-ho.png'
import deepRoad from './deep-road.png'
import red from './red.png'
import road from './road.png'
import yellow from './yellow.png'
import home from './home.png'
import ho from './ho.png'
import homeNormal from './homeNormal.png'
import homeCity from './homeCity.png'
import cn from 'clsx'
import SettingsIcon from '@material-ui/icons/Settings'

import styles from './styles.module.scss'

interface HelpProps {}

const Help: FC<HelpProps> = () => (
  <div className={styles.container}>
    <h2>Help & Map Keys</h2>
    <h3>Map Icons</h3>
    <div className={styles.row}>
      <div className={styles.left}>
        <img src={blue} alt="blue zone" className={styles.zone} />
        <img src={yellow} alt="yellow zone" className={styles.zone} />
        <img src={red} alt="red zone" className={styles.zone} />
        <img src={black} alt="black zone" className={styles.zone} />
      </div>
      <div className={styles.left}>Normal Zones</div>
    </div>
    <div className={styles.row}>
      <div className={styles.left}>
        <img src={city} alt="city zone" className={styles.zone} />
      </div>
      <div className={styles.left}>City</div>
    </div>
    <div className={styles.row}>
      <div className={styles.left}>
        <img src={road} alt="road zone" className={styles.zone} />
      </div>
      <div className={styles.left}>Road Zone</div>
    </div>
    <div className={styles.row}>
      <div className={styles.left}>
        <img src={deepRoad} alt="" className={styles.zone} />
      </div>
      <div className={styles.left}>Deep Road Zone</div>
    </div>
    <div className={styles.row}>
      <div className={styles.left}>
        <img src={ho} alt="hideout zone" className={styles.zone} />
      </div>
      <div className={styles.left}>Road Hideout Zone</div>
    </div>
    <div className={styles.row}>
      <div className={styles.left}>
        <img src={deepHo} alt="deep hideout zone" className={styles.zone} />
      </div>
      <div className={styles.left}>Deep Road Hideout Zone</div>
    </div>
    <div className={styles.row}>
      <div className={styles.left}>
        <img src={home} alt="home hideout" className={styles.zone} />
        <img src={homeCity} alt="home city" className={styles.zone} />
        <img src={homeNormal} alt="home normal" className={styles.zone} />
      </div>
      <div className={styles.left}>Your Home</div>
    </div>
    <div className={styles.row}>
      <SettingsIcon />
      <em>Set your home on the settings tab.</em>
    </div>

    <h3>Connections</h3>
    <div className={styles.row}>
      <div className={styles.left}>
        <div className={cn(styles.conn, styles.two)} />
      </div>
      <div className={styles.left}>2 Person Portal</div>
    </div>
    <div className={styles.row}>
      <div className={styles.left}>
        <div className={cn(styles.conn, styles.seven)} />
      </div>
      <div className={styles.left}>7 Person Portal</div>
    </div>
    <div className={styles.row}>
      <div className={styles.left}>
        <div className={cn(styles.conn, styles.twenty)} />
      </div>
      <div className={styles.left}>20 Person Portal</div>
    </div>
    <div className={styles.row}>
      <div className={styles.left}>
        <div className={cn(styles.conn, styles.royal)} />
      </div>
      <div className={styles.left}>Persistent Connection</div>
    </div>

    <h3>Call Signs & Types</h3>
    <div className={styles.text}>
      <p>
        aka: <br />
        <strong>What are those weird numbers after the road name?</strong>
      </p>
      <p>
        A call sign is the combination of the first letters of the type & the 4
        digit ID number.
      </p>
      <p>
        This is intended for easy voice communication, plus being able to
        identify a road type at a glance.
      </p>
    </div>
    <h4>Zone/Road Types</h4>
    <div className={styles.text}>
      <p>
        Each zone has a type associated to it. For Roads, the type can tell you
        if it's a deep zone, what type of connections it usually has
        (black/royal), and where on the continent those connections are likely
        to spawn (high, medium, low, etc).
      </p>
      <p>
        The types do not guarantee that it will only have those types of
        connections. ie: A "Black Low" could very possibly connect to a Royal
        zone.
      </p>
      <p>
        However, deep roads and hideout roads will <strong>never</strong>{' '}
        connect directly to Black or Royal zones.
      </p>
    </div>

    <h3>More Help</h3>
    <div className={styles.bottom}>
      If you have more questions
      <a
        href="https://discord.gg/QAjhJ4YNsD"
        target="_blank"
        rel="noopener noreferrer"
      >
        Join our Discord
      </a>
    </div>
  </div>
)

export default Help
