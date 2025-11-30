import Razorpay from 'razorpay';
import Court from "../models/courtModel.js";
import crypto from 'crypto';
import Facility from '../models/facilityModel.js';
import Slot from '../models/timeSlotModel.js';
import Booking from '../models/bookingModel.js';
import User from '../models/userModel.js';
import mongoose from 'mongoose';
//razorpay instance -> razorpay class ka object banye ge
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req,res) => {
    const {slot_id, court_id, seats} = req.body; //amount is in ruppees, convert to paisa
    const court = await Court.findOne({_id: court_id}).select('price');
    const options = {
        amount: court.price * seats * 100,
        currency: 'INR',
        receipt: 'receipt_order_' + Date.now(), //unique receipt ID
    };

    try { 
        const order = await instance.orders.create(options);
        //frontend ko yeh order details bhejenge
        res.status(200).json({success: true, order_id: order.id, amount: order.amount, currency: order.currency, key_id: process.env.RAZORPAY_KEY_ID}) //frontend ko iski zaroorat padegi
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
}
const auth = "Basic " + Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64');
const verifyPayment =  async (req,res) => {
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature, orderAmount, slot_id, user_id, seats} = req.body;       
    //hashing login: Order ID + "|" + Payment ID
    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');
    //signaturn match kro
    if(digest === razorpay_signature) {
        console.log('payment verified');
        const session = await mongoose.startSession();
        (await session).startTransaction()
        try {
            const slot = await Slot.findOne({_id: slot_id});
            const court = await Court.findOne({_id: slot.court_id});
            const facility = await Facility.findOne({_id: court.facility_id});
            const user = await User.findOne({_id: user_id});
            const bookingModel = new Booking({
                user_id: user_id,
                slot_id: slot._id,
                court: court.sport,
                facility: facility.name,
                street: facility.street,
                city: facility.city,
                state: facility.state,
                country: facility.country,
                time: slot.time,
                price: court.price * seats,
                seats: seats,
                courtImage: court.photoLink,
                status : "booked"
            });
            const booking = await bookingModel.save();
            slot.bookings.push(booking._id);
            if(slot.totalSeatsBooked + seats > court.seats) throw new Error("Seats limit exceed");
            slot.totalSeatsBooked = slot.totalSeatsBooked + seats;
            user.bookings.push(booking._id);
            await user.save();
            await slot.save();
            (await session).commitTransaction();
            res.json({
                success: true,
                message: 'Payment verified and Transfer successful',
                booking_id: booking._id,
                // transfer_id: transferResult.items[0].id // Transfer ID ko store kar lo
            });
        } catch (error) {
            (await session).abortTransaction();
            console.log(error);
            res.status(500).json({message: error.message});
        }
        finally {
            (await session).endSession();
        }
        
        
        // const court = await Court.findOne({_id: court_id});
        // const facility = await Facility.findOne({_id: court.facility_id});
        // const user = await User.findOne({_id: facility.owner});
        // const productOwnerFundId =  user.fundAccountId;

        // try {
        //     const transferResponse =  await fetch('https://api.razorpay.com/v1/payouts',{
        //         method:'POST',
        //         headers: {
        //             "X-Payout-Idempotency": "53cda91c-8f81-4e77-bbb9-7388f4ac6bf4",
        //             "Content-Type": "application/json",
        //             "Authorization": auth,

        //         },
        //         body: JSON.stringify({
        //             account_number: "7878780080316316",
        //             fund_account_id: "fa_00000000000001",
        //             amount: 1000000, // paise
        //             currency: "INR",
        //             mode: "IMPS",
        //             purpose: "refund",
        //             queue_if_low_balance: true,
        //             reference_id: "Acme Transaction ID 12345",
        //             narration: "Acme Corp Fund Transfer",
        //             notes: {
        //                 notes_key_1: "Tea, Earl Grey, Hot",
        //                 notes_key_2: "Tea, Earl Grey… decaf."
        //             }
        //         })
                
        //     });
        //     const transferResult = await transferResponse.json();
        //     console.log('Transfer Successful:',transferResult);
        //     return res.json({
        //         success: true,
        //         message: 'Payment verified and Transfer successful',
        //         // transfer_id: transferResult.items[0].id // Transfer ID ko store kar lo
        //     });
        // } catch (error) {
        //     console.log(error);
        //     return res.status(500).json({success: false, message: error});
        // }

        
    } 
    else{
        //verification failed!
        return res.status(500).json({
            success: false,
            message: 'Signature mismatch/verfication failed'
        });
    }
}

const createFundAccount = async(req,res) => {
    const { name, ifsc_code, account_number, phone_number, email } = req.body;
    

    try {
        const contactResponse = await fetch('https://api.razorpay.com/v1/contacts',{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth,

            },
            body: JSON.stringify({name: name,email: email, contact: phone_number,   type: 'vendor', reference_id: `vendor_${Date.now()}`})
            
        });
        const contactObj = await contactResponse.json();
        const fundAccount = await instance.fundAccount.create({
            account_type: 'bank_account',
            contact_id: contactObj.id,
            bank_account: {
                name: name,
                ifsc: ifsc_code,
                account_number: account_number,
            }
        });
        //

        res.status(200).json({success: true, fund_account_id: fundAccount.id});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
}

export {createOrder, verifyPayment, createFundAccount};