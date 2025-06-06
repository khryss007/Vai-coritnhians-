// Funções para cálculo de força de senha
function calculateEntropy(password) {
    if (!password) return 0;
    
    // Determinar o conjunto de caracteres possíveis
    let charsetSize = 0;
    
    // Verificar quais tipos de caracteres estão presentes
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[^a-zA-Z0-9]/.test(password);
    
    if (hasLower) charsetSize += 26;
    if (hasUpper) charsetSize += 26;
    if (hasNumbers) charsetSize += 10;
    if (hasSymbols) charsetSize += 32; // Considerando símbolos comuns
    
    // Calcular entropia em bits
    const entropy = password.length * Math.log2(charsetSize);
    
    return entropy;
}

function estimateTimeToCrack(entropy) {
    // Considerando 1.000 tentativas por segundo (ataque online)
    const attemptsPerSecond = 1000;
    const possibleCombinations = Math.pow(2, entropy);
    const seconds = possibleCombinations / attemptsPerSecond;
    
    // Converter para unidades de tempo legíveis
    if (seconds < 1) return "menos de 1 segundo";
    if (seconds < 60) return `${Math.round(seconds)} segundos`;
    
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.round(minutes)} minutos`;
    
    const hours = minutes / 60;
    if (hours < 24) return `${Math.round(hours)} horas`;
    
    const days = hours / 24;
    if (days < 365) return `${Math.round(days)} dias`;
    
    const years = days / 365;
    if (years < 1000) return `${Math.round(years)} anos`;
    
    return `${Math.round(years / 1000)} milênios`;
}

function getStrengthLevel(entropy) {
    if (entropy < 28) return { level: "Muito fraca", color: "#e74c3c", width: "20%" };
    if (entropy < 36) return { level: "Fraca", color: "#f39c12", width: "40%" };
    if (entropy < 60) return { level: "Moderada", color: "#f1c40f", width: "60%" };
    if (entropy < 100) return { level: "Forte", color: "#2ecc71", width: "80%" };
    return { level: "Muito forte", color: "#27ae60", width: "100%" };
}

// Gerador de senhas
function generatePassword(length, useUpper, useLower, useNumbers, useSymbols) {
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let allChars = '';
    if (useUpper) allChars += upperChars;
    if (useLower) allChars += lowerChars;
    if (useNumbers) allChars += numberChars;
    if (useSymbols) allChars += symbolChars;
    
    if (!allChars) return '';
    
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }
    
    return password;
}
