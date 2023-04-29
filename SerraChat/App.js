import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


var firebaseConfig = {
  apiKey: "AIzaSyAsh0i1BetGzkU-cTcC-LsxPodsCN-y-uc",
  authDomain: "serrachat-67a78.firebaseapp.com",
  projectId: "serrachat-67a78",
  storageBucket: "serrachat-67a78.appspot.com",
  messagingSenderId: "805797822828",
  appId: "1:805797822828:web:13044732ae0dd45c49f349",
  measurementId: "G-Q1RFBXNGVM"
  }
  
  firebase.initializeApp(firebaseConfig)
  var database = firebase.database()
  
  var database = firebase.database();
  var ref = database.ref('/');




  function salvarAposta() {
    var nome = document.getElementById('nome').value
    var aposta = document.getElementById('aposta').value
  
    if (nome == '' || aposta == '') {
      alert('Valores inválidos!')
    } else {
      var newPostKey = firebase.database().ref().child('apostas').push().key
  
      var postData = {
        nome: nome,
        aposta: aposta
      }
  
      var updates = {}
      updates['/apostas/' + newPostKey] = postData
  
      firebase
        .database()
        .ref()
        .update(updates)
        .then(function () {
          console.log('Documento salvo com ID: ', newPostKey)
          document.getElementById('nome').value = ''
          document.getElementById('aposta').value = ''
        })
        .catch(function (error) {
          console.error('Erro ao salvar documento: ', error)
          alert('Erro ao salvar aposta!')
        })
    }
  }
  
  function listarApostas() {
    var elemento = ''
    var listaApostas = document.getElementById('tabelaApostas')
  
    firebase
      .database()
      .ref('/apostas')
      .on('value', function (snapshot) {
        var elementos = []
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val()
          var nome = childData.nome
          var aposta = childData.aposta
          var menuScroll = document.querySelector('.scroll-left')
          menuScroll.innerHTML = '<p>Em construção 👷‍♂️ s2</p>'
        })
  
        // Inverte a ordem da lista de apostas
        elementos.reverse()
  
        listaApostas.innerHTML = elementos.join('')
      })
  }
  
  window.ready = function () {
    listarApostas()
  }
  
  window.onload = function () {
    listarApostas()
    alert('Em homenagem ao falecido SerraBet 🙏 ')
  }
  const { throws } = require('assert')
  const { error } = require('console')
  var cron = require('node-cron')
  cron.schedule('0 22 * * *', function () {
    database.ref('/apostas').remove()
  })
  
  document.getElementById('form').addEventListener('submit', salvarAposta)
  firebase.database().ref('/apostas').on('child_added', listarApostas)