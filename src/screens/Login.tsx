import {
  View,
  Text,
  Pressable,
  Button,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import React from 'react'; // Default import
import {useContext} from 'react';
import TabNavigator from '../Navigator/TabNavigator';
import {Theme, ThemeContext} from '../Context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {LangaugeContext, Language} from '../Context/LanguageContext';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormData} from './SignUp';

const Login = ({navigation}: any) => {
  const {control, handleSubmit} = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const {theme, toggleTheme} = useContext<Theme>(ThemeContext);
  const {language, changeLanguage} = useContext<Language>(LangaugeContext);
  const color = {
    background: theme ? 'white' : 'black',
    text: theme ? 'white' : 'black',
    input: theme ? 'grey' : 'white',
  };
  const translation = {
    english: {
      login: 'Login',
      email: 'Email',
      password: 'Password',
      button: 'Login',
    },
    spanish: {
      login: 'Acceso',
      email: 'Correo electrónico',
      password: 'Contraseña',
      button: 'Iniciar Sesión',
    },
  };
  async function onSubmit(data: FormData) {
    console.log(data);
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, data.email.trim(), data.password.trim());
      console.log(signInWithEmailAndPassword(auth, data.email, data.password))
      Alert.alert('Logged in Successfully');
      
      navigation.navigate('MainTabs');
    } catch (error: any) {
      console.log(error);
      Alert.alert(error.nativeErrorMessage,'Invalid user and password');
    }
  }
  return (
    <>
      <View>
        <Button
          title={
            language === 'english' ? 'Switch to Spanish' : 'Cambiar a Inglés'
          }
          onPress={() =>
            changeLanguage(language === 'english' ? 'spanish' : 'english')
          }
        />
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
          <Text style={{fontSize: 30, color: theme?'black':'white'}}>
            {translation[language].login}
          </Text>
          <Controller
            control={control}
            name="email"
            render={({field: {value, onChange}}) => (
              <TextInput
                placeholder={translation[language].email}
                style={[
                  {backgroundColor: color.input, color: color.text},
                  styles.loginInput,
                ]}
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({field: {value, onChange}}) => (
              <TextInput
                placeholder={translation[language].password}
                style={[
                  {backgroundColor: color.input, color: color.text},
                  styles.loginInput,
                ]}
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Text style={{color: theme?'blue':'white'}}>
              Don't have an account? Sign Up in here
            </Text>
          </Pressable>
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
