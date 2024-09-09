import React, { useState } from 'react';
import styled from 'styled-components';
import { DidDht } from '@web5/dids';

const CreateDIDContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const CreateDIDButton = styled.button`
  background-color: #6e8efb;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5c7cfa;
  }
`;

const CreateDID = ({ onDidCreated }) => {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateDID = async () => {
    setIsCreating(true);
    try {
      const didDht = await DidDht.create({ publish: true });
      const portableDid = await didDht.export();
      onDidCreated(portableDid);
    } catch (error) {
      console.error('Error creating DID:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <CreateDIDContainer>
      <CreateDIDButton onClick={handleCreateDID} disabled={isCreating}>
        {isCreating ? 'Creating DID...' : 'Create DID'}
      </CreateDIDButton>
    </CreateDIDContainer>
  );
};

export default CreateDID;
