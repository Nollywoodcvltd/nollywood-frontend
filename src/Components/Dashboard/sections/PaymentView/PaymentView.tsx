
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./PaymentView.scss";
import { useEffect, useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { BsPatchCheckFill } from "react-icons/bs";
import { useDashboard } from "../../../../hooks/useDashboard";
import { useParams } from "react-router-dom";

const plans = [
  {
    title: "Free Plan",
    price: "0",
    features: ["Create account", "CV (Limited)", "Explore Talents", "Jobs (Limited)"],
    unavailable: [],
    buttonText: "Free",
  },
  {
    title: "1 Month Plan",
    price: "600",
    features: ["Create account", "Create CV", "Explore Talents", "Jobs"],
    unavailable: [],
    buttonText: "Pay",
  },
  {
    title: "1 Year Plan",
    price: "5000",
    features: ["Create account", "Create CV", "Explore Talents", "Jobs"],
    unavailable: [],
    buttonText: "Pay",
  },
];

const PaymentView = () => {
  const { id } = useParams()
  const { data: dashboardData } = useDashboard(id);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedAppUser");
    if (loggedUserJSON) {
      const retrievedUser = JSON.parse(loggedUserJSON);
      setEmail(retrievedUser.email);
    }
  }, []);

  const handleClick = (plan: string, amount: string) => {
    if (plan === "1 Month Plan") {
      setSelectedPlan("Monthly");
      setAmount(parseInt(amount));
    } else if (plan === "1 Year Plan") {
      setSelectedPlan("Yearly");
      setAmount(parseInt(amount));
    }
    setModalShow(true);
  };

  // Determine which plan was purchased based on premiumExpiresAt
  const getPlanDetails = () => {
    if (!dashboardData?.user?.premiumExpiresAt) {
      return { planName: "", expirationText: "" };
    }

    const expirationDate = new Date(dashboardData.user.premiumExpiresAt);
    const now = new Date();
    const diffTime = expirationDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const isYearlyPlan = diffDays > 180;
    
    return {
      planName: isYearlyPlan ? "One Year Plan" : "One Month Plan",
      expirationText: isYearlyPlan 
      ? "This subscription will expire in 1 year" 
      : "This subscription will expire in 30 days"
    };
    // return {
    //   planName: isYearlyPlan ? "One Year Plan" : "One Month Plan",
    //   expirationText: isYearlyPlan 
    //     ? `This subscription will expire on ${expirationDate.toLocaleDateString()}` 
    //     : `This subscription will expire on ${expirationDate.toLocaleDateString()}`
    // };
  };

  const { planName, expirationText } = getPlanDetails();

  return (
    <>
      {!dashboardData?.user?.premium ? (
        <Container className="payment-plans">
          <Row className="justify-content-center row">
            {plans.map((plan, index) => (
              <Col key={index} md={4} sm={12} className="mb-4">
                <Card className={`plan-card plan-${index}`}>
                  <Card.Body>
                    <Card.Title>{plan.title}</Card.Title>
                    <hr />
                    <div className="list">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="available">
                          {feature}
                          <span>✔</span>
                        </div>
                      ))}
                      {plan.unavailable.map((feature, i) => (
                        <div key={i} className="unavailable">
                          {feature}
                          <span>✘</span>
                        </div>
                      ))}
                    </div>
                    <div className="btn-and-price-container">
                      <h3 className="price">₦{plan.price}</h3>
                      {plan.title !== "Free Plan" ? (
                        <Button
                          variant="outline"
                          onClick={() => {
                            handleClick(plan.title, plan.price);
                          }}
                          className="pay-btn"
                        >
                          {plan.buttonText}
                        </Button>
                      ) : (
                        <div className="free-box">{plan.buttonText}</div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <ConfirmModal
            email={email}
            plan={selectedPlan}
            amount={amount}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </Container>
      ) : (
        <Container className="payment-plans">
          <Row className="justify-content-center m-auto text-center align-items-center row">
            <Col xs={12}>
              <div className="checkmark-icon mb-3">
                <BsPatchCheckFill
                  size={120}
                  style={{ color: "#d1e7dd" }}
                  className="text-warning"
                />
              </div>
              <h1 className="h3 fw-bold mb-3">Subscription Successful!</h1>
              <h3 className="h5 mb-3">{planName}</h3>
              <p className="mb-2">
                Thank you for choosing to become a premium user
              </p>
              <p className="mb-3">{expirationText}</p>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default PaymentView;

