import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  border-radius: 100%;
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 12px;
`;

const Contents = styled.div`
  & > span {
    font-size: 90%;
    margin-right: 4px;
    color: #7d7d7d;
    font-weight: 600;
  }
`;

const AuthorName = styled.div`
  @keyframes flutter {
    0% {
      transform: rotate(0deg);
    }
    35% {
      transform: rotate(0deg);
    }
    40% {
      transform: rotate(-5deg);
    }
    60% {
      transform: rotate(5deg);
    }
    65% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  display: inline-block;
  font-size: 95%;
  padding: 5px 6px;
  font-weight: bolder;
  border-radius: 8px;
  transform-origin: center;
  animation: flutter 2s infinite linear;
  color: #7d7d7d;
  background-color: #ecf0f2;
`;

const SocialLink = styled.div`
  margin-top: 4px;
  font-size: 85%;
  font-weight: 700;
`;

const Profile: React.FC = () => {
  return (
    <Container>
      <Image src="/profile.png" alt="profile" width="80" height="80" />
      <Contents>
        <span>Written by</span>
        <AuthorName>
          <span>@kooku</span>
        </AuthorName>
        <SocialLink>
          <a href="https://github.com/kooku94" rel="noreferrer">
            GitHub
          </a>
        </SocialLink>
      </Contents>
    </Container>
  );
};

export default Profile;
