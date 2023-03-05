import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Signin = () => {
  const navigation = useNavigation();
  const [inputValues, setInputValues] = useState({});

  const onChange = (value, key) => {
    setInputValues(vals => ({
      ...vals,
      [key]: value,
    }));
  };

  const onSubmit = () => {
    auth()
      .signInWithEmailAndPassword(inputValues.email, inputValues.password)
      .then(() => {
        console.log('User signed signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        } else {
          Alert.alert('Error: ', error.message);
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome back!</Text>
        <TextInput
          onChangeText={val => onChange(val, 'email')}
          style={styles.textInput}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          onChangeText={val => onChange(val, 'password')}
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginBtn} onPress={onSubmit}>
          <Text style={styles.btnText}>Log in</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.notRegisterText}>Not registered?</Text>
          <TouchableOpacity>
            <Text
              style={styles.signupBtnText}
              onPress={() => navigation.navigate('Signup')}>
              Sign up!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default memo(Signin);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 30,
    paddingTop: '20%',
  },
  title: {
    color: '#36454f', // Blue-Grey Color Palette
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 0.2,
    padding: 12,
    borderColor: '#004c4c',
    marginBottom: 15,
    borderRadius: 100,
  },
  loginBtn: {
    backgroundColor: '#004c4c', // Shades of Teal
    padding: 12,
    marginTop: 30,
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
  btnText: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  signupContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 40,
  },
  notRegisterText: {
    color: '#687387',
  },
  signupBtnText: {
    color: '#004c4c',
    fontWeight: 'bold',
  },
});
