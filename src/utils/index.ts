const OPEN_SCHEME = 'network.kasa.exchange://webview/landing';
const CLOSE_SCHEME = 'network.kasa.exchange://in-site/close';
const SHARE_SCHEME = 'network.kasa.exchange://share';

export interface OpenData {
  needSession: boolean;
  hideToolbar: boolean;
  url: string;
}

export const closeScheme = () => {
  document.location.href = CLOSE_SCHEME;
};

export const openScheme = ({ needSession, hideToolbar, url }: OpenData) => {
  const encodedUrl = encodeURIComponent(url);
  document.location.href = `${OPEN_SCHEME}?url=${encodedUrl}&needsession=${needSession}&hidetoolbar=${hideToolbar}`;
};

export const shareScheme = (data: Required<ShareData>) => {
  if (navigator.share) {
    navigator.share(data);
  } else {
    window.location.href = `${SHARE_SCHEME}?title=${encodeURIComponent(
      data.title
    )}&text=${encodeURIComponent(data.text)}&url=${encodeURIComponent(data.url)}`;
  }
};

export function openUrl(url: string) {
  window.open(url, '_blank');
}

export function webView(): boolean {
  const userAgent = navigator.userAgent.toLowerCase();
  const safari = /safari/.test(userAgent);
  const ios = /iphone|ipod|ipad/.test(userAgent);

  return ios ? !safari : userAgent.includes('wv');
}
