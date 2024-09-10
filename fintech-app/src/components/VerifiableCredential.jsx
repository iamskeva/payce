import { useState } from 'react';
import {VerifiableCredential} from '@web5/credentials'
import { Web5 } from '@web5/api'; // Import Web5 API
import styled from 'styled-components';

const VerifiableCredentialComponent = ({ did }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [occupation, setOccupation] = useState('');

  const createAndStoreVC = async (e) => {
    e.preventDefault();
    
    try {
      // Connect to Web5 and get the user's DID
      const { web5, did: userDid } = await Web5.connect(); // Ensure correct initialization
      console.log("userDid", userDid);

      if (!web5 || !userDid) {
        throw new Error("Web5 connection failed");
      }
      // Get the user's bearer DID from the agent
      const { did: userBearerDid } = await web5.agent.identity.get({ didUri: userDid });
      console.log("userBearerDid", userBearerDid);

      // // Create and sign the Verifiable Credential
      const vc = await VerifiableCredential.create({
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

      const signedVc = await vc.sign({ did: userBearerDid });
    //   console.log("signedVc", signedVc);
      // // Store the signed Verifiable Credential in the DWN
      const { record } = await web5.dwn.records.create({
        data: signedVc,
        message: {
          schema: 'UserProfileCredential',
          dataFormat: 'application/vc+jwt',
        }
      });

      console.log("record", record);

      // // Retrieve and parse the stored VC

    //   const response = await web5.dwn.records.query({
    //     from: userDid,
    //     message: {
    //       filter: {
    //         schema: 'UserProfileCredential',
    //         dataFormat: 'application/vc+jwt',
    //       },
    //     },
    //   });
    //   console.log("response", response);
    //   const signedVcJwt = await response[0].data.text();
    //   const parsedVc = VerifiableCredential.parseJwt({ signedVcJwt });
    //   console.log('parsed', parsedVc);
      
    } catch (error) {
      console.error("Error creating VC:", error.message);
    }
  };

  return (
    <VCContainer>
      <VCTitle>Create Verifiable Credential</VCTitle>
      <form onSubmit={createAndStoreVC}>
        <VCInfo>Please enter your information:</VCInfo>
        <StyledInput
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <StyledInput
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <StyledInput
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <StyledInput
          type="text"
          placeholder="Occupation"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
        />
        <StyledButton type="submit">Create VC</StyledButton>
      </form>
    </VCContainer>
  );
};

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

// Additional styled components for form elements
const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #6e8efb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
`;

export default VerifiableCredentialComponent;