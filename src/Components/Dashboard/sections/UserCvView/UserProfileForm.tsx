import './UserCvView.scss';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Col, Container, Row, Form, Button, Spinner } from 'react-bootstrap';
import UserImage from './UserImage';
import { ProfileFormData } from '../../../../types';
import { createProfile } from '../../../../services/profile';
import { useDashboard } from '../../../../hooks/useDashboard';
import { useParams } from 'react-router-dom';

export const roles = {
  Cast: [
    { label: 'Actor', value: 'Actor' },
    { label: 'Actress', value: 'Actress' },
    // { label: 'Lead Actress', value: 'Lead Actress' },
  ],
  Crew: [
    { label: 'Accounting Manager', value: 'Accounting Manager' },
    { label: 'Animator', value: 'Animator' },
    { label: 'Archivist', value: 'Archivist' },
    { label: 'Art Department Coordinator', value: 'Art Department Coordinator' },
    { label: 'Art Director', value: 'Art Director' },
    { label: 'Assistant Art Director', value: 'Assistant Art Director' },
    {
      label: 'Assistant Camera',
      value: 'Assistant Camera',
    },
    {
      label: 'Assistant Director (AD)',
      value: 'Assistant Director (AD)',
    },
    { label: 'Assistant Editor', value: 'Assistant Editor' },
    { label: 'Assistant Location Manager', value: 'Assistant Location Manager' },
    { label: 'Assistant Producer', value: 'Assistant Producer' },
    { label: 'Associate Producer', value: 'Associate Producer' },
    { label: 'Behind-the-Scene Content Creator', value: 'Behind-the-Scene Content Creator' },
    { label: 'Best Boy Electric', value: 'Best Boy Electric' },
    { label: 'Best Boy Grip', value: 'Best Boy Grip' },
    { label: 'Boom Operator', value: 'Boom Operator' },
    {
      label: 'Camera Assistant',
      value: 'Camera Assistant',
    },
    { label: 'Camera Operator', value: 'Camera Operator' },
    {
      label: 'Camera Technician',
      value: 'Camera Technician',
    },
    {
      label: 'Casting Associate',
      value: 'Casting Associate',
    },
    { label: 'Casting Director', value: 'Casting Director' },
    { label: 'Catering Manager', value: 'Catering Manager' },
    { label: 'Character Actor', value: 'Character Actor' },
    { label: 'Cinematographer', value: 'Cinematographer' },
    { label: 'Clapper Loader', value: 'Clapper Loader' },
    {
      label: 'Colorist',
      value: 'Colorist',
    },
    { label: 'Composer', value: 'Composer' },
    { label: 'Construction Coordinator', value: 'Construction Coordinator' },
    { label: 'Costume Designer', value: 'Costume Designer' },
    { label: 'Prop Master', value: 'Prop Master' },
    { label: 'Construction Coordinator', value: 'Construction Coordinator' },
    { label: 'Costume Designer', value: 'Costume Designer' },
    { label: 'Costume Supervisor', value: 'Costume Supervisor' },
    { label: 'Craft Services', value: 'Craft Services' },
    { label: 'Data Manager', value: 'Data Manager' },
    { label: 'Digital Compositor', value: 'Digital Compositor' },
    { label: 'Digital Visual Effects Artist', value: 'Digital Visual Effects Artist' },
    {
      label: 'Director',
      value: 'Director',
    },
    { label: 'Director of Photography (DP)', value: 'Director of Photography (DP)' },
    {
      label: 'Distribution Coordinator',
      value: 'Distribution Coordinator',
    },
    { label: 'Driver', value: 'Driver' },
    { label: 'Dubbing Artist', value: 'Dubbing Artist' },
    { label: 'Editor', value: 'Editor' },
    { label: 'Electrician', value: 'Electrician' },
    { label: 'Executive in Charge of Production', value: 'Executive in Charge of Production' },
    { label: 'Executive Producer', value: 'Executive Producer' },
    { label: 'Extra', value: 'Extra' },
    { label: 'Film Loader', value: 'Film Loader' },
    { label: 'Focus Puller', value: 'Focus Puller' },
    {
      label: 'Foley Artist',
      value: 'Foley Artist',
    },
    { label: 'Gaffer', value: 'Gaffer' },
    { label: 'Grip', value: 'Grip' },
    { label: 'Hair Department Head', value: 'Hair Department Head' },
    { label: 'Hair Stylist', value: 'Hair Stylist' },
    { label: 'Key Grip', value: 'Key Grip' },
    { label: 'Key PA', value: 'Key PA' },
    { label: 'Lead Actor', value: 'Lead Actor' },
    { label: 'Lead Actress', value: 'Lead Actress' },
    {
      label: 'Lighting Technician',
      value: 'Lighting Technician',
    },
    { label: 'Line Producer', value: 'Line Producer' },
    {
      label: 'Location Accountant',
      value: 'Location Accountant',
    },
    { label: 'Location Coordinator', value: 'Location Coordinator' },
    { label: 'Location Manager', value: 'Location Manager' },
    { label: 'Location Scout', value: 'Location Scout' },
    { label: 'Makeup Artist', value: 'Makeup Artist' },
    { label: 'Makeup Assistant', value: 'Makeup Assistant' },
    { label: 'Marketing Coordinator', value: 'Marketing Coordinator' },
    { label: 'Media Supervisor', value: 'Media Supervisor' },
    { label: 'Medic', value: 'Medic' },
    { label: 'Negative Cutter', value: 'Negative Cutter' },
    { label: 'PA (Production Assistant)', value: 'PA (Production Assistant)' },
    { label: 'Photographer', value: 'Photographer' },
    { label: 'Post-Production Coordinator', value: 'Post-Production Coordinator' },
    { label: 'Post-Production Supervisor', value: 'Post-Production Supervisor' },
    { label: 'Pre-Production Coordinator', value: 'Pre-Production Coordinator' },
    { label: 'Producer', value: 'Producer' },
    { label: 'Production Accountant', value: 'Production Accountant' },
    { label: 'Production Artist', value: 'Production Artist' },
    { label: 'Production Assistant (PA)', value: 'Production Assistant (PA)' },
    { label: 'Production Coordinator', value: 'Production Coordinator' },
    { label: 'Production Designer', value: 'Production Designer' },
    { label: 'Production Manager', value: 'Production Manager' },
    { label: 'Production Sound Mixer', value: 'Production Sound Mixer' },
    { label: 'Props and Set Designer', value: 'Props and Set Designer' },
    { label: 'Publicist', value: 'Publicist' },
    { label: 'Pyrotechnician', value: 'Pyrotechnician' },
    { label: 'Safety Officer', value: 'Safety Officer' },
    { label: 'Screenwriter', value: 'Screenwriter' },
    { label: 'Script Analyst', value: 'Script Analyst' },
    { label: 'Script Consultant', value: 'Script Consultant' },
    { label: 'Script Coordinator', value: 'Script Coordinator' },
    { label: 'Script Editor', value: 'Script Editor' },
    { label: 'Script Supervisor', value: 'Script Supervisor' },
    { label: 'Script Writer', value: 'Script Writer' },
    { label: 'Set Medic', value: 'Set Medic' },
    { label: 'Sound Designer', value: 'Sound Designer' },
    { label: 'Sound Editor', value: 'Sound Editor' },
    { label: 'Sound Engineer', value: 'Sound Engineer' },
    { label: 'Sound Mixer', value: 'Sound Mixer' },
    { label: 'Sound Recordist', value: 'Sound Recordist' },
    { label: 'Special Effects Coordinator', value: 'Special Effects Coordinator' },
    { label: 'Special Effects Supervisor', value: 'Special Effects Supervisor' },
    { label: 'Special Effects Technician', value: 'Special Effects Technician' },
    { label: 'Stand-in', value: 'Stand-in' },
    { label: 'Storyboard Artist', value: 'Storyboard Artist' },
    { label: 'Story Editor', value: 'Story Editor' },
    { label: 'Stunt Coordinator', value: 'Stunt Coordinator' },
    { label: 'Stunt Double', value: 'Stunt Double' },
    { label: 'Stunt Performer', value: 'Stunt Performer' },
    { label: 'Supporting Actor', value: 'Supporting Actor' },
    { label: 'Supporting Actress', value: 'Supporting Actress' },
    { label: 'Transportation Coordinator', value: 'Transportation Coordinator' },
    { label: 'Understudy', value: 'Understudy' },
    { label: 'Unit Manager', value: 'Unit Manager' },
    { label: 'Unit Production Manager', value: 'Unit Production Manager' },
    { label: 'Utility Sound Technician (UST)', value: 'Utility Sound Technician (UST)' },
    { label: 'Visual Effects Artist', value: 'Visual Effects Artist' },
    { label: 'Visual Effects Supervisor', value: 'Visual Effects Supervisor' },
    { label: 'Voice Actor', value: 'Voice Actor' },
    { label: 'Voice Actress', value: 'Voice Actress' },
    { label: 'Voiceover Artist', value: 'Voiceover Artist' },
    { label: 'Wardrobe Assistant', value: 'Wardrobe Assistant' },
    { label: 'Wardrobe Supervisor', value: 'Wardrobe Supervisor' },
    { label: 'Welfare Manager', value: 'Welfare Manager' },
  ],
};

