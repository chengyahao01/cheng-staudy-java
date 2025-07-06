package com.cheng.service;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Token管理服务
 * 
 * @author cheng
 */
@Service
public class TokenService {

    /**
     * 全局共享的token存储map，key为用户名，value为token
     */
    private static final Map<String, String> TOKEN_MAP = new ConcurrentHashMap<>();

    /**
     * 生成随机token
     * 
     * @return 随机token字符串
     */
    public String generateToken() {
        return UUID.randomUUID().toString().replace("-", "");
    }

    /**
     * 保存用户token
     * 
     * @param username 用户名
     * @param token token值
     */
    public void saveToken(String username, String token) {
        TOKEN_MAP.put(username, token);
    }

    /**
     * 根据用户名获取token
     * 
     * @param username 用户名
     * @return token值，如果不存在返回null
     */
    public String getToken(String username) {
        return TOKEN_MAP.get(username);
    }

    /**
     * 验证token是否有效
     * 
     * @param username 用户名
     * @param token token值
     * @return 是否有效
     */
    public boolean validateToken(String username, String token) {
        String storedToken = TOKEN_MAP.get(username);
        return storedToken != null && storedToken.equals(token);
    }

    /**
     * 删除用户token
     * 
     * @param username 用户名
     */
    public void removeToken(String username) {
        TOKEN_MAP.remove(username);
    }

    /**
     * 获取所有token信息（用于调试）
     * 
     * @return token map的副本
     */
    public Map<String, String> getAllTokens() {
        return new ConcurrentHashMap<>(TOKEN_MAP);
    }
} 