import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Col, Container, Row, Form, Button, Spinner } from "react-bootstrap";
import { createBio } from "../../../../services/profile";
import { roles } from "./UserProfileForm";
import { BioFormData } from "../../../../types";
import AccordionItem from "../DashboardView/AccordionItem";
import { useDashboard } from "../../../../hooks/useDashboard";
import { useParams } from 'react-router-dom';

const states = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

function UserBioForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { id } = useParams();
  const { data: dashboardData, isLoading, error } = useDashboard(id);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<BioFormData>({
    defaultValues: {
      firstName: dashboardData?.profile?.firstName || "",
      lastName: dashboardData?.profile?.lastName || "",
      role: dashboardData?.profile?.role || "",
      sex: dashboardData?.profile?.sex || "",
      // dob: dashboardData?.profile?.dob || "",
      dob: dashboardData?.profile?.dob ? dashboardData.profile.dob.split('T')[0] : "",
      location: dashboardData?.profile?.location || "",
    }
  });

  useEffect(() => {
    if (dashboardData) {
      reset({
        firstName: dashboardData.profile?.firstName || "",
        lastName: dashboardData.profile?.lastName || "",
        role: dashboardData.profile?.role || "",
        sex: dashboardData.profile?.sex || "",
        // dob: dashboardData.profile?.dob || "",
        dob: dashboardData.profile?.dob ? dashboardData.profile?.dob.split('T')[0] : "",
        location: dashboardData.profile?.location || "",
      });
    }
  }, [dashboardData, reset]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onSubmit = async (data: BioFormData) => {
    setIsSubmitting(true);
    try {
      const response = await createBio(data);
      // console.log(data)
      // console.log("Bio created/updated successfully:", response);
      setTimeout(() => window.location.reload(), 50);
      alert("Bio saved successfully!");
      return response.data
    } catch (error) {
      console.error("Error saving bio:", error);
      alert("Unable to save bio");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <p>Loading dashboard...</p>;
  if (error) return <p>Error loading dashboard</p>;

  return (
    <div className="mt-4 mb-3 p-3 parent">
      <h5 className="text-start">User Bio</h5>
      {isMobile ? (
        <>
          <AccordionItem title="User Bio" className="overflow-auto">
            <Container>
              <Row className="justify-content-center align-items-center gy-3">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Controller
                          name="firstName"
                          control={control}
                          // rules={{ required: "First Name is required" }}
                          render={({ field }) => (
                            <Form.Control
                              {...field}
                              type="text"
                              placeholder="Enter first name"
                              className="p-3 border-warning outline-none shadow-none"
                              isInvalid={!!errors.firstName}
                            />
                          )}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.firstName?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Controller
                          name="lastName"
                          control={control}
                          // rules={{ required: "Last Name is required" }}
                          render={({ field }) => (
                            <Form.Control
                              {...field}
                              type="text"
                              placeholder="Enter last name"
                              className="p-3 border-warning outline-none shadow-none"
                              isInvalid={!!errors.lastName}
                            />
                          )}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.lastName?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3" controlId="formRole">
                        <Form.Label>Role</Form.Label>
                        <Controller
                          name="role"
                          control={control}
                          // rules={{ required: "Role is required" }}
                          render={({ field }) => (
                            <Form.Select
                              {...field}
                              className="p-3 border-warning outline-none shadow-none"
                              isInvalid={!!errors.role}
                            >
                              <option value="">Select Role</option>
                              {Object.entries(roles).map(
                                ([category, rolesList]) => (
                                  <optgroup label={category} key={category}>
                                    {rolesList.map((role) => (
                                      <option
                                        key={role.value}
                                        value={role.value}
                                      >
                                        {role.label}
                                      </option>
                                    ))}
                                  </optgroup>
                                )
                              )}
                            </Form.Select>
                          )}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.role?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3" controlId="formGender">
                        <Form.Label>Gender</Form.Label>
                        <Controller
                          name="sex"
                          control={control}
                          // rules={{ required: "Gender is required" }}
                          render={({ field }) => (
                            <Form.Select
                              {...field}
                              className="p-3 border-warning outline-none shadow-none"
                              isInvalid={!!errors.sex}
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </Form.Select>
                          )}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.sex?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3" controlId="formDob">
                        <Form.Label>Date of Birth</Form.Label>
                        <Controller
                          name="dob"
                          control={control}
                          // rules={{ required: "Date of Birth is required" }}
                          render={({ field }) => (
                            <Form.Control
                              {...field}
                              type="date"
                              placeholder="Select date"
                              className="p-3 border-warning outline-none shadow-none"
                              isInvalid={!!errors.dob}
                            />
                          )}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.dob?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3" controlId="formLocation">
                        <Form.Label>Location</Form.Label>
                        <Controller
                          name="location"
                          control={control}
                          // rules={{ required: "Location is required" }}
                          render={({ field }) => (
                            <Form.Select
                              {...field}
                              className="p-3 border-warning outline-none shadow-none"
                              isInvalid={!!errors.location}
                            >
                              <option value="">Select Location</option>
                              {states.map((state) => (
                                <option key={state} value={state}>
                                  {state}
                                </option>
                              ))}
                            </Form.Select>
                          )}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.location?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="text-center">
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
                        "Save"
                      )}
                    </Button>
                  </div>
                </Form>
              </Row>
            </Container>
          </AccordionItem>
        </>
      ) : (
        <Container>
          <Row className="justify-content-center align-items-center gy-3">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Controller
                      name="firstName"
                      control={control}
                      // rules={{ required: "First Name is required" }}
                      render={({ field }) => (
                        <Form.Control
                          {...field}
                          type="text"
                          placeholder="Enter first name"
                          className="p-3 border-warning outline-none shadow-none"
                          isInvalid={!!errors.firstName}
                        />
                      )}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Controller
                      name="lastName"
                      control={control}
                      // rules={{ required: "Last Name is required" }}
                      render={({ field }) => (
                        <Form.Control
                          {...field}
                          type="text"
                          placeholder="Enter last name"
                          className="p-3 border-warning outline-none shadow-none"
                          isInvalid={!!errors.lastName}
                        />
                      )}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="formRole">
                    <Form.Label>Role</Form.Label>
                    <Controller
                      name="role"
                      control={control}
                      // rules={{ required: "Role is required" }}
                      render={({ field }) => (
                        <Form.Select
                          {...field}
                          className="p-3 border-warning outline-none shadow-none"
                          isInvalid={!!errors.role}
                        >
                          <option value="">Select Role</option>
                          {Object.entries(roles).map(
                            ([category, rolesList]) => (
                              <optgroup label={category} key={category}>
                                {rolesList.map((role) => (
                                  <option key={role.value} value={role.value}>
                                    {role.label}
                                  </option>
                                ))}
                              </optgroup>
                            )
                          )}
                        </Form.Select>
                      )}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.role?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="formGender">
                    <Form.Label>Gender</Form.Label>
                    <Controller
                      name="sex"
                      control={control}
                      // rules={{ required: "Gender is required" }}
                      render={({ field }) => (
                        <Form.Select
                          {...field}
                          className="p-3 border-warning outline-none shadow-none"
                          isInvalid={!!errors.sex}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </Form.Select>
                      )}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.sex?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="formDob">
                    <Form.Label>Date of Birth</Form.Label>
                    <Controller
                      name="dob"
                      control={control}
                      // rules={{ required: "Date of Birth is required" }}
                      render={({ field }) => (
                        <Form.Control
                          {...field}
                          type="date"
                          placeholder="Select date"
                          className="p-3 border-warning outline-none shadow-none"
                          isInvalid={!!errors.dob}
                        />
                      )}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.dob?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="formLocation">
                    <Form.Label>Location</Form.Label>
                    <Controller
                      name="location"
                      control={control}
                      // rules={{ required: "Location is required" }}
                      render={({ field }) => (
                        <Form.Select
                          {...field}
                          className="p-3 border-warning outline-none shadow-none"
                          isInvalid={!!errors.location}
                        >
                          <option value="">Select Location</option>
                          {states.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </Form.Select>
                      )}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.location?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <div className="text-center">
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
                    "Save"
                  )}
                </Button>
              </div>
            </Form>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default UserBioForm;





















// function UserBioForm() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { id } = useParams();
//   const { data: dashboardData, isLoading, error } = useDashboard(id);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const {
//     handleSubmit,
//     control,
//     // reset,
//     formState: { errors },
//   } = useForm<BioFormData>();

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const onSubmit = async (data: BioFormData) => {
//     setIsSubmitting(true);
//     try {
//       const response = await createBio(data);
//       console.log("Bio created successfully:", response);
//       alert("Bio created successfully!");
//       // reset();
//     } catch (error) {
//       console.error("Error creating bio:", error);
//       alert("Unable to create bio");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="mt-4 mb-3 p-3 parent">
//       <h5 className="text-start">User Bio</h5>
//       {isMobile ? (
//         <>
//           <AccordionItem title="User Bio" className="overflow-auto">
//             <Container>
//               <Row className="justify-content-center align-items-center gy-3">
//                 <Form onSubmit={handleSubmit(onSubmit)}>
//                   <Row>
//                     <Col xs={12} md={6}>
//                       <Form.Group className="mb-3" controlId="formFirstName">
//                         <Form.Label>First Name</Form.Label>
//                         <Controller
//                           name="firstName"
//                           control={control}
//                           defaultValue=""
//                           rules={{ required: "First Name is required" }}
//                           render={({ field }) => (
//                             <Form.Control
//                               {...field}
//                               type="text"
//                               placeholder="Enter first name"
//                               className="p-3 border-warning outline-none shadow-none"
//                               isInvalid={!!errors.firstName}
//                             />
//                           )}
//                         />
//                         <Form.Control.Feedback type="invalid">
//                           {errors.firstName?.message}
//                         </Form.Control.Feedback>
//                       </Form.Group>
//                     </Col>
//                     <Col xs={12} md={6}>
//                       <Form.Group className="mb-3" controlId="formLastName">
//                         <Form.Label>Last Name</Form.Label>
//                         <Controller
//                           name="lastName"
//                           control={control}
//                           defaultValue=""
//                           rules={{ required: "Last Name is required" }}
//                           render={({ field }) => (
//                             <Form.Control
//                               {...field}
//                               type="text"
//                               placeholder="Enter last name"
//                               className="p-3 border-warning outline-none shadow-none"
//                               isInvalid={!!errors.lastName}
//                             />
//                           )}
//                         />
//                         <Form.Control.Feedback type="invalid">
//                           {errors.lastName?.message}
//                         </Form.Control.Feedback>
//                       </Form.Group>
//                     </Col>
//                     <Col xs={12} md={6}>
//                       <Form.Group className="mb-3" controlId="formRole">
//                         <Form.Label>Role</Form.Label>
//                         <Controller
//                           name="role"
//                           control={control}
//                           defaultValue=""
//                           rules={{ required: "Role is required" }}
//                           render={({ field }) => (
//                             <Form.Select
//                               {...field}
//                               className="p-3 border-warning outline-none shadow-none"
//                               isInvalid={!!errors.role}
//                             >
//                               <option value="">Select Role</option>
//                               {Object.entries(roles).map(
//                                 ([category, rolesList]) => (
//                                   <optgroup label={category} key={category}>
//                                     {rolesList.map((role) => (
//                                       <option
//                                         key={role.value}
//                                         value={role.value}
//                                       >
//                                         {role.label}
//                                       </option>
//                                     ))}
//                                   </optgroup>
//                                 )
//                               )}
//                             </Form.Select>
//                           )}
//                         />
//                         <Form.Control.Feedback type="invalid">
//                           {errors.role?.message}
//                         </Form.Control.Feedback>
//                       </Form.Group>
//                     </Col>
//                     <Col xs={12} md={6}>
//                       <Form.Group className="mb-3" controlId="formGender">
//                         <Form.Label>Gender</Form.Label>
//                         <Controller
//                           name="gender"
//                           control={control}
//                           defaultValue=""
//                           rules={{ required: "Gender is required" }}
//                           render={({ field }) => (
//                             <Form.Select
//                               {...field}
//                               className="p-3 border-warning outline-none shadow-none"
//                               isInvalid={!!errors.gender}
//                             >
//                               <option value="">Select Gender</option>
//                               <option value="Male">Male</option>
//                               <option value="Female">Female</option>
//                               <option value="Other">Other</option>
//                             </Form.Select>
//                           )}
//                         />
//                         <Form.Control.Feedback type="invalid">
//                           {errors.gender?.message}
//                         </Form.Control.Feedback>
//                       </Form.Group>
//                     </Col>
//                     <Col xs={12} md={6}>
//                       <Form.Group className="mb-3" controlId="formDob">
//                         <Form.Label>Date of Birth</Form.Label>
//                         <Controller
//                           name="dob"
//                           control={control}
//                           defaultValue=""
//                           rules={{ required: "Date of Birth is required" }}
//                           render={({ field }) => (
//                             <Form.Control
//                               {...field}
//                               type="date"
//                               placeholder="Select date"
//                               className="p-3 border-warning outline-none shadow-none"
//                               isInvalid={!!errors.dob}
//                             />
//                           )}
//                         />
//                         <Form.Control.Feedback type="invalid">
//                           {errors.dob?.message}
//                         </Form.Control.Feedback>
//                       </Form.Group>
//                     </Col>
//                     <Col xs={12} md={6}>
//                       <Form.Group className="mb-3" controlId="formLocation">
//                         <Form.Label>Location</Form.Label>
//                         <Controller
//                           name="location"
//                           control={control}
//                           defaultValue=""
//                           rules={{ required: "Location is required" }}
//                           render={({ field }) => (
//                             <Form.Select
//                               {...field}
//                               className="p-3 border-warning outline-none shadow-none"
//                               isInvalid={!!errors.location}
//                             >
//                               <option value="">Select Location</option>
//                               {states.map((state) => (
//                                 <option key={state} value={state}>
//                                   {state}
//                                 </option>
//                               ))}
//                             </Form.Select>
//                           )}
//                         />
//                         <Form.Control.Feedback type="invalid">
//                           {errors.location?.message}
//                         </Form.Control.Feedback>
//                       </Form.Group>
//                     </Col>
//                   </Row>
//                   <div className="text-center">
//                     <Button
//                       type="submit"
//                       className="btn btn-warning rounded-pill px-5"
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? (
//                         <>
//                           <Spinner
//                             as="span"
//                             animation="border"
//                             size="sm"
//                             role="status"
//                             aria-hidden="true"
//                             className="me-2"
//                           />
//                           Saving...
//                         </>
//                       ) : (
//                         "Save"
//                       )}
//                     </Button>
//                   </div>
//                 </Form>
//               </Row>
//             </Container>
//           </AccordionItem>
//         </>
//       ) : (
//         <Container>
//           <Row className="justify-content-center align-items-center gy-3">
//             <Form onSubmit={handleSubmit(onSubmit)}>
//               <Row>
//                 <Col xs={12} md={6}>
//                   <Form.Group className="mb-3" controlId="formFirstName">
//                     <Form.Label>First Name</Form.Label>
//                     <Controller
//                       name="firstName"
//                       control={control}
//                       defaultValue=""
//                       rules={{ required: "First Name is required" }}
//                       render={({ field }) => (
//                         <Form.Control
//                           {...field}
//                           type="text"
//                           placeholder="Enter first name"
//                           className="p-3 border-warning outline-none shadow-none"
//                           isInvalid={!!errors.firstName}
//                         />
//                       )}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors.firstName?.message}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//                 <Col xs={12} md={6}>
//                   <Form.Group className="mb-3" controlId="formLastName">
//                     <Form.Label>Last Name</Form.Label>
//                     <Controller
//                       name="lastName"
//                       control={control}
//                       defaultValue=""
//                       rules={{ required: "Last Name is required" }}
//                       render={({ field }) => (
//                         <Form.Control
//                           {...field}
//                           type="text"
//                           placeholder="Enter last name"
//                           className="p-3 border-warning outline-none shadow-none"
//                           isInvalid={!!errors.lastName}
//                         />
//                       )}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors.lastName?.message}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//                 <Col xs={12} md={6}>
//                   <Form.Group className="mb-3" controlId="formRole">
//                     <Form.Label>Role</Form.Label>
//                     <Controller
//                       name="role"
//                       control={control}
//                       defaultValue=""
//                       rules={{ required: "Role is required" }}
//                       render={({ field }) => (
//                         <Form.Select
//                           {...field}
//                           className="p-3 border-warning outline-none shadow-none"
//                           isInvalid={!!errors.role}
//                         >
//                           <option value="">Select Role</option>
//                           {Object.entries(roles).map(
//                             ([category, rolesList]) => (
//                               <optgroup label={category} key={category}>
//                                 {rolesList.map((role) => (
//                                   <option key={role.value} value={role.value}>
//                                     {role.label}
//                                   </option>
//                                 ))}
//                               </optgroup>
//                             )
//                           )}
//                         </Form.Select>
//                       )}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors.role?.message}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//                 <Col xs={12} md={6}>
//                   <Form.Group className="mb-3" controlId="formGender">
//                     <Form.Label>Gender</Form.Label>
//                     <Controller
//                       name="gender"
//                       control={control}
//                       defaultValue=""
//                       rules={{ required: "Gender is required" }}
//                       render={({ field }) => (
//                         <Form.Select
//                           {...field}
//                           className="p-3 border-warning outline-none shadow-none"
//                           isInvalid={!!errors.gender}
//                         >
//                           <option value="">Select Gender</option>
//                           <option value="Male">Male</option>
//                           <option value="Female">Female</option>
//                           <option value="Other">Other</option>
//                         </Form.Select>
//                       )}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors.gender?.message}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//                 <Col xs={12} md={6}>
//                   <Form.Group className="mb-3" controlId="formDob">
//                     <Form.Label>Date of Birth</Form.Label>
//                     <Controller
//                       name="dob"
//                       control={control}
//                       defaultValue=""
//                       rules={{ required: "Date of Birth is required" }}
//                       render={({ field }) => (
//                         <Form.Control
//                           {...field}
//                           type="date"
//                           placeholder="Select date"
//                           className="p-3 border-warning outline-none shadow-none"
//                           isInvalid={!!errors.dob}
//                         />
//                       )}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors.dob?.message}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//                 <Col xs={12} md={6}>
//                   <Form.Group className="mb-3" controlId="formLocation">
//                     <Form.Label>Location</Form.Label>
//                     <Controller
//                       name="location"
//                       control={control}
//                       defaultValue=""
//                       rules={{ required: "Location is required" }}
//                       render={({ field }) => (
//                         <Form.Select
//                           {...field}
//                           className="p-3 border-warning outline-none shadow-none"
//                           isInvalid={!!errors.location}
//                         >
//                           <option value="">Select Location</option>
//                           {states.map((state) => (
//                             <option key={state} value={state}>
//                               {state}
//                             </option>
//                           ))}
//                         </Form.Select>
//                       )}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors.location?.message}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <div className="text-center">
//                 <Button
//                   type="submit"
//                   className="btn btn-warning rounded-pill px-5"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Spinner
//                         as="span"
//                         animation="border"
//                         size="sm"
//                         role="status"
//                         aria-hidden="true"
//                         className="me-2"
//                       />
//                       Saving...
//                     </>
//                   ) : (
//                     "Save"
//                   )}
//                 </Button>
//               </div>
//             </Form>
//           </Row>
//         </Container>
//       )}
//     </div>
//   );
// }

// export default UserBioForm;
