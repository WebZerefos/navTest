import React, {memo, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Onboarding from '../../src/screens/auth/Onboarding';
import Signin from '../../src/screens/auth/Signin';
import Signup from '../../src/screens/auth/Signup';
import Home from '../screens/app/Home';
import Tasks from '../screens/app/Tasks';
import AddTask from '../screens/app/AddTask';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Routes = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  // if (user) {
  //   return (
  //     <SafeAreaView>
  //       <Text>Welcome {user.displayName}</Text>
  //       <Button
  //         title="Log out"
  //         onPress={() =>
  //           auth()
  //             .signOut()
  //             .then(() => console.log('User signed out!'))
  //         }
  //       />
  //     </SafeAreaView>
  //   );
  // }

  if (user) {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Add Task" component={AddTask} />
        <Tab.Screen name="Tasks" component={Tasks} />
      </Tab.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Auth"
        component={Onboarding}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Signin"
        component={Signin}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Signup"
        component={Signup}
      />
    </Stack.Navigator>
  );
};

export default memo(Routes);
