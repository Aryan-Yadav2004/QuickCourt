import React from 'react'
import { createOrder, verifyPayment } from '../services/server';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function Payment() {
    function loadScript(src){
        return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
        });
    }
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const slot_id = query.get('slot_id');
    const court_id = query.get('court_id');
    const seats = query.get('seats');
    const user = useSelector(state => state.user.userDetail);
    const displayRazorpay = async () => {
        //step 1: backend se order create krna;

        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if(!res) {
            alert('Razorpay SDK failed to load');
        }
        // backend api call to create order (dhyan dena ki amount in rupee hai)
        const result = await createOrder(slot_id, court_id, seats);
        const data = await result.json();
        console.log(data);
        if(!data?.success){
            alert('Server error creating order.');
            return;
        }
        const {amount: orderAmount, order_id, key_id} = data;

        //step2: razorpay options setup
        const options = {
            key: key_id, //key ID from your backend
            amount: orderAmount,
            currency: 'INR',
            name: 'QUICKCOURT.inc',
            description: 'Product Purchase',
            order_id: order_id,
            handler: async function (response) {
                // step 3: payment successfull, ab verification ke liye backend ko bhejenge
                const verificationResponse = await verifyPayment(response.razorpay_payment_id,response.razorpay_order_id,response.razorpay_signature, orderAmount);
                if(verificationResponse?.success){
                    alert('Payment successful and verified! money transfer ho gaya');
                }
                else{
                    alert('Payment verificatoin failed');
                }
            },
            prefill: {
                name: user?.name,
                email: user?.email,
                contact: user?.phone,
            },
            theme: {
                color: '#5500ff'
            },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open(); // modal open karo
    };
    useEffect(() => {
        displayRazorpay();
    },[])
  return (
    <div className='w-full h-[80vh] flex justify-center items-center'></div>
  )
}

export default Payment;

