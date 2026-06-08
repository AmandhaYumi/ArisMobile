import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import api, { getApiBaseUrl, setAuthToken } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('admin@aris.local');
  const [senha, setSenha] = useState('Admin@123');
  const [loading, setLoading] = useState(false);

  const extractToken = (data) =>
    data?.token ?? data?.accessToken ?? data?.jwt ?? data?.jwtToken ?? data?.access_token ?? null;

  const extractUser = (data) =>
    data?.user ?? data?.usuario ?? data?.data?.user ?? data?.data?.usuario ?? null;

  const handleLogin = async () => {
    const emailTrimmed = email.trim().toLowerCase();

    if (!emailTrimmed || !senha.trim()) {
      Alert.alert('Atenção', 'Preencha e-mail e senha para entrar.');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/auth/login', {
        email: emailTrimmed,
        senha,
      });

      const token = extractToken(response.data);
      const user = extractUser(response.data) ?? { email: emailTrimmed };

      if (!token) {
        throw new Error('A API não retornou o token JWT.');
      }

      setAuthToken(token);
      signIn({ user, token });
    } catch (error) {
      Alert.alert('Erro no login', error.message || 'Não foi possível autenticar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.hero}>
            <Text style={styles.kicker}>ARIS</Text>
            <Text style={styles.title}>Agricultura Inteligente Espacial</Text>
            <Text style={styles.subtitle}>
              Acesse o painel da solução conectada ao backend .NET.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="admin@aris.local"
              placeholderTextColor="#8b9aa6"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Sua senha"
              placeholderTextColor="#8b9aa6"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />

            <Pressable style={styles.button} onPress={handleLogin} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#08161b" />
              ) : (
                <Text style={styles.buttonText}>Entrar</Text>
              )}
            </Pressable>

            <Text style={styles.helper}>
              API configurada em {getApiBaseUrl()}
            </Text>
          </View>
        </ScrollView>
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
  content: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  hero: {
    marginBottom: 24,
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
    fontSize: 32,
    fontWeight: '800',
    marginTop: 8,
    marginBottom: 8,
  },
  subtitle: {
    color: '#a8b8bf',
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#102229',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1d3841',
  },
  label: {
    color: '#dce7ea',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#0a1519',
    color: '#f4f7f7',
    borderWidth: 1,
    borderColor: '#23414b',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#8ed3c7',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#08161b',
    fontSize: 16,
    fontWeight: '800',
  },
  helper: {
    marginTop: 16,
    color: '#7f97a0',
    fontSize: 12,
  },
});

export default Login;
