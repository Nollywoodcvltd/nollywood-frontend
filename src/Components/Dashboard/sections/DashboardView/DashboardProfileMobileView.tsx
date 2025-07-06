import TestUserIcon from '/assets/avatar.png';
// import TestUserIcon from "/assets/mabel-okoro.png";
// import TestUserIcon from "../../../../assets/mabel-okoro.png";
// import { FiPhone } from "react-icons/fi";
// import { CiMail } from "react-icons/ci";
// import { IoLocationOutline } from "react-icons/io5";
import AccordionItem from './AccordionItem';
import './Accordion.scss';
// import { useContext } from "react";
// import { DashboardContext, DashboardContextType } from "../../../../context/DashboardContext";
import { useDashboard } from '../../../../hooks/useDashboard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { EducationItem } from './DashboardProfile';
import { BsTrashFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { deleteEducation } from '../../../../services/profile';
import { useEffect } from 'react';
// import { token } from "../../../../services/profile";

export interface SocialMedia {
  _id: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
}

// const calculateAge = (dob: string): number | string => {
//   if (!dob) return "N/A";
//   try {
//     const birthDate = new Date(dob);
//     const today = new Date();
//     if (isNaN(birthDate.getTime())) return "Invalid date";
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
//     return age;
//   } catch (error) {
//     console.error("Error calculating age:", error);
//     return "N/A";
//   }
// };
function DashboardProfileMobileView() {
  // const dashboardContext = useContext(DashboardContext);
  // const { dashboardData } = dashboardContext as DashboardContextType;
  const { id } = useParams();
  const { data: dashboardData, isLoading, error, refetch } = useDashboard(id);
  const queryClient = useQueryClient();

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);
    return () => clearInterval(interval);
  }, [refetch]);

  const deleteEducationMutation = useMutation({
    mutationFn: deleteEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardData', id] });
      toast.success('Education deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete education');
    },
  });

  const handleDeleteEducation = (id: string) => {
    if (
      window.confirm('Are you sure you want to delete this education entry?')
    ) {
      deleteEducationMutation.mutate(id);
    }
  };
  if (isLoading) return <p>Loading dashboard...</p>;
  if (error) return <p>Error!! refresh dashboard</p>;

  return (
    <div>
      {/* Profile Header */}
      {/* <div className="d-flex justify-content-send mb-5 align-items-center gap-3">
      <img src={dashboardData?.profilePicture || TestUserIcon} className="w-25 rounded-circle" alt="" />
        <div className="d-block">
          <h2 className="text-start">{dashboardData?.profile?.firstName} {dashboardData?.profile?.lastName} </h2>
          <p className="text-start">{dashboardData?.profile?.role || "role"}</p>
        </div>
      </div> */}
      <div className='d-flex justify-content-start mb-5 align-items-center gap-3'>
        <div
          className='rounded-circle overflow-hidden'
          style={{ width: '110px', height: '110px' }}
        >
          <img
            src={dashboardData?.profilePicture || TestUserIcon}
            className='w-100 h-100 object-fit-cover'
            alt='Profile'
          />
        </div>
        <div className='d-block'>
          <h2 className='text-start m-0'>
            {' '}
            <span className='text-capitalize'>
              {dashboardData?.profile?.firstName}
            </span>{' '}
            <span className='text-capitalize'>
              {dashboardData?.profile?.lastName}
            </span>{' '}
          </h2>
          <p className='text-start text-capitalize m-0'>
            {dashboardData?.profile?.role || 'role'}
          </p>
        </div>
      </div>
      {/* Profile Accordion */}
      <div className='w-100'>
        <AccordionItem title='Bio' className='overflow-auto'>
          <div className='address mb-1'>
            <div className='d-flex gap-1 align-items-center mb-2'>
              Gender - &nbsp;
              {dashboardData?.profile?.sex || 'Gender'}
            </div>
            <div className='d-flex gap-1 align-items-center mb-2'>
              Date of Birth - &nbsp;
              {dashboardData?.profile?.dob
                ? new Date(dashboardData?.profile?.dob).toLocaleDateString(
                    'en-GB'
                  )
                : 'Not specified'}
            </div>
            <div className='d-flex gap-1 align-items-center mb-2'>
              {/* <IoLocationOutline size={18} /> */}
              {dashboardData?.profile?.country
                ? `${dashboardData?.profile?.location || ''}, ${
                    dashboardData?.profile?.country || ''
                  }.`
                : `Location - ${dashboardData?.profile?.location || ''} `}
              {/* {dashboardData?.profile?.location || ""}, {dashboardData?.profile?.country || ""}.  */}
            </div>
            {/* <div className="d-flex gap-1 align-items-center mb-2">
                {dashboardData?.profile?.location || ""}, {dashboardData?.profile?.country || ""}, 
            </div> */}
          </div>
        </AccordionItem>

        <AccordionItem title='Profile' className='overflow-auto'>
          {dashboardData?.user?.premium ? (
            <div className='address mb-1'>
              <div className='d-flex gap-1 align-items-center mb-2'>
                Phone Number - &nbsp;
                {dashboardData?.profile?.phone || ''}
              </div>
              <div className='d-flex gap-1 align-items-center mb-2'>
                Email Address - &nbsp;
                {dashboardData?.profile?.email || ''}
              </div>
              <div className='d-flex gap-1 align-items-center mb-2'>
                State of Origin -&nbsp;
                {dashboardData?.profile?.stateOfOrigin || ''}
              </div>
              <div className='d-flex gap-1 align-items-center mb-2'>
                Country - &nbsp;
                {dashboardData?.profile?.country || ''}
              </div>
              <div className='d-flex gap-1 align-items-center mb-2'>
                Languages - &nbsp;
                {dashboardData?.profile?.languages?.length ? (
                  <>
                    {dashboardData.profile.languages.join(', ')}
                    {dashboardData?.profile?.otherLanguage &&
                      ` and ${dashboardData.profile.otherLanguage}`}
                  </>
                ) : (
                  dashboardData?.profile?.otherLanguage || 'Not specified'
                )}
              </div>
              <div className='d-flex gap-1 align-items-center mb-2'>
                Height - &nbsp;
                {dashboardData?.profile?.height || ''}
              </div>
              <div className='d-flex gap-1 align-items-center mb-2'>
                Complexion - &nbsp;
                {dashboardData?.profile?.complexion || ''}
              </div>
            </div>
          ) : (
            ''
          )}
        </AccordionItem>

        <AccordionItem title='Professional Summary' className='overflow-auto'>
          {dashboardData?.user?.premium ? (
            <div className='address mt-2 pt-3'>
            {dashboardData?.professions?.map(
              (item: { _id: string; summary?: string }) => (
                <div key={item?._id}>{item?.summary}</div>
              )
            )}
          </div>
          ): ''}
          
        </AccordionItem>

        <AccordionItem title='Education' className='overflow-auto'>
          {dashboardData?.user?.premium ? (
            <div>
              {dashboardData?.education?.map((item: EducationItem) => (
                <div
                  key={item?._id}
                  className='mt-2 border-top pt-3 mb-3 border-warning border-1 position-relative'
                >
                  <p className='address'>
                    Institution: {item?.institution} <br />
                    Department: {item?.department} <br />
                    Degree: {item?.degree} <br />
                    Year Graduated: {item?.yearGraduated} <br />
                  </p>
                  {!id ? (
                    <button
                      onClick={() => handleDeleteEducation(item?._id)}
                      className='btn btn-sm text-dark position-absolute top-0 end-0 mt-2 me-2'
                      disabled={deleteEducationMutation.isPending}
                    >
                      {deleteEducationMutation.isPending ? (
                        <span className='spinner-border spinner-border-sm' />
                      ) : (
                        <BsTrashFill size={20} />
                      )}
                    </button>
                  ) : (
                    ''
                  )}
                </div>
              ))}
            </div>
          ) : ''}
        </AccordionItem>
      </div>
    </div>
  );
}

