import api from './api';

const normalizeNumber = (value) => {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const numericValue = Number(String(value).replace(',', '.'));
  return Number.isNaN(numericValue) ? null : numericValue;
};

const normalizeCulture = (item) => ({
  id: item.id ?? item.culturaId ?? item.id_cultura ?? null,
  nome: item.nome ?? '',
  estufaId: item.estufaId ?? item.idEstufa ?? item.id_estufa ?? '',
  tempMin: item.tempMin ?? item.temp_min ?? '',
  tempMax: item.tempMax ?? item.temp_max ?? '',
  umidadeMin: item.umidadeMin ?? item.umidade_min ?? '',
  umidadeMax: item.umidadeMax ?? item.umidade_max ?? '',
});

const buildPayload = (culture) => ({
  nome: String(culture.nome ?? '').trim(),
  estufaId: normalizeNumber(culture.estufaId),
  tempMin: normalizeNumber(culture.tempMin),
  tempMax: normalizeNumber(culture.tempMax),
  umidadeMin: normalizeNumber(culture.umidadeMin),
  umidadeMax: normalizeNumber(culture.umidadeMax),
});

export async function listarCulturas() {
  const response = await api.get('/culturas');
  const data = response.data;

  if (Array.isArray(data)) {
    return data.map(normalizeCulture);
  }

  if (Array.isArray(data?.items)) {
    return data.items.map(normalizeCulture);
  }

  return [];
}

export async function criarCultura(cultura) {
  const response = await api.post('/culturas', buildPayload(cultura));
  return normalizeCulture(response.data ?? buildPayload(cultura));
}

export async function atualizarCultura(id, cultura) {
  const response = await api.put(`/culturas/${id}`, buildPayload(cultura));
  return normalizeCulture(response.data ?? { ...buildPayload(cultura), id });
}

export async function removerCultura(id) {
  await api.delete(`/culturas/${id}`);
}

export { buildPayload, normalizeCulture };
