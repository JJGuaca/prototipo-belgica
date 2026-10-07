Drupal.behaviors.responsiveEmbeddedVideos={attach(i){const e=i.querySelectorAll('iframe[src*="youtube.com"]','iframe[src*="vimeo.com"]');e&&Array.from(e).forEach(t=>{const o=t.getAttribute("width"),r=t.getAttribute("height"),s=`${o} / ${r}`,c=t.parentNode;c.style.aspectRatio=s,t.removeAttribute("height"),t.removeAttribute("width")})}};
//# sourceMappingURL=video-embed.js.map
