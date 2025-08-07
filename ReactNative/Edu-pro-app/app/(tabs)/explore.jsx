import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const topics = [
  {
    id: '1',
    title: 'Business & Finance',
    image: require('./../../assets/images/business.png'),
  },
  {
    id: '2',
    title: 'Health & Fitness',
    image: require('./../../assets/images/health.png'),
  },
  {
    id: '3',
    title: 'Arts & Creativity',
    image: require('./../../assets/images/art.png'),
  },
  {
    id: '4',
    title: 'Academic',
    image: require('./../../assets/images/academic.png'),
  },
  {
    id: '5',
    title: 'Personal Development',
    image: require('./../../assets/images/personal.png'),
  },
  {
    id: '6',
    title: 'Languages  & Communication',
    image: require('./../../assets/images/language.png'),
  },
];

export default function Explore() {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: '/category/[category]',
          params: { category: item.title },
        })
      }
    >
      <View style={styles.imageWrapper}>
        <Image source={item.image} style={styles.image} />
      </View>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#ffffff', '#ccffcc', '#cceeff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Explore More Courses</Text>

        <FlatList
          data={topics}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1f2937',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    width: (width - 48) / 2,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  imageWrapper: {
    backgroundColor: '#2e2e2e', // dark gray
    borderRadius: 12,
    width: '100%',
    height: 120,
    marginBottom: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    textAlign: 'center',
  },
});









