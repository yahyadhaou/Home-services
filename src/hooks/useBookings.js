import { useState } from 'react';
import { bookingService } from '../services';
import { useApp } from '../context/AppContext';

const useBookings = () => {
  const { addBooking } = useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const create = async (bookingData) => {
    setLoading(true);
    setError(null);
    const result = await bookingService.createBooking(bookingData);
    if (result.success) addBooking(result.booking);
    else setError(result.error);
    setLoading(false);
    return result;
  };

  const estimatePrice = (serviceType, urgency = 'normal') =>
    bookingService.estimatePrice(serviceType, urgency);

  return { create, estimatePrice, loading, error };
};

export default useBookings;
