import Razorpay from 'razorpay';
import Court from "../models/courtModel.js";
import crypto from 'crypto';
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

const verifyPayment = (req,res) => {
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature, orderAmount} = req.body; 
    //hashing login: Order ID + "|" + Payment ID
    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');
    console.log(digest,razorpay_signature)
    //signaturn match kro
    if(digest === razorpay_signature) {
        console.log('payment verified');
        //payment verified!
        //IMPORTANT ab yahan tumko actual business logic chalana hai:
        //Database mein transaction save kro
        //uske baad razorpay payouts transfers api use karke
        //money ko Product owner ke linked account mein transfer karo
        res.status(200).json({
            success: true,
            message: 'Payment verified successfully',
            paymentId: razorpay_payment_id,
            amount: orderAmount / 100 //Example: To store amount in rupees
        })
    } 
    else{
        //verification failed!
        res.status(500).json({
            success: false,
            message: 'Signature mismatch/verfication failed'
        });
    }
}

const createFundAccount = async(req,res) => {
    const { name, ifsc_code, account_number, phone_number, email } = req.body;
    
const auth = "Basic " + Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64');
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