import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { FaPaperPlane, FaUser, FaDollarSign, FaExchangeAlt } from 'react-icons/fa'
import { PFIs } from '../services/tbdexService'

const SendContainer = styled.div`
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 0.5rem 1rem;
`

const InputIcon = styled.span`
  color: #6e8efb;
  margin-right: 1rem;
`

const Input = styled.input`
  flex-grow: 1;
  border: none;
  background-color: transparent;
  font-size: 1rem;
  color: #333;
  &:focus {
    outline: none;
  }
`

const Select = styled.select`
  flex-grow: 1;
  border: none;
  background-color: transparent;
  font-size: 1rem;
  color: #333;
  &:focus {
    outline: none;
  }
`

const SendButton = styled.button`
  background-color: #6e8efb;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5c7cfa;
  }
`

const ButtonIcon = styled(FaPaperPlane)`
  margin-right: 0.5rem;
`

const CurrencyPair = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`

function Send() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [sendCurrency, setSendCurrency] = useState('');
  const [receiveCurrency, setReceiveCurrency] = useState('');

  // Extract unique currencies from PFIs
  const allCurrencies = useMemo(() => {
    const currencies = new Set();
    PFIs.forEach(pfi => {
      pfi.offerings.forEach(offering => {
        const [from, to] = offering.split(' to ');
        currencies.add(from);
        currencies.add(to);
      });
    });
    return Array.from(currencies);
  }, []);

  // Filter receiving currencies based on selected sending currency
  const availableReceiveCurrencies = useMemo(() => {
    if (!sendCurrency) return [];
    const currencies = new Set();
    PFIs.forEach(pfi => {
      pfi.offerings.forEach(offering => {
        const [from, to] = offering.split(' to ');
        if (from === sendCurrency) {
          currencies.add(to);
        }
      });
    });
    return Array.from(currencies);
  }, [sendCurrency]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement send functionality here
    console.log('Sending', amount, sendCurrency, 'to', recipient, 'as', receiveCurrency);
  };

  return (
    <SendContainer>
      <Title>Send Payment</Title>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <InputIcon><FaUser /></InputIcon>
          <Input
            type="text"
            placeholder="Recipient's address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />
        </InputGroup>
        <CurrencyPair>
          <InputGroup>
            <InputIcon><FaDollarSign /></InputIcon>
            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="0"
              step="0.01"
            />
          </InputGroup>
          <InputGroup>
            <InputIcon><FaExchangeAlt /></InputIcon>
            <Select
              value={sendCurrency}
              onChange={(e) => {
                setSendCurrency(e.target.value);
                setReceiveCurrency('');
              }}
              required
            >
              <option value="">Select sending currency</option>
              {allCurrencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </Select>
          </InputGroup>
        </CurrencyPair>
        <InputGroup>
          <InputIcon><FaExchangeAlt /></InputIcon>
          <Select
            value={receiveCurrency}
            onChange={(e) => setReceiveCurrency(e.target.value)}
            required
            disabled={!sendCurrency}
          >
            <option value="">Select receiving currency</option>
            {availableReceiveCurrencies.map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </Select>
        </InputGroup>
        <SendButton type="submit">
          <ButtonIcon /> Send Payment
        </SendButton>
      </Form>
    </SendContainer>
  )
}

export default Send