import React from "react";
import styled from "styled-components";
import "./style.css";
import Home from "./Home";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div>
      <Nav>
        <Logo src="https://www.yariskabin.com.tr/assets/img/logo.png" />
        <NavMenu>
          <p>
            <img src="/images/home-icon.svg" alt="" />
            <span>
              <Link to="/">HAZIRLIK ISTASYONU</Link>
            </span>
          </p>

          <p>
            <img src="/images/watchlist-icon.svg" alt="" />
            {/* <a href="./Report">RAPORLAMA</a> */}
            <span>
              {/* <Link to="/report">RAPORLAMA</Link> */}
              <a href="/report">RAPORLAMA</a>
            </span>
          </p>
        </NavMenu>
        <h3>BAKIM-ONARIM DEPARTMANI</h3>
        <img
          className="pm"
          src="/images/PM.jpg"
          alt=""
          width="50"
          height="50"
        />
      </Nav>
      <Home />
    </div>
  );
}

export default Header;

const Nav = styled.nav`
  height: 70px;
  background: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
  overflow-x: hidden;

  h3 {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
  }
`;
const Logo = styled.img`
  width: 80px;
`;

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 25px;
  align-items: center;

  a {
    color: white;
    text-decoration: none;

    font-size: 13px;
    letter-spacing: 1.42px;
    position: relative;

    &:after {
      content: "";
      height: 2px;
      background: white;
      position: absolute;
      left: 0;
      right: 0;
      bottom: -6px;
      opacity: 0;
      transform-origin: left center;
      transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      transform: scaleX(0);
    }
  }

  p {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;

    img {
      height: 20px;
    }

    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;

      &:after {
        content: "";
        height: 2px;
        background: white;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform-origin: left center;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        transform: scaleX(0);
      }
    }
    &:hover {
      span:after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
`;
