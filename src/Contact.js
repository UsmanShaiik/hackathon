import React, { useState } from 'react';
import './Contact.css'; // Import the CSS file
import bubbleImage from './bubble.png'; // Import the bubble image

// Email sending functionality (using real backend)
const sendEmail = async (email, message) => {
  try {
    // Sending email and message as a POST request to the backend API
    const response = await fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, message }), // Send email and message in the request body
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json(); // Get the response from the server
    alert(result.message); // Show a success message returned by the server
  } catch (error) {
    alert(`Failed to send email: ${error.message}`); // Display error message if request fails
  }
};

const Contact = () => {
  const [email, setEmail] = useState(''); // State for holding email input
  const [message, setMessage] = useState(''); // State for holding message input
  const [isSending, setIsSending] = useState(false); // State to indicate if the email is being sent

  // Handlers for updating email and message states on input change
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submission
    if (email && message) {
      setIsSending(true); // Set isSending to true to indicate sending state
      await sendEmail(email, message); // Call sendEmail function to send email
      setEmail(''); // Clear email input after submission
      setMessage(''); // Clear message input after submission
      setIsSending(false); // Reset sending state
    } else {
      alert('Please fill in all fields.'); // Show error if any field is empty
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p>For any inquiries or support, feel free to reach out to us:</p>
        
        {/* Contact details */}
        <ul className="contact-details">
          <li><strong>Email:</strong> <a href="mailto:appshield@gmail.com">appshield@gmail.com</a></li>
          <li><strong>Mobile:</strong> +123 456 7890</li>
          <li><strong>Address:</strong> IIIT RGUKT RK VALLEY</li>
        </ul>

        {/* Contact form for submitting email and message */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="email" aria-placeholder="Enter your mail">Your Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required // Make the field required
          />
          <label htmlFor="message">Your Message:</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={handleMessageChange}
            required // Make the field required
          ></textarea>
          <button type="submit" disabled={isSending}>
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>

      {/* Bubble animations */}
      <div className="bubbles">
        <img src={bubbleImage} alt="bubble" />
        <img src={bubbleImage} alt="bubble" />
        <img src={bubbleImage} alt="bubble" />
        <img src={bubbleImage} alt="bubble" />
        <img src={bubbleImage} alt="bubble" />
        <img src={bubbleImage} alt="bubble" />
        <img src={bubbleImage} alt="bubble" />
        <img src={bubbleImage} alt="bubble" />
        <img src={bubbleImage} alt="bubble" />
      </div>
    </div>
  );
};

export default Contact;
