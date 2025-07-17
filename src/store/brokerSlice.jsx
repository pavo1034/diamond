import { createSlice } from "@reduxjs/toolkit";

const brokerSlice = createSlice({
  name: "broker",
  initialState: { brokers: [] },
  reducers: {
    createBroker:(state,action)=>{
        state.brokers.push(action.payload);
        state.brokers.forEach((item,index)=>{
            item.id=index+1;
        })
    },
    removeBroker:(state,action)=>{
     console.log("action.payload",action.payload)
      const restBroker=state.brokers.filter((item)=>item?.id!==action.payload);
      state.brokers=[...restBroker];
    },
    updateBroker:(state,action)=>{
      console.log("updatableId",action.payload);
      const {name,email,phone,address,brokerRate,status}=action.payload.data
      console.log({name,email,phone,address,brokerRate,status})
      state.brokers.forEach((item)=>{
        if(item.id===action.payload?.brokerId){
           item.name=name;
           item.email=email;
           item.phone=phone;
           item.address=address;
           item.brokerRate=brokerRate;
           item.status=status;
           return;
        }
      })
    }
  },
});

export const {createBroker,removeBroker,updateBroker} = brokerSlice.actions;
export default brokerSlice.reducer;
