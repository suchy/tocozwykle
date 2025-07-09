export function parseUserAgent(uaString: string) {
  const ua = uaString || navigator.userAgent;

  let browser = 'Unknown Browser';
  let browserVersion = '';
  let os = 'Unknown OS';

  // Detect browser and version
  if (/Chrome\/(\d+)/.test(ua) && !/Edg/.test(ua) && !/OPR/.test(ua)) {
    browser = 'Chrome';
    browserVersion = ua.match(/Chrome\/(\d+)/)?.[1] ?? '';
  } else if (/Firefox\/(\d+)/.test(ua)) {
    browser = 'Firefox';
    browserVersion = ua.match(/Firefox\/(\d+)/)?.[1] ?? '';
  } else if (/Safari\/(\d+)/.test(ua) && /Version\/(\d+)/.test(ua)) {
    browser = 'Safari';
    browserVersion = ua.match(/Version\/(\d+)/)?.[1] ?? '';
  } else if (/Edg\/(\d+)/.test(ua)) {
    browser = 'Edge';
    browserVersion = ua.match(/Edg\/(\d+)/)?.[1] ?? '';
  } else if (/OPR\/(\d+)/.test(ua)) {
    browser = 'Opera';
    browserVersion = ua.match(/OPR\/(\d+)/)?.[1] ?? '';
  }

  // Detect OS
  if (/Windows NT 10/.test(ua)) os = 'Windows 10';
  else if (/Windows NT 6.3/.test(ua)) os = 'Windows 8.1';
  else if (/Windows NT 6.2/.test(ua)) os = 'Windows 8';
  else if (/Windows NT 6.1/.test(ua)) os = 'Windows 7';
  else if (/Mac OS X 10[._](\d+)/.test(ua)) {
    const version = ua.match(/Mac OS X 10[._](\d+)/)?.[0]?.replace(/_/g, '.') ??
      '';
    os = 'macOS ' + version.split(' ')[2];
  } else if (/Android (\d+)/.test(ua)) {
    os = 'Android ' + ua.match(/Android (\d+)/)?.[1];
  } else if (/iPhone OS (\d+)/.test(ua)) {
    os = 'iOS ' + ua.match(/iPhone OS (\d+)/)?.[1];
  } else if (/Linux/.test(ua)) os = 'Linux';

  return `${browser} ${browserVersion} on ${os}`;
}
