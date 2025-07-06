# cheng-study-java

这是一个Java Spring Boot学习项目，实现了简单的登录功能。

## 项目功能

- 提供登录接口，支持用户名密码验证
- 登录成功后生成随机token并存储在全局map中
- 支持token验证功能
- 提供暗色调的现代化登录界面
- 支持密码显示/隐藏切换
- 响应式设计，支持移动端访问
- 登录成功后跳转到仪表板页面

## 技术栈

- Spring Boot 2.7.14
- Java 8
- Maven
- Spring Web
- Spring Validation

## 项目结构

```
src/main/java/com/cheng/
├── StudyJavaApplication.java    # 主启动类
├── controller/
│   └── LoginController.java     # 登录控制器
├── service/
│   ├── LoginService.java        # 登录服务
│   └── TokenService.java        # Token管理服务
├── dto/
│   ├── LoginRequest.java        # 登录请求DTO
│   └── LoginResponse.java       # 登录响应DTO
└── exception/
    └── GlobalExceptionHandler.java # 全局异常处理器

src/main/resources/
├── application.yml              # 应用配置
└── static/
    ├── index.html              # 登录页面
    ├── dashboard.html          # 仪表板页面
    ├── css/
    │   └── style.css          # 样式文件
    └── js/
        └── login.js           # 登录逻辑
```

## 快速开始

### 1. 编译项目

```bash
mvn clean compile
```

### 2. 运行项目

```bash
mvn spring-boot:run
```

### 3. 访问应用

项目启动后，服务运行在 `http://localhost:8080`

- **登录界面**: `http://localhost:8080`
- **仪表板**: `http://localhost:8080/dashboard.html` (需要先登录)
- **API接口**: `http://localhost:8080/api/login`

## API接口

### 登录接口

**POST** `/api/login`

**请求体：**
```json
{
    "username": "admin",
    "password": "123456@Zte"
}
```

**成功响应：**
```json
{
    "success": true,
    "message": "登录成功",
    "token": "a1b2c3d4e5f6...",
    "username": "admin"
}
```

**失败响应：**
```json
{
    "success": false,
    "message": "用户名或密码错误"
}
```

### 健康检查接口

**GET** `/api/health`

**响应：**
```
服务运行正常
```

## 测试示例

### 使用curl测试登录

```bash
# 正确的用户名密码
curl -X POST http://localhost:8080/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"123456@Zte"}'

# 错误的用户名密码
curl -X POST http://localhost:8080/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"wrong"}'
```

## 功能说明

1. **登录验证**：只接受用户名 `admin` 和密码 `123456@Zte`
2. **Token生成**：登录成功后生成32位随机UUID作为token
3. **Token存储**：token以用户名作为key存储在全局ConcurrentHashMap中
4. **参数验证**：使用Spring Validation进行请求参数验证
5. **异常处理**：统一的全局异常处理机制
6. **前端界面**：暗色调现代化设计，支持响应式布局
7. **用户体验**：密码显示切换、表单验证、加载动画等
8. **仪表板**：登录成功后跳转到功能丰富的仪表板页面

## 开发说明

- 项目使用Maven进行依赖管理
- 采用RESTful API设计风格
- 支持跨域访问
- 包含完整的异常处理机制
- 使用ConcurrentHashMap保证线程安全
