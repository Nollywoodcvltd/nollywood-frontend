


import { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Form, Button, Spinner } from "react-bootstrap";
import { ProfessionalSummaryFormData } from "../../../../types";
import { createProfession } from "../../../../services/profile";
import { useDashboard } from "../../../../hooks/useDashboard";
import { useParams } from 'react-router-dom';

function UserProfessionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const { data: dashboardData, isLoading, error } = useDashboard(id);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProfessionalSummaryFormData>({
    defaultValues: {
      summary: dashboardData?.professions?.[0]?.summary || ""
    }
  });

  // Reset form when dashboardData changes
  useEffect(() => {
    if (dashboardData?.professions?.[0]?.summary) {
      reset({
        summary: dashboardData.professions[0].summary
      });
    }
  }, [dashboardData, reset]);

  const onSubmit = async (data: ProfessionalSummaryFormData) => {
    try {
      setIsSubmitting(true);
      const response = await createProfession(data);
      // console.log("Professional summary saved successfully:", response.data);
      alert("Professional summary saved successfully!");
      setTimeout(() => window.location.reload(), 50);
      return response.data
    } catch (error) {
      console.error("Error saving professional summary:", error);
      alert("Failed to save professional summary. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <p>Loading professional summary...</p>;
  if (error) return <p>Error loading professional summary</p>;

  return (
    <div className="mb-3 parent p-3 profession">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formSummary">
          <Form.Label>Professional Summary</Form.Label>
          <Controller
            name="summary"
            control={control}
            rules={{ required: "Professional summary is required" }}
            render={({ field }) => (
              <Form.Control
                {...field}
                as="textarea"
                rows={4}
                placeholder="Write here"
                className="p-3 border-warning outline-none shadow-none"
                isInvalid={!!errors.summary}
                disabled={isSubmitting}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.summary?.message}
          </Form.Control.Feedback>
        </Form.Group>
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
              'Save'
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default UserProfessionForm;













// import { useState } from 'react';
// import { useForm, Controller } from "react-hook-form";
// import { Form, Button, Spinner } from "react-bootstrap";
// import { ProfessionalSummaryFormData } from "../../../../types"
// import { createProfession } from "../../../../services/profile";

// function UserProfessionForm() {
//   const [isSubmitting, setIsSubmitting] = useState(false); // Added loading state
//   const {
//     handleSubmit,
//     control,
//     // reset,
//     formState: { errors },
//   } = useForm<ProfessionalSummaryFormData>();

//   const onSubmit = async (data: ProfessionalSummaryFormData) => {
//     try {
//       setIsSubmitting(true); // Start loading
//       const response = await createProfession(data);
//       console.log("Professional summary saved successfully:", response.data);
//       alert("Professional summary saved successfully!");
//       // reset();
//     } catch (error) {
//       console.error("Error saving professional summary:", error);
//       alert("Failed to save professional summary. Please try again.");
//     } finally {
//       setIsSubmitting(false); // Stop loading
//     }
//   };

//   return (
//     <div className="mb-3 parent p-3 profession">
//       <Form onSubmit={handleSubmit(onSubmit)}>
//         <Form.Group className="mb-3" controlId="formSummary">
//           <Form.Label>Professional Summary</Form.Label>
//           <Controller
//             name="summary"
//             control={control}
//             defaultValue=""
//             // rules={{ required: "Professional summary is required" }}
//             render={({ field }) => (
//               <Form.Control
//                 {...field}
//                 as="textarea"
//                 rows={4}
//                 placeholder="Write here"
//                 className="p-3 border-warning outline-none shadow-none"
//                 isInvalid={!!errors.summary}
//                 disabled={isSubmitting} // Disable during submission
//               />
//             )}
//           />
//           <Form.Control.Feedback type="invalid">
//             {errors.summary?.message}
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

// export default UserProfessionForm;