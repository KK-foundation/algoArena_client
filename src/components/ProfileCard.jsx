import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Pencil } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { z } from "zod";

export const profileFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().max(226, "Bio must be at most 226 characters"),
  linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  github: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  instagram: z
    .string()
    .url("Invalid Instagram URL")
    .optional()
    .or(z.literal("")),
});

const ProfileCard = () => {
  const [imageUrl, setImageUrl] = useState("/user.png");
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setImageUrl(localUrl);

    const formData = new FormData();
    formData.append("image", file);

    console.log(formData);
  };

  // profile update logic
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileFormSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="flex lg:flex-col p-2 bg-[#2f3136] gap-4 shadow-md relative w-full h-full">
      {/* Placeholder image */}
      <span
        className="absolute right-2 cursor-pointer"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        <Edit />
      </span>

      {/* Model Profile update */}
      <dialog id="my_modal_2" className="modal bg-[#212326]">
        <div className="modal-box bg-[#212326]">
          <h3 className="font-bold text-xl">Edit Profile</h3>
          <br />
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="bg-[#13181c] px-4 py-2 rounded-lg w-full"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <textarea
                type="text"
                name="bio"
                placeholder="Your bio"
                className="bg-[#13181c] px-4 py-2 rounded-lg w-full"
                {...register("bio")}
              />
              {errors.bio && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bio.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="url"
                name="linkedin"
                placeholder="LinkedIn Url"
                className="bg-[#13181c] px-4 py-2 rounded-lg w-full"
                {...register("linkedinURL")}
              />
              {errors.linkedinURL && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.linkedinURL.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="url"
                name="github"
                placeholder="Github Url"
                className="bg-[#13181c] px-4 py-2 rounded-lg w-full"
                {...register("githubURL")}
              />
              {errors.githubURL && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.githubURL.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="url"
                name="instagram"
                placeholder="Instagram Url"
                className="bg-[#13181c] px-4 py-2 rounded-lg w-full"
                {...register("instagramURL")}
              />
              {errors.instagramURl && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.instagramURl.message}
                </p>
              )}
            </div>
            <div className="flex w-full justify-center">
              <button
                className="bg-white text-black py-1 w-24 rounded-lg cursor-pointer"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* Profile Picture */}
      <div className="border rounded-xl relative h-50 w-lg lg:w-30 lg:h-30">
        <span
          className="absolute right-2 top-2 cursor-pointer"
          onClick={handleIconClick}
        >
          <Pencil size={15} />
        </span>
        <img
          src={imageUrl}
          alt="user"
          className="object-cover w-full h-full rounded-xl"
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>

      <div className="flex flex-col lg:gap-4 justify-around">
        <p className="text-2xl lg:text-4xl font-bold">Kunal Kumar</p>
        <p className="text-sm lg:text-lg tracking-tighter">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          accusantium porro modi quod enim fuga, exercitationem consectetur et
          distinctio reprehenderit facilis{" "}
        </p>
        <ul className="flex gap-4">
          <li>
            <FaGithub size={25}  className="cursor-pointer"/>
          </li>
          <li>
            <FaLinkedin size={25}  className="cursor-pointer"/>
          </li>
          <li>
            <FaInstagram size={25}  className="cursor-pointer"/>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileCard;
