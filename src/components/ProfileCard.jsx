import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Loader, Pencil } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { z } from "zod";
import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";

// ✅ Fixed schema field names
export const profileFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().max(226, "Bio must be at most 226 characters"),
  linkedinURL: z
    .string()
    .url("Invalid LinkedIn URL")
    .optional()
    .or(z.literal("")),
  githubURL: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  instagramURL: z
    .string()
    .url("Invalid Instagram URL")
    .optional()
    .or(z.literal("")),
});

const ProfileCard = () => {
  const [imageUrl, setImageUrl] = useState("/user.png");
  const { authUser, checkAuth } = useAuthStore();
  const { uploadingImage, isUpLoadingImage, isLoading, updateProfile } =
    useUserStore();

  const fileInputRef = useRef(null);

  const handleIconClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setImageUrl(localUrl);

    const formData = new FormData();
    formData.append("image", file);

    const res = await uploadingImage(formData);
    if (res?.data?.success) {
      checkAuth();
    }
  };

  useEffect(() => {
    if (!authUser) checkAuth();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: authUser?.name || "",
      bio: authUser?.bio || "",
      linkedinURL:
        authUser?.links?.find((l) => l.name === "linkedin")?.url || "",
      githubURL: authUser?.links?.find((l) => l.name === "github")?.url || "",
      instagramURL:
        authUser?.links?.find((l) => l.name === "instagram")?.url || "",
    },
  });

  const onSubmit = async (data) => {
    const updatedData = {
      name: data.name,
      bio: data.bio,
      links: [
        { name: "linkedin", url: data.linkedinURL },
        { name: "github", url: data.githubURL },
        { name: "instagram", url: data.instagramURL },
      ].filter((link) => link.url !== ""),
    };

    const res = await updateProfile(updatedData);

    if (res.data.success) {
      checkAuth();
    }
  };

  return (
    <div className="flex lg:flex-col p-2 bg-[#2f3136] gap-4 shadow-md relative w-full h-full">
      {/* Edit Icon */}
      <span
        className="absolute right-2 cursor-pointer"
        onClick={() => {
          reset(); // Reset form to default before opening
          document.getElementById("my_modal_2").showModal();
        }}
      >
        <Edit />
      </span>

      {/* Modal for Editing */}
      <dialog id="my_modal_2" className="modal bg-[#212326]">
        <div className="modal-box bg-[#212326]">
          <h3 className="font-bold text-xl">Edit Profile</h3>
          <br />
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Name */}
            <div>
              <input
                type="text"
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

            {/* Bio */}
            <div>
              <textarea
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

            {/* LinkedIn */}
            <div>
              <input
                type="url"
                placeholder="LinkedIn URL"
                className="bg-[#13181c] px-4 py-2 rounded-lg w-full"
                {...register("linkedinURL")}
              />
              {errors.linkedinURL && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.linkedinURL.message}
                </p>
              )}
            </div>

            {/* GitHub */}
            <div>
              <input
                type="url"
                placeholder="GitHub URL"
                className="bg-[#13181c] px-4 py-2 rounded-lg w-full"
                {...register("githubURL")}
              />
              {errors.githubURL && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.githubURL.message}
                </p>
              )}
            </div>

            {/* Instagram */}
            <div>
              <input
                type="url"
                placeholder="Instagram URL"
                className="bg-[#13181c] px-4 py-2 rounded-lg w-full"
                {...register("instagramURL")}
              />
              {errors.instagramURL && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.instagramURL.message}
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
        {isUpLoadingImage ? (
          <Loader className="animate-spin" />
        ) : (
          <img
            src={authUser ? authUser.image || imageUrl : imageUrl}
            alt="user"
            className="object-cover w-full h-full rounded-xl"
          />
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>

      {/* Profile Info */}
      <div className="flex flex-col lg:gap-4 justify-around">
        <p className="text-2xl lg:text-4xl font-bold">{authUser?.name}</p>
        <p className="text-sm lg:text-lg tracking-tighter">{authUser?.bio}</p>
        <ul className="flex gap-4">
          {authUser?.links?.map((link) => (
            <li key={link.name}>
              {link.name === "github" && (
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <FaGithub size={25} className="cursor-pointer" />
                </a>
              )}
              {link.name === "linkedin" && (
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={25} className="cursor-pointer" />
                </a>
              )}
              {link.name === "instagram" && (
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={25} className="cursor-pointer" />
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileCard;
