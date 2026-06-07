import React from 'react';
import { Image, ImageBackground, SafeAreaView, ScrollView, Text, View } from 'react-native';
import BottomNavigation from '../components/BottomNavigation';
import { globalStyles } from '../styles/globalStyles';
import { theme } from '../styles/tema';

const alertas = [
  { id: 1, titulo: 'Pouca umidade no solo', detalhe: 'O solo pode ficar seco nas próximas 2 horas.', nivel: 'ALTO' },
  { id: 2, titulo: 'Luz abaixo do ideal', detalhe: 'Pode valer a pena ligar os LEDs no próximo ciclo.', nivel: 'MEDIO' },
  { id: 3, titulo: 'Tempo mudando', detalhe: 'A previsão mostra queda de temperatura ao longo do dia.', nivel: 'MEDIO' },
];

export default function Alertas({ navigation }) {
  return (
    <View style={globalStyles.screen}>
      <ImageBackground source={require('../assets/fundo.png')} resizeMode="cover" style={globalStyles.backgroundImage}>
        <View style={globalStyles.overlay}>
          <SafeAreaView style={globalStyles.safe}>
            <ScrollView
              contentContainerStyle={[
                globalStyles.content,
                {
                  flexGrow: 1,
                  justifyContent: 'center',
                  paddingTop: 8,
                  paddingBottom: 120,
                },
              ]}
            >
              <View style={{ alignItems: 'center', marginBottom: 18 }}>
                <Image source={require('../assets/logo.png')} resizeMode="contain" style={{ width: 130, height: 46 }} />
                <Text style={{ color: theme.colors.muted, textAlign: 'center', marginTop: 10, lineHeight: 21 }}>
                  Os avisos mais recentes ficam aqui.
                </Text>
              </View>

              <View style={{ gap: 12 }}>
                {alertas.map((alerta) => (
                  <View key={alerta.id} style={globalStyles.cardStrong}>
                    <View style={globalStyles.spaceBetween}>
                      <Text style={{ color: theme.colors.text, fontSize: 17, fontWeight: '900', flex: 1 }}>
                        {alerta.titulo}
                      </Text>
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
              </View>
            </ScrollView>
            <BottomNavigation navigation={navigation} active="Alertas" />
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
}
