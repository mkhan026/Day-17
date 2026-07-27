# Day 17 - Role-Based Authorization

## Overview
Added simple role-based access control to the backend. Users now have a `role` field, and a new middleware (`isAdmin`) restricts certain routes to admin users only.

## What's New

### 1. User Model (`models/User.js`)
Added a `role` field to the user schema:
```js
role: {
  type: String,
  default: 'user'
}
```

### 2. Admin Middleware (`middleware/isadmin.js`)
Checks if the authenticated user has the `admin` role:
```js
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied. Admins only!" });
  }
  next();
};
```

### 3. Admin Route (`routes/admin.js`)
A protected route accessible only to admins:
```
GET /api/admin
```
Runs `authMiddleware` (verifies the token) followed by `isAdmin` (verifies the role).

## How It Works
1. **Authentication** — `authMiddleware` verifies the JWT and attaches the current user (including their role) to `req.user`.
2. **Authorization** — `isAdmin` checks `req.user.role`. Non-admins get a `403 Forbidden` response.

## Testing
- Regular user hitting `/api/admin` → `403 Forbidden`
- Admin user hitting `/api/admin` → `200 OK`, `{ "message": "Welcome Admin!" }`

To test as admin, manually set a user's `role` to `"admin"` in the database, then log in again to get a fresh token.
