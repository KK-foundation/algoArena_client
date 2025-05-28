import React from "react";
import { useForm } from "react-hook-form";
import { useSheetStore } from "../store/useSheetStore";
import { Loader } from "lucide-react";

const CreateSheetForm = ({setNewSheetAdd}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const {isLoading,createSheet} = useSheetStore();

  const handleFormSubmit = async (data) => {
    const res = await createSheet(data);
    if(res.data.success){
      setNewSheetAdd(true);
    }
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Playlist Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter Sheet name"
            {...register("name", { required: "Sheet name is required" })}
          />
          {errors.name && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.name.message}
              </span>
            </label>
          )}
        </div>

        <div className="form-control flex flex-col">
          <label className="label">
            <span className="label-text font-medium">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Enter Sheet description"
            {...register("description")}
          />
        </div>

        <div className="form-control flex flex-col">
          <label className="label">
            <span className="label-text font-medium">Visibility</span>
          </label>
          <select
            name="visibility"
            {...register("visibility")}
            id="visibility"
            className="input input-bordered w-full"
            defaultValue="public"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => reset()}
          >
            {isLoading ? <Loader className="animate-spin"/> : "Reset"}
          </button>
          <button type="submit" className="btn btn-primary">
            Create Playlist
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSheetForm;
