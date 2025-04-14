"use client"

import styled from "styled-components";

const ScatteredLinesStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;

  /* Create a dense grid pattern */
  &::before,
  &::after,
  & > div {
    content: '';
    position: absolute;
    background: #b0c4de; /* Grayish-blue color for blueprint look */
    opacity: 0.3; /* Lower opacity for a subtle effect */
  }

  /* Vertical line 1 */
  &::before {
    width: 1px;
    height: 100%;
    left: 10%;
    top: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      # b0c4de 5%,
      transparent 10%,
      #b0c4de 15%,
      transparent 20%,
      #b0c4de 25%,
      transparent 30%,
      #b0c4de 35%,
      transparent 40%,
      #b0c4de 45%,
      transparent 50%,
      #b0c4de 55%,
      transparent 60%,
      #b0c4de 65%,
      transparent 70%,
      #b0c4de 75%,
      transparent 80%,
      #b0c4de 85%,
      transparent 90%,
      #b0c4de 95%,
      transparent 100%
    );

    @media (max-width: 768px) {
      left: 5%;
    }

    @media (max-width: 480px) {
      left: 3%;
    }
  }

  /* Vertical line 2 */
  &::after {
    width: 1px;
    height: 100%;
    left: 20%;
    top: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      #b0c4de 5%,
      transparent 10%,
      #b0c4de 15%,
      transparent 20%,
      #b0c4de 25%,
      transparent 30%,
      #b0c4de 35%,
      transparent 40%,
      #b0c4de 45%,
      transparent 50%,
      #b0c4de 55%,
      transparent 60%,
      #b0c4de 65%,
      transparent 70%,
      #b0c4de 75%,
      transparent 80%,
      #b0c4de 85%,
      transparent 90%,
      #b0c4de 95%,
      transparent 100%
    );

    @media (max-width: 768px) {
      left: 15%;
    }

    @media (max-width: 480px) {
      left: 10%;
    }
  }

  /* Vertical line 3 */
  & > div:nth-child(1) {
    width: 1px;
    height: 100%;
    left: 30%;
    top: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      #b0c4de 5%,
      transparent 10%,
      #b0c4de 15%,
      transparent 20%,
      #b0c4de 25%,
      transparent 30%,
      #b0c4de 35%,
      transparent 40%,
      #b0c4de 45%,
      transparent 50%,
      #b0c4de 55%,
      transparent 60%,
      #b0c4de 65%,
      transparent 70%,
      #b0c4de 75%,
      transparent 80%,
      #b0c4de 85%,
      transparent 90%,
      #b0c4de 95%,
      transparent 100%
    );

    @media (max-width: 768px) {
      left: 25%;
    }

    @media (max-width: 480px) {
      left: 20%;
    }
  }

  /* Vertical line 4 */
  & > div:nth-child(2) {
    width: 1px;
    height: 100%;
    left: 40%;
    top: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      #b0c4de 5%,
      transparent 10%,
      #b0c4de 15%,
      transparent 20%,
      #b0c4de 25%,
      transparent 30%,
      #b0c4de 35%,
      transparent 40%,
      #b0c4de 45%,
      transparent 50%,
      #b0c4de 55%,
      transparent 60%,
      #b0c4de 65%,
      transparent 70%,
      #b0c4de 75%,
      transparent 80%,
      #b0c4de 85%,
      transparent 90%,
      #b0c4de 95%,
      transparent 100%
    );

    @media (max-width: 768px) {
      left: 35%;
    }

    @media (max-width: 480px) {
      left: 30%;
    }
  }

  /* Vertical line 5 */
  & > div:nth-child(3) {
    width: 1px;
    height: 100%;
    left: 50%;
    top: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      #b0c4de 5%,
      transparent 10%,
      #b0c4de 15%,
      transparent 20%,
      #b0c4de 25%,
      transparent 30%,
      #b0c4de 35%,
      transparent 40%,
      #b0c4de 45%,
      transparent 50%,
      #b0c4de 55%,
      transparent 60%,
      #b0c4de 65%,
      transparent 70%,
      #b0c4de 75%,
      transparent 80%,
      #b0c4de 85%,
      transparent 90%,
      #b0c4de 95%,
      transparent 100%
    );

    @media (max-width: 768px) {
      left: 45%;
    }

    @media (max-width: 480px) {
      left: 40%;
    }
  }

  /* Vertical line 6 */
  & > div:nth-child(4) {
    width: 1px;
    height: 100%;
    left: 60%;
    top: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      #b0c4de 5%,
      transparent 10%,
      #b0c4de 15%,
      transparent 20%,
      #b0c4de 25%,
      transparent 30%,
      #b0c4de 35%,
      transparent 40%,
      #b0c4de 45%,
      transparent 50%,
      #b0c4de 55%,
      transparent 60%,
      #b0c4de 65%,
      transparent 70%,
      #b0c4de 75%,
      transparent 80%,
      #b0c4de 85%,
      transparent 90%,
      #b0c4de 95%,
      transparent 100%
    );

    @media (max-width: 768px) {
      left: 55%;
    }

    @media (max-width: 480px) {
      left: 50%;
    }
  }

  /* Vertical line 7 */
  & > div:nth-child(5) {
    width: 1px;
    height: 100%;
    left: 70%;
    top: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      #b0c4de 5%,
      transparent 10%,
      #b0c4de 15%,
      transparent 20%,
      #b0c4de 25%,
      transparent 30%,
      #b0c4de 35%,
      transparent 40%,
      #b0c4de 45%,
      transparent 50%,
      #b0c4de 55%,
      transparent 60%,
      #b0c4de 65%,
      transparent 70%,
      #b0c4de 75%,
      transparent 80%,
      #b0c4de 85%,
      transparent 90%,
      #b0c4de 95%,
      transparent 100%
    );

    @media (max-width: 768px) {
      left: 65%;
    }

    @media (max-width: 480px) {
      left: 60%;
    }
  }

  /* Vertical line 8 */
  & > div:nth-child(6) {
    width: 1px;
    height: 100%;
    left: 80%;
    top: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      #b0c4de 5%,
      transparent 10%,
      #b0c4de 15%,
      transparent 20%,
      #b0c4de 25%,
      transparent 30%,
      #b0c4de 35%,
      transparent 40%,
      #b0c4de 45%,
      transparent 50%,
      #b0c4de 55%,
      transparent 60%,
      #b0c4de 65%,
      transparent 70%,
      #b0c4de 75%,
      transparent 80%,
      #b0c4de 85%,
      transparent 90%,
      #b0c4de 95%,
      transparent 100%
    );

    @media (max-width: 768px) {
      left: 75%;
    }

    @media (max-width: 480px) {
      left: 70%;
    }
  }

  /* Vertical line 9 */
  & > div:nth-child(7) {
    width: 1px;
    height: 100%;
    left: 90%;
    top: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      #b0c4de 5%,
      transparent 10%,
      #b0c4de 15%,
      transparent 20%,
      #b0c4de 25%,
      transparent 30%,
      #b0c4de 35%,
      transparent 40%,
      #b0c4de 45%,
      transparent 50%,
      #b0c4de 55%,
      transparent 60%,
      #b0c4de 65%,
      transparent 70%,
      #b0c4de 75%,
      transparent 80%,
      #b0c4de 85%,
      transparent 90%,
      #b0c4de 95%,
      transparent 100%
    );

    @media (max-width: 768px) {
      left: 85%;
    }

    @media (max-width: 480px) {
      left: 80%;
    }
  }

  /* Horizontal line 1 */
  & > div:nth-child(8) {
    width: 100%;
    height: 1px;
    top: 10%;
    left: 0;
    background: linear-gradient(
      to right,
      transparent 0%,
      #b0c4de 5%,
      transparent 10%,
      #b0c4de 15%,
      transparent 20%,
      #b0c4de 25%,
      transparent 30%,
      #b0c4de 35%,
      transparent 40%,
      #b0c4de 45%,
      transparent 50%,
      #b0c4de 55%,
      transparent 60%,
      #b0c4de 65%,
      transparent 70%,
      #b0c4de 75%,
      transparent 80%,
      #b0c4de 85%,
      transparent 90%,
      #b0c4de 95%,
      transparent 100%
    );

    @media (max-width: 768px) {
      top: 15%;
    }

    @media (max-width: 480px) {
      top: 20%;
    }
  }

  /* Horizontal line 2 */
  & > div:nth-child(9) {
    width: 100%;
    height: 1px;
    top: 20%;
    left: 0;
    background: linear-gradient(
      to right,
      transparent 0%,
      #b0c4de 5%,
      transparent 10%,
      #b0c4de 15%,
      transparent 20%,
      #b0c4de 25%,
      transparent 30%,
      #b0c4de 35%,
      transparent 40%,
      #b0c4de 45%,
      transparent 50%,
      #b0c4de 55%,
      transparent 60%,
      #b0c4de 65%,
      transparent 70%,
      #b0c4de 75%,
      transparent 80%,
      #b0c4de 85%,
      transparent 90%,
      #b0c4de 95%,
      transparent 100%
    );

    @media (max-width: 768px) {
      top: 25%;
    }

    @media (max-width: 480px) {
      top: 30%;
    }
  }

  /* Horizontal line 3 */
  & > div:nth-child(10) {
    width: 100%;
    height: 1px;
    top: 30%;
    left: 0;
    background: linear-gradient(
      to right,
      transparent 0%,
      #b0c4de 5%,
      transparent 10%,
      #b0c4de 15%,
      transparent 20%,
      #b0c4de 25%,
      transparent 30%,
      #b0c4de 35%,
      transparent 40%,
      #b0c4de 45%,
      transparent 50%,
      #b0c4de 55%,
      transparent 60%,
      #b0c4de 65%,
      transparent 70%,
      #b0c4de 75%,
      transparent 80%,
      #b0c4de 85%,
      transparent 90%,
      #b0c4de 95%,
      transparent 100%
    );

    @media (max-width: 768px) {
      top: 35%;
    }

    @media (max-width: 480px) {
      top: 40%;
    }
  }

  /* Horizontal line 4 */
  & > div:nth-child(11) {
    width: 100%;
    height: 1px;
    top: 40%;
    left: 0;
    background: linear-gradient(
      to right,
      transparent 0%,
      #b0c4de 5%,
      transparent 10%,
      #b0c4de 15%,
      transparent 20%,
      #b0c4de 25%,
      transparent 30%,
      #b0c4de 35%,
      transparent 40%,
      #b0c4de 45%,
      transparent 50%,
      #b0c4de 55%,
      transparent 60%,
      #b0c4de 65%,
      transparent 70%,
      #b0c4de 75%,
      transparent 80%,
      #b0c4de 85%,
      transparent 90%,
      #b0c4de 95%,
      transparent 100%
    );

    @media (max-width: 768px) {
      top: 45%;
    }

    @media (max-width: 480px) {
      top: 50%;
    }
  }

  /* Horizontal line 5 */
  & > div:nth-child(12) {
    width: 100%;
    height: 1px;
    top: 50%;
    left: 0;
    background: linear-gradient(
      to right,
      transparent 0%,
      #b0c4de 5%,
      transparent 10%,
      #b0c4de 15%,
      transparent 20%,
      #b0c4de 25%,
      transparent 30%,
      #b0c4de 35%,
      transparent 40%,
      #b0c4de 45%,
      transparent 50%,
      #b0c4de 55%,
      transparent 60%,
      #b0c4de 65%,
      transparent 70%,
      #b0c4de 75%,
      transparent 80%,
      #b0c4de 85%,
      transparent 90%,
      #b0c4de 95%,
      transparent 100%
    );

    @media (max-width: 768px) {
      top: 55%;
    }

    @media (max-width: 480px) {
      top: 60%;
    }
  }

  /* Horizontal line 6 */
  & > div:nth-child(13) {
    width: 100%;
    height: 1px;
    top: 60%;
    left: 0;
    background: linear-gradient(
      to right,
      transparent 0%,
      #b0c4de 5%,
      transparent 10%,
      #b0c4de 15%,
      transparent 20%,
      #b0c4de 25%,
      transparent 30%,
      #b0c4de 35%,
      transparent 40%,
      #b0c4de 45%,
      transparent 50%,
      #b0c4de 55%,
      transparent 60%,
      #b0c4de 65%,
      transparent 70%,
      #b0c4de 75%,
      transparent 80%,
      #b0c4de 85%,
      transparent 90%,
      #b0c4de 95%,
      transparent 100%
    );

    @media (max-width: 768px) {
      top: 65%;
    }

    @media (max-width: 480px) {
      top: 70%;
    }
  }

  /* Horizontal line 7 */
  & > div:nth-child(14) {
    width: 100%;
    height: 1px;
    top: 70%;
    left: 0;
    background: linear-gradient(
      to right,
      transparent 0%,
      #b0c4de 5%,
      transparent 10%,
      #b0c4de 15%,
      transparent 20%,
      #b0c4de 25%,
      transparent 30%,
      #b0c4de 35%,
      transparent 40%,
      #b0c4de 45%,
      transparent 50%,
      #b0c4de 55%,
      transparent 60%,
      #b0c4de 65%,
      transparent 70%,
      #b0c4de 75%,
      transparent 80%,
      #b0c4de 85%,
      transparent 90%,
      #b0c4de 95%,
      transparent 100%
    );

    @media (max-width: 768px) {
      top: 75%;
    }

    @media (max-width: 480px) {
      top: 80%;
    }
  }

  /* Horizontal line 8 */
  & > div:nth-child(15) {
    width: 100%;
    height: 1px;
    top: 80%;
    left: 0;
    background: linear-gradient(
      to right,
      transparent 0%,
      #b0c4de 5%,
      transparent 10%,
      #b0c4de 15%,
      transparent 20%,
      #b0c4de 25%,
      transparent 30%,
      #b0c4de 35%,
      transparent 40%,
      #b0c4de 45%,
      transparent 50%,
      #b0c4de 55%,
      transparent 60%,
      #b0c4de 65%,
      transparent 70%,
      #b0c4de 75%,
      transparent 80%,
      #b0c4de 85%,
      transparent 90%,
      #b0c4de 95%,
      transparent 100%
    );

    @media (max-width: 768px) {
      top: 85%;
    }

    @media (max-width: 480px) {
      top: 90%;
    }
  }

  /* Horizontal line 9 */
  & > div:nth-child(16) {
    width: 100%;
    height: 1px;
    top: 90%;
    left: 0;
    background: linear-gradient(
      to right,
      transparent 0%,
      #b0c4de 5%,
      transparent 10%,
      #b0c4de 15%,
      transparent 20%,
      #b0c4de 25%,
      transparent 30%,
      #b0c4de 35%,
      transparent 40%,
      #b0c4de 45%,
      transparent 50%,
      #b0c4de 55%,
      transparent 60%,
      #b0c4de 65%,
      transparent 70%,
      #b0c4de 75%,
      transparent 80%,
      #b0c4de 85%,
      transparent 90%,
      #b0c4de 95%,
      transparent 100%
    );

    @media (max-width: 768px) {
      top: 95%;
    }

    @media (max-width: 480px) {
      top: 100%;
    }
  }
`;

export default function ScatteredLines() {
  return (
    <ScatteredLinesStyled>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </ScatteredLinesStyled>
  );
}