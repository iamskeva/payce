import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaCopy, FaCheckCircle, FaWallet, FaChartLine, FaExchangeAlt } from 'react-icons/fa';
import CreateDID from './CreateDID';
import VerifiableCredentialComponent from './VerifiableCredential';
import { DidDht } from '@web5/dids';
import { Web5 } from '@web5/api';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const ProfileContainer = styled.div`
  background: linear-gradient(135deg, #6e8efb 0%, #a777e3 100%);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 15s ease infinite;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  color: white;
  max-width: 600px;
  margin: 0 auto;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid white;
  margin-right: 2rem;
  box-shadow: 0 0 20px rgba(41, 128, 185, 0.3);
`;

const ProfileInfo = styled.div`
  flex-grow: 1;
`;

const Name = styled.h2`
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  font-weight: 700;
  color: white;
`;

const BalanceContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
  }
`;

const BalanceIcon = styled(FaWallet)`
  font-size: 2rem;
  margin-right: 1rem;
  color: white;
`;

const BalanceText = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  color: white;
`;

const DIDContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  position: relative;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
  }
`;

const DIDText = styled.div`
  font-size: 1rem;
  color: white;
  margin-bottom: 0.5rem;
`;

const DIDValue = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.5rem;
`;

const CopyButton = styled.button`
  background-color: #6e8efb;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: #a777e3;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const ActionButton = styled.button`
  flex: 1;
  background-color: #6E8EFB;
  border: none;
  color: white;
  cursor: pointer;
  padding: 1rem;
  border-radius: 15px;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: #a777e3;
    transform: translateY(-5px);
  }
`;

const ActionIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

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

const Profile = () => {
  const [did, setDid] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [balance, setBalance] = useState(0);
  const [copied, setCopied] = useState(false);
  const [vc, setVc] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedDid = localStorage.getItem('userDid');
    if (storedDid) {
      const parsedDid = JSON.parse(storedDid);
      setDid(parsedDid);
      setUserAddress(parsedDid.uri);
      loadVC(parsedDid);
    }
    setBalance(1000); // Mock balance
  }, []);

  const loadVC = async (did) => {
    const web5 = new Web5();
    const { records } = await web5.dwn.records.query({
      message: {
        filter: {
          schema: 'UserProfileCredential',
        },
      },
    });

    if (records.length > 0) {
      const record = records[0];
      const vcJwt = await record.data.text();
      const parsedVc = await VerifiableCredential.parseJwt({ vcJwt });
      setVc(parsedVc);
    }
  };

  const handleDidCreated = async (newDid) => {
    setDid(newDid);
    setUserAddress(newDid.uri);
    localStorage.setItem('userDid', JSON.stringify(newDid));
    await loadVC(newDid);
  };

  const handleVCCreated = (newVc) => {
    setVc(newVc);
  };

  const handleCopyDID = () => {
    navigator.clipboard.writeText(userAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTransferFunds = () => {
    navigate('/send');
  };

  if (!did || !userAddress) {
    return <CreateDID onDidCreated={handleDidCreated} />;
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <Avatar src={`https://api.dicebear.com/9.x/micah/svg?seed=${did.uri}`} alt="Avatar" />
        <ProfileInfo>
          <Name>Your Profile</Name>
          <BalanceContainer>
            <BalanceIcon />
            <BalanceText>${balance.toFixed(2)}</BalanceText>
          </BalanceContainer>
        </ProfileInfo>
      </ProfileHeader>
      <DIDContainer>
        <DIDText>DID:</DIDText>
        <DIDValue title={userAddress}>{userAddress}</DIDValue>
        <CopyButton onClick={handleCopyDID}>
          {copied ? <FaCheckCircle /> : <FaCopy />}
          {copied ? ' Copied!' : ' Copy DID'}
        </CopyButton>
      </DIDContainer>
      {vc ? (
        <VCContainer>
          <VCTitle>Verifiable Credential</VCTitle>
          <VCInfo>First Name: {vc.vc.credentialSubject.firstName}</VCInfo>
          <VCInfo>Last Name: {vc.vc.credentialSubject.lastName}</VCInfo>
          <VCInfo>Country: {vc.vc.credentialSubject.country}</VCInfo>
          <VCInfo>Occupation: {vc.vc.credentialSubject.occupation}</VCInfo>
        </VCContainer>
      ) : (
        <VerifiableCredentialComponent did={did.uri} onVCCreated={handleVCCreated} />
      )}
      <ActionContainer>
        <ActionButton onClick={() => console.log('DID Document:', did.document)}>
          <ActionIcon><FaChartLine /></ActionIcon>
          View DID Document
        </ActionButton>
        <ActionButton onClick={handleTransferFunds}>
          <ActionIcon><FaExchangeAlt /></ActionIcon>
          Transfer Funds
        </ActionButton>
      </ActionContainer>
    </ProfileContainer>
  );
};

export default Profile;
