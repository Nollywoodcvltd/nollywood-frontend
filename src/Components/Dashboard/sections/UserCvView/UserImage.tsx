import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import TestUserIcon from "/assets/avatar.png";
// import TestUserIcon from "../../../../../src/assets/avatar.png";
// import TestUserIcon from "../../../../../src/assets/mabel-okoro.png";
import { createUserImage } from "../../../../services/profile";
import { useDashboard } from "../../../../hooks/useDashboard";
import { useParams } from "react-router-dom";

type FormData = {
  image: FileList;
};

function UserImage() {
  const {id} = useParams();
  const { data: dashboardData } = useDashboard(id);
  const [profilePicture, setProfilePicture] = useState<string>(TestUserIcon);
  const [loading, setLoading] = useState<boolean>(false);
  
  const { register, watch } = useForm<FormData>();
  const selectedFile = watch("image");

  const uploadImage = async (file: File) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await createUserImage(formData);
      setProfilePicture(response.profilePicture);
      alert("Profile image uploaded successfully");
      setTimeout(() => window.location.reload(), 50);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedFile && selectedFile.length > 0) {
      uploadImage(selectedFile[0]);
    }
  }, [selectedFile]); 

  return (
    <div className="d-flex justify-content-center items-center mb-5 gap-3">
      <img
        src={dashboardData?.profilePicture || profilePicture}
        className="cv-image"
        alt="Profile"
      />
      <div className="d-grid">
        <form>
          <input
            type="file"
            id="fileInput"
            className="cv-image object-fit-cover w-lg-25 d-none"
            accept="image/*"
            {...register("image")}
          />
          <button
            type="button"
            className="btn btn-outline-warning mb-2"
            onClick={() => document.getElementById("fileInput")?.click()}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Change"}
          </button>
        </form>
        <button
          type="button"
          className="btn btn-outline-warning text-dark"
          onClick={() => setProfilePicture(TestUserIcon)}
        >
          Use Avatar
        </button>
      </div>
    </div>
  );
}

export default UserImage;