export const states = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'FCT',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
];

export const countries = [
  'Nigeria',
  'Ghana',
  'South Africa',
  'Kenya',
  'United States',
  'United Kingdom',
  'Canada',
  'Germany',
  'France',
  'China',
  'India',
  'Brazil',
  'Australia',
  'Japan',
  'Russia',
];

const languages = ['English', 'Igbo', 'Yoruba', 'Hausa'];

const heightOptions = [
  {
    label: 'Under 5\'2" (under 157 cm) - Petite',
    value: 'Under 5\'2" (under 157 cm) - Petite',
  },
  {
    label: '5\'2" to 5\'5" (157 cm to 165 cm) - Short',
    value: '5\'2" to 5\'5" (157 cm to 165 cm) - Short',
  },
  {
    label: '5\'5" to 5\'8" (165 cm to 172 cm) - Average',
    value: '5\'5" to 5\'8" (165 cm to 172 cm) - Average',
  },
  {
    label: '5\'8" to 6\'0" (172 cm to 183 cm) - Tall',
    value: '5\'8" to 6\'0" (172 cm to 183 cm) - Tall',
  },
  {
    label: '6\'0" and above (183 cm and above) - Very Tall',
    value: '6\'0" and above (183 cm and above) - Very Tall',
  },
];

function UserProfileForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const { data: dashboardData, isLoading, error } = useDashboard(id);
  // console.log(dashboardData);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      phone: dashboardData?.profile?.phone || '',
      email: dashboardData?.profile?.email || '',
      stateOfOrigin: dashboardData?.profile?.stateOfOrigin || '',
      country: dashboardData?.profile?.country || '',
      languages: dashboardData?.profile?.languages || [],
      otherLanguage: dashboardData?.profile?.otherLanguage || '',
      height: dashboardData?.profile?.height || '',
      complexion: dashboardData?.profile?.complexion || '',
    },
  });

  // Reset form when dashboardData changes
  useEffect(() => {
    if (dashboardData) {
      reset({
        phone: dashboardData.profile?.phone || '',
        email: dashboardData.profile?.email || '',
        stateOfOrigin: dashboardData.profile?.stateOfOrigin || '',
        country: dashboardData.profile?.country || '',
        languages: dashboardData.profile?.languages || [],
        otherLanguage: dashboardData.profile?.otherLanguage || '',
        height: dashboardData.profile?.height || '',
        complexion: dashboardData.profile?.complexion || '',
      });
    }
  }, [dashboardData, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsSubmitting(true);
      const response = await createProfile(data);
      // console.log("Profile created/updated successfully:", response);
      alert("Profile saved successfully!");
      setTimeout(() => window.location.reload(), 50);
      return response.data
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Unable to save profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <p>Loading dashboard...</p>;
  if (error) return <p>Error loading dashboard</p>;

  return (
    <div className='mt-4 mb-3 p-3 parent'>
      <h5 className='text-start'>User Profile</h5>

      <div className='d-none d-md-block'>
        <UserImage />
      </div>
      <Container>
        <Row className='justify-content-center align-items-center gy-3'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group className='mb-3' controlId='formPhone'>
                  <Form.Label>Phone</Form.Label>
                  <Controller
                    name='phone'
                    control={control}
                    // rules={{ required: "Phone is required" }}
                    render={({ field }) => (
                      <Form.Control
                        {...field}
                        type='text'
                        placeholder='Enter phone number'
                        className='p-3 border-warning outline-none shadow-none'
                        isInvalid={!!errors.phone}
                      />
                    )}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.phone?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className='mb-3' controlId='formEmail'>
                  <Form.Label>Email</Form.Label>
                  <Controller
                    name='email'
                    control={control}
                    // rules={{ required: "Email is required" }}
                    render={({ field }) => (
                      <Form.Control
                        {...field}
                        type='email'
                        placeholder='Enter email'
                        className='p-3 border-warning outline-none shadow-none'
                        isInvalid={!!errors.email}
                      />
                    )}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className='mb-3' controlId='formStateOfOrigin'>
                  <Form.Label>State of Origin</Form.Label>
                  <Controller
                    name='stateOfOrigin'
                    control={control}
                    // rules={{ required: "State of Origin is required" }}
                    render={({ field }) => (
                      <Form.Select
                        {...field}
                        className='p-3 border-warning outline-none shadow-none'
                        isInvalid={!!errors.stateOfOrigin}
                      >
                        <option value=''>Select State</option>
                        {states.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </Form.Select>
                    )}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.stateOfOrigin?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className='mb-3' controlId='formCountry'>
                  <Form.Label>Country</Form.Label>
                  <Controller
                    name='country'
                    control={control}
                    // rules={{ required: "Country is required" }}
                    render={({ field }) => (
                      <Form.Select
                        {...field}
                        className='p-3 border-warning outline-none shadow-none'
                        isInvalid={!!errors.country}
                      >
                        <option value=''>Select Country</option>
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </Form.Select>
                    )}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.country?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className='mb-3' controlId='formLanguages'>
                  <Form.Label>Languages</Form.Label>
                  <div className='p-1 p-md-4 border border-warning rounded'>
                    <div className='d-flex gap-1 gap-md-3 flex-wrap mb-1 mb-md-4 nuella'>
                      {languages.map((lang) => (
                        <Controller
                          key={lang}
                          name='languages'
                          control={control}
                          // rules={{
                          //   required: "At least one language is required",
                          // }}
                          render={({ field }) => (
                            <Form.Check
                              type='checkbox'
                              label={lang}
                              value={lang.toLowerCase()}
                              checked={field.value?.includes(
                                lang.toLowerCase()
                              )}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  field.onChange([
                                    ...field.value,
                                    lang.toLowerCase(),
                                  ]);
                                } else {
                                  field.onChange(
                                    field.value.filter(
                                      (val) => val !== lang.toLowerCase()
                                    )
                                  );
                                }
                              }}
                            />
                          )}
                        />
                      ))}
                    </div>
                    <Controller
                      name='otherLanguage'
                      control={control}
                      render={({ field }) => (
                        <Form.Control
                          {...field}
                          type='text'
                          className='p-3 border-warning outline-none shadow-none mt-2'
                          placeholder='Enter Other Languages'
                        />
                      )}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className='mb-3' controlId='formHeight'>
                  <Form.Label>Height</Form.Label>
                  <Controller
                    name='height'
                    control={control}
                    render={({ field }) => (
                      <Form.Select
                        {...field}
                        className='p-3 border-warning outline-none shadow-none'
                        isInvalid={!!errors.height}
                      >
                        <option value=''>Select Height</option>
                        {heightOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Select>
                    )}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.height?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formComplexion'>
                  <Form.Label>Complexion</Form.Label>
                  <Controller
                    name='complexion'
                    control={control}
                    render={({ field }) => (
                      <Form.Select
                        {...field}
                        className='p-3 border-warning outline-none shadow-none'
                        isInvalid={!!errors.complexion}
                      >
                        <option value=''>Select Complexion</option>
                        <option value='Light skin tone'>Light skin tone</option>
                        <option value='Medium skin tone'>
                          Medium skin tone
                        </option>
                        <option value='Dark skin tone'>Dark skin tone</option>
                        <option value='Ebony skin tone'>Ebony skin tone</option>
                      </Form.Select>
                    )}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.complexion?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <div className='text-center'>
              <Button
                type='submit'
                className='btn btn-warning rounded-pill px-5'
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner
                      as='span'
                      animation='border'
                      size='sm'
                      role='status'
                      aria-hidden='true'
                      className='me-2'
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
    </div>
  );
}

