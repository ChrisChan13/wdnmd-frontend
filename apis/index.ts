import request from '../utils/request';

export const getLabels = () => request('/labels');

export const getProfile = () => request('/profile');
