import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from './src/services/api';

export default function App() {

  const[cep,setCep] = useState('')
  const inputRef = useRef(null)
  const [cepUser, setCepUser] = useState(null)

  function limpar(){
    setCep('');
    inputRef.current.focus()
    setCepUser(null)
  }

  async function buscar(){
    if(cep == ''){
      alert('Digite um CEP valido');
      setCep('');
      return;
    }

    try{
      const respose = await api.get(`/${cep}/json`);
      Keyboard.dismiss();
      setCepUser(respose.data)
    }catch(error){
      console.log('ERROR: ' + error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.cima}>
        <Text style={styles.text}>Digite o CEP desejado</Text>
        <TextInput style={styles.input} value={cep} onChangeText={(text) => setCep(text)} keyboardType="numeric" ref={inputRef}></TextInput>
        <StatusBar style="auto" />
      </View>
      
      <View style={styles.viewBtn}>
        <TouchableOpacity style={[styles.botao, {backgroundColor:'green'}]} onPress={buscar}>
          <Text style={styles.botaoTxt}>Buscar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.botao, {backgroundColor:'red'}]} onPress={limpar}>
          <Text style={styles.botaoTxt}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {cepUser &&
        <View style={styles.resultado}>
          <Text style={styles.itemTxt}>CEP: {cepUser.cep}</Text>
          <Text style={styles.itemTxt}>Logradoura: {cepUser.logradouro}</Text>
          <Text style={styles.itemTxt}>Bairro: {cepUser.bairro}</Text>
          <Text style={styles.itemTxt}>Cidade: {cepUser.localidade}</Text>
          <Text style={styles.itemTxt}>Estado: {cepUser.uf}</Text>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  cima:{
    alignItems:'center'
  },

  text:{
    marginTop:50,
    marginBottom:15,
    fontSize:25,
    fontWeight:'bold'
  },
  input:{
    backgroundColor:'white',
    borderWidth:1,
    borderColor:'#DDD',
    borderRadius:5,
    width:'90%',
    padding:10,
    fontSize:18,
  },
  viewBtn:{
    alignItems:'center',
    flexDirection:'row',
    marginTop:15,
    justifyContent:'space-around',
  },
  botao:{
    height:60,
    justifyContent:'center',
    alignItems:'center',
    padding:15,
    borderRadius:5,
  },

  botaoTxt:{
    color:'#fff',
    fontSize:22,
  },
  resultado:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  itemTxt:{
    fontSize:22
  },
});
