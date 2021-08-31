import axios from 'axios';
import * as tiktok from 'tiktok-scraper';

export async function returnVideo(videoUrl: string, headers: any) {
  const res = await axios.get(videoUrl, {
    headers: { ...headers },
    responseType: 'stream',
  });

  return { data: res.data, headers: res.headers };
}

export function getMetaTags(data: tiktok.Result, protocol: string, hostname: string, vmId: string): string {
  const videoData = data.collector[0];
  const CONSTS = {
    siteTitle: `TikTok (${hostname})`,
    title: `@${videoData.authorMeta.name} on TikTok`,
    description: (!videoData.text || videoData.text === '' ? `@${videoData.authorMeta.name}` : videoData.text.length > 152 ? `${videoData.text.substring(151)}...` : videoData.text).replace('<', '').replace('>', '').replace('"', "'"),
    url: `${protocol}://${hostname}/${vmId}.mp4`,
    tikTokUrl: `https://vm.tiktok.com/${vmId}`,
  };

  const topTags = ['<html>', '<head>'];

  const metaTags = [
    '<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />',
    '<meta content="#ee1d52" name="theme-color" />',
    `<meta property="og:site_name" content="${CONSTS.siteTitle}">`,
    '<meta name="twitter:card" content="player" />',
    `<meta name="twitter:title" content="${CONSTS.title}" />`,
    `<meta name="twitter:player" content="${CONSTS.url}" />`,
    `<meta property="twitter:description" content="${CONSTS.description}" />`,
    `<meta name="og:url" content="${CONSTS.tikTokUrl}" />`,
    `<meta property="og:video" content="${CONSTS.url}" />`,
    `<meta property="og:video:secure_url" content="${CONSTS.url}" />`,
    '<meta property="og:video:type" content="video/mp4" />',
    `<meta property="og:title" content="${CONSTS.title}" />`,
    `<meta property="og:description" content="${CONSTS.description}" />`,
    `<link rel="alternate" href="${protocol}://${hostname}/oembed.json?description=${encodeURIComponent(CONSTS.description)}&title=${encodeURIComponent(CONSTS.title)}&url=${encodeURIComponent(CONSTS.tikTokUrl)}&siteTitle=${encodeURIComponent(CONSTS.siteTitle)}&siteUrl=${encodeURIComponent(protocol + '://' + hostname)}" type="application/json+oembed" title="@CRUGG on TikTok">`,
  ];

  const bottomTags = ['</head>', '</html>'];

  return [...topTags, ...metaTags, ...bottomTags].join('\n');
}
