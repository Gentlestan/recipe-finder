import React from "react";

const ShoppingList = ({ list, setList, onClose }) => {
  const updateQuantity = (index, value) => {
    const updated = [...list];
    updated[index].quantity = value;
    setList(updated);
  };

  const removeItem = (index) => {
    setList((prev) => prev.filter((_, i) => i !== index));
  };

  const printList = () => {
    const content = list.map((item) => `${item.quantity} ${item.name}`).join("\n");
    const newWindow = window.open();
    newWindow.document.write(`<pre>${content}</pre>`);
    newWindow.print();
  };

  return (
    <div className="relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 px-3 py-1 rounded-full text-white 
                   bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
                   shadow-md hover:shadow-lg"
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold mb-4 text-gray-700">🛒 Shopping List</h2>

      {list.length === 0 ? (
        <p className="text-center text-gray-500">Your shopping list is empty.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {list.map((item, idx) => (
              <li key={idx} className="flex items-center justify-between">
                <input
                  type="text"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(idx, e.target.value)}
                  placeholder="Quantity"
                  className="border px-2 py-1 rounded w-24 mr-2"
                />
                <span className="flex-1">{item.name}</span>
                <button
                  onClick={() => removeItem(idx)}
                  className="ml-2 text-red-500 font-bold"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={printList}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Print List
          </button>
        </>
      )}
    </div>
  );
};

export default ShoppingList;
