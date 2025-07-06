import { useEffect, useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './DashboardView.scss';
import DashboardProfile from './DashboardProfile';
import DashboardCareer from './DashboardCareer';
import DashboardProfileMobileView from './DashboardProfileMobileView';
import DashboardCareerMobileView from './DashboardCareerMobileView';
import { useDashboard } from '../../../../hooks/useDashboard';
import FirstView from './FirstView';
// import { LuShare2 } from "react-icons/lu";
// import { CiShare2 } from "react-icons/ci";
import { MdContentCopy } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const DashboardView = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { id } = useParams();
  const { data: dashboardData, refetch } = useDashboard(id);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);
    return () => clearInterval(interval);
  }, [refetch]);

  const handleShare = async () => {
    try {
      // const shareableLink = `${window.location.origin}/share/dashboard/${dashboardData?.user?.id}`;
      // Only generate the link when data is available
      const shareableLink = `${window.location.origin}/share/dashboard/${dashboardData?.user.id}`;
      // const shareableLink = dashboardData?.user
      // ? `${window.location.origin}/share/dashboard/${
      //     encodeURIComponent(dashboardData?.profile?.lastName || 'user')}-${
      //     encodeURIComponent(dashboardData?.profile?.firstName || '')}-${
      //     dashboardData?.user?.id}`
      // : '#'; // Return placeholder if data isn't loaded yet
      await navigator.clipboard.writeText(shareableLink);

      // Show toast
      toast.success('CV link copied to clipboard!', {
        position: 'top-center',
      });
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast.error('Failed to copy CV link');
    }
  };

  if (!dashboardData?.profile) {
    return <FirstView />;
  }
  // if (!dashboardData?.user?.premium) {
  //   return <FirstView />;
  // }

  return (
    <Container fluid className='dashboard-view' ref={dashboardRef}>
      <Row className='mb-3 justify-content-end'>
        <Col xs='auto'>
          <button
            onClick={handleShare}
            aria-label={'Copy dashboard link'}
            className='btn p-0 border-0 bg-transparent position-relative'
          >
            <MdContentCopy size={25} /> CV link
          </button>
        </Col>
      </Row>

      {!isMobile ? (
        <Row className='gy-2'>
          <Col xs={11} md={4} className='border-end border-warning border-1'>
            <DashboardProfile />
          </Col>
          <Col xs={11} md={7}>
            <DashboardCareer />
          </Col>
        </Row>
      ) : (
        <Row className='gy-2'>
          <Col xs={12}>
            <DashboardProfileMobileView />
            <DashboardCareerMobileView />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default DashboardView;

// import { useEffect, useState, useRef } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import './DashboardView.scss';
// import DashboardProfile from './DashboardProfile';
// import DashboardCareer from './DashboardCareer';
// import DashboardProfileMobileView from './DashboardProfileMobileView';
// import DashboardCareerMobileView from './DashboardCareerMobileView';
// import { useDashboard } from '../../../../hooks/useDashboard';
// import FirstView from './FirstView';
// // import { CiShare2 } from "react-icons/ci";
// import { MdContentCopy } from "react-icons/md";
// import { toast } from 'react-toastify';
// import { useParams } from 'react-router-dom';

// const DashboardView = () => {
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const { id } = useParams();
//   const { data: dashboardData, refetch } = useDashboard(id);
//   const dashboardRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       // setTimeout(() => window.location.reload(), 50);
//       refetch();
//     }, 30000);
//     return () => clearInterval(interval);
//   }, [refetch]);

//   const handleShare = async () => {
//     try {
//       // Get the current URL and append /dashboard
//       // const shareableLink = `${window.location.origin}/dashboard/share/dashboard/${dashboardData?.user.id}`;
//       const shareableLink = `${window.location.origin}/share/dashboard/${dashboardData?.user?.id}`;
//       await navigator.clipboard.writeText(shareableLink);

//       // Show toast
//       toast.success('Dashboard link copied to clipboard!', {
//         position: 'top-center',
//       });
//       // setInterval(() => {
//       // }, 200);

//     } catch (error) {
//       console.error('Error copying to clipboard:', error);
//       toast.error('Failed to copy dashboard link');
//     }
//   };

//   if (!dashboardData?.user?.premium) {
//     return <FirstView />;
//   }

//   return (
//     <Container fluid className="dashboard-view" ref={dashboardRef}>
//       <Row className="mb-3 justify-content-end">
//         <Col xs="auto">
//           {/* <MdContentCopy onClick={handleShare} size={30} className="me-2" /> */}
//           <button
//             onClick={handleShare}
//             aria-label={"Copy dashboard link"}
//             className="btn p-0 border-0 bg-transparent position-relative"
//           >
//             <MdContentCopy
//               size={30}
//             /> Copy link
//             </button>
//         </Col>
//       </Row>

//       {!isMobile ? (
//         <Row className="gy-2">
//           <Col xs={11} md={4} className="border-end border-warning border-1">
//             <DashboardProfile />
//           </Col>
//           <Col xs={11} md={7}>
//             <DashboardCareer />
//           </Col>
//         </Row>
//       ) : (
//         <Row className="gy-2">
//           <Col xs={12}>
//             <DashboardProfileMobileView />
//             <DashboardCareerMobileView />
//           </Col>
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default DashboardView;
