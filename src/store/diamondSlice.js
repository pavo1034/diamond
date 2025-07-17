import { createSlice } from "@reduxjs/toolkit";

const diamondSlice = createSlice({
  name: "diamond",
  initialState: { diamonds: [] },
  reducers: {
    createDiamond:(state,action)=>{
        state.diamonds.push(action.payload);
        state.diamonds.forEach((item,index)=>{
            item.id=index+1;
        })
    },
    removeDiamond:(state,action)=>{
     console.log("action.payload",action.payload)
      const restBroker=state.diamonds.filter((item)=>item?.id!==action.payload);
      state.diamonds=[...restBroker];
    },
    updateDiamond:(state,action)=>{
      console.log("updatableId",action.payload);
      const {stockNo,carat,shape,color,clarity,RAPprice,disc,PPC,totalAmount}=action.payload.data
      console.log({stockNo,carat,shape,color,clarity,RAPprice,disc,PPC,totalAmount})
      state.diamonds.forEach((item)=>{
        if(item.id===action.payload?.diamondId){
           item.stockNo=stockNo;
           item.carat=carat;
           item.shape=shape;
           item.color=color;
           item.clarity=clarity;
           item.RAPprice=RAPprice;
           item.disc=disc;
           item.PPC=PPC;
           item.totalAmount=totalAmount;
           return;
        }
      })
    }
  },
});

export const {createDiamond,updateDiamond,removeDiamond} = diamondSlice.actions;
export default diamondSlice.reducer;
