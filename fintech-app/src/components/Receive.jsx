import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaQrcode, FaCopy, FaCheckCircle } from 'react-icons/fa'

const ReceiveContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const Title = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`

const QRCodeContainer = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
`

const QRCode = styled(FaQrcode)`
  font-size: 150px;
  color: #6e8efb;
`

const AddressContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  overflow: hidden;
`

const Address = styled.div`
  flex-grow: 1;
  font-size: 1rem;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 1rem;
`

const CopyButton = styled.button`
  background-color: #6e8efb;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
  flex-shrink: 0;

  &:hover {
    background-color: #5c7cfa;
  }
`

const CopyIcon = styled(FaCopy)`
  margin-right: 0.5rem;
`

const SuccessMessage = styled.p`
  color: #28a745;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`

function Receive() {
  const [did, setDid] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const storedDid = localStorage.getItem('userDid');
    if (storedDid) {
      setDid(JSON.parse(storedDid));
    }
  }, []);

  const handleCopy = () => {
    if (did) {
      navigator.clipboard.writeText(did.uri);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  if (!did) {
    return <div>Loading DID...</div>;
  }

  return (
    <ReceiveContainer>
      <Title>Receive Payment</Title>
      <QRCodeContainer>
        <QRCode />
      </QRCodeContainer>
      <AddressContainer>
        <Address title={did.uri}>{did.uri}</Address>
        <CopyButton onClick={handleCopy}>
          <CopyIcon /> Copy
        </CopyButton>
      </AddressContainer>
      {copied && (
        <SuccessMessage>
          <FaCheckCircle style={{ marginRight: '0.5rem' }} /> DID copied to clipboard!
        </SuccessMessage>
      )}
    </ReceiveContainer>
  )
}

export default Receive
