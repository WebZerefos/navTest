import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {useNavigation} from '@react-navigation/native';

const Onboarding = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image style={styles.image} source={require('../../assets/Pink.png')} />

        <View style={styles.footer} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Best task management app</Text>
        <Text style={styles.subtitle}>
          Get organized by sorting out all your tasks and boost your
          productivity.
        </Text>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.btnText}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.btnText}>Get started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(Onboarding);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    flex: 1,
  },
  content: {
    padding: 46,
    paddingTop: 0,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    flex: 1,
  },
  title: {
    color: '#36454f', // Blue-Grey Color Palette
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    color: '#536878', // Blue-Grey Color Palette
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 20,
  },
  loginBtn: {
    backgroundColor: '#004c4c', // Shades of Teal
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  startBtn: {
    backgroundColor: '#66b2b2', //Shades of Teal
    padding: 12,
    alignItems: 'center',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  btnText: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
});
