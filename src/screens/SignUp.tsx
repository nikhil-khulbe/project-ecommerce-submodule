import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Button,
  TextInput,
  Alert,
} from 'react-native';
import React, {useContext} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Theme, ThemeContext} from '../Context/ThemeContext';
import {LangaugeContext, Language} from '../Context/LanguageContext';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';
import {yupResolver} from '@hookform/resolvers/yup';

export interface FormData {
  email: string;
  password: string;
}

const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email('Not a valid Email')
    .required('Email is required'),
  password: yup
    .string()
    .trim()
    .required('Password is required')
    .min(6, 'Password should be minimum 6 char'),
});

const SignUp = ({navigation}: any) => {
  const {theme, toggleTheme} = useContext<Theme>(ThemeContext);
  const {language, changeLanguage} = useContext<Language>(LangaugeContext);
  const color = {
    background: theme ? 'white' : 'black',
    text: theme ? 'white' : 'black',
    input: theme ? 'grey' : 'white',
  };
  const translation = {
    english: {
      SignUp: 'SignUp',
      email: 'Email',
      password: 'Password',
      button: 'Login',
    },
    spanish: {
      SignUp: 'Inscribirse',
      email: 'Correo electrónico',
      password: 'Contraseña',
      button: 'Iniciar Sesión',
    },
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  async function onSubmit(data: FormData) {
    console.log(data);
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      Alert.alert('User created successfully');
      navigation.navigate('Login');
    } catch (error: any) {
      console.log(error);
      Alert.alert(error);
    }
  }
  return (
    <View>
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
      <View
        style={[
          {backgroundColor: color.background, height: '100%'},
          styles.mainLoginCtn,
        ]}>
        <Text style={{fontSize: 30, color: theme?'black':'white'}}>
          {translation[language].SignUp}
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
        {errors.email && (
          <Text style={{color: 'red'}}>{errors.email?.message}</Text>
        )}
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
        {errors.password && (
          <Text style={{color: 'red'}}>{errors.password?.message}</Text>
        )}
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        <Pressable onPress={()=>navigation.navigate('Login')}>
          <Text style={{color:theme?'blue':'white'}}>Already have an account? Log in here</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUp;
const styles = StyleSheet.create({
  mainLoginCtn: {
    // backgroundColor:'rgba(8,57,147,0.2)',
    // justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
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
