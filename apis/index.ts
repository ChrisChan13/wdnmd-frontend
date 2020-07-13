import request from '../utils/request';

export const getLabels = () => request('/labels');

export const getProfile = () => request('/profile');

export const getHeatmap = () => request('/heatmap');

export const getArticles = (label?: string) => request(`/articles${label ? `?label=${label}` : ''}`);

export const getArticle = (id: string) => request(`/articles/${id}`);
