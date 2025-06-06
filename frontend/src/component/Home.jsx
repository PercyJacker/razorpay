import React from 'react'
import axios from 'axios';

const Home = () => {
    const checkoutHandler = async(amount)=>{
        console.log("Amount passed to checkoutHandler:", amount); // Verify amount

        const { data: { key } } = await axios.get(`https://peesa-zeta.vercel.app/api/getkey`);
        console.log(key);


        const { data: { order } } = await axios.post(
            `https://peesa-zeta.vercel.app/api/checkout`,
            { amount },
            { headers: { "Content-Type": "application/json" } }
        );
        console.log(order);
        const options = {
            key, // Enter the Key ID generated from the Dashboard
            "amount": order.amount, // Amount is in currency subunits
            "currency": "INR",
            "name": "Percy",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": order.id, // This is a sample Order ID
            "callback_url": `https://peesa-zeta.vercel.app/api/paymentVerification`,
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };

        //this let the razor to open a new razorpay window and adding a script in index.html
        const razor = new window.Razorpay(options);
        razor.open();

    }
  return (
    <div>
        <button onClick={() => checkoutHandler(5000)}className='bg-black text-white p-8 rounded-md '>shut up and pay 50 rs</button>
        <button onClick={() => checkoutHandler(500)}>Checkout</button>

    </div>
  )
}

export default Home
