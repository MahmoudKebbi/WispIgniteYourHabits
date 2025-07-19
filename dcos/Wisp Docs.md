# 📗 Wisp API — Auth & Health Documentation

---

> NOTE <br>
> All the endpoints are preceded by /api

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

# 📗 Wisp API — Habits Documentation

---

> NOTE <br>
> All the endpoints are preceded by /api/habits and require authentication

## 🏃‍♂️ Habit Management

---

### 📝 `POST /create`

Create a new habit.

#### Request Headers:

```
Authorization: Bearer <jwt_token>
```

#### Request Body:

```json
{
  "name": "Morning Meditation",
  "description": "10 minutes of mindfulness each morning",
  "frequency": "daily", // "daily", "weekly", or "custom"
  "goalPerPeriod": 1,
  "difficulty": "medium", // "very_easy", "easy", "medium", "hard", "epic"
  "category": "self_care", // "health", "productivity", "self_care", "chores", "creativity"
  "xpReward": 20, // optional, defaults based on difficulty
  "coinReward": 10, // optional, defaults based on difficulty
  "daysOfWeek": [1, 3, 5] // optional, for custom frequency (0=Sunday, 6=Saturday)
}
```

#### Success Response:

```json
{
  "message": "Habit created successfully",
  "habit": {
    "id": "uuid",
    "name": "Morning Meditation",
    "description": "10 minutes of mindfulness each morning",
    "frequency": "daily",
    "goal_per_period": 1,
    "difficulty": "medium",
    "category": "self_care",
    "xp_reward": 20,
    "coin_reward": 10,
    "is_archived": false,
    "created_at": "2023-01-01T12:00:00Z",
    "updated_at": "2023-01-01T12:00:00Z"
  }
}
```

---

### 📋 `GET /all`

Get all active habits for the authenticated user.

#### Request Headers:

```
Authorization: Bearer <jwt_token>
```

#### Success Response:

```json
{
  "habits": [
    {
      "id": "uuid",
      "name": "Morning Meditation",
      "description": "10 minutes of mindfulness each morning",
      "frequency": "daily",
      "goal_per_period": 1,
      "difficulty": "medium",
      "category": "self_care",
      "xp_reward": 20,
      "coin_reward": 10,
      "is_archived": false,
      "created_at": "2023-01-01T12:00:00Z",
      "updated_at": "2023-01-01T12:00:00Z"
    }
    // Additional habits...
  ]
}
```

---

### 🔍 `GET /:id`

Get a specific habit by ID.

#### Request Headers:

```
Authorization: Bearer <jwt_token>
```

#### Success Response:

```json
{
  "habit": {
    "id": "uuid",
    "name": "Morning Meditation",
    "description": "10 minutes of mindfulness each morning",
    "frequency": "daily",
    "goal_per_period": 1,
    "difficulty": "medium",
    "category": "self_care",
    "xp_reward": 20,
    "coin_reward": 10,
    "is_archived": false,
    "created_at": "2023-01-01T12:00:00Z",
    "updated_at": "2023-01-01T12:00:00Z"
  }
}
```

---

### ✏️ `PUT /:id`

Update a habit.

#### Request Headers:

```
Authorization: Bearer <jwt_token>
```

#### Request Body:

```json
{
  "name": "Evening Meditation",
  "description": "Updated description",
  "frequency": "daily",
  "goal_per_period": 1,
  "difficulty": "hard",
  "category": "self_care",
  "xp_reward": 40,
  "coin_reward": 20,
  "days_of_week": [1, 3, 5]
}
```

#### Success Response:

```json
{
  "message": "Habit updated successfully",
  "habit": {
    "id": "uuid",
    "name": "Evening Meditation",
    "description": "Updated description",
    "frequency": "daily",
    "goal_per_period": 1,
    "difficulty": "hard",
    "category": "self_care",
    "xp_reward": 40,
    "coin_reward": 20,
    "is_archived": false,
    "created_at": "2023-01-01T12:00:00Z",
    "updated_at": "2023-01-02T12:00:00Z"
  }
}
```

