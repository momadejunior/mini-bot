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
  const adminMessages = document.getElementById("admin-messages");
  const adminInput = document.getElementById("admin-input");
  
  // Obter uma referência ao nó "messages" no Firebase Realtime Database
  const messagesRef = firebase.database().ref("messages");
  
  // Registrar um ouvinte para receber novas mensagens do chatbot
  messagesRef.on("child_added", (snapshot) => {
    const message = snapshot.val();
  
    // Cria a mensagem do chatbot no admin
    if (message.sender === "user") {
      const userChatBubble = document.createElement("div");
      userChatBubble.className = "chat-bubble user";
      userChatBubble.innerText = message.text;
      adminMessages.appendChild(userChatBubble);
    } else if (message.sender === "admin") {
      const adminChatBubble = document.createElement("div");
      adminChatBubble.className = "chat-bubble admin";
      adminChatBubble.innerText = message.text;
      adminMessages.appendChild(adminChatBubble);
    }
  });
  
  // Função para enviar a mensagem do admin
  function sendAdminMessage() {
    const adminMessage = adminInput.value;
  
    // Cria a mensagem do admin no admin
    const adminAdminChatBubble = document.createElement("div");
    adminAdminChatBubble.className = "chat-bubble admin";
    adminAdminChatBubble.innerText = adminMessage;
    adminMessages.appendChild(adminAdminChatBubble);
  
    // Limpa a entrada do admin
    adminInput.value = "";
  
    // Envia a mensagem do admin para o chatbot (salvando no Firebase Realtime Database)
    messagesRef.push({ sender: "admin", text: adminMessage });
  }
  