export default UserProfileForm;

// function UserProfileForm() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { id } = useParams();
//   const { data: dashboardData } = useDashboard(id);

//   const {
//     handleSubmit,
//     control,
//     //  reset,
//     formState: { errors },
//   } = useForm<ProfileFormData>();

//   const onSubmit = async (data: ProfileFormData) => {
//     try {
//       const response = await createProfile(data);
//       console.log("Profile created successfully:", response);
//       alert("Profile created successfully!");
//       // reset();
//     } catch (error) {
//       console.error("Error creating profile:", error);
//       alert("Unable to create profile");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="mt-4 mb-3 p-3 parent">
//       <h5 className="text-start">User Profile</h5>

//       <div className="d-none d-md-block">
//         <UserImage />
//       </div>
//       <Container>
//         <Row className="justify-content-center align-items-center gy-3">
//           <Form onSubmit={handleSubmit(onSubmit)}>
//             <Row>
//               <Col xs={12} md={6}>
//                 <Form.Group className="mb-3" controlId="formPhone">
//                   <Form.Label>Phone</Form.Label>
//                   <Controller
//                     name="phone"
//                     control={control}
//                     defaultValue=""
//                     rules={{ required: "Phone is required" }}
//                     render={({ field }) => (
//                       <Form.Control
//                         {...field}
//                         type="text"
//                         placeholder="Enter phone number"
//                         className="p-3 border-warning outline-none shadow-none"
//                         isInvalid={!!errors.phone}
//                       />
//                     )}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.phone?.message}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col xs={12} md={6}>
//                 <Form.Group className="mb-3" controlId="formEmail">
//                   <Form.Label>Email</Form.Label>
//                   <Controller
//                     name="email"
//                     control={control}
//                     defaultValue=""
//                     rules={{ required: "Email is required" }}
//                     render={({ field }) => (
//                       <Form.Control
//                         {...field}
//                         type="email"
//                         placeholder="Enter email"
//                         className="p-3 border-warning outline-none shadow-none"
//                         isInvalid={!!errors.email}
//                       />
//                     )}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.email?.message}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col xs={12} md={6}>
//                 <Form.Group className="mb-3" controlId="formStateOfOrigin">
//                   <Form.Label>State of Origin</Form.Label>
//                   <Controller
//                     name="stateOfOrigin"
//                     control={control}
//                     defaultValue=""
//                     rules={{ required: "State of Origin is required" }}
//                     render={({ field }) => (
//                       <Form.Select
//                         {...field}
//                         className="p-3 border-warning outline-none shadow-none"
//                         isInvalid={!!errors.stateOfOrigin}
//                       >
//                         <option value="">Select State</option>
//                         {states.map((state) => (
//                           <option key={state} value={state}>
//                             {state}
//                           </option>
//                         ))}
//                       </Form.Select>
//                     )}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.stateOfOrigin?.message}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col xs={12} md={6}>
//                 <Form.Group className="mb-3" controlId="formCountry">
//                   <Form.Label>Country</Form.Label>
//                   <Controller
//                     name="country"
//                     control={control}
//                     defaultValue=""
//                     rules={{ required: "Country is required" }}
//                     render={({ field }) => (
//                       <Form.Select
//                         {...field}
//                         className="p-3 border-warning outline-none shadow-none"
//                         isInvalid={!!errors.country}
//                       >
//                         <option value="">Select Country</option>
//                         {countries.map((country) => (
//                           <option key={country} value={country}>
//                             {country}
//                           </option>
//                         ))}
//                       </Form.Select>
//                     )}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.country?.message}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col xs={12} md={6}>
//                 <Form.Group className="mb-3" controlId="formLanguages">
//                   <Form.Label>Languages</Form.Label>
//                   <div className="p-1 p-md-4 border border-warning rounded">
//                     <div className="d-flex gap-1 gap-md-3 flex-wrap mb-1 mb-md-4 nuella">
//                       {languages.map((lang) => (
//                         <Controller
//                           key={lang}
//                           name="languages"
//                           control={control}
//                           defaultValue={[]}
//                           rules={{
//                             required: "At least one language is required",
//                           }}
//                           render={({ field }) => (
//                             <Form.Check
//                               type="checkbox"
//                               label={lang}
//                               value={lang.toLowerCase()}
//                               checked={field.value.includes(lang.toLowerCase())}
//                               onChange={(e) => {
//                                 if (e.target.checked) {
//                                   field.onChange([
//                                     ...field.value,
//                                     lang.toLowerCase(),
//                                   ]);
//                                 } else {
//                                   field.onChange(
//                                     field.value.filter(
//                                       (val) => val !== lang.toLowerCase()
//                                     )
//                                   );
//                                 }
//                               }}
//                             />
//                           )}
//                         />
//                       ))}
//                     </div>
//                     <Controller
//                       name="otherLanguage"
//                       control={control}
//                       defaultValue=""
//                       render={({ field }) => (
//                         <Form.Control
//                           {...field}
//                           type="text"
//                           className="p-3 border-warning outline-none shadow-none mt-2"
//                           placeholder="Enter Other Languages"
//                         />
//                       )}
//                     />
//                   </div>
//                 </Form.Group>
//               </Col>

