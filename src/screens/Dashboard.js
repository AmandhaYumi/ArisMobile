import React from 'react';
import { ImageBackground, SafeAreaView, ScrollView, Text, View } from 'react-native';
import BottomNavigation from '../components/BottomNavigation';
import Header from '../components/Header';
import NavigationCard from '../components/NavigationCard';
import { globalStyles } from '../styles/globalStyles';
import { theme } from '../styles/tema';

export default function Dashboard({ navigation }) {
  return (
    <View style={globalStyles.screen}>
      <ImageBackground
        source={require('../assets/logo.png')}
        resizeMode="contain"
        imageStyle={{ opacity: 0.1, transform: [{ scale: 3 }], top: -220 }}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={globalStyles.safe}>
          <ScrollView contentContainerStyle={[globalStyles.content, { paddingTop: 12 }]}>
            <Header title="Estufa Ares-01" subtitle="Telemetria em tempo real para cultivo resiliente." />

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 }}>
              <NavigationCard title="Temperatura" value="24.8C" detail="Faixa ideal" color={theme.colors.primary} />
              <NavigationCard title="Solo" value="62%" detail="Umidade estavel" color={theme.colors.green} />
              <NavigationCard title="Luz" value="78%" detail="LEDs em ciclo" color={theme.colors.accent} />
              <NavigationCard
                title="Culturas"
                value="CRUD"
                detail="Gerenciar plantios"
                color={theme.colors.cyan}
                onPress={() => navigation.navigate('Plantacoes')}
              />
            </View>

            <View style={[globalStyles.card, { marginTop: 18 }]}>
              <View style={globalStyles.spaceBetween}>
                <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: '900' }}>Irrigacao inteligente</Text>
                <Text style={{ color: theme.colors.green, fontWeight: '900' }}>AUTO</Text>
              </View>
              <Text style={{ color: theme.colors.muted, lineHeight: 21, marginTop: 10 }}>
                A API recebe sensores IoT, cruza clima e solo, e recomenda irrigacao quando ha risco de seca.
              </Text>
            </View>
          </ScrollView>
          <BottomNavigation navigation={navigation} active="Dashboard" />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
