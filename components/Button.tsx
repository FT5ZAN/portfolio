
// import React from 'react';
// import styled from 'styled-components';

// interface ButtonProps {
//   text: string;
// }

// const Button: React.FC<ButtonProps> = ({ text }) => {
//   return (
//     <StyledWrapper>
//       <button className="btn">
//         <i className="animation" />
//         {text}
//         <i className="animation" />
//       </button>
//     </StyledWrapper>
//   );
// };

// const StyledWrapper = styled.div`
//   .btn {
//     outline: 0;
//     display: inline-flex;
//     align-items: center;
//     justify-content: space-between;
//     background: #24dee6;
//     min-width: 200px;
//     border: 0;
//     border-radius: 4px;
//     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//     box-sizing: border-box;
//     padding: 16px 20px;
//     color: #fff;
//     font-size: 15px;
//     font-weight: 600;
//     letter-spacing: 1.2px;
//     text-transform: uppercase;
//     overflow: hidden;
//     cursor: pointer;
//     color:black;
//     font-family: 'Poppins', 'Arial', sans-serif;
//   }

//   .btn:hover {
//     opacity: 0.95;
//   }

//   .btn .animation {
//     border-radius: 100%;
//     animation: ripple 0.6s linear infinite;
//   }

//   @keyframes ripple {
//     0% {
//       box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1), 0 0 0 20px rgba(255, 255, 255, 0.1), 0 0 0 40px rgba(255, 255, 255, 0.1), 0 0 0 60px rgba(255, 255, 255, 0.1);
//     }

//     100% {
//       box-shadow: 0 0 0 20px rgba(255, 255, 255, 0.1), 0 0 0 40px rgba(255, 255, 255, 0.1), 0 0 0 60px rgba(255, 255, 255, 0.1), 0 0 0 80px rgba(255, 255, 255, 0);
//     }
//   }
// `;

// export default Button;
import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <StyledWrapper>
      <button className="btn">
        <i className="animation" />
        {text}
        <i className="animation" />
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .btn {
    outline: 0;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    background: #24dee6;
    min-width: 200px;
    width: 100%; /* Make the button take full width */
    max-width: 300px; /* Set a max width for larger screens */
    border: 0;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    padding: 1rem 1.25rem; /* Use rem for responsive padding */
    color: #fff;
    font-size: 1rem; /* Use rem for responsive font size */
    font-weight: 600;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    overflow: hidden;
    cursor: pointer;
    font-family: 'Poppins', 'Arial', sans-serif;
    color:black;
  }

  .btn:hover {
    opacity: 0.95;
  }

  .btn .animation {
    border-radius: 100%;
    animation: ripple 0.6s linear infinite;
  }

  @keyframes ripple {
    0% {
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1), 0 0 0 20px rgba(0, 0, 0, 0.1), 0 0 0 40px rgba(1, 54, 52, 0.1), 0 0 0 60px rgba(0, 0, 0, 0.1);
    }

    100% {
      box-shadow: 0 0 0 20px rgba(0, 0, 0, 0.1), 0 0 0 40px rgba(0, 0, 0, 0.1), 0 0 0 60px rgba(1, 54, 52, 0.1), 0 0 0 80px rgba(0, 0, 0, 0);
    }
  }

  /* Media Queries for responsiveness */
  @media (max-width: 1024px) {
    .btn {
      font-size: 0.875rem; /* Smaller font size on smaller screens */
      padding: 0.75rem 1rem; /* Adjust padding */
      min-width: 130px; /* Adjust max width */
    }
  }

  @media (max-width: 768px) {
    .btn {
      font-size: 0.75rem; /* Smaller font size on smaller screens */
      padding: 0.5rem 0.75rem; /* Adjust padding */
      min-width: 50px; /* Adjust max width */
    }
  }
    @media (max-width: 425px) {
    .btn {
      font-size: 0.75rem; /* Smaller font size on smaller screens */
      padding: 0.5rem 0.75rem; /* Adjust padding */
      min-width: 100px; /* Adjust max width */
    }
  }
     @media (max-width: 320px) {
    .btn {
      font-size: 12px;
        padding: 5px;
        min-width: 75px;
    }
  }
`;

export default Button;
