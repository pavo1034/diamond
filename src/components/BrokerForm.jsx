import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { brokerSchema } from "../Schemas/brokerSchema";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createBroker, updateBroker,  } from "../store/brokerSlice";

export const BrokerForm = ({brokerId,setBrokerId}) => {
    const {register,handleSubmit,formState:{errors},reset,setValue}=useForm({
        resolver:yupResolver(brokerSchema)
    })
    const brokers = useSelector((store) => store.brokers.brokers);
    const dispatch=useDispatch()

    const formSubmit=(data)=>{
     if(brokerId){
        dispatch(updateBroker({brokerId,data}))
        reset()
     }
     else{
        console.log("data",data)
        dispatch(createBroker(data))
        reset()
     }
    }


    useEffect(()=>{
        const broker =brokers.find(item=>item?.id===brokerId)
        console.log("broker",broker)
        setValue('name',broker?.name);
        setValue('email',broker?.email);
        setValue('phone',broker?.phone);
        setValue('address',broker?.address);
        setValue('status',broker?.status);
        setValue('name',broker?.name);
        setValue('brokerRate',broker?.brokerRate);
    },[brokerId])
  return (
    <div>
      <h1 className="font-bold text-[20px]">Broker Details</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(formSubmit)}>
        <div className="flex justify-between">
          <div>
            <label htmlFor="">Name</label>
            <div>
              <input
                type="text"
                {...register('name')}
                className={`w-60 border-1 ${errors.name ? 'border-red-400':'border-gray-400' } rounded h-8 px-4`}
              />
            </div>
            <div className="text-red-400">
                {errors.name?.message}
            </div>
          </div>
          <div>
            <label htmlFor="">Email</label>
            <div>
              <input
                type="text"
                {...register('email')}
                className={`w-60 border-1 ${errors.email ? 'border-red-400':'border-gray-400' } rounded h-8 px-4`}
              />
                          <div className="text-red-400">
                {errors.email?.message}
            </div>
            </div>
          </div>
          <div>
            <label htmlFor="">Phone No</label>
            <div>
              <input
                type="text"
                {...register('phone')}
                className={`w-60 border-1 ${errors.phone ? 'border-red-400':'border-gray-400' } rounded h-8 px-4`}
              />

            </div>
            <div className="text-red-400">
                {errors.phone?.message}
            </div>
          </div>
          <div>
            <label htmlFor="">Address</label>
            <textarea
              {...register('address')}
              className={`w-full border rounded h-8 ${errors.address ?"border-red-400":"border-gray-400"} px-4`}
              required
            ></textarea>
          </div>
          <div className="text-red-400">
                {errors.address?.message}
            </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex justify-between ">
            <div>
              <label htmlFor="">Broker Rate{" (in percentage)"}</label>
              <div>
                <input type="text"  {...register('brokerRate')}  className={`w-60 border-1 ${errors.brokerRate ? 'border-red-400':'border-gray-400' } rounded h-8 px-4`}/>
              </div>
              <div className="text-red-400">
                {errors.brokerRate?.message}
            </div>
            </div>
            <div className="text-center">
              <label htmlFor="">Status</label>
              <div className="px-8">
                <input type='checkbox'  {...register('status')}  className={`w-60 border-1 ${errors.status ? 'border-red-400':'border-gray-400' } rounded  accent-blue-600 h-8`}/>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-6 py-2 text-white bg-blue-500 rounded">{brokerId?"Update":"Add"}</button>
            <button type="button" className="px-6 py-2 text-white bg-blue-500 rounded" onClick={()=>{
                reset()
                setBrokerId(null)
            }}>Rest</button>
          </div>
        </div>
      </form>
    </div>
  );
};
