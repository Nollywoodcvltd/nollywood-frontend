import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./DashboardView.scss";
import DashboardProfile from "./DashboardProfile";
import DashboardCareer from "./DashboardCareer";
import DashboardProfileMobileView from "./DashboardProfileMobileView";
import DashboardCareerMobileView from "./DashboardCareerMobileView";
import { useParams } from "react-router-dom";
import { useDashboard } from "../../../../hooks/useDashboard";
// import { CiShare2 } from "react-icons/ci";
// import { MdContentCopy } from "react-icons/md";
// import { toast } from "react-toastify";

function ShareDashboard() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { id } = useParams();
  const { data: dashboardData, refetch } = useDashboard(id); 
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);
    return () => clearInterval(interval);
  }, [refetch]);

  // const handleShare = async () => {
  //   try {
  //     const shareableLink = `${window.location.origin}/share/dashboard/${dashboardData?.user.id}`;
  //     await navigator.clipboard.writeText(shareableLink);
  //     toast.success("CV link copied to clipboard!", {
  //       position: "top-center",
  //       autoClose: 3000,
  //       hideProgressBar: true,
  //     });
  //   } catch (error) {
  //     console.error("Error copying to clipboard:", error);
  //     toast.error("Failed to copy CV link");
  //   }
  // };

  if (!dashboardData) {
    return <div>Oops! It looks like your internet connection is slow.Try refreshing or checking back later.</div>;
  }
  // if (!dashboardData?.user?.premium) {
  //   return <div>Oops! It looks like your internet connection is slow.Try refreshing or checking back later.</div>;
  // }

  return (
    <Container fluid className="dashboard-view">
      <Row className="mb-3 justify-content-end">
        <Col xs="auto">
          {/* <button
            onClick={handleShare}
            aria-label={"Copy dashboard link"}
            className="btn p-0 border-0 bg-transparent position-relative"
          >
            <MdContentCopy size={25} /> CV link
          </button> */}
        </Col>
      </Row>

      {!isMobile ? (
        <Row className="gy-2">
          <Col xs={11} md={4} className="border-end border-warning border-1">
            <DashboardProfile />
          </Col>
          <Col xs={11} md={7}>
            <DashboardCareer />
          </Col>
        </Row>
      ) : (
        <Row className="gy-2">
          <Col xs={12}>
            <DashboardProfileMobileView />
            <DashboardCareerMobileView />
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default ShareDashboard;
