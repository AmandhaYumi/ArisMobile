import React, { useState } from 'react';
import { Alert, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { globalStyles } from '../styles/globalStyles';
import { theme } from '../styles/tema';

export default function Login({ navigation }) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [entrando, setEntrando] = useState(false);

  function voltarInicio() {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Inicial' }],
    });
  }

  async function entrar() {
    const emailTratado = email.trim().toLowerCase();

    if (!emailTratado || !senha.trim()) {
      Alert.alert('Login incompleto', 'Informe email e senha.');
      return;
    }

    try {
      setEntrando(true);

      signIn({
        name: emailTratado.split('@')[0] || 'Usuario',
        email: emailTratado,
        source: 'login',
      });

      navigation.reset({
        index: 0,
        routes: [{ name: 'Perfil' }],
      });
    } catch {
      Alert.alert('Erro', 'Nao foi possivel fazer login.');
    } finally {
      setEntrando(false);
    }
  }

  return (
    <View style={globalStyles.screen}>
      <ImageBackground source={require('../assets/fundo.png')} resizeMode="cover" style={globalStyles.backgroundImage}>
        <View style={globalStyles.overlay}>
          <SafeAreaView style={globalStyles.safe}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={[
                globalStyles.content,
                {
                  flexGrow: 1,
                  justifyContent: 'center',
                  paddingTop: 8,
                  paddingBottom: 36,
                },
              ]}
            >
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Voltar para a tela inicial"
                onPress={voltarInicio}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 14,
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  marginBottom: 18,
                }}
              >
                <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: '900' }}>{'<'}</Text>
              </Pressable>

              <Image
                source={require('../assets/logo.png')}
                resizeMode="contain"
                style={{ width: 170, height: 70, alignSelf: 'center', marginBottom: 18 }}
              />

              <View style={{ alignItems: 'center', marginBottom: 18 }}>
                <Text style={{ color: theme.colors.text, fontSize: 28, fontWeight: '900' }}>Login</Text>
                <Text
                  style={{
                    color: theme.colors.muted,
                    fontSize: 14,
                    lineHeight: 21,
                    textAlign: 'center',
                    marginTop: 6,
                    maxWidth: 280,
                  }}
                >
                  Entre para continuar de onde parou.
                </Text>
              </View>

              <View style={[globalStyles.cardStrong, { borderRadius: 18, paddingVertical: 22, gap: 14 }]}>
                <View>
                  <Text style={globalStyles.label}>Email</Text>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="Digite seu email"
                    placeholderTextColor={theme.colors.muted}
                    style={globalStyles.input}
                  />
                </View>

                <View>
                  <Text style={globalStyles.label}>Senha</Text>
                  <TextInput
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry
                    placeholder="Digite sua senha"
                    placeholderTextColor={theme.colors.muted}
                    style={globalStyles.input}
                  />
                </View>

                <Pressable
                  style={[globalStyles.button, { marginTop: 6, marginHorizontal: 20 }]}
                  onPress={entrar}
                  disabled={entrando}
                >
                  <Text style={globalStyles.buttonText}>{entrando ? 'Entrando...' : 'Login'}</Text>
                </Pressable>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
}
