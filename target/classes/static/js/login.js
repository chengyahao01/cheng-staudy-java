// 登录页面JavaScript逻辑
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const rememberCheckbox = document.getElementById('remember');
    const loginBtn = document.querySelector('.login-btn');

    // 密码显示/隐藏切换
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // 切换图标
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });

    // 输入框聚焦效果
    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // 表单提交处理
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        // 验证输入
        if (!username || !password) {
            showMessage('请填写完整的用户名和密码', 'error');
            return;
        }

        // 显示加载状态
        setLoadingState(true);
        
        try {
            const response = await login(username, password);
            handleLoginResponse(response);
        } catch (error) {
            console.error('登录请求失败:', error);
            showMessage('网络错误，请稍后重试', 'error');
        } finally {
            setLoadingState(false);
        }
    });

    // 登录请求函数
    async function login(username, password) {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    // 处理登录响应
    function handleLoginResponse(response) {
        if (response.success) {
            showMessage('登录成功！', 'success');
            
            // 保存token到localStorage（如果记住我被选中）
            if (rememberCheckbox.checked && response.token) {
                localStorage.setItem('authToken', response.token);
                localStorage.setItem('username', response.username);
            }
            
            // 跳转到仪表板
            setTimeout(() => {
                showMessage('正在跳转到仪表板...', 'success');
                window.location.href = '/dashboard.html';
            }, 1500);
            
        } else {
            showMessage(response.message || '登录失败', 'error');
        }
    }

    // 设置加载状态
    function setLoadingState(loading) {
        const btnText = loginBtn.querySelector('span') || loginBtn;
        const originalText = btnText.textContent;
        
        if (loading) {
            loginBtn.disabled = true;
            btnText.innerHTML = '<div class="loading"></div> 登录中...';
        } else {
            loginBtn.disabled = false;
            btnText.innerHTML = '<i class="fas fa-sign-in-alt"></i> 登录';
        }
    }

    // 显示消息提示
    function showMessage(message, type = 'info') {
        const messageEl = document.getElementById('message');
        messageEl.textContent = message;
        messageEl.className = `message ${type} show`;
        
        // 3秒后自动隐藏
        setTimeout(() => {
            messageEl.classList.remove('show');
        }, 3000);
    }

    // 键盘快捷键
    document.addEventListener('keydown', function(e) {
        // Ctrl + Enter 快速登录
        if (e.ctrlKey && e.key === 'Enter') {
            loginForm.dispatchEvent(new Event('submit'));
        }
        
        // Tab键在输入框间切换
        if (e.key === 'Tab') {
            // 自动聚焦到下一个输入框
        }
    });

    // 自动填充功能（如果localStorage中有保存的账号）
    function autoFillCredentials() {
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            usernameInput.value = savedUsername;
            // 自动聚焦到密码框
            passwordInput.focus();
        }
    }

    // 页面加载时自动填充
    autoFillCredentials();

    // 添加输入框动画效果
    function addInputAnimations() {
        const inputs = document.querySelectorAll('.input-group input');
        
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value) {
                    this.parentElement.classList.add('has-value');
                } else {
                    this.parentElement.classList.remove('has-value');
                }
            });
        });
    }

    // 初始化输入框动画
    addInputAnimations();

    // 添加表单验证
    function addFormValidation() {
        const inputs = [usernameInput, passwordInput];
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }

    // 字段验证
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        if (!value) {
            showFieldError(field, `${fieldName === 'username' ? '用户名' : '密码'}不能为空`);
            return false;
        }
        
        clearFieldError(field);
        return true;
    }

    // 显示字段错误
    function showFieldError(field, message) {
        clearFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: var(--error-color);
            font-size: 12px;
            margin-top: 5px;
            animation: fadeIn 0.3s ease;
        `;
        
        field.parentElement.appendChild(errorDiv);
        field.style.borderColor = 'var(--error-color)';
    }

    // 清除字段错误
    function clearFieldError(field) {
        const existingError = field.parentElement.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        field.style.borderColor = '';
    }

    // 初始化表单验证
    addFormValidation();

    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .input-group.has-value input {
            border-color: var(--success-color);
        }
        
        .input-group.focused input {
            border-color: var(--input-focus);
        }
    `;
    document.head.appendChild(style);
}); 