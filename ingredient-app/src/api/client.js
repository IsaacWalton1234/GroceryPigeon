import axios from 'axios';

const API_URL = 'https://api.example.com/ingredients'; // Replace with the actual API URL

export const fetchIngredientData = async (ingredient) => {
    try {
        const response = await axios.get(`${API_URL}?ingredient=${ingredient}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching ingredient data:', error);
        throw error;
    }
};