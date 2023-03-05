import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Signup = () => {
  const navigation = useNavigation();
  const [inputValues, setInputValues] = useState({});

  const onChange = (value, key) => {
    setInputValues(vals => ({
      ...vals,
      [key]: value,
    }));
  };

  const onSubmit = () => {
    if (!inputValues.first_name || !inputValues.last_name) {
      Alert.alert('Please enter a first name and last name');
      return;
    }
    if (inputValues.password !== inputValues.confirm_password) {
      Alert.alert('Passwords do not match');
      return;
    }

    auth()
      .createUserWithEmailAndPassword(inputValues.email, inputValues.password)
      .then(() => {
        auth().currentUser.updateProfile({
          displayName: `${inputValues.first_name} ${inputValues.last_name}`,
        });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Join the hub!</Text>
          <TextInput
            onChangeText={val => onChange(val, 'first_name')}
            style={styles.textInput}
            placeholder="First Name"
          />
          <TextInput
            onChangeText={val => onChange(val, 'last_name')}
            style={styles.textInput}
            placeholder="Last Name"
          />
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
          <TextInput
            onChangeText={val => onChange(val, 'confirm_password')}
            style={styles.textInput}
            placeholder="Confirm Password"
            secureTextEntry
          />

          <TouchableOpacity style={styles.createBtn} onPress={onSubmit}>
            <Text style={styles.btnText}>Create account</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.notRegisterText}>Already registered?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
              <Text style={styles.signupBtnText}> Sign in!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(Signup);

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
  createBtn: {
    backgroundColor: '#66b2b2', //Shades of Teal
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
