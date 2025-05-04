# NewsLy - Your Personalized News Aggregator

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react)
![Django](https://img.shields.io/badge/Django-5.1.7-092E20?logo=django)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)
![Material UI](https://img.shields.io/badge/Material_UI-7.0-0081CB?logo=material-ui)

## 📰 Overview

NewsLy is a modern news aggregation web application that allows users to discover, filter, and save articles from various news sources around the world. With a sleek dark-themed interface and powerful filtering capabilities, NewsLy makes it easy to stay informed about topics that matter to you.

![NewsLy Screenshot](https://via.placeholder.com/800x450.png?text=NewsLy+Screenshot)

## ✨ Features

- **User Authentication** - Create an account and securely log in
- **Multi-Source Aggregation** - Browse news from numerous sources in one place
- **Advanced Filtering** - Filter by keyword, source, domain, language, and date
- **Article Saving** - Save interesting articles to your personal collection
- **Responsive Design** - Seamless experience across desktop and mobile devices
- **Dark Theme** - Easy on the eyes for extended reading sessions

## 🛠️ Technologies

### Backend
- **Django** - Robust Python web framework
- **SQLite** - Lightweight database for user data and preferences
- **News API** - Real-time access to headlines and articles
- **CORS Headers** - Secure cross-origin requests

### Frontend
- **React** - Modern, component-based UI library
- **Material UI** - Polished UI components
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Beautiful icon set
- **Vite** - Fast build tooling

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.8 or higher)
- pip (Python package manager)

### Installation

#### Backend Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/newsly.git
   cd newsly
   ```

2. Create and activate a virtual environment
   ```bash
   python -m venv env
   # On Windows
   env\Scripts\activate
   # On macOS/Linux
   source env/bin/activate
   ```

3. Install dependencies
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations
   ```bash
   cd platform_app
   python manage.py migrate
   ```

5. Start the Django server
   ```bash
   python manage.py runserver
   ```

#### Frontend Setup

1. Navigate to the frontend directory
   ```bash
   cd news_frontend
   ```

2. Install NPM packages
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## 📋 Usage

### User Registration and Login
- Create a new account by clicking "Sign Up" on the login screen
- Enter your username, email, and password to register
- Use your credentials to log in to the application

### Searching for News
- Use the filter form to search by keyword, source, or domain
- Apply additional filters such as language, date range, and content type
- Click "Search" to retrieve matching articles

### Saving Articles
- Click the "Save" button next to any article to add it to your collection
- View your saved articles in the "Saved Collection" sidebar
- Click "View" to open the original article in a new tab

### Expanding Article Details
- Click on any article row to view additional details
- See the full description, content preview, and article image
- Access the original source via the "Read more" link

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgements

- [News API](https://newsapi.org/) for providing access to news sources
- [Material UI](https://mui.com/) for the beautiful React components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React Icons](https://react-icons.github.io/react-icons/) for the icon set

---
