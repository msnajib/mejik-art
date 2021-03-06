import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Button, Layout, Input, Text, Icon, CheckBox } from 'react-native-ui-kitten';
import { Formik, } from 'formik';
import * as Yup from 'yup';

class CustomInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordVisible: false,
    };
  }
  onPasswordIconPress = (isVisible) => {
    this.setState({ passwordVisible: isVisible })
  };


  render() {
    const {
      field,
      onChange,
      onBlur,
      value,
      error,
      secure,
      touched
    } = this.props
    return (
      <Input
        label={field.label}
        placeholder={field.placeholder}
        onBlur={onBlur}
        value={value}
        onChangeText={onChange}
        status={ touched && ((error) ? 'danger' : 'primary')}
        style={styles.input}
        size='small'
        labelStyle={[styles.labelText]}
        icon={(style) => (
          <Icon
            name={!secure ? this.props.iconName : (this.state.passwordVisible ? 'eye' : 'eye-off')}
            {...style}
          />
        )}
        caption={(touched && error) || ' '}
        onIconPress={secure ? (() => this.onPasswordIconPress(!this.state.passwordVisible)) : (() => { })}
        secureTextEntry={secure && !this.state.passwordVisible}
      />
    )
  }
}

class SignUpFour extends Component {
  constructor(props) {
    super(props);

  }



  render() {
    const {
      fields,
      btnSubmit,
      socialButtons,
      bgImg,
    } = this.props;
    const validationSchema = Yup.object().shape(
      {
        email: Yup.string()
          .required(fields[0].validation.msgRequired)
          .email(fields[0].validation.message),
        password: Yup.string()
          .required(fields[1].validation.msgRequired)
          .min(fields[1].validation.minChr, fields[1].validation.message),
        confirmPassword: Yup.string()
          .required(fields[2].validation.msgRequired)
          .oneOf([Yup.ref('password')], fields[2].validation.message),
        firstName: Yup.string()
          .required(fields[3].validation.msgRequired)
          .min(fields[3].validation.minChr, fields[3].validation.message),
        lastName: Yup.string()
          .required(fields[4].validation.msgRequired)
          .min(fields[4].validation.minChr, fields[4].validation.message),
        phone: Yup.string()
          .required(fields[5].validation.msgRequired)
          .min(fields[5].validation.minChr, fields[5].validation.message)
          .matches(fields[5].validation.regex, fields[5].validation.message),
        isAgree: Yup.boolean().oneOf([true])
      }
    )

    return (

      <ImageBackground
        style={styles.wrapper}
        resizeMode='stretch'
        source={{ uri: bgImg.url }}
      >
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <ScrollView>
            <Layout
              style={styles.titleContainer}
            >
              <Text
                category='h1'
                style={styles.titleText}
              >
                Sign Up
              </Text>
              <Text
                category='h1'
                style={[styles.titleText, { fontSize: 15, fontWeight: '200' }]}
              >
                Sign up with email to continue
              </Text>
            </Layout>
            <Formik
              initialValues={
                {
                  email: '',
                  password: '',
                  confirmPassword: '',
                  firstName: '',
                  lastName: '',
                  phone: '',
                  isAgree: false,

                }
              }
              onSubmit={(value) => { btnSubmit.onPress(value) }}
              validationSchema={validationSchema}
            >
              {formikProps => (
                <View style={styles.formContainer}>
                  <View>
                    <CustomInput
                      field={fields[3]}
                      onChange={formikProps.handleChange('firstName')}
                      onBlur={formikProps.handleBlur('firstName')}
                      touched={formikProps.touched.firstName}
                      value={formikProps.values.firstName}
                      error={formikProps.errors.firstName}
                      iconName={'person'}
                    />
                    <CustomInput
                      field={fields[4]}
                      formikProps={formikProps}
                      onChange={formikProps.handleChange('lastName')}
                      onBlur={formikProps.handleBlur('lastName')}
                      touched={formikProps.touched.lastName}
                      value={formikProps.values.lastName}
                      error={formikProps.errors.lastName}
                      iconName={'person'}
                    />
                    <CustomInput
                      field={fields[0]}
                      formikProps={formikProps}
                      onChange={formikProps.handleChange('email')}
                      onBlur={formikProps.handleBlur('email')}
                      touched={formikProps.touched.email}
                      value={formikProps.values.email}
                      error={formikProps.errors.email}
                      iconName={'email'}
                    />
                    <CustomInput
                      field={fields[5]}
                      formikProps={formikProps}
                      onChange={formikProps.handleChange('phone')}
                      onBlur={formikProps.handleBlur('phone')}
                      touched={formikProps.touched.phone}
                      value={formikProps.values.phone}
                      error={formikProps.errors.phone}
                      iconName={'phone'}

                    />
                    <CustomInput
                      field={fields[1]}
                      formikProps={formikProps}
                      onChange={formikProps.handleChange('password')}
                      onBlur={formikProps.handleBlur('password')}
                      touched={formikProps.touched.password}
                      value={formikProps.values.password}
                      error={formikProps.errors.password}
                      secure={true}
                    />
                    <CustomInput
                      field={fields[2]}
                      formikProps={formikProps}
                      onChange={formikProps.handleChange('confirmPassword')}
                      onBlur={formikProps.handleBlur('confirmPassword')}
                      touched={formikProps.touched.confirmPassword}
                      value={formikProps.values.confirmPassword}
                      error={formikProps.errors.confirmPassword}
                      secure={true}
                    />
                  </View>
                  <View style={styles.buttonContainer}>
                    <CheckBox
                      checked={formikProps.values.isAgree}
                      onChange={formikProps.handleChange('isAgree')}
                      text={"By creating account i agree to the Terms of Use and Privacy Policy"}
                      textStyle={[styles.text, {marginTop : 0, textAlign : 'left'}]}
                    />
                    <Button
                      onPress={formikProps.handleSubmit}
                      size="large"
                      style={styles.button}
                      disabled={!formikProps.isValid}
                    >{btnSubmit.label}
                    </Button>
                  </View>
                  <View>
                    <Text category={'h1'} style={[styles.text, {fontSize : 16}]}>Or Sign in with Social Account</Text>
                    <View style={styles.rowContainer}>
                      {socialButtons.map((data) => (
                        <Button
                          onPress={() => data.onPress()}
                          size="giant"
                          appearance={'ghost'}
                          icon={(style) => {
                            return (
                              <Icon
                                name={data.name}
                                {...style}
                                tintColor={data.color || '#000000'}
                                width={30}
                                height={30}
                              />
                            )
                          }}
                        >
                        </Button>
                      ))}
                    </View>
                  </View>
                </View>
              )}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 28,
    color: "#555555",
    fontWeight: "bold",
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  wrapper: {
    flex: 1,
    alignItems: 'stretch'
  },
  titleContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    height: 180,
    justifyContent: 'center'
  },
  formContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    //justifyContent: 'space-between',
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  text: {
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 20,
    color: '#fff'
  },
  labelText: {
    textAlign: 'left',
    color: '#fff',
    alignSelf: 'flex-start'
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff'
  },
  input: {
    marginTop: '2%',
  },
  buttonContainer: {
    marginTop: 25
  }

})

export default SignUpFour;