//               <Col xs={12} md={6}>
//                 <Form.Group className="mb-3" controlId="formHeight">
//                   <Form.Label>Height</Form.Label>
//                   <Controller
//                     name="height"
//                     control={control}
//                     defaultValue=""
//                     // rules={{ required: "Height is required" }}
//                     render={({ field }) => (
//                       <Form.Select
//                         {...field}
//                         className="p-3 border-warning outline-none shadow-none"
//                         isInvalid={!!errors.height}
//                       >
//                         <option value="">Select Height</option>
//                         {heightOptions.map((option) => (
//                           <option key={option.value} value={option.value}>
//                             {option.label}
//                           </option>
//                         ))}
//                       </Form.Select>
//                     )}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.height?.message}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="formComplexion">
//                   <Form.Label>Complexion</Form.Label>
//                   <Controller
//                     name="complexion"
//                     control={control}
//                     defaultValue=""
//                     // rules={{ required: "Complexion is required" }}
//                     render={({ field }) => (
//                       <Form.Select
//                         {...field}
//                         className="p-3 border-warning outline-none shadow-none"
//                         isInvalid={!!errors.complexion}
//                       >
//                         <option value="">Select Complexion</option>
//                         <option value="Dark">Light skin tone</option>
//                         <option value="Light">Medium skin tone</option>
//                         <option value="Medium">Dark skin tone</option>
//                         <option value="Medium">Ebony skin tone</option>
//                       </Form.Select>
//                     )}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.complexion?.message}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>
//             <div className="text-center">
//               <Button
//                 type="submit"
//                 className="btn btn-warning rounded-pill px-5"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Spinner
//                       as="span"
//                       animation="border"
//                       size="sm"
//                       role="status"
//                       aria-hidden="true"
//                       className="me-2"
//                     />
//                     Saving...
//                   </>
//                 ) : (
//                   "Save"
//                 )}
//               </Button>
//             </div>
//           </Form>
//         </Row>
//       </Container>
//     </div>
//   );
// }

