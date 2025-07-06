import {
  Row,
  Col,
  Container,
  Form,
  InputGroup,
  Button,
  Spinner,
  Modal,
} from "react-bootstrap";
import TestUserIcon from "/assets/avatar.png";
import { useState } from "react";
import "./ExploreTalentView.scss";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { roles } from "../UserCvView/UserProfileForm";
import { useTalents } from "../../../../hooks/useDashboard";
import { useNavigate } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import { RoleOption } from "../../../../types";

interface AgeRange {
  label: string;
  value: string;
  min?: number;
  max?: number;
}

export interface Talent {
  user: {
    _id: string;
    profilePicture?: string;
    premium?: boolean;
  };
  profile: {
    _id: string;
    firstName: string;
    lastName: string;
    dob?: string;
    role?: string;
    sex?: string;
    languages?: string[];
    otherLanguage?: string;
    stateOfOrigin?: string;
    location?: string;
  };
}


const languages = ['English', 'Yoruba', 'Igbo', 'Hausa'];
const states = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 
  'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 
  'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo', 'Jigawa', 
  'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 
  'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

export function calculateAge(dob: string | undefined): number {
  if (!dob) return 0;

  try {
    const birthDate = new Date(dob);
    const diff = Date.now() - birthDate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  } catch {
    return 0;
  }
}

