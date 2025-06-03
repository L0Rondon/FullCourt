// 1. Importando todas as funções necessárias
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
    getAuth, //inicializa e retorna uma instância de serviços de Autenticação do firebase
    createUserWithEmailAndPassword, //Cria uma nova conta de usuário usando endereço de e-mail e senha
    signInWithEmailAndPassword, //redefine a senha 
    sendPasswordResetEmail //Envia um link para o email fornecido para redefinir uma nova senha
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD2W9FIWnKg4y2ayalm1N8hKpqUzNZNnP4",
    authDomain: "proj-fullcourt.firebaseapp.com",
    projectId: "proj-fullcourt",
    storageBucket: "proj-fullcourt.firebasestorage.app",
    messagingSenderId: "1021498633616",
    appId: "1:1021498633616:web:e45ea76dcae4b14ed11715"
};
//Fim  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Adiciona um listener para quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', function () {
    //seletores dos elementos HTML (pegue todos aqui uma vez)
    const emailInput = document.getElementById('email'); //Email
    const passwordInput = document.getElementById('senha'); //senha
    const esqueceuSenhaLink = document.getElementById('esqueceuSenha'); //senha
    const cadastrarUsuarioLink = document.getElementById('cadastrarUsuario'); //cadastro de usuario
    const logarButton = document.getElementById('logar'); //botão logar

    // -- Lógica de cadastro ---
    if (cadastrarUsuarioLink) {
        cadastrarUsuarioLink.addEventListener('click', function (event) {
            event.preventDefault(); //Previne o comportamento padrão do link

            const emailValue = emailInput.ariaValueMax.trim(); //O método trim() serve para tirar os espaços em branco
            const passwordValue = passwordInput.ariaValueMax.trim(); // Não precisa ser trim() para a senha, mas

            if (!emailValue || !passwordValue) {
                alert("Por favor, preencha o email e a senha para cadastrar.");
                return;
            }
            if (passwordValue.length < 6) {
                alert("A senha deve ter pelo menos 6 caracteres.");
                return;
            }

            createUserWithEmailAndPassword(auth, emailValue, passwordValue)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log('Usuário cadastrado com sucesso: ', user.email);
                    alert(`Usuário ${user.email} cadastro com sucesso!`);
                    emailInput.value = '';
                    passwordInput.value = '';
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error("Erro ao cadastrar:", errorCode, errorMessage);
                    if (errorCode === 'auth/email-already-in-use'){
                        alert('Este email já está cadastrado.');
                    }else if (errorCode === 'auth/invalid-email'){
                        alert('O formato do email é inválido.');
                    }else if (errorCode === 'auth/weak-password'){
                        alert('A senha é muito fraca (deve ter no mínimo 6 caracteres).');
                    }else{
                        alert(`Erro ao cadastrar: ${errorMessage}`);
                    }
                });
        });
    } else {
        console.warn("Elemento 'cadastrarUsuario' não encontrado");
    };

    // --- Lógica de login ---
    if (logarButton) {
        logarButton.addEventListener('click', function (event){
            event.preventDefault(); //Previne o comportamento padrão do botão submit dentro de um form

            const emailValue = emailInput.value.trim();
            const passwordValue = passwordInput.value.trim(); //Não precisa ser trim() para senha
        })
    }
})