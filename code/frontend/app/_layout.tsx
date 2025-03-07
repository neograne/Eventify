import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';

export default function App() {
  return (
    <SafeAreaView>
      <View style={styles.header}>
          <Text style={styles.logo}>Название и лого</Text>

          <View style={styles.headerButtons}>
            <Text style={styles.headerButton}>Мероприятия</Text>
            <Text style={styles.headerButton}>О нас</Text>
            <Text style={styles.headerButton}>Войти</Text>
          </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#F2F2F2",
    flexDirection: 'row',
    height: 85,
  },
  logo: {
    
  },
  headerButtons:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 30,
  },
  headerButton:{
    //fontFamily: "Montserrat",
    fontSize: 16,
    marginLeft: 30,
  }
});