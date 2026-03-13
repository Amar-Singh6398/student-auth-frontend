import API from './api';

// Public/General
export const getAllCourses = async () => {
  const response = await API.get('/courses');
  return response.data;
};

export const getCourseById = async (id) => {
  const response = await API.get(`/courses/${id}`);
  return response.data;
};

// Student Enrollment
export const enrollCourse = async (courseId) => {
  const response = await API.post(`/enrollments/${courseId}`);
  return response.data;
};

export const getMyCourses = async () => {
  const response = await API.get('/enrollments');
  return response.data;
};

export const markLessonComplete = async (courseId, lessonId) => {
  const response = await API.post(`/courses/${courseId}/lesson/${lessonId}/complete`);
  return response.data;
};

// Admin Management
export const adminCreateCourse = async (courseData) => {
  const response = await API.post('/courses/admin/create', courseData);
  return response.data;
};

export const adminGetCourses = async () => {
  const response = await API.get('/courses/admin/all');
  return response.data;
};

export const adminDeleteCourse = async (id) => {
  const response = await API.delete(`/courses/admin/${id}`);
  return response.data;
};

export const adminUpdateCourse = async (id, courseData) => {
  const response = await API.put(`/courses/admin/${id}`, courseData);
  return response.data;
};

// Admin Student Management
export const adminEnrollStudent = async (enrollData) => {
  const response = await API.post('/courses/admin/enroll-student', enrollData);
  return response.data;
};

export const getPlatformProgress = async () => {
  const response = await API.get('/courses/admin/platform/progress');
  return response.data;
};
