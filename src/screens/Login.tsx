import {
  View,
  Text,
  Pressable,
  Button,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, {useContext} from 'react';
import TabNavigator from '../Navigator/TabNavigator';
import {Theme, ThemeContext} from '../Context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LangaugeContext, Language } from '../Context/LanguageContext';






const Login = ({navigation}: any) => {
  const {theme, toggleTheme} = useContext<Theme>(ThemeContext);
  const {language, changeLanguage} = useContext<Language>(LangaugeContext);
  const color = {
    background: theme ? 'white' : 'black',
    text: theme ? 'black' : 'white',
    input: theme ? 'grey' : 'white',
  };
  const translation= {
    english: {
      login: 'Login',
      username: 'Username',
      password: 'Password',
      button: 'Login',
    },
    spanish: {
      login: 'Acceso',
      username: 'Usuario',
      password: 'Contraseña',
      button: 'Iniciar Sesión',
    },
  };
  return (
    <>
      <View>
        <Button title={language === 'english' ? 'Switch to Spanish' : 'Cambiar a Inglés'} onPress={()=>changeLanguage(language === 'english' ? 'spanish' : 'english')}/>
        <Pressable
          onPress={() => toggleTheme()}
          style={{backgroundColor: color.background}}>
          {theme ? (
            <Icon
              name="dark-mode"
              size={50}
              color={theme ? 'black' : 'white'}
              style={styles.themeIcon}
            />
          ) : (
            <Icon
              name="light-mode"
              size={50}
              color={theme ? 'black' : 'white'}
              style={styles.themeIcon}
            />
          )}
        </Pressable>
      </View>
      <View style={[{backgroundColor: color.background}, styles.mainLoginCtn]}>
        <View
          style={[
            styles.loginCtn,
            {
              backgroundColor: theme
                ? 'rgba(200,40,10,0.2)'
                : 'rgba(0,255,255,0.5)',
            },
          ]}>
          <Text style={{fontSize: 30, color: color.text}}>{translation[language].login}</Text>
          <TextInput
            placeholder={translation[language].username}
            style={[
              {backgroundColor: color.input, color: color.text},
              styles.loginInput,
            ]}
          />
          <TextInput
            placeholder={translation[language].password}
            style={[
              {backgroundColor: color.input, color: color.text},
              styles.loginInput,
            ]}
          />
          <Button
            title={translation[language].login}
            onPress={() => navigation.navigate('MainTabs')}
          />
        </View>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainLoginCtn: {
    flex: 1,
  },
  themeIcon: {
    margin: 20,
  },
  loginCtn: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 30,
    padding: 10,

    borderRadius: 10,
  },
  loginInput: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
