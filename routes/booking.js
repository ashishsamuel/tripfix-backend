import express from 'express'

import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'
import { createBooking, deleteBooking, getAllBooking, getAllUserBooking, getSingleBooking, updateBooking } from '../controllers/bookingController.js'

const router = express.Router()

router.post('/',verifyUser,createBooking)
router.get('/:id',verifyUser,getSingleBooking)
router.get('/',verifyAdmin,getAllBooking)
router.put('/updatebooking/:bookingid',verifyUser,updateBooking)
router.delete('/cancel/:bookingid',verifyUser,deleteBooking)
router.post('/user',verifyUser,getAllUserBooking)


export default router
