import React, { ReactChild, useCallback } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

const Container = styled.div<{ width?: number }>`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: 100%;
  overflow: hidden;
  cursor: pointer;
`;

interface CardProps {
  coverImage: string;
  width?: number;
  to: string;
  children: ReactChild | ReactChild[];
}

const Card: React.FC<CardProps> = ({ width, to, children }) => {
  return (
    <Link href={to}>
      <Container width={width}>
        <div>{children}</div>
      </Container>
    </Link>
  );
};

export default React.memo(Card);
