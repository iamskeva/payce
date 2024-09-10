import './polyfills';
import './process'
import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from './components/Home'
import Send from './components/Send'
import Receive from './components/Receive'
import Profile from './components/Profile'

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const AppContainer = styled.div`
  max-width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

const Header = styled.header`
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 1000;
`

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.h1`
  font-size: 2rem;
  color: var(--primary-blue);
  margin: 0;
`

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
`

const NavLink = styled(Link)`
  color: var(--primary-blue);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--primary-blue);
    color: var(--white);
  }
`

const Main = styled.main`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-top: 2rem;
`

function App() {
  return (
    <Router>
      <AppContainer>
        <Header>
          <HeaderContent>
            <Logo>
              <Title>Payce</Title>
            </Logo>
            <Nav>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/send">Send</NavLink>
              <NavLink to="/receive">Receive</NavLink>
              <NavLink to="/profile">Profile</NavLink>
            </Nav>
          </HeaderContent>
        </Header>
        <Content>
          <Main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/send" element={<Send />} />
              <Route path="/receive" element={<Receive />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Main>
        </Content>
      </AppContainer>
    </Router>
  )
}

export default App
