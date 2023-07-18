// Configurar a inicialização do Firebase com as credenciais do seu projeto
const firebaseConfig = {
    apiKey: "AIzaSyB9WDZnhjGzzjm66flZUmoHDQq6tdZDmsA",
    authDomain: "chatbot-93051.firebaseapp.com",
    projectId: "chatbot-93051",
    storageBucket: "chatbot-93051.appspot.com",
    messagingSenderId: "910650346544",
    appId: "1:910650346544:web:a632788aa15a6b3e9471f5",
    measurementId: "G-TK65S06RH0"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Obter referências aos elementos HTML
  const userInput = document.getElementById("user-input");
  const chatContainer = document.getElementById("chat-container");
  
  // Obter uma referência ao nó "messages" no Firebase Realtime Database
  const messagesRef = firebase.database().ref("messages");
  
  // Registrar um ouvinte para receber novas mensagens do chatbot
  messagesRef.on("child_added", (snapshot) => {
    const message = snapshot.val();
  
    // Cria a mensagem do chatbot no chat
    const botChatBubble = document.createElement("div");
    botChatBubble.className = "chat-bubble bot";
    botChatBubble.innerText = message.text;
    chatContainer.appendChild(botChatBubble);
  });
  
  // Função para enviar a mensagem do usuário
  function sendMessage() {
    const userMessage = userInput.value;
  
    // Cria a mensagem do usuário no chat
    const userChatBubble = document.createElement("div");
    userChatBubble.className = "chat-bubble user";
    userChatBubble.innerText = userMessage;
    chatContainer.appendChild(userChatBubble);
  
    // Limpa a entrada do usuário
    userInput.value = "";
  
    // Salva a mensagem do usuário no Firebase Realtime Database
    messagesRef.push({ sender: "user", text: userMessage });
  }
  