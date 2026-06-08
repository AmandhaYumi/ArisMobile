import api from './api';

const normalizeNumber = (value) => {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const numericValue = Number(String(value).replace(',', '.'));
  return Number.isNaN(numericValue) ? null : numericValue;
};

const normalizeEstufa = (item) => ({
  id: item.id ?? item.estufaId ?? item.id_estufa ?? null,
  nome: item.nome ?? '',
  localizacao: item.localizacao ?? '',
  usuarioId: item.usuarioId ?? item.idUsuario ?? item.id_usuario ?? '',
});

const buildPayload = (estufa) => ({
  nome: String(estufa.nome ?? '').trim(),
  localizacao: String(estufa.localizacao ?? '').trim(),
  usuarioId: normalizeNumber(estufa.usuarioId),
  idUsuario: normalizeNumber(estufa.usuarioId),
});

export async function listarEstufas() {
  const response = await api.get('/estufas');
  const data = response.data;

  if (Array.isArray(data)) {
    return data.map(normalizeEstufa);
  }

  if (Array.isArray(data?.items)) {
    return data.items.map(normalizeEstufa);
  }

  return [];
}

export async function criarEstufa(estufa) {
  const payload = buildPayload(estufa);
  const response = await api.post('/estufas', payload);
  return normalizeEstufa(response.data ?? payload);
}

export async function atualizarEstufa(id, estufa) {
  const payload = buildPayload(estufa);
  const response = await api.put(`/estufas/${id}`, payload);
  return normalizeEstufa(response.data ?? { ...payload, id });
}

export async function removerEstufa(id) {
  await api.delete(`/estufas/${id}`);
}

export { buildPayload, normalizeEstufa };
