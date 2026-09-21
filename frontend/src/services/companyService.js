import { apiClient } from './api';

export const fetchCompanies = async (role = null, maxCgpa = null) => {
  try {
    const params = {};
    if (role && role !== 'All') params.role = role;
    if (maxCgpa && maxCgpa !== 'All') params.max_cgpa = maxCgpa;

    const response = await apiClient.get('/companies', { params });
    return response.data;
  } catch (error) {
    console.error('Company API Error:', error);
    throw error;
  }
};
