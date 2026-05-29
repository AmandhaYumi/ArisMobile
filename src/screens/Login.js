import React, { useState } from 'react';
import { Alert, ImageBackground, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';
import Header from '../components/Header';
import { globalStyles } from '../styles/globalStyles';
import { theme } from '../styles/tema';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('admin@aris.com');
  const [senha, setSenha] = useState('123456');

  function handleLogin() {
    if (!email.includes('@') || senha.length < 4) {
      Alert.alert('Dados invalidos', 'Informe um e-mail valido e senha com pelo menos 4 caracteres.');
      return;
    }
    navigation.replace('Dashboard');
  }

  return (
    <View style={globalStyles.screen}>
      <ImageBackground
        source={require('../assets/logo.png')}
        resizeMode="contain"
        imageStyle={{ opacity: 0.12, transform: [{ scale: 2.8 }], top: -120 }}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={globalStyles.safe}>
          <View style={[globalStyles.content, { paddingTop: 14 }]}>
            <Header title="Controle orbital da estufa" subtitle="Acesse o painel para acompanhar telemetria e culturas." />

            <View style={[globalStyles.card, { gap: 14, marginTop: 18 }]}>
              <View>
                <Text style={globalStyles.label}>E-mail</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="usuario@aris.com"
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
                  placeholder="Sua senha"
                  placeholderTextColor={theme.colors.muted}
                  style={globalStyles.input}
                />
              </View>
              <Pressable style={[globalStyles.button, { marginTop: 4 }]} onPress={handleLogin}>
                <Text style={globalStyles.buttonText}>Acessar</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
