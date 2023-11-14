// SubscribeComponent.js
import React, { useState } from "react";
import '../components/footer/Footer.css'
import Swal from 'sweetalert2';

const SubscribeComponent = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    try {
      const response = await fetch("http://localhost:4000/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Handle successful subscription
        Swal.fire(
            'Good job!',
            'You Have Subscribed to our Blog!',
            'success'
          )
      } else {
        Swal.fire({
            icon: 'error',
            title: 'Try Again',
            text: 'Subscription failed!',
          })
      }
    } catch (error) {
      console.error("Error subscribing:", error);
    }
  };

  return (
    <div className="input-group  ">
    <input 
    type="text" 
    className="form-control p-2 w-auto " 
    placeholder="Your Email Adress" 
    aria-label="Your Email Adress" 
    aria-describedby="basic-addon2" 
    value={email}
    onChange={(e) => setEmail(e.target.value)}
/>
<span
  className="input-group-text sub p-2  "
  id="basic-addon2"
  onClick={handleSubscribe}
>
  Subscribe
</span>
</div>
  );
};

export default SubscribeComponent;
