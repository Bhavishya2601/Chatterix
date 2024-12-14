# Chatterix

**Chatterix** is a real-time chat application that allows users to communicate seamlessly. It leverages modern web technologies to provide an interactive and user-friendly chatting experience.

---

## **Features**

- **Real-Time Chatting**: Instant messaging powered by `socket.io` for a smooth communication experience.
- **Modern UI**: Built with React for an intuitive and responsive user interface.
- **User Authentication**: Secure login and registration using JSON Web Tokens (JWT).
- **Database Storage**: Messages and user data are stored efficiently in MongoDB.
- **Scalable Backend**: Developed with Express and Node.js for robust server-side operations.
- **Mobile-Friendly Design**: Fully responsive layout that works on any device.
- **Tailwind CSS**: For fast and modern styling.

---

## **Tech Stack**

### **Frontend**
- **React**: For building a dynamic and responsive user interface.
- **Tailwind CSS**: For styling and a visually appealing design.

### **Backend**
- **Node.js**: For scalable server-side scripting.
- **Express.js**: For building RESTful APIs.
- **Socket.io**: For enabling real-time communication.

### **Database**
- **MongoDB**: For storing user and message data.

### **Other Tools**
- **JWT (JSON Web Tokens)**: For secure authentication.
- **dotenv**: For environment variable management.
- **nodemon**: For efficient backend development.

---

## **Getting Started**

Follow these steps to set up and run **Chatterix** on your local machine.

### **Prerequisites**

Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/)

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/bhavishya2601/chatterix.git
   cd chatterix
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Backend dependencies
   cd server
   npm install

   # Frontend dependencies
   cd ../client
   npm install
   ```

3. **Configure Backend Environment Variables**:
   Copy the `.env.sample` file in the `server` directory and rename it to `.env`:
     ```bash
     cp .env.sample .env
     ```
   Open the `.env` file and fill in the required values.

4. **Configure Frontend Environment Variables**:
   Copy the `.env.sample` file in the `client` directory and rename it to `.env`:
     ```bash
     cp .env.sample .env
     ```
   Open the `.env` file and fill in the required values.

5. Run the application:
   ```bash
   # Start the backend server
   cd server
   node index.js

   # Start the frontend server
   cd ../client
   npm run dev
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## **Project Structure**

```
chatterix/
├── client/             # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Application pages (Chat, Login, etc.)
│   │   └── App.js      # Main React component
│   └── package.json    # Frontend dependencies
├── server/             # Backend Express application
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   ├── index.js        # Entry point for the server
│   └── package.json    # Backend dependencies
└── README.md           # Documentation
```

## **Contributing**

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push:
   ```bash
   git commit -m "Add your message here"
   git push origin feature-name
   ```
4. Open a Pull Request.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Contact**

For any inquiries or support, reach out at [bhavishya2601garg@gmail.com](mailto:bhavishya2601garg@gmail.com).

---

Enjoy using **Chatterix**!

