import API from '../api/axios';

// Public/General
export const getAllCourses = async () => {
  const response = await API.get('/api/courses');
  return response.data.courses;
};

export const getCourseById = async (id) => {
  const response = await API.get(`/api/courses/${id}`);
  return response.data.course;
};

// Student Enrollment
export const enrollCourse = async (courseId) => {
  const response = await API.post(`/api/courses/enroll/${courseId}`);
  return response.data;
};

export const getMyCourses = async () => {
  const response = await API.get('/api/courses/my/list');
  return response.data.courses;
};

export const markLessonComplete = async (courseId, lessonId) => {
  const response = await API.post(`/api/courses/${courseId}/lesson/${lessonId}/complete`);
  return response.data;
};

// Admin Management
export const adminCreateCourse = async (courseData) => {
  const response = await API.post('/api/courses/admin/create', courseData);
  return response.data;
};

export const adminGetCourses = async () => {
  const response = await API.get('/api/courses/admin/all');
  return response.data.courses;
};

export const adminDeleteCourse = async (id) => {
  const response = await API.delete(`/api/courses/admin/${id}`);
  return response.data;
};

export const adminUpdateCourse = async (id, courseData) => {
  const response = await API.put(`/api/courses/admin/${id}`, courseData);
  return response.data;
};

// Admin Student Management
export const adminEnrollStudent = async (enrollData) => {
  const response = await API.post('/api/courses/admin/enroll-student', enrollData);
  return response.data;
};

export const getPlatformProgress = async () => {
  const response = await API.get('/api/courses/admin/platform/progress');
  return response.data.progress;
};
