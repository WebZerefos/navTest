import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes/routes';

const App = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#ffffff',
    },
  };

  return (
    <NavigationContainer theme={theme}>
      <Routes />
    </NavigationContainer>
  );
};

export default App;
