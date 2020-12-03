import { Router } from 'express'

import Portals from './portal'

const router = Router()

router.use('/portal', Portals)

export default router
