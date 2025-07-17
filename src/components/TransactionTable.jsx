import React, { useState } from "react";
import { useSelector } from "react-redux";

export const TransactionTable = ({selectedIds,setSelectedIds}) => {
  const diamonds = useSelector((store) => store.diamonds.diamonds);


  const handleRowClick = (id) => {
    setSelectedIds((prevSelectedIds) => {
      const newSelectedIds = new Set(prevSelectedIds);
      if (newSelectedIds.has(id)) {
        newSelectedIds.delete(id);
      } else {
        newSelectedIds.add(id);
      }
      return newSelectedIds;
    });
  };

  return (
    <div className="overflow-x-auto mt-16">
      <table className="min-w-full table-auto bg-white">
        <thead className="text-blue-400 border border-gray-400">
          <tr>
            <th className="px-4 py-2">Stock No</th>
            <th className="px-4 py-2">Carat</th>
            <th className="px-4 py-2">Shape</th>
            <th className="px-4 py-2">Color</th>
            <th className="px-4 py-2">Clarity</th>
            <th className="px-4 py-2">RAP price</th>
            <th className="px-4 py-2">Dis%</th>
            <th className="px-4 py-2">PPC</th>
            <th className="px-4 py-2">Total Amount</th>
            <th className="px-4 py-2">Select</th>
            {console.log("ggg",selectedIds)}
          </tr>
        </thead>
        <tbody className="divide-y text-center divide-gray-200">
          {diamonds.map((diamond) => {
            const isSelected = selectedIds.has(diamond.id);
            return (
              <tr
                key={diamond.id}
                className={`cursor-pointer ${isSelected ? "bg-blue-100" : ""}`}
                onClick={() => handleRowClick(diamond.id)}
              >
                <td className="px-4 py-2 whitespace-nowrap">{diamond.stockNo}</td>
                <td className="px-4 py-2">{diamond.carat}</td>
                <td className="px-4 py-2">{diamond.shape}</td>
                <td className="px-4 py-2">{diamond.color}</td>
                <td className="px-4 py-2">{diamond.clarity}</td>
                <td className="px-4 py-2">{diamond.RAPprice}</td>
                <td className="px-4 py-2">{diamond.disc}</td>
                <td className="px-4 py-2">{diamond.PPC}</td>
                <td className="px-4 py-2">{diamond.totalAmount}</td>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleRowClick(diamond.id);
                    }}
                    onClick={(e) => e.stopPropagation()} // Prevent row click event twice
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
