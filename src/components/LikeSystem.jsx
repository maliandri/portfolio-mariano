import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function LikeSystem() {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userVote, setUserVote] = useState(null); // 'like', 'dislike', o null

  // Cargar datos guardados al iniciar
  useEffect(() => {
    const savedLikes = localStorage.getItem('siteLikes');
    const savedDislikes = localStorage.getItem('siteDislikes');
    const savedUserVote = localStorage.getItem('userVote');
    
    if (savedLikes) setLikes(parseInt(savedLikes));
    if (savedDislikes) setDislikes(parseInt(savedDislikes));
    if (savedUserVote) setUserVote(savedUserVote);
  }, []);

  // Función para manejar el voto
  const handleVote = (voteType) => {
    let newLikes = likes;
    let newDislikes = dislikes;
    let newUserVote = voteType;

    // Si el usuario ya votó lo mismo, quitar el voto
    if (userVote === voteType) {
      if (voteType === 'like') {
        newLikes = Math.max(0, likes - 1);
      } else {
        newDislikes = Math.max(0, dislikes - 1);
      }
      newUserVote = null;
    }
    // Si el usuario cambió su voto
    else if (userVote && userVote !== voteType) {
      if (userVote === 'like') {
        newLikes = Math.max(0, likes - 1);
        newDislikes = dislikes + 1;
      } else {
        newDislikes = Math.max(0, dislikes - 1);
        newLikes = likes + 1;
      }
    }
    // Si es un nuevo voto
    else {
      if (voteType === 'like') {
        newLikes = likes + 1;
      } else {
        newDislikes = dislikes + 1;
      }
    }

    // Actualizar estados y localStorage
    setLikes(newLikes);
    setDislikes(newDislikes);
    setUserVote(newUserVote);
    
    localStorage.setItem('siteLikes', newLikes.toString());
    localStorage.setItem('siteDislikes', newDislikes.toString());
    localStorage.setItem('userVote', newUserVote || '');
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      {/* Botón de Like */}
      <motion.button
        onClick={() => handleVote('like')}
        className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all duration-300 ${
          userVote === 'like'
            ? 'bg-green-500 text-white scale-105'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900'
        } border border-gray-200 dark:border-gray-700`}
        whileHover={{ scale: userVote === 'like' ? 1.05 : 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ 
            scale: userVote === 'like' ? [1, 1.3, 1] : 1,
            rotate: userVote === 'like' ? [0, 15, -15, 0] : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
        </motion.div>
        <span className="font-medium">{likes}</span>
      </motion.button>

      {/* Botón de Dislike */}
      <motion.button
        onClick={() => handleVote('dislike')}
        className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all duration-300 ${
          userVote === 'dislike'
            ? 'bg-red-500 text-white scale-105'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900'
        } border border-gray-200 dark:border-gray-700`}
        whileHover={{ scale: userVote === 'dislike' ? 1.05 : 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ 
            scale: userVote === 'dislike' ? [1, 1.3, 1] : 1,
            rotate: userVote === 'dislike' ? [0, -15, 15, 0] : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <svg className="w-5 h-5 transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
        </motion.div>
        <span className="font-medium">{dislikes}</span>
      </motion.button>
    </motion.div>
  );
}

export default LikeSystem;