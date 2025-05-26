import React from "react";
import { useForm } from "react-hook-form";

const CreateSheetForm = () => {
  const {register , handleSubmit , formState:{errors} , reset} = useForm();

  const handleFormSubmit = async (data)=>{
        // await onSubmit(data);
        reset()
        // onClose()
    }

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
            placeholder="Enter playlist name"
            {...register("name", { required: "Playlist name is required" })}
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
            placeholder="Enter playlist description"
            {...register("description")}
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button type="button" className="btn btn-ghost" onClick={() => reset()}>
            Reset
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