// export default UserProfileForm;

// import "./UserCvView.scss";
// import { useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { Col, Container, Row, Form, Button, Spinner } from "react-bootstrap";
// import UserImage from "./UserImage";
// import { ProfileFormData } from "../../../../types";
// import { createProfile } from "../../../../services/profile";

// export const roles = {
//   Cast: [
//     { label: "Actor", value: "Lead Actor" },
//     { label: "Actress", value: "Lead Actress" },
//     { label: "Extra", value: "Extra" },
//   ],
//   Crew: [
//     { label: "Producer", value: "Producer" },
//     { label: "Executive Producer", value: "Executive Producer" },
//     { label: "Line Producer", value: "Line Producer" },
//     { label: "Production Manager", value: "Production Manager" },
//     { label: "Production Coordinator", value: "Production Coordinator" },
//     { label: "Director", value: "Director" },
//     { label: "First Assistant Director (1st AD)", value: "First Assistant Director (1st AD)" },
//     { label: "Second Assistant Director (2nd AD)", value: "Second Assistant Director (2nd AD)" },
//     { label: "Script Supervisor", value: "Script Supervisor" },
//     { label: "Director of Photography (DP)", value: "Director of Photography (DP)" },
//     { label: "Camera Operator", value: "Camera Operator" },
//     { label: "First Assistant Camera (1st AC)", value: "First Assistant Camera (1st AC)" },
//     { label: "Second Assistant Camera (2nd AC)", value: "Second Assistant Camera (2nd AC)" },
//     { label: "Gaffer", value: "Gaffer" },
//     { label: "Grip", value: "Grip" },
//     { label: "Electrician", value: "Electrician" },
//     { label: "Sound Mixer", value: "Sound Mixer" },
//     { label: "Boom Operator", value: "Boom Operator" },
//     { label: "Utility Sound Technician (UST)", value: "Utility Sound Technician (UST)" },
//     { label: "Production Designer", value: "Production Designer" },
//     { label: "Art Director", value: "Art Director" },
//     { label: "Set Decorator", value: "Set Decorator" },
//     { label: "Prop Master", value: "Prop Master" },
//     { label: "Construction Coordinator", value: "Construction Coordinator" },
//     { label: "Costume Designer", value: "Costume Designer" },
//     { label: "Costume Supervisor", value: "Costume Supervisor" },
//     { label: "Wardrobe Assistant", value: "Wardrobe Assistant" },
//     { label: "Makeup Artist", value: "Makeup Artist" },
//     { label: "Hair Stylist", value: "Hair Stylist" },
//     { label: "Makeup Assistant", value: "Makeup Assistant" },
//     { label: "Special Effects Supervisor", value: "Special Effects Supervisor" },
//     { label: "Pyrotechnician", value: "Pyrotechnician" },
//     { label: "Special Effects Technician", value: "Special Effects Technician" },
//     { label: "Stunt Coordinator", value: "Stunt Coordinator" },
//     { label: "Stunt Performer", value: "Stunt Performer" },
//     { label: "Stunt Double", value: "Stunt Double" },
//     { label: "Best Boy Electric", value: "Best Boy Electric" },
//     { label: "Lighting Technician", value: "Lighting Technician" },
//     { label: "Key Grip", value: "Key Grip" },
//     { label: "Best Boy Grip", value: "Best Boy Grip" },
//     { label: "Catering Manager", value: "Catering Manager" },
//     { label: "Craft Services", value: "Craft Services" },
//     { label: "Transportation Coordinator", value: "Transportation Coordinator" },
//     { label: "Driver", value: "Driver" },
//     { label: "Safety Officer", value: "Safety Officer" },
//     { label: "Medic", value: "Medic" },
//     { label: "Location Manager", value: "Location Manager" },
//     { label: "Location Scout", value: "Location Scout" },
//     { label: "Set Medic", value: "Set Medic" },
//     { label: "Set Photographer", value: "Set Photographer" },
//     { label: "Production Assistants (PAs)", value: "Production Assistants (PAs)" },
//     { label: "Welfare Manager", value: "Welfare Manager" },
//     { label: "Behind-the-Scene Content Creator", value: "Behind-the-Scene Content Creator" },
//   ],
// };

