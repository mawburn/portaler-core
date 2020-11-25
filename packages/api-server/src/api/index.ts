import { Router } from 'express'

import Portals from './portal'
import Zone from './zone'

const router = Router()

router.use('/portal', Portals)
router.use('/zone', Zone)

export default router
