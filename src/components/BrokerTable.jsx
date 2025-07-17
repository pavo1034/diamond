import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeBroker } from "../store/brokerSlice";

export const BrokerTable = ({setBrokerId}) => {
  const brokers = useSelector((store) => store.brokers.brokers);
  const dispatch=useDispatch()
  const DeleteBroker=(id)=>{
     console.log("id",id)
      dispatch(removeBroker(id))
  }

  const updateBroker=(id)=>{
    console.log("update",id)
    setBrokerId(id);
  }
  return (
    <div class="overflow-x-auto mt-16">
      <table class="min-w-full table-auto bg-white">
        <thead class=" text-blue-400 border-1 border-gray-400">
          <tr>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Email Id</th>
            <th class="px-4 py-2">Phone No</th>
            <th class="px-4 py-2">Address</th>
            <th class="px-4 py-2">BrokerRate</th>
            <th class="px-4 py-2">Status</th>
            <th class="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y text-center divide-gray-200">
          {console.log("bro", brokers)}
          {brokers.map((broker) => (
            <tr key={broker.id}>
              <td class="px-4 py-2">{broker?.name}</td>
              <td class="px-4 py-2">{broker?.email}</td>
              <td class="px-4 py-2">{broker?.phone}</td>
              <td class="px-4 py-2">{broker?.address}</td>
              <td class="px-4 py-2">{broker?.brokerRate}</td>
              <td class="px-4 py-2">
                <input type="checkbox" class="accent-blue-600 cursor-not-allowed pointer-events-none" checked={broker?.status}  />
              </td>
            
              <td class="flex gap-3 px-4 py-3">
                <button class="text-white rounded bg-blue-400 px-3 " onClick={()=>updateBroker(broker?.id)}>Edit</button>
                <button class="text-white rounded bg-blue-400 px-3" onClick={()=>DeleteBroker(broker?.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
