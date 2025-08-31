import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";
import RecipeDetails from "./components/RecipeDetails";
import EmptyState from "./components/EmptyState";
import FavoritesList from "./components/FavouriteList";
import ShoppingList from "./components/ShoppingList";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [shoppingList, setShoppingList] = useState(() => {
    const saved = localStorage.getItem("shoppingList");
    return saved ? JSON.parse(saved) : [];
  });

  // Modal toggles
  const [showFavorites, setShowFavorites] = useState(false);
  const [showShopping, setShowShopping] = useState(false);

  const fetchedRef = useRef(false);

  const searchRecipes = async (query) => {
    setLoading(true);
    setError("");
    setRecipes([]);
    setVisibleCount(9);

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      if (!res.ok) throw new Error("Failed to fetch recipes");

      const data = await res.json();
      if (!data.meals) {
        setError("No recipes found.");
        setRecipes([]);
      } else {
        setRecipes(data.meals);
      }
    } catch (err) {
      setError(err.message || "Unknown error");
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-load popular feed
  useEffect(() => {
    if (!fetchedRef.current) {
      fetchedRef.current = true;
      searchRecipes("");
    }
  }, []);

  // Persist favorites & shopping list
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  }, [shoppingList]);

  const toggleFavorite = (recipe) => {
    setFavorites((prev) => {
      const exists = prev.find((r) => r.idMeal === recipe.idMeal);
      return exists
        ? prev.filter((r) => r.idMeal !== recipe.idMeal)
        : [...prev, recipe];
    });
  };

  const addIngredientsToShoppingList = (ingredients) => {
    setShoppingList((prev) => {
      const updated = [...prev];
      ingredients.forEach((item) => {
        const exists = updated.find((i) => i.name === item.name);
        if (!exists) updated.push(item);
      });
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-extrabold text-center mb-6
                   text-transparent bg-clip-text bg-gradient-to-r
                   from-pink-500 via-purple-500 to-blue-500 drop-shadow-lg"
      >
        🍲 Kitchen Companion
      </motion.h1>

      {/* Favorites & Shopping Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFavorites(true)}
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
        >
          ❤️ Favorites
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowShopping(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          🛒 Shopping List
        </motion.button>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-6">
        <SearchBar onSearch={searchRecipes} />
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-center text-blue-600 font-semibold mt-6">Loading recipes...</p>}
      {error && (
        <EmptyState
          title="No Recipes Found"
          message={`We couldn’t find any meals for your search. Try checking your spelling or explore some popular options below:`}
          suggestions={["Chicken", "Pasta", "Soup", "Beef"]}
          onSuggestionClick={searchRecipes}
        />
      )}

      {/* Recipe Grid */}
      {recipes.length > 0 && (
        <>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4"
          >
            {recipes.slice(0, visibleCount).map((recipe) => (
              <motion.div
                key={recipe.idMeal}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <RecipeCard
                  recipe={recipe}
                  onSelect={setSelectedRecipe}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={favorites.some((f) => f.idMeal === recipe.idMeal)}
                />
              </motion.div>
            ))}
          </motion.div>

          {visibleCount < recipes.length && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="mt-10 block mx-auto px-8 py-3
                         bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
                         text-white font-semibold rounded-full shadow-md
                         hover:shadow-lg transition"
            >
              Show More
            </motion.button>
          )}
        </>
      )}

      {/* Recipe Details Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50 p-4"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 overflow-y-auto max-h-[80vh]"
            >
              <RecipeDetails
                recipe={selectedRecipe}
                onClose={() => setSelectedRecipe(null)}
                addIngredientsToShoppingList={addIngredientsToShoppingList}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Favorites Modal */}
      <AnimatePresence>
        {showFavorites && (
          <motion.div
            key="favorites-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-6 overflow-y-auto max-h-[80vh]"
            >
              <FavoritesList
                favorites={favorites}
                onSelect={setSelectedRecipe}
                onToggleFavorite={toggleFavorite}
                isOpen={showFavorites}
                onClose={() => setShowFavorites(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shopping List Modal */}
      <AnimatePresence>
        {showShopping && (
          <motion.div
            key="shopping-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-6 overflow-y-auto max-h-[80vh]"
            >
              <ShoppingList
                list={shoppingList}
                setList={setShoppingList}
                onClose={() => setShowShopping(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
