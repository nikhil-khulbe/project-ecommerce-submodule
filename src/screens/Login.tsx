import {
  View,
  Text,
  Pressable,
  Button,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import React, { useState } from 'react'; // Default import
import {useContext} from 'react';
import TabNavigator from '../Navigator/TabNavigator';
import {Theme, ThemeContext} from '../Context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {LangaugeContext, Language} from '../Context/LanguageContext';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import * as Keychain from 'react-native-keychain';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormData} from './SignUp';
import { useTokenAuthStore } from '../Store/TokenAuthStore';


const Login = ({ navigation }: any) => {
  const [securePass, setSecurePass] = useState(true);
  const {LoggedIn, setLoggedIn} = useTokenAuthStore();
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
      await signInWithEmailAndPassword(
        auth,
        data.email.trim(),
        data.password.trim(),
      );
      console.log(signInWithEmailAndPassword(auth, data.email, data.password));
      const currentUser = auth.currentUser;
      if (currentUser) {
        const token = await currentUser.getIdToken(true);
        await Keychain.setGenericPassword('auth', token, {
          service: 'ProjectECommerce_auth',
        });
        setLoggedIn(true)
        console.log(token, 'TOken',LoggedIn,'state for log');
      }
      // const credential = await Keychain.getGenericPassword({ service: 'ProjectECommerce_auth' })
      // console.log(credential,'CREDENTIAL')
      // const checkToken = async () => {
      //   const credential = await Keychain.getGenericPassword({
      //     service: 'ProjectECommerce_auth',
      //   });
      //   if (credential.password && credential.password.length > 0) {
      //     setLoogedIn(true);
      //   } else {
      //     setLoogedIn(false);
      //   }
      // };
      // checkToken();
      Alert.alert('Logged in Successfully');
      // navigation.navigate('MainTabs');
      

      // if (credential.password && credential.password.length > 0) {

      // } else {
      //   console.log('Somwhting wrong with credential')
      // }
    } catch (error: any) {
      console.log(error);
      Alert.alert(error.nativeErrorMessage, 'Invalid user and password');
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
          <Text style={{fontSize: 30, color: theme ? 'black' : 'white'}}>
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
              <View style={styles.passCtn}>
                            <TextInput
                              placeholder={translation[language].password}
                              style={[
                                {backgroundColor: color.input, color: color.text},
                                styles.passwordInput,
                              ]}
                              value={value}
                              onChangeText={onChange}
                              secureTextEntry={securePass}
                            />
                            {securePass? <Pressable onPress={()=>setSecurePass(false)}><Icon
                              name="visibility-off"
                              size={30}
                              color={theme ? 'black' : 'white'}
                              style={styles.eyeIcon}
                            /></Pressable>:<Pressable onPress={()=>setSecurePass(true)}><Icon
                              name="visibility"
                              size={30}
                              color={theme ? 'black' : 'white'}
                              style={styles.eyeIcon}
                            /></Pressable>}
                            
                          </View>
            )}
          />

          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Text style={{color: theme ? 'blue' : 'white'}}>
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
  passwordInput: {
    
    padding: 10,
    width: '70%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius:10
  },
  passCtn: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  eyeIcon: {
    backgroundColor: 'grey',
    padding: 5,
    borderTopRightRadius: 10,
    borderBottomRightRadius:10,
  }
});
