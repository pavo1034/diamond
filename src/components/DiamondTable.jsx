import React from 'react'
import { removeDiamond } from '../store/diamondSlice'
import { useDispatch, useSelector } from 'react-redux';

export const DiamondTable = ({setDiamondId}) => {
 const dispatch=useDispatch();
 const diamonds = useSelector((store) => store.diamonds.diamonds);  
  const updateDiamond=(id)=>{
    console.log("update",id)
    setDiamondId(id);
  }  

  const DeleteDiamond=(id)=>{
    console.log("id",id)
    dispatch(removeDiamond(id))
  }

  return (
    <div className="overflow-x-auto mt-16">
     {diamonds.length>0 && <table className="min-w-full table-auto bg-white">
        <thead className=" text-blue-400 border-1 border-gray-400">
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
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y text-center divide-gray-200">
          {console.log("bro", diamonds)}
          {diamonds.map((diamond) => (
            <tr key={diamond.id}>
              <td className="px-4 py-2">{diamond?.stockNo}</td>
              <td className="px-4 py-2">{diamond?.carat}</td>
              <td className="px-4 py-2">{diamond?.shape}</td>
              <td className="px-4 py-2">{diamond?.color}</td>
              <td className="px-4 py-2">{diamond?.clarity}</td>
              <td className="px-4 py-2">
                {
                    diamond?.RAPprice
                }
              </td>
              <td className="px-4 py-2">{diamond?.disc}</td>
              <td className="px-4 py-2">{diamond?.PPC}</td>
              <td className="px-4 py-2">{diamond?.totalAmount}</td>
            
              <td className="flex gap-3 px-4 py-3">
                <button className="text-white rounded bg-blue-400 px-3 " onClick={()=>updateDiamond(diamond?.id)}>Edit</button>
                <button className="text-white rounded bg-blue-400 px-3" onClick={()=>DeleteDiamond(diamond?.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
  )
}
