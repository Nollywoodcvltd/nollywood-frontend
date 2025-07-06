import TestUserIcon from "/assets/avatar.png";
import { useDashboard } from "../../../../hooks/useDashboard";
import { useParams } from "react-router-dom";
import { deleteEducation } from "../../../../services/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BsTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { useEffect } from "react";
// import { token } from "../../../../services/profile";

export interface EducationItem {
  _id: string;
  institution: string;
  department: string;
  degree: string;
  yearGraduated: string;
}
export interface SocialMedia {
  _id: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
}

function DashboardProfile() {
  const { id } = useParams();
  const { data: dashboardData, isLoading, error, refetch } = useDashboard(id);
  const queryClient = useQueryClient();
  // const user = token;

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);
    return () => clearInterval(interval);
  }, [refetch]);

  const deleteEducationMutation = useMutation({
    mutationFn: deleteEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboardData", id] });
      toast.success("Education deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete education");
    },
  });

  const handleDeleteEducation = (id: string) => {
    if (
      window.confirm("Are you sure you want to delete this education entry?")
    ) {
      deleteEducationMutation.mutate(id);
    }
  };

  if (isLoading) return <p>Loading dashboard...</p>;
  if (error) return <p>Error!! refresh dashboard</p>;

  const skillsData = dashboardData?.skills[0]?.skills;
  const skillsArray =
    (skillsData as string)?.split(",").map((skill) => skill.trim()) || [];

  return (
    <div className="p-2">
      {/* <div className="d-flex justify-content-center mb-4 align-items-center">
        <img src={dashboardData?.profilePicture || TestUserIcon} className="w-50 rounded-circle h-50" alt="" />
      </div> */}
      <div className="d-flex justify-content-center mb-4 align-items-center">
        <div
          className="rounded-circle overflow-hidden"
          style={{ width: "160px", height: "160px" }}
        >
          <img
            src={dashboardData?.profilePicture || TestUserIcon}
            className="w-100 h-100 object-fit-cover"
            alt="Profile"
          />
        </div>
      </div>

      <div className="address mb-4">
        <h6 className="text-capitalize border-bottom pt-3 border-warning border-1 pb-2">
          Bio
        </h6>
        <div className="d-flex gap-1 align-items-center mb-2">
          Gender - &nbsp;
          {dashboardData?.profile?.sex || "Gender"}
        </div>
        <div className="d-flex gap-1 align-items-center mb-2">
          Date of Birth - &nbsp;
          {dashboardData?.profile?.dob
            ? new Date(dashboardData.profile.dob).toLocaleDateString("en-GB")
            : "Not specified"}
        </div>
        <div className="d-flex gap-1 align-items-center mb-2">
          {/* <IoLocationOutline size={18} /> */}
          {dashboardData?.profile?.country
            ? `${dashboardData?.profile?.location || ""}, ${
                dashboardData?.profile?.country || ""
              }.`
            : `Location - ${dashboardData?.profile?.location || ""} `}
          {/* {dashboardData?.profile?.location || ""}, {dashboardData?.profile?.country || ""}.  */}
        </div>
      </div>
      <div className="address mb-4">
        <h6 className="text-capitalize border-bottom pt-3 border-warning border-1 pb-2">
          Profile
        </h6>
        {dashboardData?.user?.premium ? (
          <>
            <div className="d-flex gap-1 align-items-center mb-2">
              Phone Number - &nbsp;
              {dashboardData?.profile?.phone || ""}
            </div>
            <div className="d-flex gap-1 align-items-center mb-2">
              Email Address - &nbsp;
              {dashboardData?.profile?.email || ""}
            </div>
            <div className="d-flex gap-1 align-items-center mb-2">
              State of Origin -&nbsp;
              {dashboardData?.profile?.stateOfOrigin || ""}
            </div>
            <div className="d-flex gap-1 align-items-center mb-2">
              Country - &nbsp;
              {dashboardData?.profile?.country || ""}
            </div>
            <div className="d-flex gap-1 align-items-center mb-2">
              Languages - &nbsp;
              {dashboardData?.profile?.languages?.length ? (
                <>
                  {dashboardData.profile.languages.join(", ")}
                  {dashboardData?.profile?.otherLanguage &&
                    ` and ${dashboardData.profile.otherLanguage}`}
                </>
              ) : (
                dashboardData?.profile?.otherLanguage || "Not specified"
              )}
            </div>
            <div className="d-flex gap-1 align-items-center mb-2">
              Height - &nbsp;
              {dashboardData?.profile?.height || ""}
            </div>
            <div className="d-flex gap-1 align-items-center mb-2">
              Complexion - &nbsp;
              {dashboardData?.profile?.complexion || ""}
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      <div className="education">
        <h6 className="text-capitalize pb-2">education</h6>
        {dashboardData?.user?.premium ? (
        <div>
        {dashboardData?.education?.map((item: EducationItem) => (
          <div
            key={item?._id}
            className="mt-2 border-top pt-3 mb-3 border-warning border-1 position-relative"
          >
            <p className="address">
              Institution: {item?.institution} <br />
              Department: {item?.department} <br />
              Degree: {item?.degree} <br />
              Year Graduated: {item?.yearGraduated} <br />
            </p>
            {!id ? (
              <button
                onClick={() => handleDeleteEducation(item?._id)}
                className="btn btn-sm text-dark position-absolute top-0 end-0 mt-2 me-2"
                disabled={deleteEducationMutation.isPending}
              >
                {deleteEducationMutation.isPending ? (
                  <span className="spinner-border spinner-border-sm" />
                ) : (
                  <BsTrashFill size={20} />
                )}
              </button>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
        ) : ''}
      </div>
      <div className="address skills mt-4">
        <h6 className="text-capitalize border-bottom pt-3 border-warning border-1 pb-2">
          Skills
        </h6>
        {dashboardData?.user?.premium ? (
        <ul>
          {skillsArray.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
        ) : ''}
      </div>

      <div className="address socials mt-4">
        <h6 className="text-capitalize border-bottom pt-3 border-warning border-1 pb-2">
          socials
        </h6>
        {dashboardData?.user?.premium ? (
        <ul className="list-unstyled">
          {dashboardData?.socials?.map((item: SocialMedia) => (
            <div>
              {item?.facebook && (
                <li className="text-warning" key={`${item?._id}-facebook`}>
                  <a className="text-warning" href={item?.facebook}>
                    facebook
                  </a>
                </li>
              )}
              {item?.instagram && (
                <li key={`${item?._id}-instagram`}>
                  <a className="text-warning" href={item?.instagram}>
                    instagram
                  </a>
                </li>
              )}
              {item?.tiktok && (
                <li key={`${item?._id}-tiktok`}>
                  <a className="text-warning" href={item?.tiktok}>
                    Tiktok
                  </a>
                </li>
              )}
              {item?.youtube && (
                <li key={`${item?._id}-youtube`}>
                  <a className="text-warning" href={item?.youtube}>
                    Twitter
                  </a>
                </li>
              )}
            </div>
          ))}
        </ul>
        ) : ''}
      </div>
    </div>
  );
}

export default DashboardProfile;

// import TestUserIcon from "/assets/avatar.png";
// // import TestUserIcon from "../../../../assets/avatar.png"
// // import { FiPhone } from "react-icons/fi";
// // import { CiMail } from "react-icons/ci";
// // import { IoLocationOutline } from "react-icons/io5";
// // import { useContext } from "react";
// // import { DashboardContext, DashboardContextType } from "../../../../context/DashboardContext";
// import { useDashboard } from "../../../../hooks/useDashboard";
// import { useParams } from 'react-router-dom';
// import { deleteEducation } from "../../../../services/profile";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { BsTrashFill } from "react-icons/bs";
// import { toast } from "react-toastify";
// import { useEffect } from "react";

// export interface EducationItem {
//   _id: string;
//   institution: string;
//   department: string;
//   degree: string;
//   yearGraduated: string;
// }
// // export interface EducationItem {
// //   _id: string;
// //   education: string;
// // }

// export interface SocialMedia {
//   _id: string;
//   facebook?: string;
//   instagram?: string;
//   tiktok?: string;
//   youtube?: string;
// }

// function DashboardProfile() {
//   // const dashboardContext = useContext(DashboardContext);
//   // const { dashboardData } = dashboardContext as DashboardContextType;
//   const { id } = useParams();
//   const { data: dashboardData, isLoading, error, refetch } = useDashboard(id);
//   const queryClient = useQueryClient();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       refetch();
//     }, 30000);
//     return () => clearInterval(interval);
//   }, [refetch]);

//   const deleteEducationMutation = useMutation({
//     mutationFn: deleteEducation,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["dashboardData", id] });
//       toast.success("Education deleted successfully");
//     },
//     onError: (error) => {
//       toast.error(error.message || "Failed to delete education");
//     },
//   });

//   const handleDeleteEducation = (id: string) => {
//     if (window.confirm("Are you sure you want to delete this education entry?")) {
//       deleteEducationMutation.mutate(id);
//     }
//   };

//   if (isLoading) return <p>Loading dashboard...</p>;
//   if (error) return <p>Error loading dashboard</p>;

//   // Extract skills as an array
//   const skillsData = dashboardData?.skills[0]?.skills;
//   const skillsArray = (skillsData as string)?.split(',').map((skill) => skill.trim()) || [];

//   return (
//     <div className="bg- p-2">
//       <div className="d-flex justify-content-center mb-4 align-items-center">
//         <img src={dashboardData?.profilePicture || TestUserIcon} className="w-50 rounded-circle" alt="" />
//       </div>

//       <div className="address mb-4">
//       <h6 className="text-capitalize border-bottom pt-3 border-warning border-1 pb-2">Bio</h6>
//             <div className="d-flex gap-1 align-items-center mb-2">
//                 Gender -  &nbsp;
//                 {dashboardData?.profile?.sex || "Gender"}
//             </div>
//             <div className="d-flex gap-1 align-items-center mb-2">
//                 Date of Birth - &nbsp;
//                 {dashboardData?.profile?.dob ?
//                   new Date(dashboardData.profile.dob).toLocaleDateString('en-GB')
//                   : "Not specified"}
//             </div>
//             <div className="d-flex gap-1 align-items-center mb-2">
//                 {/* <IoLocationOutline size={18} /> */}
//                 {dashboardData?.profile?.location || ""}, {dashboardData?.profile?.country || ""},
//             </div>
//       </div>

//       <div className="address mb-4">
//       <h6 className="text-capitalize border-bottom pt-3 border-warning border-1 pb-2">Profile</h6>
//             <div className="d-flex gap-1 align-items-center mb-2">
//                 Phone Number - &nbsp;
//                 {dashboardData?.profile?.phone || ""}
//             </div>
//             <div className="d-flex gap-1 align-items-center mb-2">
//               Email Address - &nbsp;
//                 {dashboardData?.profile?.email || ""}
//             </div>
//             <div className="d-flex gap-1 align-items-center mb-2">
//                 State of Origin -&nbsp;
//                 {dashboardData?.profile?.stateOfOrigin || ""}
//             </div>
//             <div className="d-flex gap-1 align-items-center mb-2">
//                 Country - &nbsp;
//                 {dashboardData?.profile?.country || ""}
//             </div>
//             <div className="d-flex gap-1 align-items-center mb-2">
//               Languages - &nbsp;
//               {dashboardData?.profile?.languages?.length ? (
//                   <>
//                       {dashboardData.profile.languages.join(', ')}
//                       {dashboardData?.profile?.otherLanguage &&
//                           ` and ${dashboardData.profile.otherLanguage}`}
//                   </>
//               ) : (
//                   dashboardData?.profile?.otherLanguage || "Not specified"
//               )}
//           </div>
//             <div className="d-flex gap-1 align-items-center mb-2">
//                 Height - &nbsp;
//                 {dashboardData?.profile?.height || ""}
//             </div>
//             <div className="d-flex gap-1 align-items-center mb-2">
//                 Complexion - &nbsp;
//                 {dashboardData?.profile?.complexion || ""}
//             </div>
//       </div>
//       <div className="education">
//         <h6 className="text-capitalize pb-2">education</h6>
//         {dashboardData?.education?.map((item: EducationItem) => (
//           <div key={item?._id} className="mt-2 border-top pt-3 mb-3 border-warning border-1 position-relative">
//             <p className="address">
//               Institution: {item?.institution} <br />
//               Department: {item?.department} <br />
//               Degree: {item?.degree} <br />
//               Year Graduated: {item?.yearGraduated} <br />
//             </p>
//             <button
//               onClick={() => handleDeleteEducation(item?._id)}
//               className="btn btn-sm text-dark position-absolute top-0 end-0 mt-2 me-2"
//               disabled={deleteEducationMutation.isPending}
//             >
//               {deleteEducationMutation.isPending ? (
//                 <span className="spinner-border spinner-border-sm" />
//               ) : (
//                 <BsTrashFill size={20} />
//               )}
//             </button>
//           </div>
//         ))}
//       </div>
//       {/* <div className="education">
//         <h6 className="text-capitalize pb-2">education</h6>
//         {dashboardData?.education?.map((item: EducationItem) => (
//           <div key={item?._id} className="mt-2 border-top pt-3 mb-3 border-warning border-1 position-relative">
//             <p className="address">
//               Institution: {item?.institution} <br />
//               Department: {item?.department} <br />
//               Degree: {item?.degree} <br />
//               Year Graduated: {item?.yearGraduated} <br />
//             </p>
//             <button
//               onClick={() => handleDeleteEducation(item?._id)}
//               className="btn btn-sm text-dark position-absolute top-0 end-0 mt-2 me-2"
//               disabled={deleteEducationMutation.isPending}
//             >
//               {deleteEducationMutation.isPending ? (
//                 <span className="spinner-border spinner-border-sm" />
//               ) : (
//                 <BsTrashFill size={20} />
//               )}
//             </button>
//           </div>
//         ))}
//       </div> */}
//       {/* <div className="education">
//             <h6 className="text-capitalize pb-2">education</h6>
//             {dashboardData?.education?.map((item: EducationItem) => (
//               <div key={item?._id} className="mt-2 border-top pt-3 mb-3 border-warning border-1">
//                   <p className="fs-6">
//                     Institution: {item?.institution} <br />
//                     Department: {item?.department} <br />
//                     Degree: {item?.degree} <br />
//                     Year Graduated: {item?.yearGraduated} <br />
//                   </p>
//               </div>
//             ))}
//       </div> */}
//       <div className="address skills mt-4">
//         <h6 className="text-capitalize border-bottom pt-3 border-warning border-1 pb-2">Skills</h6>
//             <ul>
//               {skillsArray.map((skill, index) => (
//                   <li key={index}>{skill}</li>
//               ))}
//             </ul>
//       </div>

//       <div className="address socials mt-4">
//         <h6 className="text-capitalize border-bottom pt-3 border-warning border-1 pb-2">socials</h6>
//             <ul className="list-unstyled">
//               {dashboardData?.socials?.map((item: SocialMedia) => (
//                 <div>
//                   {item?.facebook && <li className="text-warning" key={`${item?._id}-facebook`}><a className="text-warning" href={item?.facebook}>facebook</a></li>}
//                   {item?.instagram && <li key={`${item?._id}-instagram`}><a className="text-warning" href={item?.instagram}>instagram</a></li>}
//                   {item?.tiktok && <li key={`${item?._id}-tiktok`}><a className="text-warning" href={item?.tiktok}>Tiktok</a></li>}
//                   {item?.youtube && <li key={`${item?._id}-youtube`}><a className="text-warning" href={item?.youtube}>Twitter</a></li>}
//                 </div>
//               ))}
//             </ul>
//       </div>

//     </div>
//   )
// }

// export default DashboardProfile;
