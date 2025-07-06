

import "./UserCvView.scss";
import { useEffect, useState } from "react";
import UserProfileForm from "./UserProfileForm";
import UserProfessionForm from "./UserProfessionForm";
import UserEducationForm from "./UserEducationForm";
import UserFilmForm from "./UserFilmForm";
import UserSkillForm from "./UserSkillForm";
import UserAwardsForm from "./UserAwardsForm";
import UserSocialsForms from "./UserSocialsForms";
import AccordionItem from "../DashboardView/AccordionItem";
import UserImage from "./UserImage";
import PaymentView from "../PaymentView/PaymentView";
// import { User } from "../../../../types"
import { useDashboard } from "../../../../hooks/useDashboard";
import { useParams } from "react-router-dom";

const UserCvView = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { id } = useParams();
  const { data } = useDashboard(id);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // If data isn't loaded yet, show loading state or null
  if (!data) return null; 

  // Check premium status directly from data
  const isPremium = data.user?.premium === true;

  if (!isPremium) {
    return <PaymentView />;
  }

  return (
    <div className="view border-1">
      {isMobile ? (
        <>
          <UserImage />
          <AccordionItem title="Profile" className="overflow-auto">
            <UserProfileForm />
          </AccordionItem>
          <AccordionItem title="Professional Summary" className="overflow-auto">
            <UserProfessionForm />
          </AccordionItem>
          <AccordionItem title="Education" className="overflow-auto">
            <UserEducationForm />
          </AccordionItem>
          <AccordionItem title="Filmography" className="overflow-auto">
            <UserFilmForm />
          </AccordionItem>
          <AccordionItem title="Skills" className="overflow-auto">
            <UserSkillForm />
          </AccordionItem>
          <AccordionItem title="Awards" className="overflow-auto">
            <UserAwardsForm />
          </AccordionItem>
          <AccordionItem title="Socials" className="overflow-auto">
            <UserSocialsForms />
          </AccordionItem>
        </>
      ) : (
        <>
          <UserProfileForm />
          <UserProfessionForm />
          <UserEducationForm />
          <UserFilmForm />
          <UserSkillForm />
          <UserAwardsForm />
          <UserSocialsForms />
        </>
      )}
    </div>
  );
};

export default UserCvView;


// import "./UserCvView.scss";
// import { useEffect, useState } from "react";
// import UserProfileForm from "./UserProfileForm";
// import UserProfessionForm from "./UserProfessionForm";
// import UserEducationForm from "./UserEducationForm";
// import UserFilmForm from "./UserFilmForm";
// import UserSkillForm from "./UserSkillForm";
// import UserAwardsForm from "./UserAwardsForm";
// import UserSocialsForms from "./UserSocialsForms";
// import AccordionItem from "../DashboardView/AccordionItem";
// import UserImage from "./UserImage";
// import PaymentView from "../PaymentView/PaymentView";
// import { User } from "../../../../types"
// import { useDashboard } from "../../../../hooks/useDashboard";



// const UserCvView = () => {
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [usersData, setUsersData] = useState<User | null>(null);

//   const { data } = useDashboard();
//   console.log(data?.user?.premium);
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     try {
//       const storedUser = data?.user?.premium;
//       if (storedUser) {
//         setUsersData(storedUser);
//       }
//     } catch (error) {
//       console.error("Error parsing user data:", error);
//     }
//   }, []);

//   if (!usersData) return null;
//   const isPremium = usersData.premium === true;

//   if (!isPremium) {
//     return <PaymentView />;
//   }

//   return (
//     <div className="view border-1">
//       {isMobile ? (
//         <>
//           <UserImage />
//           <AccordionItem title="Profile" className="overflow-auto">
//             <UserProfileForm />
//           </AccordionItem>

//           <AccordionItem title="Professional Summary" className="overflow-auto">
//             <UserProfessionForm />
//           </AccordionItem>

//           <AccordionItem title="Education" className="overflow-auto">
//             <UserEducationForm />
//           </AccordionItem>

//           <AccordionItem title="Filmography" className="overflow-auto">
//             <UserFilmForm />
//           </AccordionItem>

//           <AccordionItem title="Skills" className="overflow-auto">
//             <UserSkillForm />
//           </AccordionItem>

//           <AccordionItem title="Awards" className="overflow-auto">
//             <UserAwardsForm />
//           </AccordionItem>

//           <AccordionItem title="Socials" className="overflow-auto">
//             <UserSocialsForms />
//           </AccordionItem>
//         </>
//       ) : (
//         <>
//           <UserProfileForm />
//           <UserProfessionForm />
//           <UserEducationForm />
//           <UserFilmForm />
//           <UserSkillForm />
//           <UserAwardsForm />
//           <UserSocialsForms />
//         </>
//       )}
//     </div>
//   );
// };

// export default UserCvView;






// import "./UserCvView.scss";
// import { useEffect, useState } from "react";
// import UserProfileForm from "./UserProfileForm";
// import UserProfessionForm from "./UserProfessionForm";
// import UserEducationForm from "./UserEducationForm";
// import UserFilmForm from "./UserFilmForm";
// import UserSkillForm from "./UserSkillForm";
// import UserAwardsForm from "./UserAwardsForm";
// import UserSocialsForms from "./UserSocialsForms";
// import AccordionItem from "../DashboardView/AccordionItem";
// import UserImage from "./UserImage";
// import PaymentView from "../PaymentView/PaymentView";

// const UserCvView = () => {
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
//   const usersData = JSON.parse(localStorage.getItem("loggedAppUser"))
//   console.log(usersData)
//   if (!usersData.premium) {
//     return <PaymentView />
//   }

//   return (
//     <div className="view border-1">
//       {isMobile ? (
//         <>
//           <UserImage />
//           <AccordionItem title="Profile" className="overflow-auto">
//             <UserProfileForm />
//           </AccordionItem>

//           <AccordionItem title="Professional Summary" className="overflow-auto">
//             <UserProfessionForm />
//           </AccordionItem>

//           <AccordionItem title="Education" className="overflow-auto">
//             <UserEducationForm />
//           </AccordionItem>

//           <AccordionItem title="Filmography" className="overflow-auto">
//             <UserFilmForm />
//           </AccordionItem>

//           <AccordionItem title="Skills" className="overflow-auto">
//             <UserSkillForm />
//           </AccordionItem>

//           <AccordionItem title="Awards" className="overflow-auto">
//             <UserAwardsForm />
//           </AccordionItem>

//           <AccordionItem title="Socials" className="overflow-auto">
//             <UserSocialsForms />
//           </AccordionItem>
//         </>
//       ) : (
//         <>
//           <UserProfileForm />
//           <UserProfessionForm />
//           <UserEducationForm />
//           <UserFilmForm />
//           <UserSkillForm />
//           <UserAwardsForm />
//           <UserSocialsForms />
//         </>
//       )}
//     </div>
//   );
// };

// export default UserCvView;
