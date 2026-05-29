import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import BottomNavigation from '../components/BottomNavigation';
import Header from '../components/Header';
import { globalStyles } from '../styles/globalStyles';
import { theme } from '../styles/tema';

const alertas = [
  { id: 1, titulo: 'Risco de baixa umidade', detalhe: 'Solo abaixo de 35% nas proximas 2 horas.', nivel: 'ALTO' },
  { id: 2, titulo: 'Luminosidade reduzida', detalhe: 'Ativar LEDs de crescimento no ciclo noturno.', nivel: 'MEDIO' },
  { id: 3, titulo: 'Clima externo instavel', detalhe: 'API climatica indica queda brusca de temperatura.', nivel: 'MEDIO' },
];

export default function Alertas({ navigation }) {
  return (
    <View style={globalStyles.screen}>
      <SafeAreaView style={globalStyles.safe}>
        <ScrollView contentContainerStyle={[globalStyles.content, { paddingTop: 12 }]}>
          <Header title="Alertas preditivos" subtitle="Sinais de risco gerados por sensores e analise climatica." />

          {alertas.map((alerta) => (
            <View key={alerta.id} style={[globalStyles.card, { marginBottom: 12 }]}>
              <View style={globalStyles.spaceBetween}>
                <Text style={{ color: theme.colors.text, fontSize: 17, fontWeight: '900', flex: 1 }}>{alerta.titulo}</Text>
                <Text
                  style={{
                    color: alerta.nivel === 'ALTO' ? theme.colors.danger : theme.colors.warning,
                    fontWeight: '900',
                  }}
                >
                  {alerta.nivel}
                </Text>
              </View>
              <Text style={{ color: theme.colors.muted, lineHeight: 21, marginTop: 10 }}>{alerta.detalhe}</Text>
            </View>
          ))}
        </ScrollView>
        <BottomNavigation navigation={navigation} active="Alertas" />
      </SafeAreaView>
    </View>
  );
}
