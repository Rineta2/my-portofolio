if(!self.define){let s,e={};const t=(t,c)=>(t=new URL(t+".js",c).href,e[t]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=t,s.onload=e,document.head.appendChild(s)}else s=t,importScripts(t),e()})).then((()=>{let s=e[t];if(!s)throw new Error(`Module ${t} didn’t register its module`);return s})));self.define=(c,a)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let i={};const r=s=>t(s,n),o={module:{uri:n},exports:i,require:r};e[n]=Promise.all(c.map((s=>o[s]||r(s)))).then((s=>(a(...s),i)))}}define(["./workbox-4754cb34"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"bf3457f4d471b3d1ad1327832ad4dcb3"},{url:"/_next/static/ZJsCr5Utbwr4D7zJJA6Tc/_buildManifest.js",revision:"d1fda48f87aba9865251c637442549a0"},{url:"/_next/static/ZJsCr5Utbwr4D7zJJA6Tc/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0e762574-4bc3ef966a171a11.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/1082-bdb0c288fa67a263.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/1492-f4d0ab5f12d17cb6.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/1517-0363f82468436b09.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/2899.c9cb3826d92dcdd7.js",revision:"c9cb3826d92dcdd7"},{url:"/_next/static/chunks/3770-0cddefc705a424e4.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/3807-0b8f2d9df5ddf2d3.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/457b8330-8e374ef713a56e64.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/4626-fa58f0b6cfa99e01.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/479ba886-40a3481803332f22.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/4811-51461f3e20f4b453.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/4bd1b696-17ee07872329a96b.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/5037-a6a9eede36d8d2fa.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/5565-7f00952a8231d963.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/5805-183a62d8baca4c36.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/5e22fd23-c348781b3baf5c53.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/602dbae6-78f2eef0993b96bc.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/6488-d5d15a4d377bf77a.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/66ec4792-d027110646259755.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/7396-053aedee70fba203.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/7627-1d10945fcc96e68e.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/795d4814-37e3b8e5f9d2b104.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/8.28025a0859d3d64d.js",revision:"28025a0859d3d64d"},{url:"/_next/static/chunks/8e1d74a4-c48ea9f503ea6722.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/94730671-5ae5d821cf014d97.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/9c4e2130-2bf68c6b9b8f83be.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/a0f462e1-d4b3e944f9279fbd.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/aaea2bcf-eb110daf93f23d58.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/app/_not-found/page-38d97db362d8e3ee.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/app/admins/dashboard/about/form/page-e34e2f73548540d9.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/app/admins/dashboard/about/page-0c70983fda2fc286.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/app/admins/dashboard/achievement/form/page-f2e238ab4c21c89e.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/app/admins/dashboard/achievement/page-7398fc32140bc9f0.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/app/admins/dashboard/page-bb0423c0e811d983.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/app/admins/dashboard/project/category/page-601792718df050af.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/app/admins/dashboard/project/form/page-335b8831ab7dca3b.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/app/admins/dashboard/project/page-e07feb670ec20cb9.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/app/admins/dashboard/project/tech-stack/page-2376776193da6f6f.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/app/admins/dashboard/settings/page-20c1caa4d3ded5f7.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/app/admins/dashboard/skills/form/page-7e9ce5edd02f064c.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/app/admins/dashboard/skills/page-f4cf3539348378b4.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/app/admins/layout-f72b642d4d3cb185.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/app/layout-951acfb8bd0b45e6.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/app/page-310af6a670925b46.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/app/portofolio/page-b969e987a00478df.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/b316c0d4-63c38a74a99a9e75.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/bc9e92e6-9b2eab7b70556beb.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/c15bf2b0-135c4fed28b29963.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/e37a0b60-0958e6073d3a81a8.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/framework-1ec85e83ffeb8a74.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/main-2a04b2919db03742.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/main-app-063569e615baf48c.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/pages/_app-5f03510007f8ee45.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/pages/_error-8efa4fbf3acc0458.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-7a0ad63c0f386b8f.js",revision:"ZJsCr5Utbwr4D7zJJA6Tc"},{url:"/_next/static/css/5ffc76fbbe15378a.css",revision:"5ffc76fbbe15378a"},{url:"/_next/static/css/a440c1da9515b0fe.css",revision:"a440c1da9515b0fe"},{url:"/_next/static/css/b0cebeae48f95ea7.css",revision:"b0cebeae48f95ea7"},{url:"/_next/static/css/fc1cd629fa9b1f65.css",revision:"fc1cd629fa9b1f65"},{url:"/_next/static/media/1d8a05b60287ae6c-s.woff2",revision:"dd2952a08bbf942e1ed616905cab12f1"},{url:"/_next/static/media/6f22fce21a7c433c-s.woff2",revision:"db4848d96b0e30ee12d7b0a924cf3b24"},{url:"/_next/static/media/77c207b095007c34-s.woff2",revision:"cd3472cf160eaa52572441cf930a93a4"},{url:"/_next/static/media/82ef96de0e8f4d8c-s.woff2",revision:"ddf8cb57367a47414aa2d47aab4041bc"},{url:"/_next/static/media/a6ecd16fa044d500-s.woff2",revision:"e63dd45b3f5d159b8ec974a3b183c060"},{url:"/_next/static/media/bd82c78e5b7b3fe9-s.woff2",revision:"9aee894ca91b94bee65c84906578850d"},{url:"/_next/static/media/c32c8052c071fc42-s.woff2",revision:"01b4a8bff3ad7fca1e516fd6e45f0794"},{url:"/_next/static/media/c4250770ab8708b6-s.p.woff2",revision:"4f069f9eb2ee449610e0e52a075b48ae"},{url:"/_next/static/media/img.ce2769a3.png",revision:"2e3ef72ce2ef9f027447c1c99e591504"},{url:"/icon.png",revision:"5cae498698469bb2becf76d4108776f3"},{url:"/manifest.json",revision:"863e695d80567e1f03b0c7e88eceaac7"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:s,response:e,event:t,state:c})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp4)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;const e=s.pathname;return!e.startsWith("/api/auth/")&&!!e.startsWith("/api/")}),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;return!s.pathname.startsWith("/api/")}),new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>!(self.origin===s.origin)),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