export default DashboardProfileMobileView;

{
  /* <AccordionItem title="Education" className="overflow-auto">
  {dashboardData?.education?.map((item: EducationItem) => (
    <div key={item?._id} className="mt-2 border-top pt-3 mb-3 border-warning border-1 position-relative">
      <p className="address">
        Institution: {item?.institution} <br />
        Department: {item?.department} <br />
        Degree: {item?.degree} <br />
        Year Graduated: {item?.yearGraduated} <br />
      </p>
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
    </div>
  ))}
</AccordionItem> */
}

{
  /* <AccordionItem title="Education" className="overflow-auto">
  {dashboardData?.education?.map((item: EducationItem) => (
    <div key={item?._id} className="mt-2 border-top pt-3 mb-3 border-warning border-1">
      <p className="address">
            Institution: {item?.institution} <br />
            Department: {item?.department} <br />
            Degree: {item?.degree} <br />
            Year Graduated: {item?.yearGraduated} <br />
          </p>
    </div>
  ))}
</AccordionItem> */
}
// import TestUserIcon from "/assets/mabel-okoro.png";
// // import TestUserIcon from "../../../../assets/mabel-okoro.png";
// import { FiPhone } from "react-icons/fi";
// import { CiMail } from "react-icons/ci";
// import { IoLocationOutline } from "react-icons/io5";
// import AccordionItem from "./AccordionItem";
// import "./Accordion.scss";
// // import { useContext } from "react";
// // import { DashboardContext, DashboardContextType } from "../../../../context/DashboardContext";
// import { useDashboard } from "../../../../hooks/useDashboard";