// const states = [
//   "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta",
//   "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi",
//   "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto",
//   "Taraba", "Yobe", "Zamfara"
// ];

// export const countries = [
//   "Nigeria", "Ghana", "South Africa", "Kenya", "United States", "United Kingdom", "Canada", "Germany",
//   "France", "China", "India", "Brazil", "Australia", "Japan", "Russia"
// ];

// const languages = ["English", "Igbo", "Yoruba", "Hausa"];

// const heightOptions = [
//   { label: "Under 5'2\" (under 157 cm) - Petite", value: "Under 5'2\" (under 157 cm) - Petite" },
//   { label: "5'2\" to 5'5\" (157 cm to 165 cm) - Short", value: "5'2\" to 5'5\" (157 cm to 165 cm) - Short" },
//   { label: "5'5\" to 5'8\" (165 cm to 172 cm) - Average", value: "5'5\" to 5'8\" (165 cm to 172 cm) - Average" },
//   { label: "5'8\" to 6'0\" (172 cm to 183 cm) - Tall", value: "5'8\" to 6'0\" (172 cm to 183 cm) - Tall" },
//   { label: "6'0\" and above (183 cm and above) - Very Tall", value: "6'0\" and above (183 cm and above) - Very Tall" },
// ];

// function UserProfileForm() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { handleSubmit, control, reset, formState: { errors } } = useForm<ProfileFormData>();

//   const onSubmit = async (data: ProfileFormData) => {
//     try {
//       const response = await createProfile(data);
//       console.log("Profile created successfully:", response);
//       alert("Profile created successfully!");
//       reset();
//     } catch (error) {
//       console.error("Error creating profile:", error);
//       alert("Unable to create profile");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="mt-4 mb-3 p-3 parent">
//       <h5 className="text-start">User Profile</h5>

