import React from 'react';
import { Image, Text, View } from 'react-native';
import { theme } from '../styles/tema';

export default function Header({ eyebrow = 'ARIS', title, subtitle }) {
  return (
    <View style={{ paddingTop: 18, paddingBottom: 18 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Image source={require('../assets/logo.png')} style={{ width: 38, height: 38, borderRadius: 8 }} />
        <Text style={{ color: theme.colors.accent, fontSize: 12, fontWeight: '800', letterSpacing: 0 }}>
          {eyebrow}
        </Text>
      </View>
      <Text style={{ color: theme.colors.text, fontSize: 30, fontWeight: '900', marginTop: 14 }}>
        {title}
      </Text>
      {subtitle ? (
        <Text style={{ color: theme.colors.muted, fontSize: 14, lineHeight: 21, marginTop: 8 }}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
