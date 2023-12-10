import Booking from '../models/Booking.js'

// create new booking
export const createBooking = async(req,res)=>{
    const newBooking = new Booking(req.body)
    try {
        const savedBooking = await newBooking.save()
        res.status(200).json({success:true,message:'Your tour is booked',data:savedBooking})
    } catch (err) {
        res.status(500).json({success:false,message:'internal server error'})
        
    }
}

// get single booking
export const getSingleBooking = async(req,res)=>{
    const id = req.params.id
    try {
        const book = await Booking.findById(id)

        res.status(200).json({success:true,message:'successful',data:book})

    } catch (err) {
        res.status(404).json({success:false,message:'not found'})
        
    }
}

// get all booking
export const getAllBooking = async(req,res)=>{
    try {
        const books = await Booking.findById()

        res.status(200).json({success:true,message:'successful',data:books})

    } catch (err) {
        res.status(500).json({success:false,message:'internal server error'})
        
    }
}

// delete single booking
export const deleteBooking = async(req,res)=>{
    const id = req.params.bookingid
    try {
        await Booking.findByIdAndDelete(id)

        res.status(200).json({success:true,message:'successfully cancelled booking'})
    } catch (err) {
        res.status(500).json({success:false,message:'internal server error'})
    }
}

// update booking 
export const updateBooking = async(req,res)=>{
    const bookingid = req.params.bookingid
    const {bookAt,fullName,guestSize,phone} = req.body
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(bookingid,{bookAt,fullName,guestSize,phone},{new:true})
        await updatedBooking.save()
        res.status(200).json({success:true,message:'Successfully updated',data:updatedBooking})
    } catch (err) {
        res.status(500).json({success:false,message:'Failed to update.'})
        
    }
}

// get all booking of a user 
export const getAllUserBooking = async(req,res)=>{
    const userId = req.body;

    try {
      const userBooking = await Booking.aggregate([
       {
                $match: {
                  userId: userId.userId,
                },
            },
            {
          $lookup: {
            from: "tours",
            localField: "tourId",
            foreignField: "_id",
            as: "tourDetails",
          },
        },
      ]);

    
  
      res.status(200).json({
        success: true,
        message: "Successful",
        data: { userBookings:userBooking },
      });
    } catch (err) {
      res.status(401).json(err);
    }
}