package com.cheng.controller;

import com.cheng.dto.LoginRequest;
import com.cheng.dto.LoginResponse;
import com.cheng.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * 登录控制器
 * 
 * @author cheng
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    private LoginService loginService;

    /**
     * 登录接口
     * 
     * @param loginRequest 登录请求
     * @return 登录响应
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        LoginResponse response = loginService.login(loginRequest);
        
        // 无论成功还是失败都返回200状态码，让前端根据response中的success字段判断
        return ResponseEntity.ok(response);
    }

    /**
     * 健康检查接口
     * 
     * @return 服务状态
     */
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("服务运行正常");
    }

    /**
     * 首页路由，重定向到登录页面
     * 
     * @return 重定向响应
     */
    @GetMapping("/")
    public String index() {
        return "redirect:/index.html";
    }
} 