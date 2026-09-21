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

export const fetchCareerPaths = async (skills = [], cgpa = 8.0) => {
  try {
    const response = await apiClient.post('/career-paths', { skills, cgpa });
    return response.data;
  } catch (error) {
    console.error('Career Paths API Error:', error);
    throw error;
  }
};
