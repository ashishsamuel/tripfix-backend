import express from 'express'
import { createTour, deleteTour, getAllTour, getFeaturedTour, getSingleTour, getTourBySearch, getTourCount, updateTour } from '../controllers/tourController.js'
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

// create new tour
router.post('/',verifyAdmin,createTour)

// update tour
router.put('/:id',verifyAdmin,updateTour)

// delete tour
router.delete('/:id',verifyAdmin,deleteTour)

// get single:id tour
router.get('/:id',getSingleTour)

// getAll tours
router.get('/',getAllTour)

// get tour by search
router.get('/search/getTourBySearch',getTourBySearch)

//get featured tours by search
router.get('/search/getFeaturedTours',getFeaturedTour)

// get tourcount
router.get('/search/getTourCount',getTourCount)

export default router