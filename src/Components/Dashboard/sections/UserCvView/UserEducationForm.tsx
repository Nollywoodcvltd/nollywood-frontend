// components/UserEducationForm.tsx
import { useState } from 'react';
// import { useForm, Controller } from "react-hook-form";
import { Form, Button, Spinner } from "react-bootstrap";
import { EducationFormData } from "../../../../types";
import { createEducation } from "../../../../services/profile";
// import { useState } from 'react';
import { useForm, Controller, useFieldArray } from "react-hook-form";
// import { Form, Button, Spinner } from "react-bootstrap";
import { FaPlus, FaTimes } from "react-icons/fa";
// import { EducationFormData } from "../../types";
// import { createEducation } from "../../services/profile";
import { useParams } from "react-router-dom";
import { useDashboard } from "../../../../hooks/useDashboard";
import { EducationItem } from "../../sections/DashboardView/DashboardProfile";

function UserEducationForm() {
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
    educations: (EducationFormData & { _id?: string })[];
  }>({
    defaultValues: {
      educations: dashboardData?.education?.length 
        ? dashboardData.education.map((edu: EducationItem) => ({
            _id: edu._id,
            institution: edu.institution || "",
            department: edu.department || "",
            degree: edu.degree || "",
            yearGraduated: edu.yearGraduated || ""
          }))
        : [{
            institution: "",
            department: "",
            degree: "",
            yearGraduated: ""
          }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "educations"
  });

  const onSubmit = async (data: { educations: (EducationFormData & { _id?: string })[] }) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      const responses = await Promise.all(
        data.educations.map(edu => createEducation(edu))
      );
      
      // console.log("Education records saved/updated successfully:", responses);
      alert(`${data.educations.length} education record(s) processed successfully!`);
      setTimeout(() => window.location.reload(), 50);
      return responses
    } catch (error) {
      console.error("Error saving education records:", error);
      
      let errorMessage = "Failed to save education records. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setSubmitError(errorMessage);
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addNewEducationForm = () => {
    append({
      institution: "",
      department: "",
      degree: "",
      yearGraduated: ""
    });
  };

  return (
    <div className="mb-3 parent p-3 education">
      <h6>Education</h6>
      {submitError && (
        <div className="alert alert-danger" role="alert">
          {submitError}
        </div>
      )}
      <div className="p-1 p-md-4 border border-warning rounded">
        <Form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <div key={field.id} className="mb-4 position-relative">
              {fields.length > 1 && (
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
                <input type="hidden" {...register(`educations.${index}._id`)} value={field._id} />
              )}
              
              {/* Institution Field */}
              <div className="mb-3 d-flex align-items-center flex-nowrap" style={{ gap: '10px' }}>
                <Form.Label className="nuella2 text-nowrap" style={{ width: '120px', flexShrink: 0 }}>
                  Institution:
                </Form.Label>
                <div style={{ flex: 1, minWidth: '120px' }}>
                  <Controller
                    name={`educations.${index}.institution`}
                    control={control}
                    // rules={{ required: "Institution is required" }}
                    render={({ field }) => (
                      <Form.Control 
                        {...field}
                        type="text" 
                        placeholder="Name of Institution" 
                        className='border-0 border-bottom outline-none shadow-none border-warning rounded-0 p-1 w-100'
                        isInvalid={!!errors.educations?.[index]?.institution}
                        disabled={isSubmitting}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {errors.educations?.[index]?.institution?.message}
                  </Form.Control.Feedback>
                </div>
              </div>
              
              {/* Department Field */}
              <div className="mb-3 d-flex align-items-center flex-nowrap" style={{ gap: '10px' }}>
                <Form.Label className="nuella2 text-nowrap" style={{ width: '120px', flexShrink: 0 }}>
                  Department:
                </Form.Label>
                <div style={{ flex: 1, minWidth: '120px' }}>
                  <Controller
                    name={`educations.${index}.department`}
                    control={control}
                    // rules={{ required: "Department is required" }}
                    render={({ field }) => (
                      <Form.Control 
                        {...field}
                        type="text" 
                        placeholder="Department" 
                        className='border-0 border-bottom outline-none shadow-none border-warning rounded-0 p-1 w-100'
                        isInvalid={!!errors.educations?.[index]?.department}
                        disabled={isSubmitting}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {errors.educations?.[index]?.department?.message}
                  </Form.Control.Feedback>
                </div>
              </div>
              
              {/* Degree Field */}
              <div className="mb-3 d-flex align-items-center flex-nowrap" style={{ gap: '10px' }}>
                <Form.Label className="nuella2 text-nowrap" style={{ width: '120px', flexShrink: 0 }}>
                  Degree:
                </Form.Label>
                <div style={{ flex: 1, minWidth: '120px' }}>
                  <Controller
                    name={`educations.${index}.degree`}
                    control={control}
                    // rules={{ required: "Degree is required" }}
                    render={({ field }) => (
                      <Form.Control 
                        {...field}
                        type="text" 
                        placeholder="Degree" 
                        className='border-0 border-bottom outline-none shadow-none border-warning rounded-0 p-1 w-100'
                        isInvalid={!!errors.educations?.[index]?.degree}
                        disabled={isSubmitting}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {errors.educations?.[index]?.degree?.message}
                  </Form.Control.Feedback>
                </div>
              </div>
              
              {/* Year Graduated Field */}
              <div className="mb-3 d-flex align-items-center flex-nowrap" style={{ gap: '10px' }}>
                <Form.Label className="nuella2 text-nowrap" style={{ width: '120px', flexShrink: 0 }}>
                  Year Graduated:
                </Form.Label>
                <div style={{ flex: 1, minWidth: '120px' }}>
                  <Controller
                    name={`educations.${index}.yearGraduated`}
                    control={control}
                    // rules={{ required: "Year graduated is required" }}
                    render={({ field }) => (
                      <Form.Control 
                        {...field}
                        type="text" 
                        placeholder="Year graduated" 
                        className='border-0 border-bottom outline-none shadow-none border-warning rounded-0 p-1 w-100'
                        isInvalid={!!errors.educations?.[index]?.yearGraduated}
                        disabled={isSubmitting}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {errors.educations?.[index]?.yearGraduated?.message}
                  </Form.Control.Feedback>
                </div>
              </div>
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
              onClick={addNewEducationForm}
              disabled={isSubmitting}
            >
              <FaPlus />
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default UserEducationForm;


// import { useState } from 'react';
// import { useForm, Controller } from "react-hook-form";
// import { Form, Button, Spinner } from "react-bootstrap";
// import { EducationFormData } from "../../../../types";
// import { createEducation } from "../../../../services/profile";
// import { FaPlus, FaTimes } from "react-icons/fa";

// function UserEducationForm() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const {
//     handleSubmit,
//     control,
//     // reset,
//   } = useForm<EducationFormData>();

//   const onSubmit = async (data: EducationFormData) => {
//     try {
//       setIsSubmitting(true);
//       const response = await createEducation(data);
//       console.log("Education saved successfully:", response.data);
//       alert("Education saved successfully!");
//       setTimeout(() => window.location.reload(), 50);
//       // reset();
//     } catch (error) {
//       console.error("Error saving education:", error);
//       alert("Failed to save education. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="mb-3 parent p-3 education">
//       <h6>Education (Optional)</h6>
//       <div className="p-1 p-md-4 border border-warning rounded">
//         <Form onSubmit={handleSubmit(onSubmit)}>
//           {/* Institution Field */}
//           <div className="mb-3 d-flex align-items-center flex-nowrap" style={{ gap: '10px' }}>
//             <Form.Label className="nuella2 text-nowrap" style={{ width: '120px', flexShrink: 0 }}>
//               Name of Institution:
//             </Form.Label>
//             <div style={{ flex: 1, minWidth: '120px' }}>
//               <Controller
//                 name="institution"
//                 control={control}
//                 render={({ field }) => (
//                   <Form.Control 
//                     {...field}
//                     type="text" 
//                     placeholder="Name of Institution" 
//                     className='border-0 border-bottom outline-none shadow-none border-warning rounded-0 p-1 w-100' 
//                   />
//                 )}
//               />
//             </div>
//           </div>
          
//           {/* Department Field */}
//           <div className="mb-3 d-flex align-items-center flex-nowrap" style={{ gap: '10px' }}>
//             <Form.Label className="nuella2 text-nowrap" style={{ width: '120px', flexShrink: 0 }}>
//               Department:
//             </Form.Label>
//             <div style={{ flex: 1, minWidth: '120px' }}>
//               <Controller
//                 name="department"
//                 control={control}
//                 render={({ field }) => (
//                   <Form.Control 
//                     {...field}
//                     type="text" 
//                     placeholder="Department" 
//                     className='border-0 border-bottom outline-none shadow-none border-warning rounded-0 p-1 w-100'  
//                   />
//                 )}
//               />
//             </div>
//           </div>
          
//           {/* Degree Field */}
//           <div className="mb-3 d-flex align-items-center flex-nowrap" style={{ gap: '10px' }}>
//             <Form.Label className="nuella2 text-nowrap" style={{ width: '120px', flexShrink: 0 }}>
//               Degree:
//             </Form.Label>
//             <div style={{ flex: 1, minWidth: '120px' }}>
//               <Controller
//                 name="degree"
//                 control={control}
//                 render={({ field }) => (
//                   <Form.Control 
//                     {...field}
//                     type="text" 
//                     placeholder="Degree" 
//                     className='border-0 border-bottom outline-none shadow-none border-warning rounded-0 p-1 w-100' 
//                   />
//                 )}
//               />
//             </div>
//           </div>
          
//           {/* Year Graduated Field */}
//           <div className="mb-3 d-flex align-items-center flex-nowrap" style={{ gap: '10px' }}>
//             <Form.Label className="nuella2 text-nowrap" style={{ width: '120px', flexShrink: 0 }}>
//               Year Graduated:
//             </Form.Label>
//             <div style={{ flex: 1, minWidth: '120px' }}>
//               <Controller
//                 name="yearGraduated"
//                 control={control}
//                 render={({ field }) => (
//                   <Form.Control 
//                     {...field}
//                     type="text" 
//                     placeholder="Year graduated" 
//                     className='border-0 border-bottom outline-none shadow-none border-warning rounded-0 p-1 w-100' 
//                   />
//                 )}
//               />
//             </div>
//           </div>

//           <div className="text-center d-flex mx-5 justify-content-center align-items-center">
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
//                     <Button
//                       type="button"
//                       className="btn btn-outline-warning bg-transparent rounded-pill px-3"
//                       // onClick={""}
//                       disabled={isSubmitting}
//                     >
//                       <FaPlus />
//                     </Button>
//                   </div>

//           {/* <div className="text-center mt-4">
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
//           </div> */}
//         </Form>
//       </div>
//     </div>
//   );
// }

// export default UserEducationForm;














// import { useState } from 'react';
// import { useForm, Controller } from "react-hook-form";
// import { Form, Button, Spinner } from "react-bootstrap"; // Added Spinner import
// import { EducationFormData } from "../../../../types";
// import { createEducation } from "../../../../services/profile";

// function UserEducationForm() {
//   const [isSubmitting, setIsSubmitting] = useState(false); // Added loading state
//   const {
//     handleSubmit,
//     control,
//     reset,
//     formState: { errors },
//   } = useForm<EducationFormData>();

//   const onSubmit = async (data: EducationFormData) => {
//     try {
//       setIsSubmitting(true); // Start loading
//       const response = await createEducation(data);
//       console.log("Education saved successfully:", response.data);
//       alert("Education saved successfully!");
//       reset();
//     } catch (error) {
//       console.error("Error saving education:", error);
//       alert("Failed to save education. Please try again.");
//     } finally {
//       setIsSubmitting(false); // Stop loading
//     }
//   };

//   return (
//     <div className="mb-3 parent p-3 education">
//       <Form onSubmit={handleSubmit(onSubmit)}>
//         <Form.Group className="mb-3" controlId="formEducation">
//           <Form.Label>Education (Optional)</Form.Label>
//           <Controller
//             name="education"
//             control={control}
//             defaultValue=""
//             render={({ field }) => (
//               <Form.Control
//                 {...field}
//                 as="textarea"
//                 rows={4}
//                 placeholder="Write here"
//                 className="p-3 border-warning outline-none shadow-none"
//                 isInvalid={!!errors.education}
//                 disabled={isSubmitting} // Disable during submission
//               />
//             )}
//           />
//           <Form.Control.Feedback type="invalid">
//             {errors.education?.message}
//           </Form.Control.Feedback>
//         </Form.Group>
//         <div className="text-center">
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
//               'Save'
//             )}
//           </Button>
//         </div>
//       </Form>
//     </div>
//   );
// }

// export default UserEducationForm;
