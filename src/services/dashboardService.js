import API from './api';

export const getStudentStats = async () => {
  const response = await API.get('/dashboard/student');
  return response.data;
};

export const getAdminStats = async () => {
  const response = await API.get('/dashboard/admin');
  return response.data;
};
