import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/header'
import Gameboard from './components/gameboard'
import Footer from './components/footer'
import style from "./styles/style"

export default function App() {
  return (
    <View style={style.container}>
      <Header />
      <Gameboard />
      <Footer />
    </View>
  );
}

