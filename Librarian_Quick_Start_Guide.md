# 📘 Librarian Quick Start Guide - HITECH Library Online OPAC

Welcome to the new digital face of your library! This application acts as a secure bridge to your **LIPS5 SQL Database**, allowing students to search for books and check their status online without touching your main server directly.

---

## 🔎 1. Searching for Books
- **Global Search:** Students can search by **Title**, **Author**, **Accession Number**, or **ISBN**.
- **Filters:** They can filter results by **Department** (e.g., CSE, IT, MECH) to find relevant textbooks quickly.
- **Sorting:** Books can be sorted by **Newest First** (Year) or **Alphabetically** (Title/Author).

## 📊 2. Student Dashboard
Students can log in using their **College Roll Number** (e.g., `720824108092`).
- **Issued Books:** Shows exactly which books they have currently, including the **Issue Date** and **Due Date**.
- **Overdue Alerts:** Books past the due date will be highlighted in **Red** with a "Days Overdue" counter.
- **Fines Tracking:** Automatically displays any **Unpaid Fines** from the `fine_receipt1` table.
- **Profile Info:** Shows their Name, Department, and Category (Max books/days allowed).

## 🔒 3. Security & Safety
- **Read-Only:** The app uses a "Read-Only" user (`LibraryUserReader1`). It **cannot delete or change** any data in your LIPS5 system.
- **Privacy:** Only students with a valid Roll Number in your database can see their borrowed history.
- **Secret Key:** The connection between the website and your server is protected by a private security key.

---

## 🚀 4. Important Tip
To make the library public for students to use on their phones, the **Localtunnel** must be running on the computer. Simply give students the `loca.lt` link provided when the system starts!

---
*Created by Samiulla & Samiulla - HITECH Library Project*
