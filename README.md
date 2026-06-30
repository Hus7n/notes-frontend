# 📝 Notes App

A modern, secure, full-stack Notes application built with **Next.js**, **Node.js**, **Express**, and **PostgreSQL**. The application allows users to create, organize, pin, search, and securely share notes with other registered users while maintaining complete ownership and edit permissions.

## 🚀 Live Demo

**Frontend:** https://notes-frontend-ruby.vercel.app

# ✨ Features

## Authentication

* User Registration
* Secure Login
* JWT Access Token Authentication
* Refresh Token Authentication
* Protected Routes
* Automatic Token Refresh
* Secure Logout

## Notes

* Create Notes
* Edit Notes
* Delete Notes
* Pin / Unpin Notes
* Search Notes
* Rich Text Content
* Autosave Ready Architecture

## Image Support

* Upload Images
* Multiple Images per Note
* Automatic Image Compression using Sharp
* WebP Image Conversion
* Local Storage Support
* Vercel Blob Storage Ready

## Sharing

* Share Notes with Registered Users
* Read-Only Shared Notes
* Owner-Only Editing
* Private Notes by Default
* Shared Notes Dashboard

## Dashboard

* My Notes
* Shared Notes
* Pinned Notes
* Fast Search
* Responsive Grid Layout
* Empty State UI

## UI

* Modern Glassmorphism Design
* Responsive Layout
* Mobile Friendly
* Beautiful Card-Based Interface
* Custom Components
* Inter Font
* Loading Indicators
* Error Handling

# 🛠 Tech Stack

## Frontend

* Next.js 15
* React
* TypeScript
* Tailwind CSS
* React Hook Form
* Zod
* Lucide React Icons

## Backend

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* pg
* Multer
* Sharp
* JWT
* Cookie Parser
* CORS

## Database

PostgreSQL

Hosted on **Neon**

## Deployment

Frontend

* Vercel

Backend

* Render

Database

* Neon PostgreSQL

# 🔐 Authentication Flow

1. User signs up
2. Server creates account
3. Access Token returned
4. Refresh Token stored securely
5. Protected APIs require Access Token
6. Access Token automatically refreshes
7. Logout invalidates session


# 📖 What I Learned

During this project I gained practical experience with:

* Full Stack Development
* Authentication using JWT
* Refresh Token Flow
* Role-Based Authorization
* REST API Design
* PostgreSQL
* Image Upload Handling
* File Compression using Sharp
* Secure Backend Architecture
* Protected Routes
* Form Validation with Zod
* React Hook Form
* Deployment using Vercel & Render
* Environment Variables
* CORS Configuration
* Production Debugging
* Git & GitHub Workflow
