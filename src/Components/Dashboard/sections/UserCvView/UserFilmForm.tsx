import { useState } from 'react';
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Col, Container, Row, Form, Button, Spinner } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FilmographyFormData } from "../../../../types";
import { createFilmography } from "../../../../services/profile";
import { roles, countries } from "./UserProfileForm";
import { useParams } from "react-router-dom";
import { useDashboard } from "../../../../hooks/useDashboard";
import { FilmographyItem } from "../../sections/DashboardView/DashboardCareer"

function UserFilmForm() {
  const { id } = useParams();
  const { data: dashboardData } = useDashboard(id); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ filmographies: (FilmographyFormData & { _id?: string })[] }>({
    defaultValues: {
      filmographies: dashboardData?.filmography?.length 
        ? dashboardData.filmography.map((item: FilmographyItem) => ({
            _id: item._id, // Include the _id for existing filmographies
            title: item.title || "",
            year: item.year?.toString() || "",
            genre: item.genre || "",
            productionCompany: item.productionCompany || "",
            role: item.role || "",
            castName: item.castName || "",
            location: item.location || "",
            link: item.link || ""
          }))
        : [{
            title: "",
            year: "",
            genre: "",
            productionCompany: "",
            role: "",
            castName: "",
            location: "",
            link: ""
          }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "filmographies"
  });

  const onSubmit = async (data: { filmographies: (FilmographyFormData & { _id?: string })[] }) => {
    try {
      setIsSubmitting(true);
      const responses = await Promise.all(
        data.filmographies.map(filmography => createFilmography({
          ...filmography,
          _id: filmography._id // Make sure to include _id in the request
        }))
      );
      
      // console.log("All filmographies saved successfully:", responses);
      alert(`${data.filmographies.length} filmography entries saved successfully!`);
      setTimeout(() => window.location.reload(), 50);
      return responses
    } catch (error) {
      console.error("Error saving filmographies:", error);
      alert("Failed to save filmographies. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, index) => 1900 + index);

  return (
    <Container className="parent p-3 mb-3 filmography">
      <Row className="justify-content-center align-items-center gy-3">
        <h5 className="text-start">Filmography</h5>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <div key={field.id} className="mb-4 position-relative">
              {fields.length > 1 && (
                <Button
                  variant="danger"
                  size="sm"
                  className="position-absolute end-0 top-0"
                  onClick={() => remove(index)}
                  disabled={isSubmitting}
                >
                  <FaTrash />
                </Button>
              )}
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId={`formTitle-${index}`}>
                    <Form.Label>Title</Form.Label>
                    <Controller
                      name={`filmographies.${index}.title`}
                      control={control}
                      render={({ field }) => (
                        <Form.Control
                          {...field}
                          type="text"
                          placeholder="Enter title"
                          className="p-3 border-warning outline-none shadow-none"
                          isInvalid={!!errors.filmographies?.[index]?.title}
                          disabled={isSubmitting}
                        />
                      )}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.filmographies?.[index]?.title?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                    <Form.Group className="mb-3" controlId={`formDobYear-${index}`}>
                      <Form.Label>Year</Form.Label>
                      <Controller
                        name={`filmographies.${index}.year`}
                        control={control}
                        render={({ field }) => (
                          <Form.Select
                            {...field}
                            className="p-3 border-warning outline-none shadow-none"
                            isInvalid={!!errors.filmographies?.[index]?.year}
                            disabled={isSubmitting}
                          >
                            <option value="">Select Year</option>
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </Form.Select>
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.filmographies?.[index]?.year?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId={`formGenre-${index}`}>
                    <Form.Label>Genre</Form.Label>
                    <Controller
                      name={`filmographies.${index}.genre`}
                      control={control}
                      render={({ field }) => (
                        <Form.Select
                          {...field}
                          className="p-3 border-warning outline-none shadow-none"
                          isInvalid={!!errors.filmographies?.[index]?.genre}
                          disabled={isSubmitting}
                        >
                          <option value="">Select the Genre</option>
                          <option value="Short film">Short film</option>
                          <option value="Feature film">Feature film</option>
                          <option value="Documentary film">Documentary film</option>
                          <option value="Animated film">Animated film</option>
                          <option value="Series">Series</option>
                        </Form.Select>
                      )}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.filmographies?.[index]?.genre?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId={`formProductionCompany-${index}`}>
                    <Form.Label>Production Company</Form.Label>
                    <Controller
                      name={`filmographies.${index}.productionCompany`}
                      control={control}
                      render={({ field }) => (
                        <Form.Control
                          {...field}
                          type="text"
                          placeholder="Enter company name"
                          className="p-3 border-warning outline-none shadow-none"
                          isInvalid={!!errors.filmographies?.[index]?.productionCompany}
                          disabled={isSubmitting}
                        />
                      )}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.filmographies?.[index]?.productionCompany?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                    <Form.Group className="mb-3" controlId={`formRole-${index}`}>
                      <Form.Label>Role</Form.Label>
                      <Controller
                        name={`filmographies.${index}.role`}
                        control={control}
                        render={({ field }) => (
                          <Form.Select
                            {...field}
                            className="p-3 border-warning outline-none shadow-none"
                            isInvalid={!!errors.filmographies?.[index]?.role}
                            disabled={isSubmitting}
                          >
                            <option value="">Select Role</option>
                            {Object.entries(roles).map(([category, rolesList]) => (
                              <optgroup label={category} key={category}>
                                {rolesList.map((role) => (
                                  <option key={role.value} value={role.value}>
                                    {role.label}
                                  </option>
                                ))}
                              </optgroup>
                            ))}
                          </Form.Select>
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.filmographies?.[index]?.role?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId={`formcastName-${index}`}>
                    <Form.Label>Credit (Optional)</Form.Label>
                    <Controller
                      name={`filmographies.${index}.castName`}
                      control={control}
                      render={({ field }) => (
                        <Form.Control
                          {...field}
                          type="text"
                          placeholder="Enter name credited in the film"
                          className="p-3 border-warning outline-none shadow-none"
                          isInvalid={!!errors.filmographies?.[index]?.castName}
                          disabled={isSubmitting}
                        />
                      )}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.filmographies?.[index]?.castName?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                    <Form.Group className="mb-3" controlId={`formCountry-${index}`}>
                      <Form.Label>Location</Form.Label>
                      <Controller
                        name={`filmographies.${index}.location`}
                        control={control}
                        render={({ field }) => (
                          <Form.Select
                            {...field}
                            className="p-3 border-warning outline-none shadow-none"
                            isInvalid={!!errors.filmographies?.[index]?.location}
                            disabled={isSubmitting}
                          >
                            <option value="">Select Location</option>
                            {countries.map((country) => (
                              <option key={country} value={country}>
                                {country}
                              </option>
                            ))}
                          </Form.Select>
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.filmographies?.[index]?.location?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId={`formLink-${index}`}>
                    <Form.Label>Link (Optional)</Form.Label>
                    <Controller
                      name={`filmographies.${index}.link`}
                      control={control}
                      render={({ field }) => (
                        <Form.Control
                          {...field}
                          type="text"
                          placeholder="Paste link"
                          className="p-3 border-warning outline-none shadow-none"
                          isInvalid={!!errors.filmographies?.[index]?.link}
                          disabled={isSubmitting}
                        />
                      )}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.filmographies?.[index]?.link?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          ))}

          <div className="text-center d-flex justify-content-center gap-3 mx-5">
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
            <Button
              type="button"
              className="btn btn-outline-warning bg-transparent rounded-pill px-3"
              onClick={() => append({
                title: "",
                year: "",
                genre: "",
                productionCompany: "",
                role: "",
                castName: "",
                location: "",
                link: ""
              })}
              disabled={isSubmitting}
            >
              <FaPlus /> 
            </Button>
          </div>
        </Form>
      </Row>
    </Container>
  );
}

export default UserFilmForm;




// import { useState } from 'react';
// import { useForm, Controller, useFieldArray } from "react-hook-form";
// import { Col, Container, Row, Form, Button, Spinner } from "react-bootstrap";
// import { FaPlus, FaTrash } from "react-icons/fa";
// import { FilmographyFormData } from "../../../../types";
// import { createFilmography } from "../../../../services/profile";
// import { roles, countries } from "./UserProfileForm";

// function UserFilmForm() {
//   const [isSubmitting, setIsSubmitting] = useState(false); // Added loading state
//   const {
//     handleSubmit,
//     control,
//     // reset,
//     formState: { errors },
//   } = useForm<{ filmographies: FilmographyFormData[] }>({
//     defaultValues: {
//       filmographies: [{
//         title: "",
//         year: "",
//         genre: "",
//         productionCompany: "",
//         role: "",
//         castName: "",
//         location: "",
//         link: ""
//       }]
//     }
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "filmographies"
//   });

//   const onSubmit = async (data: { filmographies: FilmographyFormData[] }) => {
//     try {
//       setIsSubmitting(true); // Start loading
//       // Submit each filmography separately or modify your API to accept an array
//       const responses = await Promise.all(
//         data.filmographies.map(filmography => createFilmography(filmography))
//       );
      
//       console.log("All filmographies saved successfully:", responses);
//       alert(`${data.filmographies.length} filmography entries saved successfully!`);
//       setTimeout(() => window.location.reload(), 50);
//       // reset({
//       //   filmographies: [{
//       //     title: "",
//       //     year: "",
//       //     genre: "",
//       //     productionCompany: "",
//       //     role: "",
//       //     castName: "",
//       //     location: "",
//       //     link: ""
//       //   }]
//       // });
//     } catch (error) {
//       console.error("Error saving filmographies:", error);
//       alert("Failed to save filmographies. Please try again.");
//     } finally {
//       setIsSubmitting(false); // Stop loading
//     }
//   };

//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: currentYear - 1900 + 1 }, (_, index) => 1900 + index);

//   return (
//     <Container className="parent p-3 mb-3 filmography">
//       <Row className="justify-content-center align-items-center gy-3">
//         <h5 className="text-start">Filmography</h5>
//         <Form onSubmit={handleSubmit(onSubmit)}>
//           {fields.map((field, index) => (
//             <div key={field.id} className="mb-4 position-relative">
//               {fields.length > 1 && (
//                 <Button
//                   variant="danger"
//                   size="sm"
//                   className="position-absolute end-0 top-0"
//                   onClick={() => remove(index)}
//                   disabled={isSubmitting} // Disable during submission
//                 >
//                   <FaTrash />
//                 </Button>
//               )}
//               <Row>
//                 <Col xs={12} md={6}>
//                   <Form.Group className="mb-3" controlId={`formTitle-${index}`}>
//                     <Form.Label>Title</Form.Label>
//                     <Controller
//                       name={`filmographies.${index}.title`}
//                       control={control}
//                       // rules={{ required: "Title is required" }}
//                       render={({ field }) => (
//                         <Form.Control
//                           {...field}
//                           type="text"
//                           placeholder="Enter title"
//                           className="p-3 border-warning outline-none shadow-none"
//                           isInvalid={!!errors.filmographies?.[index]?.title}
//                           disabled={isSubmitting} // Disable during submission
//                         />
//                       )}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors.filmographies?.[index]?.title?.message}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//                 <Col xs={12} md={6}>
//                     <Form.Group className="mb-3" controlId={`formDobYear-${index}`}>
//                       <Form.Label>Year</Form.Label>
//                       <Controller
//                         name={`filmographies.${index}.year`}
//                         control={control}
//                         // rules={{ required: "Year of Birth is required" }}
//                         render={({ field }) => (
//                           <Form.Select
//                             {...field}
//                             className="p-3 border-warning outline-none shadow-none"
//                             isInvalid={!!errors.filmographies?.[index]?.year}
//                             disabled={isSubmitting} // Disable during submission
//                           >
//                             <option value="">Select Year</option>
//                             {years.map((year) => (
//                               <option key={year} value={year}>
//                                 {year}
//                               </option>
//                             ))}
//                           </Form.Select>
//                         )}
//                       />
//                       <Form.Control.Feedback type="invalid">
//                         {errors.filmographies?.[index]?.year?.message}
//                       </Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                 <Col xs={12} md={6}>
//                   <Form.Group className="mb-3" controlId={`formGenre-${index}`}>
//                     <Form.Label>Genre</Form.Label>
//                     <Controller
//                       name={`filmographies.${index}.genre`}
//                       control={control}
//                       // rules={{ required: "Genre is required" }}
//                       render={({ field }) => (
//                         <Form.Select
//                           {...field}
//                           className="p-3 border-warning outline-none shadow-none"
//                           isInvalid={!!errors.filmographies?.[index]?.genre}
//                           disabled={isSubmitting} // Disable during submission
//                         >
//                           <option value="">Select the Genre</option>
//                           <option value="Short film">Short film</option>
//                           <option value="Feature film">Feature film</option>
//                           <option value="Documentary film">Documentary film</option>
//                           <option value="Animated film">Animated film</option>
//                           <option value="Series">Series</option>
//                         </Form.Select>
//                       )}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors.filmographies?.[index]?.genre?.message}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//                 <Col xs={12} md={6}>
//                   <Form.Group className="mb-3" controlId={`formProductionCompany-${index}`}>
//                     <Form.Label>Production Company</Form.Label>
//                     <Controller
//                       name={`filmographies.${index}.productionCompany`}
//                       control={control}
//                       // rules={{ required: "Production Company is required" }}
//                       render={({ field }) => (
//                         <Form.Control
//                           {...field}
//                           type="text"
//                           placeholder="Enter company name"
//                           className="p-3 border-warning outline-none shadow-none"
//                           isInvalid={!!errors.filmographies?.[index]?.productionCompany}
//                           disabled={isSubmitting} // Disable during submission
//                         />
//                       )}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors.filmographies?.[index]?.productionCompany?.message}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>

//                 <Col xs={12} md={6}>
//                     <Form.Group className="mb-3" controlId={`formRole-${index}`}>
//                       <Form.Label>Role</Form.Label>
//                       <Controller
//                         name={`filmographies.${index}.role`}
//                         control={control}
//                         // rules={{ required: "Role is required" }}
//                         render={({ field }) => (
//                           <Form.Select
//                             {...field}
//                             className="p-3 border-warning outline-none shadow-none"
//                             isInvalid={!!errors.filmographies?.[index]?.role}
//                             disabled={isSubmitting} // Disable during submission
//                           >
//                             <option value="">Select Role</option>
//                             {Object.entries(roles).map(([category, rolesList]) => (
//                               <optgroup label={category} key={category}>
//                                 {rolesList.map((role) => (
//                                   <option key={role.value} value={role.value}>
//                                     {role.label}
//                                   </option>
//                                 ))}
//                               </optgroup>
//                             ))}
//                           </Form.Select>
//                         )}
//                       />
//                       <Form.Control.Feedback type="invalid">
//                         {errors.filmographies?.[index]?.role?.message}
//                       </Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>

//                 <Col xs={12} md={6}>
//                   <Form.Group className="mb-3" controlId={`formcastName-${index}`}>
//                     <Form.Label>Credit (Optional)</Form.Label>
//                     <Controller
//                       name={`filmographies.${index}.castName`}
//                       control={control}
//                       // rules={{ required: "Cast Name is required" }}
//                       render={({ field }) => (
//                         <Form.Control
//                           {...field}
//                           type="text"
//                           placeholder="Enter credit name"
//                           className="p-3 border-warning outline-none shadow-none"
//                           isInvalid={!!errors.filmographies?.[index]?.castName}
//                           disabled={isSubmitting} // Disable during submission
//                         />
//                       )}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors.filmographies?.[index]?.castName?.message}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//                 <Col xs={12} md={6}>
//                     <Form.Group className="mb-3" controlId={`formCountry-${index}`}>
//                       <Form.Label>Location</Form.Label>
//                       <Controller
//                         name={`filmographies.${index}.location`}
//                         control={control}
//                         // rules={{ required: "Location is required" }}
//                         render={({ field }) => (
//                           <Form.Select
//                             {...field}
//                             className="p-3 border-warning outline-none shadow-none"
//                             isInvalid={!!errors.filmographies?.[index]?.location}
//                             disabled={isSubmitting} // Disable during submission
//                           >
//                             <option value="">Select Location</option>
//                             {countries.map((country) => (
//                               <option key={country} value={country}>
//                                 {country}
//                               </option>
//                             ))}
//                           </Form.Select>
//                         )}
//                       />
//                       <Form.Control.Feedback type="invalid">
//                         {errors.filmographies?.[index]?.location?.message}
//                       </Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>

//                 <Col xs={12} md={6}>
//                   <Form.Group className="mb-3" controlId={`formLink-${index}`}>
//                     <Form.Label>Link (Optional)</Form.Label>
//                     <Controller
//                       name={`filmographies.${index}.link`}
//                       control={control}
//                       // rules={{ required: "Link is required" }}
//                       render={({ field }) => (
//                         <Form.Control
//                           {...field}
//                           type="text"
//                           placeholder="Paste link"
//                           className="p-3 border-warning outline-none shadow-none"
//                           isInvalid={!!errors.filmographies?.[index]?.link}
//                           disabled={isSubmitting} // Disable during submission
//                         />
//                       )}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors.filmographies?.[index]?.link?.message}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//               </Row>
//             </div>
//           ))}

//           <div className="text-center d-flex justify-content-center gap-3 mx-5">
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
//             <Button
//               type="button"
//               className="btn btn-outline-warning bg-transparent rounded-pill px-3"
//               onClick={() => append({
//                 title: "",
//                 year: "",
//                 genre: "",
//                 productionCompany: "",
//                 role: "",
//                 castName: "",
//                 location: "",
//                 link: ""
//               })}
//               disabled={isSubmitting} // Disable during submission
//             >
//               <FaPlus /> 
//             </Button>
//           </div>
//         </Form>
//       </Row>
//     </Container>
//   );
// }

// export default UserFilmForm;

