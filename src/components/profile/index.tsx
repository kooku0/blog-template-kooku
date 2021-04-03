import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

import { flutter } from '@/styles/animations';

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
  display: inline-block;
  font-size: 95%;
  padding: 5px 6px;
  font-weight: bolder;
  border-radius: 8px;
  transform-origin: center;
  animation: ${flutter} 2s infinite linear;
  color: #4287f5;
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
