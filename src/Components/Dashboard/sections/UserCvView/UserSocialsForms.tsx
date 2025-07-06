
import { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Col, Container, Row, Form, Button, Spinner } from "react-bootstrap";
import { createSocials } from "../../../../services/profile";
import { SocialsFormData } from "../../../../types";
import { useDashboard } from "../../../../hooks/useDashboard";
import { useParams } from 'react-router-dom';

function UserSocialsForms() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const { data: dashboardData, isLoading, error } = useDashboard(id);

  const {
    handleSubmit,
    control,
    reset,
    // formState: { errors },
  } = useForm<SocialsFormData>({
    defaultValues: {
      facebook: dashboardData?.socials?.[0]?.facebook || "",
      instagram: dashboardData?.socials?.[0]?.instagram || "",
      tiktok: dashboardData?.socials?.[0]?.tiktok || "",
      youtube: dashboardData?.socials?.[0]?.youtube || ""
    }
  });

  useEffect(() => {
    if (dashboardData?.socials?.[0]) {
      reset({
        facebook: dashboardData.socials[0].facebook || "",
        instagram: dashboardData.socials[0].instagram || "",
        tiktok: dashboardData.socials[0].tiktok || "",
        youtube: dashboardData.socials[0].youtube || ""
      });
    }
  }, [dashboardData, reset]);

  const onSubmit = async (data: SocialsFormData) => {
    try {
      setIsSubmitting(true);
      const response = await createSocials(data);
      // console.log("Socials created successfully:", response);
      alert("Socials created successfully!");
      setTimeout(() => window.location.reload(), 50);
      return response.data
    } catch (error) {
      console.error("Error creating socials:", error);
      alert("Unable to create socials");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <p>Loading social links...</p>;
  if (error) return <p>Error loading social links</p>;

  return (
    <Container className="parent p-3 mb-3 socials">
      <Row className="justify-content-center align-items-center gy-3">
        <h5 className="text-start">Social Links</h5>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="formFacebook">
                <Form.Label>Facebook (Optional)</Form.Label>
                <Controller
                  name="facebook"
                  control={control}
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="Paste link"
                      className="p-3 border-warning outline-none shadow-none"
                      disabled={isSubmitting}
                    />
                  )}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="formInstagram">
                <Form.Label>Instagram (Optional)</Form.Label>
                <Controller
                  name="instagram"
                  control={control}
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="Paste link"
                      className="p-3 border-warning outline-none shadow-none"
                      disabled={isSubmitting}
                    />
                  )}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="formTiktok">
                <Form.Label>Tiktok (Optional)</Form.Label>
                <Controller
                  name="tiktok"
                  control={control}
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="Paste link"
                      className="p-3 border-warning outline-none shadow-none"
                      disabled={isSubmitting}
                    />
                  )}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="formYoutube">
                <Form.Label>Youtube (Optional)</Form.Label>
                <Controller
                  name="youtube"
                  control={control}
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="Paste link"
                      className="p-3 border-warning outline-none shadow-none"
                      disabled={isSubmitting}
                    />
                  )}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="text-center mx-5">
            <Button 
              type="submit" 
              className="btn btn-warning rounded-pill px-5"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </Form>
      </Row>
    </Container>
  );
}

export default UserSocialsForms;























// import { useState } from 'react';
// import { useForm, Controller } from "react-hook-form";
// import { Col, Container, Row, Form, Button, Spinner } from "react-bootstrap";
// import { createSocials } from "../../../../services/profile";
// import { SocialsFormData } from "../../../../types";

// function UserSocialsForms() {
//   const [isSubmitting, setIsSubmitting] = useState(false); // Added loading state
//   const {
//     handleSubmit,
//     control,
//     // reset,
//     formState: { errors },
//   } = useForm<SocialsFormData>();

//   const onSubmit = async (data: SocialsFormData) => {
//     try {
//       setIsSubmitting(true); // Start loading
//       const response = await createSocials(data);
//       console.log("Socials created successfully:", response);
//       alert("Socials created successfully!");
//       // reset();
//     } catch (error) {
//       console.error("Error creating socials:", error);
//       alert("Unable to create socials");
//     } finally {
//       setIsSubmitting(false); // Stop loading
//     }
//   };

//   return (
//     <Container className="parent p-3 mb-3 socials">
//       <Row className="justify-content-center align-items-center gy-3">
//         <h5 className="text-start">Social Links</h5>
//         <Form onSubmit={handleSubmit(onSubmit)}>
//           <Row>
//             <Col xs={12} md={6}>
//               <Form.Group className="mb-3" controlId="formFacebook">
//                 <Form.Label>Facebook (Optional)</Form.Label>
//                 <Controller
//                   name="facebook"
//                   control={control}
//                   defaultValue=""
//                   render={({ field }) => (
//                     <Form.Control
//                       {...field}
//                       type="text"
//                       placeholder="Paste link"
//                       className="p-3 border-warning outline-none shadow-none"
//                       disabled={isSubmitting} // Disable during submission
//                     />
//                   )}
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   {errors.facebook?.message}
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </Col>
//             <Col xs={12} md={6}>
//               <Form.Group className="mb-3" controlId="formInstagram">
//                 <Form.Label>Instagram (Optional)</Form.Label>
//                 <Controller
//                   name="instagram"
//                   control={control}
//                   defaultValue=""
//                   render={({ field }) => (
//                     <Form.Control
//                       {...field}
//                       type="text"
//                       placeholder="Paste link"
//                       className="p-3 border-warning outline-none shadow-none"
//                       disabled={isSubmitting} // Disable during submission
//                     />
//                   )}
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   {errors.instagram?.message}
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </Col>
//             <Col xs={12} md={6}>
//               <Form.Group className="mb-3" controlId="formTiktok">
//                 <Form.Label>Tiktok (Optional)</Form.Label>
//                 <Controller
//                   name="tiktok"
//                   control={control}
//                   defaultValue=""
//                   render={({ field }) => (
//                     <Form.Control
//                       {...field}
//                       type="text"
//                       placeholder="Paste link"
//                       className="p-3 border-warning outline-none shadow-none"
//                       disabled={isSubmitting}
//                     />
//                   )}
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   {errors.tiktok?.message}
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </Col>
//             <Col xs={12} md={6}>
//               <Form.Group className="mb-3" controlId="formYoutube">
//                 <Form.Label>Twitter-X (Optional)</Form.Label>
//                 <Controller
//                   name="youtube"
//                   control={control}
//                   defaultValue=""
//                   render={({ field }) => (
//                     <Form.Control
//                       {...field}
//                       type="text"
//                       placeholder="Paste link"
//                       className="p-3 border-warning outline-none shadow-none"
//                       disabled={isSubmitting} // Disable during submission
//                     />
//                   )}
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   {errors.youtube?.message}
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </Col>
//           </Row>
//           <div className="text-center mx-5">
//             <Button 
//               type="submit" 
//               className="btn btn-warning rounded-pill px-5"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? (
//                 <>
//                   <Spinner
//                     as="span"
//                     animation="border"
//                     size="sm"
//                     role="status"
//                     aria-hidden="true"
//                     className="me-2"
//                   />
//                   Saving...
//                 </>
//               ) : (
//                 'Save'
//               )}
//             </Button>
//           </div>
//         </Form>
//       </Row>
//     </Container>
//   );
// }

// export default UserSocialsForms;


