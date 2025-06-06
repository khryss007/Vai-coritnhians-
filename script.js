document.addEventListener('DOMContentLoaded', function() {
    // Verificador de força de senha
    const passwordInput = document.getElementById('password-input');
    const checkBtn = document.getElementById('check-btn');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.getElementById('strength-text');
    const entropyText = document.getElementById('entropy-text');
    const timeToCrack = document.getElementById('time-to-crack');
    
    function checkPasswordStrength() {
        const password = passwordInput.value;
        const entropy = calculateEntropy(password);
        const strength = getStrengthLevel(entropy);
        
        strengthBar.style.width = strength.width;
        strengthBar.style.backgroundColor = strength.color;
        strengthText.textContent = `Força: ${strength.level}`;
        entropyText.textContent = `Entropia: ${entropy.toFixed(1)} bits`;
        timeToCrack.textContent = `Tempo estimado para quebrar: ${estimateTimeToCrack(entropy)}`;
    }
    
    passwordInput.addEventListener('input', checkPasswordStrength);
    checkBtn.addEventListener('click', checkPasswordStrength);
    
    // Gerador de senhas
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const generatedPassword = document.getElementById('generated-password');
    
    generateBtn.addEventListener('click', function() {
        const length = parseInt(document.getElementById('length').value);
        const useUpper = document.getElementById('uppercase').checked;
        const useLower = document.getElementById('lowercase').checked;
        const useNumbers = document.getElementById('numbers').checked;
        const useSymbols = document.getElementById('symbols').checked;
        
        const password = generatePassword(length, useUpper, useLower, useNumbers, useSymbols);
        generatedPassword.value = password;
        
        // Verificar a força da senha gerada
        const entropy = calculateEntropy(password);
        const strength = getStrengthLevel(entropy);
        
        // Mostrar feedback visual
        if (entropy < 60) {
            generatedPassword.style.borderColor = strength.color;
        } else {
            generatedPassword.style.borderColor = '#2ecc71';
        }
    });
    
    copyBtn.addEventListener('click', function() {
        generatedPassword.select();
        document.execCommand('copy');
        
        // Feedback visual
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copiado!';
        copyBtn.style.backgroundColor = '#2ecc71';
        
        setTimeout(function() {
            copyBtn.textContent = originalText;
            copyBtn.style.backgroundColor = '';
        }, 2000);
    });
    
    // Scroll suave para links internos
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
});
