import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import { Calendar, Mail, UserPlus, Briefcase, Users, PlusCircle, ChevronDown, BarChart2, Clock, Award, ExternalLink } from 'lucide-react';
import EmployerNav from './EmployerNav';
import JobPostModal from './JobPostModal';



//MINE
import { Modal, ModalContent, ModalCloseButton } from './Modal';
import { useNavigate } from 'react-router-dom';



const softColors = {
  background: '#f0f4f8',
  card: '#ffffff',
  primary: '#4a90e2',
  secondary: '#f6e05e',
  text: '#2d3748',
  textLight: '#718096',
  border: '#e2e8f0',
  success: '#68d391',
  warning: '#f6ad55',
  danger: '#fc8181',
  info: '#63b3ed',
  icons: '#12C2E8',
  icontext: '#C859FF',
  yellow: '#f6e05e',
};

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${softColors.background};
  color: ${softColors.text};
  font-family: 'Inter', sans-serif;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const WelcomeHeader = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: ${softColors.text};
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

const Card = styled.div`
  background-color: ${softColors.card};
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${softColors.text};
`;

const Link = styled.a`
  color: white;
  background-color: ${softColors.icontext};
  font-weight: 500;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
  border: 1px solid ${softColors.icontext};
  width: auto;
  padding: 10px;
  border-radius: 5px;

  &:hover {
    background-color: white;
    color: ${softColors.icontext};
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const StatCard = styled(Card)`
  position: relative;
`;

const StatNumber = styled.p`
  font-size: 2.25rem;
  font-weight: 700;
  color: ${props => props.color || softColors.primary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.p`
  font-size: 0.875rem;
  color: ${softColors.textLight};
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${softColors.border};
  background-color: ${softColors.card};
  font-size: 0.875rem;
  color: ${softColors.text};
  margin-top: 0.5rem;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: ${softColors.border};
  border-radius: 9999px;
  height: 0.5rem;
  margin-bottom: 0.5rem;
`;

const ProgressBar = styled.div`
  height: 0.5rem;
  border-radius: 9999px;
  width: ${props => props.width};
  background-color: ${props => props.color || softColors.primary};
`;

const StageLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${softColors.text};
`;

const StageCount = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${softColors.primary};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
`;

const TableHeader = styled.th`
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${softColors.textLight};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TableRow = styled.tr`
  background-color: ${softColors.card};
  border-radius: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.1);
    background-color: ${softColors.background};
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  white-space: nowrap;
  color: ${softColors.text};

  &:first-child {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }

  &:last-child {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
`;

const EventLink = styled.a`
  color: ${softColors.primary};
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${props => props.bgColor || softColors.primary};
  color: white;
  margin-bottom: 0.5rem;
`;

const OnboardingSection = styled(Card)`
  margin-bottom: 1.5rem;
  height: auto;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: -0.5rem;
  color: ${softColors.text};
`;

const ApplicantInfo = styled.div`
  flex: 1;
  cursor: pointer;
`;

const ApplicantCard = styled.div`
  background-color: ${softColors.card};
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    background-color: ${softColors.background};
  }
`;

const ApplicantName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  color: ${softColors.text};
  margin: 0 0 0.25rem 0;
`;

const JobRole = styled.p`
  font-size: 0.875rem;
  color: ${softColors.textLight};
  margin: 0;
`;

const MatchScore = styled.div`
  background-color: ${softColors.success};
  color: ${softColors.card};
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 1rem;
`;

const FilterDropdown = styled(Select)`
  margin-bottom: 1rem;
`;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const PieChartContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto 1rem;
  cursor: pointer;
  animation: ${rotateAnimation} 0.5s ease-in-out;
`;

const PieChart = styled.svg`
  width: 70%;
  height: 50%;
  transform: rotate(-90deg);
  border-radius: 50%;
  overflow: visible;
  margin-top: 30px;
