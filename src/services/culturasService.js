import { api } from './api';

const endpoint = '/culturas';

export async function listarCulturas() {
  const { data } = await api.get(endpoint);
  return Array.isArray(data) ? data : data.content || data.data || [];
}

export async function criarCultura(cultura) {
  const { data } = await api.post(endpoint, cultura);
  return data;
}

export async function atualizarCultura(id, cultura) {
  const { data } = await api.put(`${endpoint}/${id}`, cultura);
  return data;
}

export async function removerCultura(id) {
  await api.delete(`${endpoint}/${id}`);
}
