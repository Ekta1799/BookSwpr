import React, { useState, useEffect } from 'react';
import customAxios from '../../utils/axios';
import { errorToastWrapper } from '../../utils';
import { useLocation } from "react-router-dom";
import "./ExchangeRequestForm.css"; 

interface ExchangeRequest {
    senderUsername: string;
    recieverUsername: string;
    book: string;
    deliveryMethod: string;
    duration: string;
}

const ExchangeRequestForm: React.FC = () => {
    const location = useLocation();
    const { title } = location.state;
    const { senderUsername } = location.state;
    const { recieverUsername } = location.state;
    const [exchangeRequest, setExchangeRequest] = useState<ExchangeRequest>({
        senderUsername: senderUsername,
        recieverUsername: recieverUsername,
        book: title,
        deliveryMethod: '',
        duration: ''
    });
    const [isSending, setIsSending] = useState<boolean>(false);
    

    useEffect(() => {
        // Any initialization code you may need
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsSending(true);

        try {
            const response = await customAxios.post('/exchangeRequests', exchangeRequest);
            if (response.status === 200) {
                console.log('Exchange request sent successfully');
                <p>'Exchange request submitted successfully');</p> // Display success message
                // Optionally, you can reset the form fields here
            } else {
                console.error('Failed to send exchange request');
            }
        } catch (error) {
            console.error('Error occurred while sending exchange request:', error);
            errorToastWrapper('Error sending exchange request');
        } finally {
            setIsSending(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = e.target;
        setExchangeRequest(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCancel = (): void => {
        window.location.href = '/booklist'; // Redirect to book list page
    };

    return (
        <div className="exchange-form-container">
            <h2>Exchange Request</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="senderUsername">Sender Username:</label>
                <input 
                    type="text" 
                    id="senderUsername" 
                    name="senderUsername" 
                    value={senderUsername} 
                    onChange={handleInputChange} 
                    required 
                />

                <label htmlFor="recieverUsername">Receiver Username:</label>
                <input 
                    type="text" 
                    id="recieverUsername" 
                    name="recieverUsername" 
                    value={recieverUsername} 
                    onChange={handleInputChange} 
                    required 
                />

                <label htmlFor="book">Book:</label>
                <input 
                    type="text" 
                    id="book" 
                    name="book" 
                    value={title}
                    required 
                />

                <label htmlFor="deliveryMethod">Delivery Method:</label>
                <select 
                    id="deliveryMethod" 
                    name="deliveryMethod" 
                    value={exchangeRequest.deliveryMethod} 
                    onChange={handleInputChange} 
                    required 
                >
                    <option value="">Select Delivery Method</option>
                    <option value="Shipping">Shipping</option>
                    <option value="Pickup">Pickup</option>
                </select>

                <label htmlFor="duration">Duration:</label>
                <input 
                    type="text" 
                    id="duration" 
                    name="duration" 
                    value={exchangeRequest.duration} 
                    onChange={handleInputChange} 
                    required 
                />

                <button type="submit" disabled={isSending}>Send Request</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default ExchangeRequestForm;