`;

const PieChartSegment = styled.circle`
  fill: transparent;
  stroke-width: 32;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const PieChartTooltip = styled.div`
  background-color: ${softColors.card};
  border: 1px solid ${softColors.border};
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 0.75rem;
  color: ${softColors.text};
  pointer-events: none;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.3s;
  z-index: 10;
`;

const NavWrapper = styled.div`
  flex: 0 0 auto;
  height: 100vh;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const PostJobButton = styled(Link)`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const ReviewButton = styled(Link)`
  display: block;
  width: 100%;
  text-align: center;
  margin-top: 1rem;
  padding: 0.5rem;
  margin-left: -10px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SectionIcon = styled.span`
  margin-right: 0.5rem;
`;

const SectionProgressBar = styled(ProgressBarContainer)`
  margin: 0.5rem 0;
  position: relative;
`;

const SectionProgress = styled(ProgressBar)`
  background-color: ${props => props.started ? softColors.success : softColors.danger};
`;

const SectionContent = styled.div`
  max-height: ${props => props.isOpen ? '1000px' : '0'};
  overflow: ${props => props.isOpen ? 'show' : 'hidden'};
  transition: max-height 0.1s ease-in-out;
`;

const SectionDescription = styled.p`
  font-size: 0.875rem;
  color: ${softColors.textLight};
  line-height: 1.5;
`;

const NewGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(1, 1fr);
  margin-top: 2rem;
`;

const NewCard = styled(Card)`
  padding: 1.5rem;
`;

const NewLink = styled(Link)`
  display: block;
  margin-top: 1rem;
  text-align: center;
`;

const CardHeader = styled.div`
  margin-bottom: 1rem;
`;

