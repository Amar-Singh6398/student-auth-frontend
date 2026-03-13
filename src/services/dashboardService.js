import API from '../api/axios';

export const getStudentStats = async () => {
  const response = await API.get('/api/dashboard/student');
  return response.data;
};

export const getAdminStats = async () => {
  const response = await API.get('/api/dashboard/admin');
  return response.data;
};