function ExploreTalentView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [talentsPerPage] = useState(12);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState<'roles' | 'gender' | 'age' | 'location' | 'language' | 'origin'>('roles');
  
  // Filter states
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedAgeRanges, setSelectedAgeRanges] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([]);
  
  const navigate = useNavigate();
  const { data: talents, isLoading, error } = useTalents();

  const ageRanges: AgeRange[] = [
    { label: "5 - 10 years", value: "5-10", min: 5, max: 10 },
    { label: "10 - 15 years", value: "10-15", min: 10, max: 15 },
    { label: "15 - 20 years", value: "15-20", min: 15, max: 20 },
    { label: "20 - 25 years", value: "20-25", min: 20, max: 25 },
    { label: "25 - 30 years", value: "25-30", min: 25, max: 30 },
    { label: "30 - 35 years", value: "30-35", min: 30, max: 35 },
    { label: "35 - 40 years", value: "35-40", min: 35, max: 40 },
    { label: "40 - 45 years", value: "40-45", min: 40, max: 45 },
    { label: "45 - 50 years", value: "45-50", min: 45, max: 50 },
    { label: "50+ years", value: "50+", min: 50 },
  ];

  // Get all unique roles from talents data
  const allAvailableRoles: string[] = [];
  (talents || []).forEach((talent: Talent) => {
    if (talent?.profile?.role && !allAvailableRoles.includes(talent.profile.role)) {
      allAvailableRoles.push(talent.profile.role);
    }
  });

  // Combine predefined roles with available roles from data
  const roleOptions: RoleOption[] = [
    { label: "All Roles", value: "all-roles" },
    { label: "All Cast", value: "group-cast", isHeader: true, group: 'cast' },
    ...roles.Cast.map(role => ({ ...role, group: 'cast' })),
    { label: "All Crew", value: "group-crew", isHeader: true, group: 'crew' },
    ...roles.Crew.map(role => ({ ...role, group: 'crew' })),
    // ...(allAvailableRoles.length > 0 ? [
    //   { label: "Other Available Roles", value: "group-other", isHeader: true, group: 'other' },
    //   ...allAvailableRoles
    //     .filter(role => 
    //       !roles.Cast.some(r => r.value === role) && 
    //       !roles.Crew.some(r => r.value === role)
    //     )
    //     .map(role => ({ label: role, value: role, group: 'other' }))
    // ] : [])
  ];

  const handleRedirect = (talentId: string) => {
    navigate(`/share/dashboard/${talentId}`);
  };

  // Role selection handlers
  const handleRoleSelection = (roleValue: string, isHeader = false) => {
    if (isHeader) {
      // Handle select-all for Cast/Crew groups
      const groupRoles = roleOptions
        .filter(role => 
          (roleValue === 'group-cast' && role.group === 'cast') ||
          (roleValue === 'group-crew' && role.group === 'crew') ||
          (roleValue === 'group-other' && role.group === 'other')
        )
        .map(role => role.value);
      
      if (selectedRoles.some(r => groupRoles.includes(r))) {
        // If any in group are selected, deselect all
        setSelectedRoles(prev => prev.filter(r => !groupRoles.includes(r)));
      } else {
        // Select all in group
        setSelectedRoles(prev => [...new Set([...prev, ...groupRoles])]);
      }
    } else {
      // Toggle individual role or all roles
      if (roleValue === 'all-roles') {
        setSelectedRoles(selectedRoles.length === roleOptions.length - 4 ? [] : // minus the 4 headers
          roleOptions.filter(r => !r.isHeader).map(r => r.value));
      } else {
        setSelectedRoles(prev =>
          prev.includes(roleValue)
            ? prev.filter(r => r !== roleValue)
            : [...prev, roleValue]
        );
      }
    }
  };

  // Gender selection handlers
  const handleGenderSelection = (sex: string) => {
    if (sex === 'all') {
      setSelectedGenders(selectedGenders.length === 2 ? [] : ['male', 'female']);
    } else {
      setSelectedGenders(prev =>
        prev.includes(sex)
          ? prev.filter(g => g !== sex)
          : [...prev, sex]
      );
    }
  };

  // Age range selection handlers
  const handleAgeRangeSelection = (ageRange: string) => {
    if (ageRange === 'all') {
      setSelectedAgeRanges(selectedAgeRanges.length === ageRanges.length ? [] : 
        ageRanges.map(range => range.value));
    } else {
      setSelectedAgeRanges(prev =>
        prev.includes(ageRange)
          ? prev.filter(r => r !== ageRange)
          : [...prev, ageRange]
      );
    }
  };

  // Location selection handler
  const handleLocationSelection = (location: string) => {
    if (location === 'all') {
      setSelectedLocations(selectedLocations.length === states.length ? [] : [...states]);
    } else {
      setSelectedLocations(prev =>
        prev.includes(location)
          ? prev.filter(l => l !== location)
          : [...prev, location]
      );
    }
  };

  // Language selection handler
  const handleLanguageSelection = (language: string) => {
    if (language === 'all') {
      setSelectedLanguages(selectedLanguages.length === languages.length ? [] : [...languages]);
    } else {
      setSelectedLanguages(prev =>
        prev.includes(language)
          ? prev.filter(l => l !== language)
          : [...prev, language]
      );
    }
  };

  // Origin selection handler
  const handleOriginSelection = (origin: string) => {
    if (origin === 'all') {
      setSelectedOrigins(selectedOrigins.length === states.length ? [] : [...states]);
    } else {
      setSelectedOrigins(prev =>
        prev.includes(origin)
          ? prev.filter(o => o !== origin)
          : [...prev, origin]
      );
    }
  };

  // Filter talents based on all selected filters
  // const filteredTalents = (talents || ([] as Talent[])).filter((talent: Talent) => {
  //   if (!talent) return false;

  //   // Search term matching
  //   const nameMatch =
  //     talent?.profile?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     talent?.profile?.lastName?.toLowerCase().includes(searchTerm.toLowerCase());
    
  //   const roleMatch = talent?.profile?.role?.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesSearch = nameMatch || roleMatch;

  //   // Role filter
  //   const matchesRole = selectedRoles.length === 0 || 
  //     selectedRoles.includes(talent?.profile?.role || '');

  //   // Gender filter
  //   const matchesGender = selectedGenders.length === 0 || 
  //     selectedGenders.includes(talent?.profile?.sex?.toLowerCase() || '');

  //   // Age filter
  //   const age = calculateAge(talent?.profile?.dob);
  //   const matchesAge = selectedAgeRanges.length === 0 || 
  //     selectedAgeRanges.some(range => {
  //       if (range === '50+') return age >= 50;
  //       const [min, max] = range.split('-').map(Number);
  //       return age >= min && age <= max;
  //     });

  //   // Location filter
  //   const matchesLocation = selectedLocations.length === 0 || 
  //     (talent?.profile?.location && selectedLocations.includes(talent.profile.location));
    
  //   // Language filter - matches if talent has at least one selected language
  //   const matchesLanguage = selectedLanguages.length === 0 || 
  //     (talent?.profile?.languages && 
  //       talent.profile.languages.some(lang => selectedLanguages.includes(lang))) ||
  //     (talent?.profile?.otherLanguage && 
  //       selectedLanguages.includes(talent.profile.otherLanguage));
    
  //   // Origin filter
  //   const matchesOrigin = selectedOrigins.length === 0 || 
  //     (talent?.profile?.stateOfOrigin && selectedOrigins.includes(talent.profile.stateOfOrigin));

  //   return matchesSearch && matchesRole && matchesGender && matchesAge && 
  //          matchesLocation && matchesLanguage && matchesOrigin;
  // });
  const filteredTalents = (talents || ([] as Talent[])).filter((talent: Talent) => {
    if (!talent) return false;
  
    // Search term matching
    const nameMatch =
      talent?.profile?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      talent?.profile?.lastName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const roleMatch = talent?.profile?.role?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = nameMatch || roleMatch;
  
    // Role filter
    const matchesRole = selectedRoles.length === 0 || 
      selectedRoles.includes(talent?.profile?.role || '');
  
    // Gender filter
    const matchesGender = selectedGenders.length === 0 || 
      selectedGenders.includes(talent?.profile?.sex?.toLowerCase() || '');
  
    // Age filter
    const age = calculateAge(talent?.profile?.dob);
    const matchesAge = selectedAgeRanges.length === 0 || 
      selectedAgeRanges.some(range => {
        if (range === '50+') return age >= 50;
        const [min, max] = range.split('-').map(Number);
        return age >= min && age <= max;
      });
  
    // Location filter
    const matchesLocation = selectedLocations.length === 0 || 
      (talent?.profile?.location && selectedLocations.includes(talent.profile.location));
    
    // Language filter - fixed version
    const matchesLanguage = selectedLanguages.length === 0 || 
      (talent?.profile?.languages && 
        talent.profile.languages.some(lang => 
          selectedLanguages.some(selectedLang => 
            lang.toLowerCase().includes(selectedLang.toLowerCase())
          )
        )
      ) ||
      (talent?.profile?.otherLanguage && 
        selectedLanguages.some(selectedLang => 
          talent.profile.otherLanguage?.toLowerCase().includes(selectedLang.toLowerCase())
        )
      );
    
    // Origin filter
    const matchesOrigin = selectedOrigins.length === 0 || 
      (talent?.profile?.stateOfOrigin && selectedOrigins.includes(talent.profile.stateOfOrigin));
  
    return matchesSearch && matchesRole && matchesGender && matchesAge && 
           matchesLocation && matchesLanguage && matchesOrigin;
  });

  // Pagination logic
  const indexOfLastTalent = currentPage * talentsPerPage;
  const indexOfFirstTalent = indexOfLastTalent - talentsPerPage;
  const currentTalents = filteredTalents.slice(indexOfFirstTalent, indexOfLastTalent);
  const totalPages = Math.ceil(filteredTalents.length / talentsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <div className="text-center m-auto">Error loading talents</div>;
  }

  return (
    <Container className="talent-container mt-5 mb-5">
      <h5 className="text-center">Explore Talents</h5>
      <div className="d-flex justify-content-center align-items-center m-auto text-center mb-5 mt-2 w-100 w-md-75">
      Discover & Connect with Nollywood's Top Professionals and Emerging Stars
      Find the perfect cast and crew for your next project by browsing profiles, portfolios, and resumes. Explore our curated platform today!
      </div>
      {/* Search and Filter Row */}
      <Row className="mb-4 g-1 g-md-2">
        <Col xs={5} md={6}>
          <Button 
            variant="light" 
            className="w-100 d-flex align-items-center justify-content-center"
            onClick={() => setShowFilterModal(true)}
          >
            <FaFilter className="me-2" />
            Filters
          </Button>
        </Col>

        {/* Search with icon and submit button */}
        <Col xs={7} md={6}>
          <Form onSubmit={handleSearchSubmit}>
            <InputGroup>
              <InputGroup.Text className="bg-light border-end-0">
                <CiSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search"
                value={searchTerm}
                className="bg-light shadow-none outline-none border-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button 
                variant="warning" 
                type="submit"
                className="d-none d-md-block"
              >
                Search
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>

      {/* Talent Cards */}
      <Row className="g-2 g-md-4">
        {currentTalents.length > 0 ? (
          currentTalents.map((talent: Talent) => (
            <Col key={talent.profile?._id} xs={6} sm={6} md={4} lg={3}>
              <div
                className="talent-card"
                onClick={() => handleRedirect(talent?.user?._id)}
              >
                <div className="talent-image-container">
                  <img
                    src={talent?.user?.profilePicture || TestUserIcon}
                    alt={`${talent?.profile?.firstName} ${talent?.profile?.lastName}`}
                    className="talent-image"
                  />
                  {talent?.user?.premium && (
                    <span className="premium-badge">Premium</span>
                  )}
                </div>

                <div className="talent-info">
                  <div className="d-flex align-items-center justify-content-between">
                    <h6 className="talent-name">
                      {talent?.profile?.firstName} {talent?.profile?.lastName}
                    </h6>
                    <span className="talent-age-label">
                      Age: {calculateAge(talent?.profile?.dob)}
                    </span>
                  </div>
                  <div className="talent-details">
                    <div className="talent-role">{talent?.profile?.role}</div>
                    <div className="d-none">{talent?.profile?.sex}</div>
                    <div className="d-none talent-location">{talent?.profile?.location}</div>
                    <div className="d-none talent-origin">{talent?.profile?.stateOfOrigin}</div>
                    <div className="d-none talent-languages">
                      {talent?.profile?.languages?.length ? (
                        <>
                          {talent.profile.languages.join(", ")}
                          {talent?.profile?.otherLanguage &&
                            ` and ${talent.profile.otherLanguage}`}
                        </>
                      ) : (
                        talent?.profile?.otherLanguage || "Not specified"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))
        ) : (
          <Col className="text-center py-5">
            <h5>No talents found matching your criteria</h5>
          </Col>
        )}
      </Row>

      {/* Pagination */}
      {filteredTalents.length > talentsPerPage && (
        <Pagination className="pagination-warning mt-4 justify-content-center">
          <Pagination.Prev 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
            disabled={currentPage === 1}
            className="text-warning"
          />
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <Pagination.Item
              key={number}
              active={number === currentPage}
              onClick={() => paginate(number)}
              className={number === currentPage ? 'active-warning' : ''}
            >
              {number}
            </Pagination.Item>
          ))}
          
          <Pagination.Next 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
            disabled={currentPage === totalPages}
            className="text-warning"
          />
        </Pagination>
      )}

      {/* Filter Modal */}
      <Modal 
        show={showFilterModal} 
        onHide={() => setShowFilterModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Filters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="filter-tabs mb-3">
            <Button
              variant={activeFilterTab === 'roles' ? 'warning' : 'outline-warning'}
              onClick={() => setActiveFilterTab('roles')}
              className="me-2"
            >
              Roles
            </Button>
            <Button
              variant={activeFilterTab === 'gender' ? 'warning' : 'outline-warning'}
              onClick={() => setActiveFilterTab('gender')}
              className="me-2"
            >
              Gender
            </Button>
            <Button
              variant={activeFilterTab === 'age' ? 'warning' : 'outline-warning'}
              onClick={() => setActiveFilterTab('age')}
              className="me-2"
            >
              Age
            </Button>
            <Button
              variant={activeFilterTab === 'location' ? 'warning' : 'outline-warning'}
              onClick={() => setActiveFilterTab('location')}
              className="me-2"
            >
              Location
            </Button>
            <Button
              variant={activeFilterTab === 'language' ? 'warning' : 'outline-warning'}
              onClick={() => setActiveFilterTab('language')}
              className="me-2"
            >
              Language
            </Button>
            <Button
              variant={activeFilterTab === 'origin' ? 'warning' : 'outline-warning'}
              onClick={() => setActiveFilterTab('origin')}
            >
              State of Origin
            </Button>
          </div>

          <div className="filter-content" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {activeFilterTab === 'roles' && (
              <div className="roles-filter">
                <div className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id="select-all-roles"
                    label="All Roles"
                    checked={selectedRoles.length === roleOptions.length - 4} // minus the 4 headers
                    onChange={() => handleRoleSelection('all-roles')}
                  />
                </div>
                
                {/* Cast Group */}
                <div className="mb-3">
                  <h6 className="fw-bold">All Cast</h6>
                  <div className="ms-3">
                    {roleOptions
                      .filter(role => role.group === 'cast' && !role.isHeader)
                      .map(role => (
                        <Form.Check
                          key={role.value}
                          type="checkbox"
                          id={`role-${role.value}`}
                          label={role.label}
                          checked={selectedRoles.includes(role.value)}
                          onChange={() => handleRoleSelection(role.value)}
                          className="mb-2"
                        />
                      ))}
                  </div>
                </div>
                
                {/* Crew Group */}
                <div className="mb-3">
                  <h6 className="fw-bold">All Crew</h6>
                  <div className="ms-3">
                    {roleOptions
                      .filter(role => role.group === 'crew' && !role.isHeader)
                      .map(role => (
                        <Form.Check
                          key={role.value}
                          type="checkbox"
                          id={`role-${role.value}`}
                          label={role.label}
                          checked={selectedRoles.includes(role.value)}
                          onChange={() => handleRoleSelection(role.value)}
                          className="mb-2"
                        />
                      ))}
                  </div>
                </div>
                
                {/* Other Available Roles Group - only show if there are other roles */}
                {allAvailableRoles.some(role => 
                  !roles.Cast.some(r => r.value === role) && 
                  !roles.Crew.some(r => r.value === role)
                ) && (
                  <div className="mb-3">
                    <h6 className="fw-bold">Other Available Roles</h6>
                    <div className="ms-3">
                      {roleOptions
                        .filter(role => role.group === 'other' && !role.isHeader)
                        .map(role => (
                          <Form.Check
                            key={role.value}
                            type="checkbox"
                            id={`role-${role.value}`}
                            label={role.label}
                            checked={selectedRoles.includes(role.value)}
                            onChange={() => handleRoleSelection(role.value)}
                            className="mb-2"
                          />
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeFilterTab === 'gender' && (
              <div className="gender-filter">
                <Form.Check
                  type="checkbox"
                  id="select-all-genders"
                  label="Select All"
                  checked={selectedGenders.length === 2}
                  onChange={() => handleGenderSelection('all')}
                  className="mb-3"
                />
                <Form.Check
                  type="checkbox"
                  id="gender-male"
                  label="Male"
                  checked={selectedGenders.includes('male')}
                  onChange={() => handleGenderSelection('male')}
                  className="mb-2"
                />
                <Form.Check
                  type="checkbox"
                  id="gender-female"
                  label="Female"
                  checked={selectedGenders.includes('female')}
                  onChange={() => handleGenderSelection('female')}
                />
              </div>
            )}

            {activeFilterTab === 'age' && (
              <div className="age-filter">
                <Form.Check
                  type="checkbox"
                  id="select-all-ages"
                  label="Select All Age Ranges"
                  checked={selectedAgeRanges.length === ageRanges.length}
                  onChange={() => handleAgeRangeSelection('all')}
                  className="mb-3"
                />
                {ageRanges.map(range => (
                  <Form.Check
                    key={range.value}
                    type="checkbox"
                    id={`age-${range.value}`}
                    label={range.label}
                    checked={selectedAgeRanges.includes(range.value)}
                    onChange={() => handleAgeRangeSelection(range.value)}
                    className="mb-2"
                  />
                ))}
              </div>
            )}

            {activeFilterTab === 'location' && (
              <div className="location-filter">
                <Form.Check
                  type="checkbox"
                  id="select-all-locations"
                  label="All Locations"
                  checked={selectedLocations.length === states.length}
                  onChange={() => handleLocationSelection('all')}
                  className="mb-3"
                />
                {states.map(state => (
                  <Form.Check
                    key={`loc-${state}`}
                    type="checkbox"
                    id={`loc-${state}`}
                    label={state}
                    checked={selectedLocations.includes(state)}
                    onChange={() => handleLocationSelection(state)}
                    className="mb-2"
                  />
                ))}
              </div>
            )}

            {activeFilterTab === 'language' && (
              <div className="language-filter">
                <Form.Check
                  type="checkbox"
                  id="select-all-languages"
                  label="All Languages"
                  checked={selectedLanguages.length === languages.length}
                  onChange={() => handleLanguageSelection('all')}
                  className="mb-3"
                />
                {languages.map(language => (
                  <Form.Check
                    key={`lang-${language}`}
                    type="checkbox"
                    id={`lang-${language}`}
                    label={language}
                    checked={selectedLanguages.includes(language)}
                    onChange={() => handleLanguageSelection(language)}
                    className="mb-2"
                  />
                ))}
              </div>
            )}

            {activeFilterTab === 'origin' && (
              <div className="origin-filter">
                <Form.Check
                  type="checkbox"
                  id="select-all-origins"
                  label="All States of Origin"
                  checked={selectedOrigins.length === states.length}
                  onChange={() => handleOriginSelection('all')}
                  className="mb-3"
                />
                {states.map(state => (
                  <Form.Check
                    key={`origin-${state}`}
                    type="checkbox"
                    id={`origin-${state}`}
                    label={state}
                    checked={selectedOrigins.includes(state)}
                    onChange={() => handleOriginSelection(state)}
                    className="mb-2"
                  />
                ))}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="warning" 
            onClick={() => {
              setSelectedRoles([]);
              setSelectedGenders([]);
              setSelectedAgeRanges([]);
              setSelectedLocations([]);
              setSelectedLanguages([]);
              setSelectedOrigins([]);
            }}
          >
            Clear All
          </Button>
          <Button 
            variant="warning" 
            onClick={() => {
              setShowFilterModal(false);
              setCurrentPage(1);
            }}
          >
            Apply Filters
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ExploreTalentView;