const CardContent = styled.div`
  font-size: 0.875rem;
  color: ${softColors.textLight};
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;













const EmployerDash = () => {


  //MINE
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isNewModalOpen, setNewModalOpen] = useState(false);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [additionalFields, setAdditionalFields] = useState([]); // State for additional fields


  const handleOpenModal = () => {
    setModalOpen(true);
  };


  const handleCloseModal = () => {
    setModalOpen(false);
  };


  const handleOpenNewModal = () => {
    setNewModalOpen(true);
  };


  const handleCloseNewModal = () => {
    setNewModalOpen(false);
  };


  const handleNewMemberSubmit = (e) => {
    e.preventDefault();
    console.log('New Member Name:', employeeName);
    console.log('New Member Email:', employeeEmail);
    console.log('Additional Members:', additionalFields);

    setEmployeeName('');
  setEmployeeEmail('');
  setAdditionalFields([]);
  setNewModalOpen(false);
  };

  const handleManageMembers = () => {
    console.log("Managing team members");


    navigate('/employer-account');
  };

  const handleAddMembers = () => {
    console.log("Adding team members");
    handleOpenNewModal();
  };

  // Function to add additional member fields
  const handleAddAdditional = () => {
    setAdditionalFields((prevFields) => [
      ...prevFields,
      { name: '', email: '' },
    ]);
    setEmployeeName('');
  setEmployeeEmail('');
  };









  const [showIndustryData, setShowIndustryData] = useState(false);
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [openSections, setOpenSections] = useState({
    profile: false,
    postJob: false,
    survey: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const applicants = [
    { id: 19, name: 'Olivia Schwartz', role: 'CTO', applyDate: '9/23/24', match: 95 },
    { id: 18, name: 'Luciano Tommasini', role: 'Premium Experience Coordinator', applyDate: '9/22/24', match: 91 },
    { id: 8, name: 'Ed Urena', role: 'Customer Service Representative', applyDate: '9/21/24', match: 92 },
    { id: 14, name: 'Jonathan Wittig', role: 'Marketing Specialist', applyDate: '9/20/24', match: 87 },
    { id: 1, name: 'Atinuke Akindebe', role: 'Data Analyst', applyDate: '9/19/24', match: 83 },
  ];

  const jobOverviews = [
    { title: 'Premium Experience Coordinator', status: 'Active', views: 152, applications: 43, highMatches: 15 },
    { title: 'Marketing Specialist', status: 'Active', views: 98, applications: 27, highMatches: 8 },
    { title: 'Data Analyst', status: 'Draft', views: 0, applications: 0, highMatches: 0 },
  ];

  const applicantStages = [
    { stage: 'Reviewed', count: 15, color: softColors.success },
    { stage: 'Interview', count: 10, color: softColors.primary },
    { stage: 'Rejected', count: 7, color: softColors.danger },
    { stage: 'Unreviewed', count: 10, color: softColors.warning },
  ];

  const demographicData = [
    {
      title: 'Gender',
      data: [
        { label: 'Male', value: 60, color: '#4a90e2' },
        { label: 'Female', value: 35, color: '#68d391' },
        { label: 'Non-binary', value: 5, color: '#f6ad55' },
        { label: 'Transgender Male', value: 0, color: '#fc8181' },
        { label: 'Transgender Female', value: 0, color: '#63b3ed' },
        { label: 'Prefer not to say', value: 0, color: '#f6e05e' }
      ]
    },
    {
      title: 'Race/Ethnicity',
      data: [
        { label: 'White', value: 50, color: '#4a90e2' },
        { label: 'Black or African American', value: 20, color: '#68d391' },
        { label: 'Hispanic or Latino', value: 15, color: '#f6ad55' },
        { label: 'Asian', value: 10, color: '#fc8181' },
        { label: 'Indigenous', value: 5, color: '#63b3ed' },
        { label: 'Middle Eastern/Arab', value: 5, color: '#f6e05e' },
        { label: 'Pacific Islander', value: 5, color: '#f6e05e' },
        { label: 'Other', value: 5, color: '#63b3ed' }
      ]
    },
    {
      title: 'LGBTQIA+',
      data: [
        { label: 'Straight/Heterosexual', value: 85, color: '#4a90e2' },
        { label: 'Gay', value: 10, color: '#f6ad55' },
        { label: 'Lesbian', value: 5, color: '#fc8181' },
        { label: 'Bisexual', value: 5, color: '#63b3ed' },
        { label: 'Queer', value: 5, color: '#f6e05e' },
        { label: 'Prefer not to say', value: 0, color: '#f6e05e' }
      ]
    },
    {
      title: 'Disability',
      data: [
        { label: 'With Disability', value: 10, color: '#4a90e2' },
        { label: 'Without Disability', value: 90, color: '#68d391' },
        { label: 'Prefer Not to Say', value: 0, color: '#f6ad55' }
      ]
    },
    {
      title: 'Veteran Status',
      data: [
        { label: 'Veteran', value: 8, color: '#4a90e2' },
        { label: 'Non-Veteran', value: 92, color: '#68d391' },
        { label: 'Prefer Not to Say', value: 0, color: '#f6ad55' }
      ]
    },
  ];

  const industryDemographicData = [
    {
      title: 'Gender',
      data: [
        { label: 'Male', value: 55, color: '#4a90e2' },
        { label: 'Female', value: 40, color: '#68d391' },
        { label: 'Non-binary', value: 3, color: '#f6ad55' },
        { label: 'Transgender Male', value: 1, color: '#fc8181' },
        { label: 'Transgender Female', value: 1, color: '#63b3ed' },
        { label: 'Prefer not to say', value: 0, color: '#f6e05e' }
      ]
    },
    {
      title: 'Race/Ethnicity',
      data: [
        { label: 'White', value: 45, color: '#4a90e2' },
        { label: 'Black or African American', value: 25, color: '#68d391' },
        { label: 'Hispanic or Latino', value: 18, color: '#f6ad55' },
        { label: 'Asian', value: 12, color: '#fc8181' },
        { label: 'Indigenous', value: 2, color: '#63b3ed' },
        { label: 'Middle Eastern/Arab', value: 3, color: '#f6e05e' },
        { label: 'Pacific Islander', value: 1, color: '#f6e05e' },
        { label: 'Other', value: 4, color: '#63b3ed' }
      ]
    },
    {
      title: 'LGBTQIA+',
      data: [
        { label: 'Straight/Heterosexual', value: 80, color: '#4a90e2' },
        { label: 'Gay', value: 7, color: '#f6ad55' },
        { label: 'Lesbian', value: 5, color: '#fc8181' },
        { label: 'Bisexual', value: 4, color: '#63b3ed' },
        { label: 'Queer', value: 3, color: '#f6e05e' },
        { label: 'Prefer not to say', value: 1, color: '#f6e05e' }
      ]
    },
    {
      title: 'Disability',
      data: [
        { label: 'With Disability', value: 15, color: '#4a90e2' },
        { label: 'Without Disability', value: 82, color: '#68d391' },
        { label: 'Prefer Not to Say', value: 3, color: '#f6ad55' }
      ]
    },
    {
      title: 'Veteran Status',
      data: [
        { label: 'Veteran', value: 10, color: '#4a90e2' },
        { label: 'Non-Veteran', value: 88, color: '#68d391' },
        { label: 'Prefer Not to Say', value: 2, color: '#f6ad55' }
      ]
    },
  ];

  const roles = ['All Roles', 'Premium Experience Coordinator', 'Customer Service Representative', 'Marketing Specialist', 'Data Analyst'];

  const filteredApplicants = selectedRole === 'All Roles'
    ? applicants
    : applicants.filter(applicant => applicant.role === selectedRole);

  const PieChartWithTooltip = ({ data, title }) => {
    const [tooltipData, setTooltipData] = useState(null);
    const chartRef = useRef(null);

    const total = data.reduce((sum, item) => sum + item.value, 0);

    const getAngleFromEvent = (event) => {
      const rect = chartRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      return Math.atan2(y, x) * (180 / Math.PI);
    };

    const getItemFromAngle = (angle) => {
      let accumulatedPercentage = 0;
      return data.find(item => {
        accumulatedPercentage += (item.value / total) * 360;
        return accumulatedPercentage > angle;
      });
    };

    const handleMouseMove = (event) => {
      const angle = (getAngleFromEvent(event) + 180) % 360;
      const item = getItemFromAngle(angle);
      if (item) {
        setTooltipData({
          item,
          x: event.clientX,
          y: event.clientY,
        });
      }
    };

    const handleMouseLeave = () => {
      setTooltipData(null);
    };


    return (
      <Card>
        <CardTitle>{title}</CardTitle>
        <PieChartContainer ref={chartRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <PieChart viewBox="0 0 32 32">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const strokeDasharray = `${percentage} ${100 - percentage}`;
              const strokeDashoffset = -data.slice(0, index).reduce((sum, d) => sum + (d.value / total) * 100, 0);

              return (
                <PieChartSegment
                  key={index}
                  cx="16"
                  cy="16"
                  r="15.9155"
                  stroke={item.color}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={`${strokeDashoffset}`}
                />
              );
            })}
          </PieChart>
        </PieChartContainer>
        {tooltipData && (
          <PieChartTooltip
            style={{
              position: 'fixed',
              left: tooltipData.x + 10,
              top: tooltipData.y + 10,
            }}
          >
            {tooltipData.item.label}: {tooltipData.item.value}%
          </PieChartTooltip>
        )}
      </Card>
    );
  };


  return (
    <Container>
      <EmployerNav />

      <MainContent>
      <WelcomeHeader>🏟 Welcome to Arena!</WelcomeHeader>




        <Link
            as="button"
            onClick={handleOpenModal}
            style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                padding: '8px',
                backgroundColor: '#6F42C1',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                textAlign: 'center',
                textDecoration: 'none',
                fontSize: '16px',
                transition: 'background-color 0.3s, transform 0.2s',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#5A2D8C';
                e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#6F42C1';
                e.target.style.transform = 'scale(1)';
            }}
        >
            Add Team Members
            </Link>
      <Link href="/add-team-members" style={{ position: 'absolute', top: '2rem', right: '2rem' }}>
          + Add Team Members
        </Link>
        {isModalOpen && (
          <Modal>
            <ModalContent>
              <h2>Add And Manage Members</h2>
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                  }}
                  onClick={handleManageMembers}
                >
                  Manage Team Members
                </button>

                <button
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#2196F3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                  }}
                  onClick={handleAddMembers}
                >
                  Add Team Members
                </button>
              </div>


              <ModalCloseButton onClick={handleCloseModal}>Close</ModalCloseButton>
            </ModalContent>
          </Modal>
        )}


        {isNewModalOpen && (
  <Modal>
    <ModalContent>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>

    <button
      type="button"
      onClick={handleCloseNewModal}
      style={{
        padding: '5px',
        backgroundColor: 'transparent',
        color: '#f44336',
        border: 'none',
        cursor: 'pointer',
        fontSize: '20px',
      }}
    >
      X
    </button>


    <h2 style={{ margin: '0' }}>Add Member</h2>


    <button
      type="submit"
      style={{
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
      }}
    >
      Save
    </button>
  </div>

  <form onSubmit={handleNewMemberSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <div>
      <label htmlFor="employeeName">Name:</label>
      <input
        id="employeeName"
        type="text"
        value={employeeName}
        onChange={(e) => setEmployeeName(e.target.value)}
        required
        placeholder="Enter name"
        style={{
          width: '100%',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          fontSize: '16px',
          boxSizing: 'border-box',
        }}
      />
    </div>
    <div>
      <label htmlFor="employeeEmail">Email:</label>
      <input
        id="employeeEmail"
        type="email"
        value={employeeEmail}
        onChange={(e) => setEmployeeEmail(e.target.value)}
        required
        placeholder="Enter email"
        style={{
          width: '100%',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          fontSize: '16px',
          boxSizing: 'border-box',
        }}
      />
    </div>


    <button
      type="button"
      onClick={handleAddAdditional}
      style={{
        padding: '10px 20px',
        backgroundColor: '#2196F3',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '1rem',
      }}
    >
      Add Additional
    </button>
  </form>
</ModalContent>

  </Modal>
)}








        <OnboardingSection onClick={() => toggleSection('profile')}>
          <SectionHeader>
            <SectionTitle>
              <SectionIcon>🔥</SectionIcon>
              Complete your profile
            </SectionTitle>
            <ChevronDown size={20} style={{ transform: openSections.profile ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', cursor: 'pointer' }} />
          </SectionHeader>
          <SectionProgressBar>
            <SectionProgress width="30%" started={true} />
          </SectionProgressBar>
          <SectionContent isOpen={openSections.profile}>
            <SectionDescription>
              This information helps our AI personalize its talent matches to meet your top hiring goals.
              Note: You will not see your talent matches until you complete your profile.
            </SectionDescription>
            <Link href="/edit-profile">Edit Profile</Link>
          </SectionContent>
        </OnboardingSection>

        <OnboardingSection onClick={() => toggleSection('postJob')}>
          <SectionHeader>
            <SectionTitle>
              <SectionIcon>📝</SectionIcon>
              Post a job
            </SectionTitle>
            <ChevronDown size={20} style={{ transform: openSections.postJob ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', cursor: 'pointer' }} />
          </SectionHeader>
          <SectionProgressBar>
            <SectionProgress width="20%" started={false} />
          </SectionProgressBar>
          <SectionContent isOpen={openSections.postJob}>
            <SectionDescription>
              Post your first job to our curated talent community and receive top candidate matches instantly!
            </SectionDescription>
            <Link href="/post-job">Post a Job</Link>
          </SectionContent>
        </OnboardingSection>

        <OnboardingSection onClick={() => toggleSection('survey')}>
          <SectionHeader>
            <SectionTitle>
              <SectionIcon>🔑</SectionIcon>
              Get access to more talent
            </SectionTitle>
            <ChevronDown size={20} style={{ transform: openSections.survey ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', cursor: 'pointer' }} />
          </SectionHeader>
          <SectionProgressBar>
            <SectionProgress width="20%" started={false} />
          </SectionProgressBar>
          <SectionContent isOpen={openSections.survey}>
            <SectionDescription>
              Complete this quick survey to increase your standing in our algorithm and get access to even more talent.
              These responses are anonymous and are used to help us gather industry data on hiring trends and best practices.
              It will be shared in reports, in responses to questions asked in our AI chatbot, and to benchmark your hiring goals and success metrics.
              Your personal information will NEVER be shared publicly and will only be shared anonymously and in aggregate form.
            </SectionDescription>
            <Link href="/complete-survey">Complete Survey</Link>
          </SectionContent>
        </OnboardingSection>

        <Grid>
          <StatCard>
            <div className="job-icon-div">
              <div>
                <IconWrapper bgColor={softColors.icons}>
                  <Briefcase size={20} />
                </IconWrapper>
              </div>
              <div>
                <JobPostModal />
              </div>
            </div>
            <div>
              <StatNumber color={softColors.icontext}>1</StatNumber>
              <StatLabel>Open Positions</StatLabel>
            </div>
            <ReviewButton href="/review-recommendations">Review Recommendations</ReviewButton>
          </StatCard>

          <StatCard>
            <IconWrapper bgColor={softColors.icons}>
              <Users size={20} />
            </IconWrapper>
            <div>
              <StatNumber color={softColors.icontext}>65</StatNumber>
              <StatLabel>Total Applicants</StatLabel>
            </div>
          </StatCard>

          <StatCard>
            <IconWrapper bgColor={softColors.icons}>
              <Calendar size={20} />
            </IconWrapper>
            <div>
              <StatNumber color={softColors.icontext}>0</StatNumber>
              <StatLabel>Total Interviews</StatLabel>
            </div>
          </StatCard>

          <StatCard>
            <IconWrapper bgColor={softColors.icons}>
              <Award size={20} />
            </IconWrapper>
            <div>
            <StatNumber color={softColors.icontext}>0</StatNumber>
              <StatLabel>Total Hires</StatLabel>
            </div>
          </StatCard>
        </Grid>

        <Grid style={{ marginTop: '2rem' }}>
          <Card>
            <CardTitle>Applicant Matches</CardTitle>
            <div>
              {['80% or more', '60-79%', '40-59%'].map((label, index) => (
                <div key={label} style={{ marginBottom: '1rem' }}>
                  <ProgressBarContainer>
                    <ProgressBar width={`${80 - index * 20}%`} color={softColors.primary} />
                  </ProgressBarContainer>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <StageLabel>{label}</StageLabel>
                    <StageCount>{15 - index * 5}</StageCount>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/matches" style={{ marginTop: '1rem' }}>Review Matches</Link>
          </Card>

          <Card>
            <CardTitle>Applicant Stages</CardTitle>
            <div>
              {applicantStages.map((stage) => (
                <div key={stage.stage} style={{ marginBottom: '1rem' }}>
                  <ProgressBarContainer>
                    <ProgressBar width={`${(stage.count / 42) * 100}%`} color={stage.color} />
                  </ProgressBarContainer>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <StageLabel>{stage.stage}</StageLabel>
                    <StageCount>{stage.count}</StageCount>
                  </div>
                </div>
              ))}
              <p style={{ fontSize: '0.875rem', color: softColors.textLight, marginTop: '1rem' }}>
                You have 10 unreviewed top matches (60% or above)
              </p>
              <Link href="/matches" style={{ marginTop: '1rem' }}>Review Now</Link>
            </div>
          </Card>
        </Grid>

        <NewGrid>
          <NewCard>
            <CardHeader>
              <CardTitle>Job Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Title</TableHeader>
                    <TableHeader>Status</TableHeader>
                    <TableHeader>Views</TableHeader>
                    <TableHeader>Apps</TableHeader>
                    <TableHeader>80%+</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {jobOverviews.map((job, index) => (
                    <TableRow key={index}>
                      <TableCell>{job.title}</TableCell>
                      <TableCell style={{ color: job.status === 'Active' ? softColors.success : softColors.textLight }}>
                        {job.status}
                      </TableCell>
                      <TableCell>{job.views}</TableCell>
                      <TableCell>{job.applications}</TableCell>
                      <TableCell>{job.highMatches}</TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
              <NewLink href="/all-jobs">
                View All Jobs <ExternalLink size={14} style={{ verticalAlign: 'middle', marginLeft: '4px' }} />
              </NewLink>
            </CardContent>
          </NewCard>
        </NewGrid>


        <SectionTitle style={{ marginTop: '2rem', marginBottom: '1rem' }}>Demographics</SectionTitle>
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: softColors.text }}> </h3>
          <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: softColors.textLight }}>
            <input
              type="checkbox"
              checked={showIndustryData}
              onChange={() => setShowIndustryData(!showIndustryData)}
              style={{ marginRight: '0.5rem' }}
            />
            Show Industry Standards
          </label>
        </div>
        <Grid>
          {(showIndustryData ? industryDemographicData : demographicData).map((data, index) => (
            <PieChartWithTooltip key={index} data={data.data} title={data.title} />
          ))}
        </Grid>

        <Card style={{ marginTop: '2rem' }}>
          <CardTitle>New Top Applicants</CardTitle>
          <FilterDropdown value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </FilterDropdown>
          {filteredApplicants.map((applicant) => (
            <ApplicantCard key={applicant.id}>
              <ApplicantInfo>
                <ApplicantName>{applicant.name}</ApplicantName>
                <JobRole>{applicant.role}</JobRole>
                <p style={{ fontSize: '0.75rem', color: softColors.textLight, margin: '0.25rem 0 0 0' }}>
                  Applied: {applicant.applyDate}
                </p>
              </ApplicantInfo>
              <MatchScore>{applicant.match}% Match</MatchScore>
            </ApplicantCard>
          ))}
          <Link href="/applicants" style={{ display: 'inline-block', marginTop: '1.5rem' }}>View All Applicants</Link>
        </Card>


        <Grid style={{ marginTop: '2rem' }}>
          <Card>
            <CardTitle>Upcoming Interviews</CardTitle>
            <p style={{ fontSize: '0.875rem', color: softColors.textLight }}>You have 3 interviews scheduled this week</p>
          </Card>
          <Card>
            <CardTitle>Upcoming Events</CardTitle>
            <EventLink href="#">MSBC Career Fair - Register Now</EventLink>
          </Card>
          <Card>
            <CardTitle>News from Arena</CardTitle>
            <p style={{ fontSize: '0.875rem', color: softColors.textLight }}>New feature: AI-powered job description writer</p>
          </Card>
        </Grid>



        <Card style={{ marginTop: '1rem' }}>
          <CardTitle>How Our AI Works</CardTitle>
          <p style={{
            fontSize: '0.875rem',
            color: softColors.textLight,
            lineHeight: '1.5'
          }}>
            Our AI-powered matching system uses advanced algorithms to analyze candidate profiles and job requirements. It considers factors such as skills, experience, education, and cultural fit to provide accurate match percentages. The system continuously learns and improves based on hiring outcomes and feedback.
          </p>
        </Card>
      </MainContent>
    </Container>
  );
};

export default EmployerDash;
