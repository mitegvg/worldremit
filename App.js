import React from 'react';
import {SafeAreaView} from 'react-native';
import List from './src/components/list';

const App: () => Node = () => {
  return (
    <SafeAreaView>
      <List />
    </SafeAreaView>
  );
};

export default App;
