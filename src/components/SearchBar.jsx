import React, { useState } from "react";
import { motion } from "framer-motion";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col sm:flex-row items-stretch gap-3"
    >
      {/* Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a recipe..."
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 
                   focus:outline-none focus:ring-2 focus:ring-purple-400 
                   shadow-sm"
      />

      {/* Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
                   text-white font-semibold rounded-lg shadow-md 
                   hover:shadow-lg transition"
      >
        Search
      </motion.button>
    </motion.form>
  );
};

export default SearchBar;
