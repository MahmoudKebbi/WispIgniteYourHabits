# 📗 Wisp API — Auth & Health Documentation

---

>NOTE <br>
>All the endpoints are preceded by /api

## 🔍 Health Check

### `GET /health`

#### Description:

Check if the server is running and connected to the database.

#### Sample Response:

```json
{
  "status": "ok",
  "uptime": "123.456s"
}
```

---

## 🔐 Auth Routes

---

### 🧾 `POST /auth/signup`

Create a new user and send a verification email.

#### Request Body:

```json
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "displayName": "WispSeeker"
}
```

#### Success Response:

```json
{
  "message": "User created. Please verify your email."
}
```

---

### 🔓 `POST /auth/login`

Login using email and password.

#### Request Body:

```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

#### Success Response:

```json
{
  "token": "<jwt_token>",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "displayName": "WispSeeker",
    "avatarUrl": null
  }
}
```

---

### 📬 `GET /auth/verify-email?token=...`

Verify a user’s email address using the token sent via email.

#### Success Response:

```json
{
  "message": "Email successfully verified"
}
```

---

### 📤 `POST /auth/resend-verification-email`

Resend verification email to unverified users.

#### Request Body:

```json
{
  "email": "user@example.com"
}
```

#### Success Response:

```json
{
  "message": "Verification email resent successfully"
}
```

---

### 🔐 `POST /auth/forgot-password`

Trigger password reset email.

#### Request Body:

```json
{
  "email": "user@example.com"
}
```

#### Success Response:

```json
{
  "message": "Password reset email sent"
}
```

---

### 🔁 `POST /auth/reset-password`

Reset password using token sent via email.

#### Request Body:

```json
{
  "token": "jwt_reset_token",
  "newPassword": "NewPassword456"
}
```

#### Success Response:

```json
{
  "message": "Password has been reset successfully"
}
```

---

### 🔄 `PATCH /auth/change-password` (Authenticated)

Change current password while logged in.

#### Headers:

```
Authorization: Bearer <jwt_token>
```

#### Request Body:

```json
{
  "currentPassword": "OldPassword123",
  "newPassword": "NewSecurePassword456"
}
```

#### Success Response:

```json
{
  "message": "Password changed successfully"
}
```

---

### 👤 `PATCH /auth/profile` (Authenticated)

Update user profile details.

#### Headers:

```
Authorization: Bearer <jwt_token>
```

#### Request Body:

```json
{
  "displayName": "MysticWisp",
  "avatarUrl": "https://cdn.wisp.io/avatars/emberfox.png"
}
```

#### Success Response:

```json
{
  "message": "Profile updated successfully",
  "profile": {
    "id": "uuid",
    "email": "user@example.com",
    "displayName": "MysticWisp",
    "avatarUrl": "https://cdn.wisp.io/avatars/emberfox.png"
  }
}
```

---