---

### ✓ `POST /:id/check-in`

Record a habit completion.

#### Request Headers:

```
Authorization: Bearer <jwt_token>
```

#### Request Body:

```json
{
  "habitId": "uuid",
  "sourceId": "uuid", // optional, source of the check-in
  "notes": "Felt really calm today" // optional
}
```

#### Success Response:

```json
{
  "message": "Habit checked in successfully",
  "event": {
    "id": "uuid",
    "habit": { "id": "uuid" },
    "user": { "id": "uuid" },
    "completed_at": "2023-01-02T12:00:00Z",
    "xp_earned": 20,
    "coin_earned": 10,
    "notes": "Felt really calm today"
  }
}
```

---

### 📁 `POST /:id/archive`

Archive a habit (soft delete).

#### Request Headers:

```
Authorization: Bearer <jwt_token>
```

#### Success Response:

```json
{
  "message": "Habit archived successfully",
  "habit": {
    "id": "uuid",
    "name": "Morning Meditation",
    "is_archived": true
    // Other habit properties...
  }
}
```

---

### 📂 `POST /:id/unarchive`

Restore an archived habit.

#### Request Headers:

```
Authorization: Bearer <jwt_token>
```

#### Success Response:

```json
{
  "message": "Habit unarchived successfully",
  "habit": {
    "id": "uuid",
    "name": "Morning Meditation",
    "is_archived": false
    // Other habit properties...
  }
}
```

---

### 🗑️ `DELETE /:id`

Permanently delete a habit.

#### Request Headers:

```
Authorization: Bearer <jwt_token>
```

#### Success Response:

```json
{
  "message": "Habit deleted successfully"
}
```

---

### 📊 `GET /frequency/:frequency`

Get habits filtered by frequency (daily, weekly, custom).

#### Request Headers:

```
Authorization: Bearer <jwt_token>
```

#### Success Response:

```json
{
  "habits": [
    {
      "id": "uuid",
      "name": "Morning Meditation",
      "frequency": "daily"
      // Other habit properties...
    }
    // Additional habits with the specified frequency...
  ]
}
```

---

### 📚 `GET /archived`

Get all archived habits.

#### Request Headers:

```
Authorization: Bearer <jwt_token>
```

#### Success Response:

```json
{
  "archivedHabits": [
    {
      "id": "uuid",
      "name": "Old Habit",
      "is_archived": true
      // Other habit properties...
    }
    // Additional archived habits...
  ]
}
```

---

### 🔢 `GET /count`

Get count of active habits.

#### Request Headers:

```
Authorization: Bearer <jwt_token>
```

#### Success Response:

```json
{
  "count": 12
}
```

---

### 🔢 `GET /archived/count`

Get count of archived habits.

#### Request Headers:

```
Authorization: Bearer <jwt_token>
```

#### Success Response:

```json
{
  "count": 5
}
```

---

### 🔠 `GET /habit/:name`

Find a habit by exact name.

#### Request Headers:

```
Authorization: Bearer <jwt_token>
```

#### Success Response:

```json
{
  "habit": {
    "id": "uuid",
    "name": "Morning Meditation"
    // Other habit properties...
  }
}
```

---

### 🔍 `GET /search?query=meditation`

Search habits by name or description.

#### Request Headers:

```
Authorization: Bearer <jwt_token>
```

#### Success Response:

```json
{
  "habits": [
    {
      "id": "uuid",
      "name": "Morning Meditation",
      "description": "10 minutes of mindfulness each morning"
      // Other habit properties...
    },
    {
      "id": "uuid",
      "name": "Evening Meditation",
      "description": "Calm down before sleep"
      // Other habit properties...
    }
    // Additional matching habits...
  ]
}
```
