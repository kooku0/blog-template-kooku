/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { DOMElement, ReactElement, useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { mdiClose, mdiHeart, mdiHeartOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';

import CoverImage from '@/components/cover-image';
import { listTags } from '@/lib/tags';
import color from '@/styles';
import StyledButton from '@/styles/button';
import SectionContainer from '@/styles/container/SectionContainer';
import MarkdownStyle from '@/styles/MarkdownStyle';
import { closeScheme, openScheme, openUrl, shareScheme, webView } from '@/utils';

const LayoutContainer = styled.div`
  position: relative;
`;

const NavBar = styled.nav<{ isWebView: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  opacity: ${({ isWebView }) => (isWebView ? 1 : 0)};
  transition: all 0.3s ease-in-out;
  transition-delay: 0.4s;
  padding-left: 16px;
  padding-right: 16px;
  z-index: 999;
  height: 48px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavIconContainer = styled.div`
  & > img {
    margin-left: 20px;
  }
`;

const SvgIcon = styled.img``;

const Article = styled.article<{ isWebView: boolean }>`
  ${({ theme }) => theme.media.mobile} {
    transform: ${({ isWebView }) => isWebView && 'translateY(48px)'};
    transition: all 0.5s ease-in-out;
  }
`;

const Container = styled.div`
  ${SectionContainer};
  position: relative;
  padding-top: 24px;
  padding-bottom: 32px;
`;

const Tag = styled.span`
  color: ${({ theme }) => theme.color.grey500};
  font-size: 14px;
  font-weight: bold;
  line-height: 1.57;
  margin-right: 8px;
`;

const Title = styled.h1`
  margin: 8px 0 24px 0;
  font-size: 26px;
  font-weight: bold;
  line-height: 1.38;
  color: black;
`;

const Contents = styled.div`
  font-size: 16px;
  font-weight: normal;
  line-height: 1.63;
  min-height: 320px;
  color: ${({ theme }) => theme.color.grey800};
`;

const Markdown = styled.div`
  ${MarkdownStyle};
  font-size: 18px;
`;

const ButtonContainer = styled.div<{ isWebView: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 48px;
  justify-content: center;
  ${({ theme }) => theme.media.mobile} {
    margin-bottom: ${({ isWebView }) => (isWebView ? '0' : '86px')};
    transition: all 1s ease-in-out;
  }
  button {
    width: 240px;
    height: 48px;
    border: none;
    margin: 8px auto;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    padding: 16px;
    justify-content: center;
    position: relative;
    cursor: pointer;
  }
`;

const LikeButton = styled.button<{ isLike: boolean }>`
  margin-bottom: 16px;
  background-color: ${({ theme, isLike }) => (isLike ? theme.color.grey70 : theme.color.blue50)};
  color: ${({ theme, isLike }) => (isLike ? theme.color.grey350 : theme.color.blue700)};
  & > svg {
    position: absolute;
    left: 16px;
  }
`;

const ShareButton = styled.button`
  ${({ theme }) => theme.media.desktop} {
    visibility: hidden;
  }
  background-color: ${({ theme }) => theme.color.grey300};
  color: ${({ theme }) => theme.color.grey600};
  & > img {
    position: absolute;
    left: 16px;
  }
`;

function PostLayout({ children, frontMatter }: any) {
  const [isLike, setIsLike] = useState(false);
  const [isWebView, setIsWebView] = useState<null | boolean>(null);

  const { title, date, slug, tags, __resourcePath } = frontMatter;
  const tagList = listTags();
  const router = useRouter();

  useEffect(() => {
    const { shared } = router.query;

    if (shared) {
      setIsWebView(!JSON.parse(shared as string));
    } else if (navigator) {
      setIsWebView(webView());
    }

    function handleClickEvent(e: MouseEvent) {
      const origin = (e.target as Element)?.closest('a');

      if (origin) {
        e.preventDefault();
        if (shared && JSON.parse(shared as string)) {
          window.open((e.target as HTMLAnchorElement).href, '_blank', 'noopener');
        } else {
          openScheme({
            url: (e.target as HTMLAnchorElement).href,
            needSession: false,
            hideToolbar: true
          });
        }
      }
    }

    document.addEventListener('click', handleClickEvent);

    return () => document.removeEventListener('click', handleClickEvent);
  }, [router]);

  useEffect(() => {
    try {
      const likes: string[] = JSON.parse(localStorage.getItem('likes') ?? '[]');
      if (likes.indexOf(slug) !== -1) {
        setIsLike(true);
      } else {
        setIsLike(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const toggleLike = useCallback(() => {
    try {
      const likes: string[] = JSON.parse(localStorage.getItem('likes') ?? '[]');
      if (isLike) {
        likes.splice(likes.indexOf(slug), 1);
      } else {
        likes.push(slug);
      }
      localStorage.setItem('likes', JSON.stringify(likes));
      setIsLike(!isLike);
    } catch (error) {
      console.error(error);
    }
  }, [isLike]);

  const closePost = useCallback(() => {
    router.replace('/');
  }, []);

  const shareLink = useCallback(() => {
    const data = {
      title,
      text: `${title}`,
      url: `${window.location.origin}/${__resourcePath.replace('mdx', 'html')}?shared=true`
    };

    shareScheme(data);
  }, [isWebView]);

  return (
    <>
      <Head>
        <title>카사 - {title}</title>
      </Head>
      <LayoutContainer>
        <NavBar isWebView={isWebView === true}>
          <div onClick={closePost}>
            <Icon path={mdiClose} size="24" color={color.grey600} />
          </div>

          <NavIconContainer className="like-button">
            <SvgIcon
              onClick={toggleLike}
              src={isLike ? '/icon/like-on.svg' : '/icon/like-off.svg'}
              className="like-button"
              alt="like"
              height="24"
              width="24"
            />
            <SvgIcon onClick={shareLink} src="/icon/share.svg" alt="share" height="24" width="24" />
          </NavIconContainer>
        </NavBar>

        <Article isWebView={isWebView === true}>
          <Container>
            <section>
              {tags.map((tag: string) => (
                <Tag key={tag}>{tagList.find(({ slug }) => slug === tag)?.name}</Tag>
              ))}
              <header>
                <Title>{title}</Title>
              </header>

              <Contents>
                <Markdown>{children}</Markdown>
              </Contents>

              <ButtonContainer isWebView={isWebView === true}>
                <LikeButton onClick={toggleLike} isLike={isLike} className="like-button">
                  <Icon
                    className="like-button"
                    path={isLike ? mdiHeart : mdiHeartOutline}
                    color={isLike ? color.grey350 : color.blue700}
                    size="20"
                  />
                  도움을 받았어요
                </LikeButton>

                <ShareButton onClick={shareLink} className="share-button">
                  <SvgIcon
                    src="/icon/share.svg"
                    alt="share"
                    height="20"
                    width="20"
                    className="share-button"
                  />
                  공유하기
                </ShareButton>
              </ButtonContainer>
            </section>
          </Container>
        </Article>
      </LayoutContainer>
    </>
  );
}

export default PostLayout;