// export interface EducationItem {
//   _id: string;
//   education: string;
// }

// export interface SocialMedia {
//   _id: string;
//   facebook?: string;
//   instagram?: string;
//   tiktok?: string;
//   youtube?: string;
// }

// const calculateAge = (dob: string): number | string => {
//   if (!dob) return "N/A";
//   try {
//     const birthDate = new Date(dob);
//     const today = new Date();
//     if (isNaN(birthDate.getTime())) return "Invalid date";
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
//     return age;
//   } catch (error) {
//     console.error("Error calculating age:", error);
//     return "N/A";
//   }
// };
// function DashboardProfileMobileView() {
//   // const dashboardContext = useContext(DashboardContext);
//   // const { dashboardData } = dashboardContext as DashboardContextType;
//   const { data: dashboardData, isLoading, error } = useDashboard();

//     if (isLoading) return <p>Loading dashboard...</p>;
//     if (error) return <p>Error loading dashboard</p>;

//   return (
//     <div>
//       {/* Profile Header */}
//       <div className="d-flex justify-content-send mb-5 align-items-center gap-3">
//       <img src={dashboardData?.profilePicture || TestUserIcon} className="w-25 rounded-circle" alt="" />
//         <div className="d-block">
//           <h2 className="text-start">{dashboardData?.profile?.firstName} {dashboardData?.profile?.lastName} </h2>
//           <p className="text-start">{dashboardData?.profile?.role || "role"}</p>
//         </div>
//       </div>

//       {/* Profile Accordion */}
//       <div className="w-100">
//         <AccordionItem title="Profile" className="overflow-auto">
//           <div className="address mb-1">
//             <div className="d-flex gap-1 align-items-center mb-2">
//               <FiPhone size={18} />
//               {dashboardData?.profile?.phone || ""}
//             </div>
//             <div className="d-flex gap-1 align-items-center mb-2">
//               <CiMail size={18} />
//               {dashboardData?.profile?.email || ""}
//             </div>
//             <div className="d-flex gap-1 align-items-center mb-2">
//               <IoLocationOutline size={18} />
//               {dashboardData?.profile?.location || ""}, {dashboardData?.profile?.country || ""}
//             </div>
//             <div className="d-flex gap-1 align-items-center mb-2">
//                 Age: {calculateAge(dashboardData?.profile?.dob)}
//             </div>
//           </div>
//         </AccordionItem>

//         <AccordionItem title="Professional Summary" className="overflow-auto">
//           <div className="mt-2 pt-3">
//             {dashboardData?.professions?.map((item: { _id: string; summary?: string }) => (
//               <div key={item?._id}>{item?.summary}</div>
//             ))}
//           </div>
//         </AccordionItem>

//         <AccordionItem title="Education" className="overflow-auto">
//           {dashboardData?.education?.map((item: EducationItem) => (
//             <div key={item?._id} className="mt-2 border-top pt-3 mb-3 border-warning border-1">
//               {item?.education}
//             </div>
//           ))}
//         </AccordionItem>
//       </div>
//     </div>
//   );
// }

// export default DashboardProfileMobileView;