//       <div className="d-none d-md-block">
//         <UserImage />
//       </div>
//       <Container>
//         <Row className="justify-content-center align-items-center gy-3">
//           <Form onSubmit={handleSubmit(onSubmit)}>
//             <Row>
//               <Col xs={12} md={6}>
//                 <Form.Group className="mb-3" controlId="formFirstName">
//                   <Form.Label>First Name</Form.Label>
//                   <Controller
//                     name="firstName"
//                     control={control}
//                     defaultValue=""
//                     // rules={{ required: "First Name is required" }}
//                     render={({ field }) => (
//                       <Form.Control
//                         {...field}
//                         type="text"
//                         placeholder="Enter first name"
//                         className="p-3 border-warning outline-none shadow-none"
//                         isInvalid={!!errors.firstName}
//                       />
//                     )}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.firstName?.message}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col xs={12} md={6}>
//                 <Form.Group className="mb-3" controlId="formLastName">
//                   <Form.Label>Last Name</Form.Label>
//                   <Controller
//                     name="lastName"
//                     control={control}
//                     defaultValue=""
//                     // rules={{ required: "Last Name is required" }}
//                     render={({ field }) => (
//                       <Form.Control
//                         {...field}
//                         type="text"
//                         placeholder="Enter last name"
//                         className="p-3 border-warning outline-none shadow-none"
//                         isInvalid={!!errors.lastName}
//                       />
//                     )}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.lastName?.message}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col xs={12} md={6}>
//                 <Form.Group className="mb-3" controlId="formRole">
//                   <Form.Label>Role</Form.Label>
//                   <Controller
//                     name="role"
//                     control={control}
//                     defaultValue=""
//                     // rules={{ required: "Role is required" }}
//                     render={({ field }) => (
//                       <Form.Select
//                         {...field}
//                         className="p-3 border-warning outline-none shadow-none"
//                         isInvalid={!!errors.role}
//                       >
//                         <option value="">Select Role</option>
//                         {Object.entries(roles).map(([category, rolesList]) => (
//                           <optgroup label={category} key={category}>
//                             {rolesList.map((role) => (
//                               <option key={role.value} value={role.value}>
//                                 {role.label}
//                               </option>
//                             ))}
//                           </optgroup>
//                         ))}
//                       </Form.Select>
//                     )}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.role?.message}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col xs={12} md={6}>
//                 <Form.Group className="mb-3" controlId="formPhone">
//                   <Form.Label>Phone</Form.Label>
//                   <Controller
//                     name="phone"
//                     control={control}
//                     defaultValue=""
//                     // rules={{ required: "Phone is required" }}
//                     render={({ field }) => (
//                       <Form.Control
//                         {...field}
//                         type="text"
//                         placeholder="Enter phone number"
//                         className="p-3 border-warning outline-none shadow-none"
//                         isInvalid={!!errors.phone}
//                       />
//                     )}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.phone?.message}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col xs={12} md={6}>
//                 <Form.Group className="mb-3" controlId="formEmail">
//                   <Form.Label>Email</Form.Label>
//                   <Controller
//                     name="email"
//                     control={control}
//                     defaultValue=""
//                     // rules={{ required: "Email is required" }}
//                     render={({ field }) => (
//                       <Form.Control
//                         {...field}
//                         type="email"
//                         placeholder="Enter email"
//                         className="p-3 border-warning outline-none shadow-none"
//                         isInvalid={!!errors.email}
//                       />
//                     )}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.email?.message}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col xs={12} md={6}>
//                 <Form.Group className="mb-3" controlId="formDob">
//                   <Form.Label>Date of Birth</Form.Label>
//                   <Controller
//                     name="dob"
//                     control={control}
//                     defaultValue=""
//                     // rules={{ required: "Date of Birth is required" }}
//                     render={({ field }) => (
//                       <Form.Control
//                         {...field}
//                         type="date"
//                         placeholder="Select date"
//                         className="p-3 border-warning outline-none shadow-none"
//                         isInvalid={!!errors.dob}
//                       />
//                     )}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.dob?.message}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col xs={12} md={6}>
//                 <Form.Group className="mb-3" controlId="formSex">
//                   <Form.Label>Sex</Form.Label>
//                   <Controller
//                     name="sex"
//                     control={control}
//                     defaultValue=""
//                     // rules={{ required: "Sex is required" }}
//                     render={({ field }) => (
//                       <Form.Select
//                         {...field}
//                         className="p-3 border-warning outline-none shadow-none"
//                         isInvalid={!!errors.sex}
//                       >
//                         <option value="">Select Sex</option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                         <option value="Other">Other</option>
//                       </Form.Select>
//                     )}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.sex?.message}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col xs={12} md={6}>
//                 <Form.Group className="mb-3" controlId="formStateOfOrigin">
//                   <Form.Label>State of Origin</Form.Label>
//                   <Controller
//                     name="stateOfOrigin"
//                     control={control}
//                     defaultValue=""
//                     // rules={{ required: "State of Origin is required" }}
//                     render={({ field }) => (
//                       <Form.Select
//                         {...field}
//                         className="p-3 border-warning outline-none shadow-none"
//                         isInvalid={!!errors.stateOfOrigin}
//                       >
//                         <option value="">Select State</option>
//                         {states.map((state) => (
//                           <option key={state} value={state}>
//                             {state}
//                           </option>
//                         ))}
//                       </Form.Select>
//                     )}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.stateOfOrigin?.message}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col xs={12} md={6}>
//                 <Form.Group className="mb-3" controlId="formLocation">
//                   <Form.Label>Location</Form.Label>
//                   <Controller
//                     name="location"
//                     control={control}
//                     defaultValue=""
//                     // rules={{ required: "Location is required" }}
//                     render={({ field }) => (
//                       <Form.Select
//                         {...field}
//                         className="p-3 border-warning outline-none shadow-none"
//                         isInvalid={!!errors.location}
//                       >
//                         <option value="">Select Location</option>
//                         {states.map((state) => (
//                           <option key={state} value={state}>
//                             {state}
//                           </option>
//                         ))}
//                       </Form.Select>
//                     )}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.location?.message}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col xs={12} md={6}>
//                 <Form.Group className="mb-3" controlId="formCountry">
//                   <Form.Label>Country</Form.Label>
//                   <Controller
//                     name="country"
//                     control={control}
//                     defaultValue=""
//                     // rules={{ required: "Country is required" }}
//                     render={({ field }) => (
//                       <Form.Select
//                         {...field}
//                         className="p-3 border-warning outline-none shadow-none"
//                         isInvalid={!!errors.country}
//                       >
//                         <option value="">Select Country</option>
//                         {countries.map((country) => (
//                           <option key={country} value={country}>
//                             {country}
//                           </option>
//                         ))}
//                       </Form.Select>
//                     )}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.country?.message}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col xs={12} md={6}>
//                 <Form.Group className="mb-3" controlId="formLanguages">
//                   <Form.Label>Languages</Form.Label>
//                   <div className="p-1 p-md-4 border border-warning rounded">
//                     <div className="d-flex gap-1 gap-md-3 flex-wrap mb-1 mb-md-4 nuella">
//                       {languages.map((lang) => (
//                         <Controller
//                           key={lang}
//                           name="languages"
//                           control={control}
//                           defaultValue={[]}
//                           render={({ field }) => (
//                             <Form.Check
//                               type="checkbox"
//                               label={lang}
//                               value={lang.toLowerCase()}
//                               checked={field.value.includes(lang.toLowerCase())}
//                               onChange={(e) => {
//                                 if (e.target.checked) {
//                                   field.onChange([...field.value, lang.toLowerCase()]);
//                                 } else {
//                                   field.onChange(
//                                     field.value.filter((val) => val !== lang.toLowerCase())
//                                   );
//                                 }
//                               }}
//                             />
//                           )}
//                         />
//                       ))}
//                     </div>
//                     <Controller
//                       name="otherLanguage"
//                       control={control}
//                       defaultValue=""
//                       render={({ field }) => (
//                         <Form.Control
//                           {...field}
//                           type="text"
//                           className="p-3 border-warning outline-none shadow-none mt-2"
//                           placeholder="Enter Other Languages"
//                         />
//                       )}
//                     />
//                   </div>
//                 </Form.Group>
//               </Col>
//               <Col xs={12} md={6}>
//                 <Form.Group className="mb-3" controlId="formHeight">
//                   <Form.Label>Height</Form.Label>
//                   <Controller
//                     name="height"
//                     control={control}
//                     defaultValue=""
//                     // rules={{ required: "Height is required" }}
//                     render={({ field }) => (
//                       <Form.Select
//                         {...field}
//                         className="p-3 border-warning outline-none shadow-none"
//                         isInvalid={!!errors.height}
//                       >
//                         <option value="">Select Height</option>
//                         {heightOptions.map((option) => (
//                           <option key={option.value} value={option.value}>
//                             {option.label}
//                           </option>
//                         ))}
//                       </Form.Select>
//                     )}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.height?.message}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="formComplexion">
//                   <Form.Label>Complexion</Form.Label>
//                   <Controller
//                     name="complexion"
//                     control={control}
//                     defaultValue=""
//                     // rules={{ required: "Complexion is required" }}
//                     render={({ field }) => (
//                       <Form.Select
//                         {...field}
//                         className="p-3 border-warning outline-none shadow-none"
//                         isInvalid={!!errors.complexion}
//                       >
//                         <option value="">Select Complexion</option>
//                         <option value="Dark">Light skin tone</option>
//                         <option value="Light">Medium skin tone</option>
//                         <option value="Medium">Dark skin tone</option>
//                         <option value="Medium">Ebony skin tone</option>
//                       </Form.Select>
//                     )}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.complexion?.message}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>
//             <div className="text-center">
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
//                     'Save'
//                   )}
//                 </Button>
//               </div>
//           </Form>
//         </Row>
//       </Container>
//     </div>
//   );
// }

// export default UserProfileForm;
