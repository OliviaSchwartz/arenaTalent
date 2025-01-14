import React from 'react';
import styled from 'styled-components';

const StrengthContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const StrengthButton = styled.button`
  background-color: ${props => props.$selected ? '#4a90e2' : '#3a3a3a'};
  color: #e0e0e0;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${props => props.$selected ? '#3a80d2' : '#4a4a4a'};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const strengths = [
  'Communication', 'Leadership', 'Problem Solving', 'Teamwork', 'Adaptability',
  'Creativity', 'Time Management', 'Critical Thinking', 'Attention to Detail', 'Emotional Intelligence',
  'Strategic Planning', 'Networking', 'Decision Making', 'Conflict Resolution', 'Analytical Skills',
  'Project Management', 'Negotiation', 'Public Speaking', 'Customer Service', 'Technical Proficiency',
  'Data Analysis', 'Research', 'Writing', 'Multitasking', 'Sales',
  'Marketing', 'Budgeting', 'Coaching', 'Innovation', 'Interpersonal Skills'
];

const StrengthSelector = ({ selectedStrengths, setSelectedStrengths }) => {
    const handleStrengthToggle = (e, strength) => {
      e.preventDefault(); // Prevent form submission
      if (selectedStrengths.includes(strength)) {
        setSelectedStrengths(selectedStrengths.filter(s => s !== strength));
      } else if (selectedStrengths.length < 3) {
        setSelectedStrengths([...selectedStrengths, strength]);
      }
    };

    return (
        <StrengthContainer>
          {strengths.map(strength => (
            <StrengthButton
              key={strength}
              $selected={selectedStrengths.includes(strength)}
              onClick={(e) => handleStrengthToggle(e, strength)}
              disabled={selectedStrengths.length >= 3 && !selectedStrengths.includes(strength)}
            >
              {strength}
            </StrengthButton>
          ))}
        </StrengthContainer>
      );
    };

export default StrengthSelector;
