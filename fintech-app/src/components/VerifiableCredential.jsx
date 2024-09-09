import React, { useState } from 'react';
import styled from 'styled-components';
import { VerifiableCredential as VC } from '@web5/credentials';
import { Web5 } from '@web5/api';

const VCContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const VCTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const VCInfo = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const VCForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const VCInput = styled.input`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const VCButton = styled.button`
  background-color: #6e8efb;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5c7cfa;
  }
`;

const VerifiableCredentialComponent = ({ did, onVCCreated }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [occupation, setOccupation] = useState('');

  const createAndStoreVC = async (e) => {
    e.preventDefault();
    
    try {
      // Initialize Web5 with the correct parameters
      console.log("start...")
      const { web5, did: userDid } = await Web5.connect();
      console.log("userDid", userDid);
      const { did: userBearerDid } = await web5.agent.identity.get({ didUri: userDid });
      console.log("userBearerDid", userBearerDid);
      // Create the Verifiable Credential
      const vc = await VC.create({
        type: 'UserProfileCredential',
        issuer: userDid,
        subject: userDid,
        data: {
          firstName,
          lastName,
          country,
          occupation
        }
      });

      console.log("vc", vc);

      // Sign the Verifiable Credential
      const signedVc = await vc.sign({ userBearerDid });
      console.log("signedVc", signedVc);

      // Store the signed Verifiable Credential in the DWN
      const { record } = await web5.dwn.records.create({
        data: signedVc,
        message: {
          schema: 'UserProfileCredential',
          dataFormat: 'application/vc+jwt',
          published: true
        }
      });

      // Retrieve the stored VC and parse it
      const vcJwt = await record.data.text();
      const parsedVc =  VC.parseJwt({ vcJwt });

      // Call the callback function to update the parent component
      onVCCreated(parsedVc);
    } catch (error) {
      console.error('Error creating Verifiable Credential:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <VCContainer>
      <VCTitle>Create Verifiable Credential</VCTitle>
      <VCForm onSubmit={createAndStoreVC}>
        <VCInput
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <VCInput
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <VCInput
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <VCInput
          type="text"
          placeholder="Occupation"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          required
        />
        <VCButton type="submit">Create VC</VCButton>
      </VCForm>
    </VCContainer>
  );
};

export default VerifiableCredentialComponent;
