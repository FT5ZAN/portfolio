"use client";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button"; // your styled Button component

export default function ActionButtons() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Wrapper>
      {/* Resume Button */}
      <a href="/final raasumaa.pdf" target="_blank" rel="noopener noreferrer">
        <Button text="Resume" />
      </a>

      {/* Certificates Button with hover tooltip */}
      <div
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <a href="/𝘼𝙨𝙥𝙞𝙧𝙖-𝙎𝙮𝙨 𝙄𝙣𝙩𝙚𝙧𝙣𝙨𝙝𝙞𝙥 (1).pdf" target="_blank" rel="noopener noreferrer">
    
          <Button text="Certificates" />
        </a>
        {showTooltip && (
          <div className="tooltip">
            <p>🎓 Internships</p>
            <p>📚 Courses</p>
            <p>🏆 Achievements</p>
          </div>
        )}
      </div>

      {/* Hire Me Button */}
      <a href="#updatrs">
        <Button text="Hire Me" />
      </a>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;

  .relative {
    position: relative;
  }

  .tooltip {
    position: absolute;
    top: 110%;
    left: 50%;
    transform: translateX(-50%);

    color: white;
    padding: 10px 15px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    z-index: 10;
    text-align: left;
    background:black;
  }

  .tooltip p {
    margin: 4px 0;
  }
`;
