import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import BottomNavigation from '../components/BottomNavigation';
import Header from '../components/Header';
import { API_BASE_URL } from '../services/api';
import { atualizarCultura, criarCultura, listarCulturas, removerCultura } from '../services/culturasService';
import { globalStyles } from '../styles/globalStyles';
import { theme } from '../styles/tema';

const initialForm = {
  nome: '',
  especie: '',
  areaCultivo: '',
  status: 'ATIVA',
};

export default function Plantacoes({ navigation }) {
  const [culturas, setCulturas] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editandoId, setEditandoId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [erro, setErro] = useState('');

  const carregarCulturas = useCallback(async () => {
    setLoading(true);
    setErro('');
    try {
      const data = await listarCulturas();
      setCulturas(data);
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ativo = true;

    async function carregarInicial() {
      try {
        const data = await listarCulturas();
        if (ativo) {
          setCulturas(data);
          setErro('');
        }
      } catch (error) {
        if (ativo) {
          setErro(error.message);
        }
      } finally {
        if (ativo) {
          setLoading(false);
        }
      }
    }

    carregarInicial();

    return () => {
      ativo = false;
    };
  }, []);

  function atualizarCampo(campo, valor) {
    setForm((current) => ({ ...current, [campo]: valor }));
  }

  function validarForm() {
    if (!form.nome.trim() || !form.especie.trim()) {
      Alert.alert('Campos obrigatorios', 'Preencha nome e especie da cultura.');
      return false;
    }
    return true;
  }

  async function salvarCultura() {
    if (!validarForm()) return;

    setSaving(true);
    setErro('');
    try {
      const payload = {
        nome: form.nome.trim(),
        especie: form.especie.trim(),
        areaCultivo: Number(form.areaCultivo) || 0,
        status: form.status.trim() || 'ATIVA',
      };

      if (editandoId) {
        await atualizarCultura(editandoId, payload);
      } else {
        await criarCultura(payload);
      }

      setForm(initialForm);
      setEditandoId(null);
      await carregarCulturas();
    } catch (error) {
      setErro(error.message);
      Alert.alert('Erro na API', error.message);
    } finally {
      setSaving(false);
    }
  }

  function iniciarEdicao(item) {
    setEditandoId(item.id || item.culturaId);
    setForm({
      nome: item.nome || '',
      especie: item.especie || item.tipo || '',
      areaCultivo: String(item.areaCultivo || item.area || ''),
      status: item.status || 'ATIVA',
    });
  }

  function confirmarRemocao(item) {
    const id = item.id || item.culturaId;
    Alert.alert('Remover cultura', `Deseja remover ${item.nome}?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: async () => {
          try {
            await removerCultura(id);
            await carregarCulturas();
          } catch (error) {
            setErro(error.message);
            Alert.alert('Erro na API', error.message);
          }
        },
      },
    ]);
  }

  return (
    <View style={globalStyles.screen}>
      <SafeAreaView style={globalStyles.safe}>
        <FlatList
          data={culturas}
          keyExtractor={(item, index) => String(item.id || item.culturaId || index)}
          ListHeaderComponent={
            <View style={[globalStyles.content, { paddingBottom: 12, paddingTop: 12 }]}>
              <Header
                title="Culturas agricolas"
                subtitle="CRUD integrado com a API REST de backend Java ou .NET."
              />

              <View style={[globalStyles.card, { gap: 12 }]}>
                <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: '900' }}>
                  {editandoId ? 'Editar cultura' : 'Nova cultura'}
                </Text>
                <View>
                  <Text style={globalStyles.label}>Nome</Text>
                  <TextInput
                    value={form.nome}
                    onChangeText={(value) => atualizarCampo('nome', value)}
                    placeholder="Tomate marciano"
                    placeholderTextColor={theme.colors.muted}
                    style={globalStyles.input}
                  />
                </View>
                <View>
                  <Text style={globalStyles.label}>Especie</Text>
                  <TextInput
                    value={form.especie}
                    onChangeText={(value) => atualizarCampo('especie', value)}
                    placeholder="Solanum lycopersicum"
                    placeholderTextColor={theme.colors.muted}
                    style={globalStyles.input}
                  />
                </View>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={globalStyles.label}>Area m2</Text>
                    <TextInput
                      value={form.areaCultivo}
                      onChangeText={(value) => atualizarCampo('areaCultivo', value)}
                      keyboardType="numeric"
                      placeholder="12"
                      placeholderTextColor={theme.colors.muted}
                      style={globalStyles.input}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={globalStyles.label}>Status</Text>
                    <TextInput
                      value={form.status}
                      onChangeText={(value) => atualizarCampo('status', value)}
                      placeholder="ATIVA"
                      placeholderTextColor={theme.colors.muted}
                      style={globalStyles.input}
                    />
                  </View>
                </View>
                <Pressable style={globalStyles.button} onPress={salvarCultura} disabled={saving}>
                  {saving ? <ActivityIndicator color={theme.colors.text} /> : <Text style={globalStyles.buttonText}>Salvar na API</Text>}
                </Pressable>
                {editandoId ? (
                  <Pressable
                    onPress={() => {
                      setEditandoId(null);
                      setForm(initialForm);
                    }}
                  >
                    <Text style={{ color: theme.colors.accent, textAlign: 'center', fontWeight: '800' }}>Cancelar edicao</Text>
                  </Pressable>
                ) : null}
              </View>

              <Text style={{ color: theme.colors.muted, fontSize: 12, marginTop: 14 }}>
                API configurada: {API_BASE_URL}/culturas
              </Text>
              {erro ? <Text style={{ color: theme.colors.danger, marginTop: 8 }}>{erro}</Text> : null}
              {loading ? <ActivityIndicator style={{ marginTop: 18 }} color={theme.colors.accent} /> : null}
            </View>
          }
          renderItem={({ item }) => (
            <View style={[globalStyles.card, { marginHorizontal: 24, marginBottom: 12 }]}>
              <View style={globalStyles.spaceBetween}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: theme.colors.text, fontSize: 17, fontWeight: '900' }}>{item.nome}</Text>
                  <Text style={{ color: theme.colors.muted, marginTop: 4 }}>{item.especie || item.tipo}</Text>
                </View>
                <Text style={{ color: theme.colors.green, fontWeight: '900' }}>{item.status || 'ATIVA'}</Text>
              </View>
              <Text style={{ color: theme.colors.muted, marginTop: 10 }}>
                Area de cultivo: {item.areaCultivo || item.area || 0} m2
              </Text>
              <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
                <Pressable
                  style={[globalStyles.button, { flex: 1, minHeight: 42, backgroundColor: theme.colors.surfaceSoft }]}
                  onPress={() => iniciarEdicao(item)}
                >
                  <Text style={globalStyles.buttonText}>Editar</Text>
                </Pressable>
                <Pressable
                  style={[globalStyles.button, { flex: 1, minHeight: 42, backgroundColor: theme.colors.primaryDark }]}
                  onPress={() => confirmarRemocao(item)}
                >
                  <Text style={globalStyles.buttonText}>Excluir</Text>
                </Pressable>
              </View>
            </View>
          )}
          ListEmptyComponent={
            !loading ? (
              <Text style={{ color: theme.colors.muted, textAlign: 'center', marginHorizontal: 24, marginTop: 18 }}>
                Nenhuma cultura retornada pela API.
              </Text>
            ) : null
          }
          contentContainerStyle={{ paddingBottom: 110 }}
        />
        <BottomNavigation navigation={navigation} active="Plantacoes" />
      </SafeAreaView>
    </View>
  );
}
