import React from 'react';
import { Image, ImageBackground, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import BottomNavigation from '../components/BottomNavigation';
import NavigationCard from '../components/NavigationCard';
import { useAuth } from '../context/AuthContext';
import { globalStyles } from '../styles/globalStyles';
import { theme } from '../styles/tema';

export default function Dashboard({ navigation }) {
  const { user } = useAuth();

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
              <View style={[globalStyles.cardStrong, { gap: 14, marginBottom: 18 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                  <Image source={require('../assets/logo.png')} resizeMode="contain" style={{ width: 130, height: 46 }} />
                  <View style={{ flex: 1, alignItems: 'flex-start' }}>
                    <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: '900', textAlign: 'left' }}>
                      {`Oi${user?.name ? `, ${user.name}` : ''}`}
                    </Text>
                    <Text style={{ color: theme.colors.muted, lineHeight: 21, textAlign: 'left', marginTop: 6 }}>
                      Aqui você vê o que importa sem perder tempo.
                    </Text>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-start' }}>
                  <View style={globalStyles.chip}>
                    <Text style={globalStyles.chipText}>Ativo</Text>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 }}>
                <NavigationCard title="Temperatura" value="24.8 C" detail="Faixa ideal" color={theme.colors.primary} />
                <NavigationCard title="Umidade" value="62%" detail="Solo estavel" color={theme.colors.green} />
                <NavigationCard title="Luz" value="78%" detail="LEDs ativos" color={theme.colors.accent} />
                <NavigationCard
                  title="Culturas"
                  value="Cultivos"
                  detail="Abrir cadastro"
                  color={theme.colors.cyan}
                  onPress={() => navigation.navigate('Plantacoes')}
                />
              </View>

              <View style={[globalStyles.cardStrong, { marginTop: 18, gap: 12 }]}>
                <View style={globalStyles.spaceBetween}>
                  <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: '900' }}>Irrigação</Text>
                  <Text style={{ color: theme.colors.green, fontWeight: '900' }}>Auto</Text>
                </View>
                <Text style={{ color: theme.colors.muted, lineHeight: 21 }}>
                  Os dados chegam da API e você acompanha tudo de forma rápida, sem tela carregada demais.
                </Text>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <Pressable
                    style={[globalStyles.buttonSecondary, { flex: 1 }]}
                    onPress={() => navigation.navigate('Alertas')}
                  >
                    <Text style={globalStyles.buttonSecondaryText}>Ver alertas</Text>
                  </Pressable>
                  <Pressable
                    style={[globalStyles.button, { flex: 1 }]}
                    onPress={() => navigation.navigate('Perfil')}
                  >
                    <Text style={globalStyles.buttonText}>Perfil</Text>
                  </Pressable>
                </View>
              </View>
            </ScrollView>
            <BottomNavigation navigation={navigation} active="Dashboard" />
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
}
