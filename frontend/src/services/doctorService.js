
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export const fetchDoctors = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/doctors?${queryString}`);
    
    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      const errorMessage = errorBody.error || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

export const addDoctor = async (doctorData) => {
  try {
   
    const requiredFields = ['name', 'title', 'specialty', 'qualifications'];
    for (const field of requiredFields) {
      if (!doctorData[field] || (Array.isArray(doctorData[field]) && doctorData[field].length === 0)) {
        throw new Error(`${field} is required`);
      }
    }

    
    console.log('Sending doctor data to API:', JSON.stringify(doctorData, null, 2));
    
    const response = await fetch(`${API_BASE_URL}/doctors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(doctorData),
    });
    
   
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      
      try {
        const errorBody = await response.json();
        if (errorBody.error) {
          errorMessage = errorBody.error;
        } else if (errorBody.message) {
          errorMessage = errorBody.message;
        }
        console.error('API error details:', errorBody);
      } catch (parseError) {
        console.error('Failed to parse error response:', parseError);
      }
      
      throw new Error(errorMessage);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding doctor:', error);
    throw error;
  }
};