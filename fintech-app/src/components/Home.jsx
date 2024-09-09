import React from 'react'
import styled from 'styled-components'
import { FaGlobeAmericas, FaBolt, FaShieldAlt } from 'react-icons/fa'

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const Hero = styled.div`
  background: linear-gradient(135deg, #6e8efb 0%, #a777e3 100%);
  color: white;
  padding: 3rem;
  border-radius: 12px;
  margin-bottom: 3rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
`

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
`

const FeatureCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: #6e8efb;
  margin-bottom: 1rem;
`

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`

const FeatureDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
`

function Home() {
  return (
    <HomeContainer>
      <Hero>
        <Title>Welcome to Payce</Title>
        <Subtitle>Your cross-border payment solution powered by tbDEX</Subtitle>
      </Hero>
      <FeaturesGrid>
        <FeatureCard>
          <FeatureIcon><FaGlobeAmericas /></FeatureIcon>
          <FeatureTitle>Global Reach</FeatureTitle>
          <FeatureDescription>Send money to over 200 countries with competitive exchange rates.</FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon><FaBolt /></FeatureIcon>
          <FeatureTitle>Lightning Fast</FeatureTitle>
          <FeatureDescription>Experience near-instant transfers with our cutting-edge technology.</FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon><FaShieldAlt /></FeatureIcon>
          <FeatureTitle>Secure & Reliable</FeatureTitle>
          <FeatureDescription>Your transactions are protected with state-of-the-art encryption.</FeatureDescription>
        </FeatureCard>
      </FeaturesGrid>
    </HomeContainer>
  )
}

export default Home
