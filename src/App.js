import React, { useEffect, useCallback, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { login, logout as destroy, accountBalance } from "./utils/near";
import Wallet from "./components/Wallet";
import { Notification } from "./components/utils/Notifications";
import Products from "./components/marketplace/Products";
import Cover from "./components/utils/Cover";
import coverImg from "./assets/img/sandwich.jpg";
import nearImg from "./assets/img/near-logo.png";
import "./App.css";

const App = function AppWrapper() {
  const account = window.walletConnection.account();

  const [balance, setBalance] = useState("0");

  const getBalance = useCallback(async () => {
    if (account.accountId) {
      setBalance(await accountBalance());
    }
  });

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (
    <>
      <Notification />
      {account.accountId ? (
        <Container fluid="md">
          <Navbar collapseOnSelect bg="light" expand="lg" className="mb-4">
            <Container>
              <Navbar.Brand href="#home">
                <img
                  alt="DXC Logo"
                  src={nearImg}
                  width="120"
                  className="d-inline-block align-top"
                />{' '}
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="https://docs.near.org/" target="_blank">Docs</Nav.Link>
                  <Nav.Link href="https://learnnear.club/" target="_blank">Learn</Nav.Link>
                </Nav>
                <Nav className="">
                  <Nav.Link>
                    <Wallet
                      address={account.accountId}
                      amount={balance}
                      symbol="NEAR"
                      destroy={destroy}
                    />
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <main>
            <Products />
          </main>
        </Container>
      ) : (
        <Cover name="Street Food" login={login} coverImg={coverImg} />
      )}
    </>
  );
};

export default App;
