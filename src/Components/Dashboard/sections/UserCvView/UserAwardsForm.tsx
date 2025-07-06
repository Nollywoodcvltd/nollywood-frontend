import { useState } from 'react'; 
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Col, Row, Form, Button, Spinner } from "react-bootstrap";
import { FaPlus, FaTimes } from "react-icons/fa";
import { AwardFormData } from "../../../../types";
import { createAward } from "../../../../services/profile";
import { useDashboard } from "../../../../hooks/useDashboard";
import { AwardItem } from "../../sections/DashboardView/DashboardCareer";
import { useParams } from 'react-router-dom';

function UserAwardsForm() {
  const { id } = useParams();
  const { data: dashboardData } = useDashboard(id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<{
    awards: (AwardFormData & { _id?: string })[];
  }>({
    defaultValues: {
      awards: dashboardData?.awards?.length 
        ? dashboardData.awards.map((award: AwardItem) => ({
            _id: award?._id,
            type: award?.type || "",
            title: award?.title || "",
            year: award?.year?.toString() || "",
            link: award.link || ""
          }))
        : [{
            type: "",
            title: "",
            year: "",
            link: ""
          }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "awards",
  });

  const onSubmit = async (data: { awards: (AwardFormData & { _id?: string })[] }) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      const responses = await Promise.all(
        data.awards.map(award => createAward(award))
      );
      
      // console.log("Awards saved/updated successfully:", responses);
      alert(`${data.awards.length} award(s) processed successfully!`);
      setTimeout(() => window.location.reload(), 50);
      return responses
    } catch (error) {
      console.error("Error saving awards:", error);
      alert("unable to create awards")
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, index) => 1900 + index);

  const addNewAwardForm = () => {
    append({
      type: "",
      title: "",
      year: "",
      link: ""
    });
  };

  return (
    <div className="mb-3 parent p-2 p-md-3 awards">
      <h5 className="text-start">Awards</h5>
      {submitError && (
        <div className="alert alert-danger" role="alert">
          {submitError}
        </div>
      )}
      <Form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id} className="award-form mb-4 position-relative">
            {index > 0 && (
              <Button
                variant="link"
                className="position-absolute top-0 end-0 text-danger p-0"
                onClick={() => remove(index)}
                disabled={isSubmitting}
              >
                <FaTimes />
              </Button>
            )}
            {field._id && (
              <input type="hidden" {...register(`awards.${index}._id`)} value={field._id} />
            )}
            <Row className="justify-content-center align-items-center gy-3">
              <Col xs={12}>
                <Form.Group className="mb-2" controlId={`formTitle-${index}`}>
                  <Form.Label>Title</Form.Label>
                  <div className="border border-warning rounded">
                    <div className="d-md-none d-flex flex-column gap-2 p-2">
                      <div className="d-flex gap-2">
                        <Controller
                          name={`awards.${index}.type`}
                          control={control}
                          render={({ field }) => (
                            <>
                              <Form.Check
                                {...field}
                                type="checkbox"
                                label="Awards"
                                value="award"
                                id={`awardsRadio-${index}`}
                                className="form-check-inlinez"
                                disabled={isSubmitting}
                              />
                              <Form.Check
                                {...field}
                                type="checkbox"
                                label="Nominated"
                                value="nominated"
                                id={`nominatedRadio-${index}`}
                                className="form-check-inlinez"
                                disabled={isSubmitting}
                              />
                            </>
                          )}
                        />
                      </div>
                      <Controller
                        name={`awards.${index}.title`}
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            {...field}
                            type="text"
                            className="border-warning outline-none responsive-input shadow-none w-100"
                            placeholder="Organiser name and title of award"
                            isInvalid={!!errors.awards?.[index]?.title}
                            disabled={isSubmitting}
                          />
                        )}
                      />
                    </div>
                    
                    <div className="d-none d-md-flex gap-2 p-2 align-items-center">
                      <Controller
                        name={`awards.${index}.type`}
                        control={control}
                        render={({ field }) => (
                          <>
                            <Form.Check
                              {...field}
                              type="checkbox"
                              label="Awards"
                              value="award"
                              id={`awardsRadio-${index}`}
                              className="form-check-inlinez"
                              disabled={isSubmitting}
                            />
                            <Form.Check
                              {...field}
                              type="checkbox"
                              label="Nominated"
                              value="nominated"
                              id={`nominatedRadio-${index}`}
                              className="form-check-inlinez"
                              disabled={isSubmitting}
                            />
                          </>
                        )}
                      />
                      <Controller
                        name={`awards.${index}.title`}
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            {...field}
                            type="text"
                            className="border-warning outline-none responsive-input shadow-none flex-grow-1"
                            placeholder="Organiser name and title of award"
                            isInvalid={!!errors.awards?.[index]?.title}
                            disabled={isSubmitting}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <Form.Control.Feedback type="invalid">
                    {errors.awards?.[index]?.title?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3" controlId={`formDobYear-${index}`}>
                  <Form.Label>Year</Form.Label>
                  <Controller
                    name={`awards.${index}.year`}
                    control={control}
                    render={({ field }) => (
                      <Form.Select
                        {...field}
                        className="p-3 border-warning outline-none shadow-none"
                        isInvalid={!!errors.awards?.[index]?.year}
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
                    {errors.awards?.[index]?.year?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3" controlId={`formLink-${index}`}>
                  <Form.Label>Link (Optional)</Form.Label>
                  <Controller
                    name={`awards.${index}.link`}
                    control={control}
                    render={({ field }) => (
                      <Form.Control
                        {...field}
                        type="text"
                        placeholder="Paste Link"
                        className="p-3 border-warning outline-none shadow-none"
                        isInvalid={!!errors.awards?.[index]?.link}
                        disabled={isSubmitting}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.awards?.[index]?.link?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </div>
        ))}

        <div className="text-center d-flex mx-5 justify-content-center align-items-center">
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
          <Button
            type="button"
            className="btn btn-outline-warning bg-transparent rounded-pill px-3"
            onClick={addNewAwardForm}
            disabled={isSubmitting}
          >
            <FaPlus />
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default UserAwardsForm;


// import { useState } from 'react'; 
// import { useForm, Controller, useFieldArray } from "react-hook-form";
// import { Col, Row, Form, Button, Spinner } from "react-bootstrap"; // Added Spinner import
// import { FaPlus, FaTimes } from "react-icons/fa";
// import { AwardFormData } from "../../../../types";
// import { createAward } from "../../../../services/profile";

// function UserAwardsForm() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const {
//     handleSubmit,
//     control,
//     // reset,
//     formState: { errors },
//   } = useForm<{
//     awards: AwardFormData[];
//   }>({
//     defaultValues: {
//       awards: [{
//         type: "",
//         title: "",
//         year: "",
//         link: ""
//       }]
//     }
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "awards",
//   });

//   const onSubmit = async (data: { awards: AwardFormData[] }) => {
//     try {
//       setIsSubmitting(true);
//       const promises = data.awards.map(award => createAward(award));
//       const responses = await Promise.all(promises);
      
//       console.log("All awards saved successfully:", responses);
//       alert(`${data.awards.length} award(s) saved successfully!`);
//       setTimeout(() => window.location.reload(), 50);
//       // reset({
//       //   awards: [{
//       //     type: "",
//       //     title: "",
//       //     year: "",
//       //     link: ""
//       //   }]
//       // });
//     } catch (error) {
//       console.error("Error saving awards:", error);
//       alert("Failed to save some awards. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: currentYear - 1900 + 1 }, (_, index) => 1900 + index);

//   const addNewAwardForm = () => {
//     append({
//       type: "",
//       title: "",
//       year: "",
//       link: ""
//     });
//   };

//   return (
//     <div className="mb-3 parent p-2 p-md-3 awards">
//       <h5 className="text-start">Awards</h5>
//       <Form onSubmit={handleSubmit(onSubmit)}>
//         {fields.map((field, index) => (
//           <div key={field.id} className="award-form mb-4 position-relative">
//             {index > 0 && (
//               <Button
//                 variant="link"
//                 className="position-absolute top-0 end-0 text-danger p-0"
//                 onClick={() => remove(index)}
//                 disabled={isSubmitting} // Disable during submission
//               >
//                 <FaTimes />
//               </Button>
//             )}
//             <Row className="justify-content-center align-items-center gy-3">
//               <Col xs={12}>
//                 <Form.Group className="mb-2" controlId={`formTitle-${index}`}>
//                   <Form.Label>Title</Form.Label>
//                   <div className="border border-warning rounded">
//                     {/* Mobile view - checkboxes above input */}
//                     <div className="d-md-none d-flex flex-column gap-2 p-2">
//                       <div className="d-flex gap-2">
//                         <Controller
//                           name={`awards.${index}.type`}
//                           control={control}
//                           // rules={{ required: "Type is required" }}
//                           render={({ field }) => (
//                             <>
//                               <Form.Check
//                                 {...field}
//                                 type="checkbox"
//                                 label="Awards"
//                                 value="award"
//                                 id={`awardsRadio-${index}`}
//                                 className="form-check-inlinez"
//                                 disabled={isSubmitting} // Disable during submission
//                               />
//                               <Form.Check
//                                 {...field}
//                                 type="checkbox"
//                                 label="Nominated"
//                                 value="nominated"
//                                 id={`nominatedRadio-${index}`}
//                                 className="form-check-inlinez"
//                                 disabled={isSubmitting} // Disable during submission
//                               />
//                             </>
//                           )}
//                         />
//                       </div>
//                       <Controller
//                         name={`awards.${index}.title`}
//                         control={control}
//                         // rules={{ required: "Title is required" }}
//                         render={({ field }) => (
//                           <Form.Control
//                             {...field}
//                             type="text"
//                             className="border-warning outline-none responsive-input shadow-none w-100"
//                             placeholder="Enter title"
//                             isInvalid={!!errors.awards?.[index]?.title}
//                             disabled={isSubmitting} // Disable during submission
//                           />
//                         )}
//                       />
//                     </div>
                    
//                     {/* Desktop view - inline layout */}
//                     <div className="d-none d-md-flex gap-2 p-2 align-items-center">
//                       <Controller
//                         name={`awards.${index}.type`}
//                         control={control}
//                         // rules={{ required: "Type is required" }}
//                         render={({ field }) => (
//                           <>
//                             <Form.Check
//                               {...field}
//                               type="checkbox"
//                               label="Awards"
//                               value="award"
//                               id={`awardsRadio-${index}`}
//                               className="form-check-inlinez"
//                               disabled={isSubmitting} // Disable during submission
//                             />
//                             <Form.Check
//                               {...field}
//                               type="checkbox"
//                               label="Nominated"
//                               value="nominated"
//                               id={`nominatedRadio-${index}`}
//                               className="form-check-inlinez"
//                               disabled={isSubmitting} // Disable during submission
//                             />
//                           </>
//                         )}
//                       />
//                       <Controller
//                         name={`awards.${index}.title`}
//                         control={control}
//                         // rules={{ required: "Title is required" }}
//                         render={({ field }) => (
//                           <Form.Control
//                             {...field}
//                             type="text"
//                             className="border-warning outline-none responsive-input shadow-none flex-grow-1"
//                             placeholder="Enter title"
//                             isInvalid={!!errors.awards?.[index]?.title}
//                             disabled={isSubmitting} // Disable during submission
//                           />
//                         )}
//                       />
//                     </div>
//                   </div>
//                   <Form.Control.Feedback type="invalid">
//                     {errors.awards?.[index]?.title?.message}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col xs={12} md={6}>
//                 <Form.Group className="mb-3" controlId={`formDobYear-${index}`}>
//                   <Form.Label>Year</Form.Label>
//                   <Controller
//                     name={`awards.${index}.year`}
//                     control={control}
//                     // rules={{ required: "Year is required" }}
//                     render={({ field }) => (
//                       <Form.Select
//                         {...field}
//                         className="p-3 border-warning outline-none shadow-none"
//                         isInvalid={!!errors.awards?.[index]?.year}
//                         disabled={isSubmitting} // Disable during submission
//                       >
//                         <option value="">Select Year</option>
//                         {years.map((year) => (
//                           <option key={year} value={year}>
//                             {year}
//                           </option>
//                         ))}
//                       </Form.Select>
//                     )}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.awards?.[index]?.year?.message}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col xs={12} md={6}>
//                 <Form.Group className="mb-3" controlId={`formLink-${index}`}>
//                   <Form.Label>Link (Optional)</Form.Label>
//                   <Controller
//                     name={`awards.${index}.link`}
//                     control={control}
//                     // rules={{ required: "Link is required" }}
//                     render={({ field }) => (
//                       <Form.Control
//                         {...field}
//                         type="text"
//                         placeholder="Paste Link"
//                         className="p-3 border-warning outline-none shadow-none"
//                         isInvalid={!!errors.awards?.[index]?.link}
//                         disabled={isSubmitting} // Disable during submission
//                       />
//                     )}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.awards?.[index]?.link?.message}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>
//           </div>
//         ))}

//         <div className="text-center d-flex mx-5 justify-content-center align-items-center">
//           <Button 
//             type="submit" 
//             className="btn btn-warning rounded-pill px-5"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? (
//               <>
//                 <Spinner
//                   as="span"
//                   animation="border"
//                   size="sm"
//                   role="status"
//                   aria-hidden="true"
//                   className="me-2"
//                 />
//                 Saving...
//               </>
//             ) : (
//               "Save"
//             )}
//           </Button>
//           <Button
//             type="button"
//             className="btn btn-outline-warning bg-transparent rounded-pill px-3"
//             onClick={addNewAwardForm}
//             disabled={isSubmitting}
//           >
//             <FaPlus />
//           </Button>
//         </div>
//       </Form>
//     </div>
//   );
// }

// export default UserAwardsForm;


