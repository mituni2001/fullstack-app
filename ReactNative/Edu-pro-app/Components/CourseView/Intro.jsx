import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { imageAssets } from '../../constants/options';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Button } from '../../Components/Button';
import { useRouter } from 'expo-router';

export default function Intro({ course }) {
  const router = useRouter();

  return (
    <View>
      <Image
        source={imageAssets[course?.banner_image]}
        style={{ width: '100%', height: 280 }}
        resizeMode="cover"
      />
      <View style={{ padding: 20 }}>
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 25 }}>
          {course?.courseTitle}
        </Text>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 5
        }}>
          <Ionicons name="book-outline" size={20} color="black" />
          <Text style={{
            fontFamily: 'outfit',
            fontSize: 18,
            marginLeft: 5
          }}>
            {course?.chapters?.length || 0} Chapters
          </Text>
        </View>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 20,
          marginTop: 10
        }}>Description:</Text>
        <Text style={{
          fontFamily: 'outfit',
          fontSize: 18,
          color: Colors.GRAY
        }}>{course?.description}</Text>
        <Button text="Start Now" onPress={() => console.log('Start course')} />
      </View>

      <Pressable
        style={{ position: 'absolute', top: 30, left: 10, padding: 10 }}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={34} color="black" />
      </Pressable>
    </View>
  );
}