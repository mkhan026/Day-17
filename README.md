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
