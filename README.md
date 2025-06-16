# Logo Maker

A simple and intuitive logo maker tool built as part of the **Froncort AI Internship Assignment**. This application allows users to create custom logos with AI-powered assistance and modern design tools.

## 🚀 Live Demo

[View Live Application](#) <!-- Add your deployed link here -->

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **State Management**: Redux Toolkit (RTK)
- **UI Components**: ShadcnUI
- **Styling**: Tailwind CSS (via ShadcnUI)
- **AI Integration**: Google Gemini API
- **Theme**: Supabase theme (customized with TweakCN)

## ✨ Features

- AI-powered logo generation using Google Gemini
- Modern and responsive user interface
- Real-time logo customization
- State management with Redux Toolkit
- Clean and professional design inspired by Supabase

## 🎯 Development Tools & Resources

This project was developed with the assistance of:
- **Claude AI** - For code assistance and problem-solving
- **Cursor IDE** - Primary development environment
- **TweakCN** - For customizing the Supabase theme

### Learning Resources

I followed these excellent YouTube tutorials to master Redux and RTK:
- [Redux Toolkit Tutorial](https://youtu.be/JeidRRc1-y4?si=OZzfIwBAbFO8gwHm)
- [RTK Advanced Concepts](https://youtu.be/fxT54eRIsc4?si=B7zVSK3aqbtLgnzj)

## 🔧 Installation & Setup

### Prerequisites

- Node.js 18+ installed on your machine
- npm or yarn package manager
- Google Gemini API key

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd logo-maker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   To get your Gemini API key:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy and paste it into your `.env.local` file

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
logo-maker/
├── src/
│   ├── app/                 # Next.js 15 App Router
│   ├── components/          # Components
│   ├── actions/             # Server action
│   ├── lib/                 # Utility functions
│   ├── store/               # Redux store configuration
├── public/                  # Static assets
├── .env                     # Environment variables
└── package.json             # Dependencies
```

## 🎨 Key Features Implemented

- **AI Logo Generation**: Powered by Google Gemini API
- **Redux State Management**: Efficient state handling with RTK
- **Modern UI**: Built with ShadcnUI components
- **Responsive Design**: Works seamlessly across all devices
- **Theme Customization**: Supabase-inspired design with TweakCN

## 🤝 Contributing

This project was created as part of an internship assignment. Feel free to fork and modify for your own learning purposes.

## 👨‍💻 About the Developer

**Hardik Gujarathi** aka **Mercury**

- 🌐 Portfolio: [Portfolio](https://hardik-gujarathidev.vercel.app/)
- 📱 Social Links: <!-- Add your social media links here -->
  - LinkedIn: [Hardik Gujrathi](https://www.linkedin.com/in/hardik-gujrathi-b7ba49294/)
  - GitHub: [TheMercury1229](https://github.com/TheMercury1229)
  - X formerly Twitter: [TheMercury1229](https://x.com/TheMercury1229)

---

Built with ❤️ using Next.js 15, Redux, and ShadcnUI
