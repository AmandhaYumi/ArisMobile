import React from 'react';
import { Image, ImageBackground, Pressable, SafeAreaView, Text, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { theme } from '../styles/tema';

export default function Inicial({ navigation }) {
  return (
    <View style={globalStyles.screen}>
      <ImageBackground
        source={require('../assets/logo.png')}
        resizeMode="contain"
        imageStyle={{ opacity: 0.2, transform: [{ scale: 3.4 }], top: -160 }}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={[globalStyles.safe, { justifyContent: 'space-between', padding: 26 }]}>
          <View style={{ alignItems: 'flex-end' }}>
            <View
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                borderColor: theme.colors.border,
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: theme.colors.accent, fontWeight: '900' }}>AI</Text>
            </View>
          </View>

          <View>
            <Image source={require('../assets/logo.png')} style={{ width: 78, height: 78, borderRadius: 18, marginBottom: 18 }} />
            <Text style={{ color: theme.colors.text, fontSize: 42, fontWeight: '900' }}>ARIS</Text>
            <Text style={{ color: theme.colors.accent, fontSize: 16, fontWeight: '800', marginTop: 4 }}>
              Agricultura Inteligente Espacial
            </Text>
            <Text style={{ color: theme.colors.muted, fontSize: 14, lineHeight: 22, marginTop: 18 }}>
              Monitore estufas, sensores IoT e irrigacao com tecnologia inspirada em ambientes extremos.
            </Text>
          </View>

          <Pressable style={globalStyles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={globalStyles.buttonText}>Entrar na plataforma</Text>
          </Pressable>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
