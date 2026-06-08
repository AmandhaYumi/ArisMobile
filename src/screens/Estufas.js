import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { getApiBaseUrl } from '../services/api';
import {
  criarEstufa,
  atualizarEstufa,
  listarEstufas,
  removerEstufa,
} from '../services/estufasService';

const emptyForm = {
  nome: '',
  localizacao: '',
  usuarioId: '',
};

const Estufas = () => {
  const [estufas, setEstufas] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const carregarEstufas = async () => {
    try {
      setError('');
      const data = await listarEstufas();
      setEstufas(data);
    } catch (err) {
      setError(err.message || 'Não foi possível carregar as estufas.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    carregarEstufas();
  }, []);

  const limparFormulario = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const preencherEdicao = (item) => {
    setEditingId(item.id);
    setForm({
      nome: String(item.nome ?? ''),
      localizacao: String(item.localizacao ?? ''),
      usuarioId: String(item.usuarioId ?? ''),
    });
  };

  const validarFormulario = () => {
    if (!form.nome.trim()) {
      return 'Informe o nome da estufa.';
    }

    if (!form.usuarioId.toString().trim()) {
      return 'Informe o ID do usuário responsável.';
    }

    return '';
  };

  const salvar = async () => {
    const validationMessage = validarFormulario();

    if (validationMessage) {
      Alert.alert('Atenção', validationMessage);
      return;
    }

    try {
      setSaving(true);

      if (editingId) {
        await atualizarEstufa(editingId, form);
        Alert.alert('Sucesso', 'Estufa atualizada com sucesso.');
      } else {
        await criarEstufa(form);
        Alert.alert('Sucesso', 'Estufa cadastrada com sucesso.');
      }

      limparFormulario();
      await carregarEstufas();
    } catch (err) {
      Alert.alert('Erro', err.message || 'Não foi possível salvar a estufa.');
    } finally {
      setSaving(false);
    }
  };

  const confirmarExclusao = (item) => {
    Alert.alert('Excluir estufa', `Deseja excluir "${item.nome}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            setSaving(true);
            await removerEstufa(item.id);
            Alert.alert('Sucesso', 'Estufa removida com sucesso.');
            if (editingId === item.id) {
              limparFormulario();
            }
            await carregarEstufas();
          } catch (err) {
            Alert.alert('Erro', err.message || 'Não foi possível excluir a estufa.');
          } finally {
            setSaving(false);
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{item.nome}</Text>
          <Text style={styles.cardSubtitle}>{item.localizacao || 'Sem localização'}</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>ID {item.id}</Text>
        </View>
      </View>

      <Text style={styles.cardText}>Usuário responsável: {item.usuarioId}</Text>

      <View style={styles.rowActions}>
        <Pressable style={[styles.actionButton, styles.editButton]} onPress={() => preencherEdicao(item)}>
          <Text style={styles.actionButtonText}>Editar</Text>
        </Pressable>
        <Pressable
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => confirmarExclusao(item)}
          disabled={saving}
        >
          <Text style={styles.actionButtonText}>Excluir</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FlatList
          data={estufas}
          keyExtractor={(item) => String(item.id)}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                carregarEstufas();
              }}
            />
          }
          ListHeaderComponent={(
            <ScrollView scrollEnabled={false}>
              <View style={styles.header}>
                <Text style={styles.kicker}>ARIS</Text>
                <Text style={styles.title}>Estufas inteligentes</Text>
                <Text style={styles.subtitle}>
                  Gerencie as estufas conectadas ao backend .NET com dados reais da API.
                </Text>
              </View>

              <View style={styles.formCard}>
                <Text style={styles.sectionTitle}>
                  {editingId ? `Editando estufa #${editingId}` : 'Nova estufa'}
                </Text>

                <Text style={styles.label}>Nome</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex.: Estufa Solar A"
                  placeholderTextColor="#7e9299"
                  value={form.nome}
                  onChangeText={(value) => setForm((current) => ({ ...current, nome: value }))}
                />

                <Text style={styles.label}>Localização</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex.: São Paulo - SP"
                  placeholderTextColor="#7e9299"
                  value={form.localizacao}
                  onChangeText={(value) => setForm((current) => ({ ...current, localizacao: value }))}
                />

                <Text style={styles.label}>ID do usuário responsável</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex.: 1"
                  placeholderTextColor="#7e9299"
                  keyboardType="numeric"
                  value={form.usuarioId}
                  onChangeText={(value) => setForm((current) => ({ ...current, usuarioId: value }))}
                />

                <View style={styles.rowActions}>
                  <Pressable style={styles.primaryButton} onPress={salvar} disabled={saving}>
                    {saving ? (
                      <ActivityIndicator color="#08161b" />
                    ) : (
                      <Text style={styles.primaryButtonText}>
                        {editingId ? 'Atualizar' : 'Salvar'}
                      </Text>
                    )}
                  </Pressable>

                  <Pressable
                    style={styles.secondaryButton}
                    onPress={limparFormulario}
                    disabled={saving}
                  >
                    <Text style={styles.secondaryButtonText}>Limpar</Text>
                  </Pressable>
                </View>

                <Text style={styles.helper}>Base URL: {getApiBaseUrl()}</Text>
              </View>

              <View style={styles.listHeader}>
                <Text style={styles.sectionTitle}>Estufas cadastradas</Text>
                {loading ? <ActivityIndicator color="#8ed3c7" /> : null}
              </View>

              {error ? <Text style={styles.error}>{error}</Text> : null}
            </ScrollView>
          )}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            !loading ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>Nenhuma estufa cadastrada</Text>
                <Text style={styles.emptySubtitle}>
                  Use o formulário acima para criar a primeira estufa.
                </Text>
              </View>
            ) : null
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#08161b',
  },
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  kicker: {
    color: '#8ed3c7',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  title: {
    color: '#f4f7f7',
    fontSize: 28,
    fontWeight: '800',
    marginTop: 6,
  },
  subtitle: {
    color: '#a8b8bf',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  formCard: {
    backgroundColor: '#102229',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: '#1d3841',
    marginTop: 10,
  },
  sectionTitle: {
    color: '#f4f7f7',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  label: {
    color: '#dce7ea',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#0a1519',
    color: '#f4f7f7',
    borderWidth: 1,
    borderColor: '#23414b',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
  },
  rowActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#8ed3c7',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#08161b',
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryButton: {
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2d4c56',
  },
  secondaryButtonText: {
    color: '#dce7ea',
    fontWeight: '700',
  },
  helper: {
    marginTop: 14,
    color: '#7f97a0',
    fontSize: 12,
  },
  listHeader: {
    marginTop: 18,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  error: {
    color: '#ff8d8d',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#102229',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1d3841',
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  cardTitle: {
    color: '#f4f7f7',
    fontSize: 18,
    fontWeight: '800',
  },
  cardSubtitle: {
    color: '#8fb2bb',
    marginTop: 4,
  },
  badge: {
    backgroundColor: '#17323b',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    color: '#8ed3c7',
    fontWeight: '800',
    fontSize: 12,
  },
  cardText: {
    color: '#cfe0e4',
    marginTop: 4,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#274b44',
  },
  deleteButton: {
    backgroundColor: '#4f2323',
  },
  actionButtonText: {
    color: '#f4f7f7',
    fontWeight: '800',
  },
  emptyState: {
    paddingVertical: 28,
    alignItems: 'center',
  },
  emptyTitle: {
    color: '#f4f7f7',
    fontSize: 16,
    fontWeight: '800',
  },
  emptySubtitle: {
    color: '#8fb2bb',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default Estufas;
