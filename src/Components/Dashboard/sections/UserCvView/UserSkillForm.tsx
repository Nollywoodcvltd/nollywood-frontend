
import { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Form, Button, Spinner } from "react-bootstrap";
import { SkillFormData } from "../../../../types";
import { createSkill } from "../../../../services/profile";
import { useDashboard } from "../../../../hooks/useDashboard";
import { useParams } from 'react-router-dom';

function UserSkillForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const { data: dashboardData, isLoading, error } = useDashboard(id);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SkillFormData>({
    defaultValues: {
      skills: dashboardData?.skills?.[0]?.skills || ""
    }
  });

  useEffect(() => {
    if (dashboardData?.skills?.[0]?.skills) {
      reset({
        skills: dashboardData.skills[0].skills
      });
    }
  }, [dashboardData, reset]);

  const onSubmit = async (data: SkillFormData) => {
    try {
      setIsSubmitting(true);
      const response = await createSkill(data);
      // console.log("Skills saved successfully:", response);
      alert("Skills saved successfully!");
      setTimeout(() => window.location.reload(), 50);
      return response.data
    } catch (error) {
      console.error("Error saving skills:", error);
      alert("Failed to save skills. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <p>Loading skills...</p>;
  if (error) return <p>Error loading skills</p>;

  return (
    <div className="mb-3 parent p-3 skill">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formSkills">
          <Form.Label>Skills</Form.Label>
          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <Form.Control
                {...field}
                as="textarea"
                rows={4}
                placeholder="Write here"
                className="p-3 border-warning outline-none shadow-none"
                isInvalid={!!errors.skills}
                disabled={isSubmitting}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.skills?.message}
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

export default UserSkillForm;



















// import { useState } from 'react';
// import { useForm, Controller } from "react-hook-form";
// import { Form, Button, Spinner } from "react-bootstrap";
// import { SkillFormData } from "../../../../types";
// import { createSkill } from "../../../../services/profile";

// function UserSkillForm() {
//   const [isSubmitting, setIsSubmitting] = useState(false); // Added loading state
//   const {
//     handleSubmit,
//     control,
//     // reset,
//     formState: { errors },
//   } = useForm<SkillFormData>();

//   const onSubmit = async (data: SkillFormData) => {
//     try {
//       setIsSubmitting(true); // Start loading
//       const response = await createSkill(data);
//       console.log("Skills saved successfully:", response.data);
//       alert("Skills saved successfully!");
//       // reset();
//     } catch (error) {
//       console.error("Error saving skills:", error);
//       alert("Failed to save skills. Please try again.");
//     } finally {
//       setIsSubmitting(false); // Stop loading
//     }
//   };

//   return (
//     <div className="mb-3 parent p-3 skill">
//       <Form onSubmit={handleSubmit(onSubmit)}>
//         <Form.Group className="mb-3" controlId="formSkills">
//           <Form.Label>Skills</Form.Label>
//           <Controller
//             name="skills"
//             control={control}
//             defaultValue=""
//             // rules={{ required: "Skills are required" }}
//             render={({ field }) => (
//               <Form.Control
//                 {...field}
//                 as="textarea"
//                 rows={4}
//                 placeholder="Write here"
//                 className="p-3 border-warning outline-none shadow-none"
//                 isInvalid={!!errors.skills}
//                 disabled={isSubmitting} // Disable during submission
//               />
//             )}
//           />
//           <Form.Control.Feedback type="invalid">
//             {errors.skills?.message}
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

// export default UserSkillForm;

