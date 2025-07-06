package com.cheng.service;

import com.cheng.dto.LoginRequest;
import com.cheng.dto.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 登录服务
 * 
 * @author cheng
 */
@Service
public class LoginService {

    @Autowired
    private TokenService tokenService;

    /**
     * 正确的用户名和密码
     */
    private static final String CORRECT_USERNAME = "admin";
    private static final String CORRECT_PASSWORD = "123456@Zte";

    /**
     * 处理登录请求
     * 
     * @param loginRequest 登录请求
     * @return 登录响应
     */
    public LoginResponse login(LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        // 验证用户名和密码
        if (CORRECT_USERNAME.equals(username) && CORRECT_PASSWORD.equals(password)) {
            // 登录成功，生成token
            String token = tokenService.generateToken();
            
            // 保存token到全局map
            tokenService.saveToken(username, token);
            
            return new LoginResponse(true, "登录成功", token, username);
        } else {
            // 登录失败
            return new LoginResponse(false, "用户名或密码错误");
        }
    }

    /**
     * 验证token是否有效
     * 
     * @param username 用户名
     * @param token token值
     * @return 是否有效
     */
    public boolean validateToken(String username, String token) {
        return tokenService.validateToken(username, token);
    }
} 