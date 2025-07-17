import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { diamondSchema } from "../Schemas/diamondSchema";
import { useDispatch, useSelector } from "react-redux";
import { createDiamond, updateDiamond } from "../store/diamondSlice";

export const DiamondForm = ({ diamondId,setDiamondId }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(diamondSchema),
    defaultValues: {
      stockNo: "",
    },
  });
  const diamonds = useSelector((store) => store.diamonds.diamonds);  
  const carat = Number(watch("carat"));
  const RAPprice = Number(watch("RAPprice"));
  const disc = Number(watch("disc"));

  const dispatch=useDispatch()

  const formSubmit = (data) => {
    if (diamondId) {
      dispatch(updateDiamond({ diamondId,data }));
      reset();
    } else {
      console.log("data", data);
      dispatch(createDiamond(data));
      reset();
    }
  };

  useEffect(() => {
    const diamond = diamonds.find(item => item?.id === diamondId);
    if (!diamond) return;
  
    setValue("stockNo", diamond.stockNo);
    setValue("carat", diamond.carat);
    setValue("shape", diamond.shape);
    setValue("color", diamond.color);
    setValue("clarity", diamond.clarity);
    setValue("RAPprice", diamond.RAPprice);
    setValue("disc", diamond.disc);
 
    setValue("PPC",diamond.ppc);
  

    setValue("totalAmount", diamond.totalAmount);
  }, [diamondId, diamonds, setValue]);
  

  useEffect(() => {
    const generateStockNo = () => {
      const numbers = Math.floor(1000000 + Math.random() * 9000000);
      const letters = Array.from({ length: 3 }, () =>
        String.fromCharCode(65 + Math.floor(Math.random() * 26))
      ).join("");
      return `${numbers}${letters}`;
    };
    setValue("stockNo", generateStockNo());
  }, [setValue,diamondId]);

  useEffect(() => {
    const validInputs =
      !isNaN(Number(RAPprice)) && !isNaN(Number(disc)) && !isNaN(Number(carat));

    if (validInputs) {
      const ppc = RAPprice + RAPprice * (disc / 100);
      const total = ppc * carat;
      setValue("PPC", parseFloat(ppc.toFixed(2)));
      setValue("totalAmount", parseFloat(total.toFixed(2)));
    }
  }, [RAPprice, disc, carat, setValue]);

  return (
    <div className="p-5">
      <h1 className="font-bold text-[20px]">Diamond Details</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(formSubmit)}>
        <div className="flex justify-between gap-3">
          <div>
            <label htmlFor="">Stock No</label>
            <div>
              <input
                type="text"
                {...register("stockNo")}
                className={`w-40 border-1 ${
                  errors.stockNo ? "border-red-400" : "border-gray-400"
                } rounded h-8 px-4`}
              />
            </div>
            <div className="text-red-400">{errors.stockNo?.message}</div>
          </div>
          <div>
            <label htmlFor="">Carat</label>
            <div>
              <input
                type="text"
                {...register("carat")}
                className={`w-60 border-1 ${
                  errors.carat ? "border-red-400" : "border-gray-400"
                } rounded h-8 px-4`}
              />
            </div>
            <div className="text-red-400">{errors.carat?.message}</div>
          </div>
          <div>
            <label htmlFor="">Shape</label>
            <div>
              <input
                type="text"
                {...register("shape")}
                className={`w-60 border-1 ${
                  errors.shape ? "border-red-400" : "border-gray-400"
                } rounded h-8 px-4`}
              />
              <div className="text-red-400">{errors.shape?.message}</div>
            </div>
          </div>
          <div>
            <label htmlFor="">Color</label>
            <div>
              <input
                type="text"
                {...register("color")}
                className={`w-60 border-1 ${
                  errors.color ? "border-red-400" : "border-gray-400"
                } rounded h-8 px-4`}
              />
            </div>
            <div className="text-red-400">{errors.color?.message}</div>
          </div>
          <div>
            <label htmlFor="">Clarity</label>
            <input
              {...register("clarity")}
              className={`w-full border rounded h-8 ${
                errors.clarity ? "border-red-400" : "border-gray-400"
              } px-4`}
              required
            />
          </div>
          <div className="text-red-400">{errors.clarity?.message}</div>
        </div>
        <div className="flex justify-between  items-end gap-6">
          <div className="flex justify-between  gap-4">
            <div>
              <label htmlFor="">RAP price</label>
              <div>
                <input
                  type="text"
                  {...register("RAPprice")}
                  className={`w-60 border-1 ${
                    errors.RAPprice ? "border-red-400" : "border-gray-400"
                  } rounded h-8 px-4`}
                />
              </div>
              <div className="text-red-400">{errors.RAPprice?.message}</div>
            </div>
            <div>
              <label htmlFor="">Disc{" (in percentage)"}</label>
              <div>
                <input
                  type="text"
                  {...register("disc")}
                  className={`w-60 border-1 ${
                    errors.disc ? "border-red-400" : "border-gray-400"
                  } rounded h-8 px-4`}
                />
              </div>
              <div className="text-red-400">{errors.disc?.message}</div>
            </div>
            <div>
              <label htmlFor="">PPC</label>
              <div>
                <input
                  type="text"
                  {...register("PPC")}
                  className={`w-60 border-1  rounded h-8 px-4`}
                />
              </div>
            </div>
            <div>
              <label htmlFor="">Total Amount</label>
              <div>
                <input
                  type="text"
                  {...register("totalAmount")}
                  className={`w-60 border-1  rounded h-8 px-4`}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <button
              type="submit"
              className="px-3 text-white bg-blue-500 rounded"
            >
              {diamondId ? "Update" : "Add"}
            </button>
            <button
              type="button"
              className="px-3 text-white bg-blue-500 rounded"
              onClick={() =>{
                reset()
                setDiamondId(null);
              }}
            >
              Rest
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
