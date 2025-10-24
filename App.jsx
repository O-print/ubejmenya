import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  { code: "en", flag: "🇬🇧" },
  { code: "ru", flag: "🇷🇺" },
  { code: "lt", flag: "🇱🇹" },
  { code: "lv", flag: "🇱🇻" },
  { code: "ua", flag: "🇺🇦" },
];

const actions = [
  { id: 1, label: "Сделать футболку по фото" },
  { id: 2, label: "Загрузить фото" },
  { id: 3, label: "Выбрать шаблон" },
];

export default function App() {
  const [selectedAction, setSelectedAction] = useState(null);
  const [lang, setLang] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleActionClick = (actionId) => {
    setSelectedAction(actionId);
  };

  const handleBack = () => {
    setSelectedAction(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gray-100">
      <header className="w-full flex justify-between items-center p-4">
        <div className="text-lg font-semibold">MyTee</div>
        <div className="flex items-center">
          <div className="relative">
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow">
              {languages.find((l) => l.code === lang).flag}
            </button>
          </div>
          <button className="ml-4 p-2 text-2xl" onClick={() => setMenuOpen(true)}>☰</button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center relative">
        <AnimatePresence>
          {!menuOpen && (
            <>
              <motion.div
                className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow cursor-pointer z-10"
                onClick={() => setSelectedAction(0)}
                animate={{ scale: selectedAction === 0 ? 1.2 : 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                {selectedAction === null ? "Давай начнём" : ""}
              </motion.div>

              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 flex space-x-6">
                {actions.map((action) => (
                  <motion.div
                    key={action.id}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow cursor-pointer"
                    animate={{ scale: selectedAction === action.id ? 2 : 1 }}
                    onClick={() => handleActionClick(action.id)}
                  >
                    {action.label.split(" ")[0]}
                  </motion.div>
                ))}
              </div>

              {selectedAction && (
                <motion.button
                  className="absolute bottom-10 px-4 py-2 bg-gray-200 rounded shadow"
                  onClick={handleBack}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Назад
                </motion.button>
              )}
            </>
          )}

          {menuOpen && (
            <motion.div
              className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <h1 className="text-3xl mb-8">Меню</h1>
              <ul className="space-y-4 text-xl">
                <li>Как это работает</li>
                <li>Контакты</li>
                <li>О нас</li>
              </ul>
              <motion.button
                className="mt-8 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
                onClick={() => setMenuOpen(false)}
                whileHover={{ scale: 1.2 }}
              >
                ←
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="w-full flex justify-center items-center space-x-4 p-4 bg-gray-200">
        <span className="text-2xl cursor-pointer">📘</span>
        <span className="text-2xl cursor-pointer">📸</span>
        <span className="text-2xl cursor-pointer">🐦</span>
        <span>© 2025</span>
      </footer>
    </div>
  );
}