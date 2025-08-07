import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../constants/colors';

export default function Button({ text, type = "fill", onpress, style }) {
  return (
    <TouchableOpacity
      onPress={onpress}
      style={{
        padding: 15,
        width: '100%',
        borderRadius: 15,
        marginTop: 15,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        backgroundColor: type === 'fill' ? Colors.PRIMARY : Colors.WHITE,
        ...style
      }}
    >
      <Text style={{
        textAlign: 'center',
        fontSize: 18,
        color: type === 'fill' ? Colors.WHITE : Colors.PRIMARY
      }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
