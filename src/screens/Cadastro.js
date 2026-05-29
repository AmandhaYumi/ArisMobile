import React, { useState } from 'react';
import { Alert, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import BottomNavigation from '../components/BottomNavigation';
import Header from '../components/Header';
import { globalStyles } from '../styles/globalStyles';
import { theme } from '../styles/tema';

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('Equipe ARIS');
  const [estufa, setEstufa] = useState('Ares-01');
  const [local, setLocal] = useState('Sao Paulo');

  function salvarPerfil() {
    Alert.alert('Perfil atualizado', 'Dados prontos para envio ao endpoint de usuarios/estufas.');
  }

  return (
    <View style={globalStyles.screen}>
      <SafeAreaView style={globalStyles.safe}>
        <ScrollView contentContainerStyle={[globalStyles.content, { paddingTop: 12 }]}>
          <Header title="Perfil da missao" subtitle="Dados do operador e da estufa inteligente monitorada." />

          <View style={[globalStyles.card, { gap: 14 }]}>
            <View>
              <Text style={globalStyles.label}>Integrantes / operador</Text>
              <TextInput value={nome} onChangeText={setNome} style={globalStyles.input} placeholderTextColor={theme.colors.muted} />
            </View>
            <View>
              <Text style={globalStyles.label}>Estufa</Text>
              <TextInput value={estufa} onChangeText={setEstufa} style={globalStyles.input} placeholderTextColor={theme.colors.muted} />
            </View>
            <View>
              <Text style={globalStyles.label}>Local</Text>
              <TextInput value={local} onChangeText={setLocal} style={globalStyles.input} placeholderTextColor={theme.colors.muted} />
            </View>
            <Pressable style={globalStyles.button} onPress={salvarPerfil}>
              <Text style={globalStyles.buttonText}>Salvar perfil</Text>
            </Pressable>
          </View>
        </ScrollView>
        <BottomNavigation navigation={navigation} active="Cadastro" />
      </SafeAreaView>
    </View>
  );
}
