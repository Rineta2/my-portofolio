if (!self.define) {
  let e,
    n = {};
  const s = (s, i) => (
    (s = new URL(s + ".js", i).href),
    n[s] ||
      new Promise((n) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = s), (e.onload = n), document.head.appendChild(e);
        } else (e = s), importScripts(s), n();
      }).then(() => {
        let e = n[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, a) => {
    const t =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (n[t]) return;
    let c = {};
    const d = (e) => s(e, t),
      r = { module: { uri: t }, exports: c, require: d };
    n[t] = Promise.all(i.map((e) => r[e] || d(e))).then((e) => (a(...e), c));
  };
}
define(["./workbox-4754cb34"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/app-build-manifest.json",
          revision: "62d52e7a0e96066e59b4a50125f7e945",
        },
        {
          url: "/_next/static/GxPydgngdnQnZiy7xm0B8/_buildManifest.js",
          revision: "bec9cdb23d5d34091ec3d5f1930fc226",
        },
        {
          url: "/_next/static/GxPydgngdnQnZiy7xm0B8/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/0e762574-011703246924a26f.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/216-3d4ae6d31c0f6946.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/396-6b68cbcaf85e1e6a.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/431-e2bbdbbf327b755f.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/457b8330-0af1b05000d5b84b.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/479ba886-f571c419e265b3c7.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/4bd1b696-d423d90662196d8c.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/517-eaa6fd0eab5be56d.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/565-9c14cb206589e35f.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/5e22fd23-6c3dc4320a29dd3e.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/66ec4792-b27893d81937669a.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/760-574672c881cfd9eb.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/807-ab6a486f7c38ab35.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/82-ff49beeaa24212f2.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/8e1d74a4-66a459686283935c.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/94730671-d3cd4c927a63087d.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/9c4e2130-0405e5ebb80e35e8.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/a0f462e1-5382cbe063c495e5.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/aaea2bcf-b0f09c3940012e15.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-f8753155084e82b1.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/app/admins/dashboard/about/form/page-f5746dd424b221d0.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/app/admins/dashboard/about/page-f1a292d0e5a71c62.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/app/admins/dashboard/page-db5edd7e3e6dabe5.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/app/admins/dashboard/skills/form/page-4ba94dbe91325b6f.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/app/admins/dashboard/skills/page-1ca401011dfec644.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/app/admins/layout-29e780b3f78fb77c.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/app/layout-c4c4b61d3b5bf03a.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/app/page-035a0939eb895088.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/b316c0d4-cec1cda5c81d4511.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/bc9e92e6-4292e7e336d16ff9.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/c15bf2b0-49893cd8c5c06636.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/e37a0b60-e58e45e1a3a1c327.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/framework-d29117d969504448.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/main-36689b4607280b40.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/main-app-420caa31ffe71399.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/pages/_app-d23763e3e6c904ff.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/pages/_error-9b7125ad1a1e68fa.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-5017aedd333ec01d.js",
          revision: "GxPydgngdnQnZiy7xm0B8",
        },
        {
          url: "/_next/static/css/8772661bc8d7df10.css",
          revision: "8772661bc8d7df10",
        },
        {
          url: "/_next/static/css/9b69930dd971feab.css",
          revision: "9b69930dd971feab",
        },
        {
          url: "/_next/static/css/dd4f07c81776c41a.css",
          revision: "dd4f07c81776c41a",
        },
        {
          url: "/_next/static/media/1d8a05b60287ae6c-s.woff2",
          revision: "dd2952a08bbf942e1ed616905cab12f1",
        },
        {
          url: "/_next/static/media/6f22fce21a7c433c-s.woff2",
          revision: "db4848d96b0e30ee12d7b0a924cf3b24",
        },
        {
          url: "/_next/static/media/77c207b095007c34-s.woff2",
          revision: "cd3472cf160eaa52572441cf930a93a4",
        },
        {
          url: "/_next/static/media/82ef96de0e8f4d8c-s.woff2",
          revision: "ddf8cb57367a47414aa2d47aab4041bc",
        },
        {
          url: "/_next/static/media/a6ecd16fa044d500-s.woff2",
          revision: "e63dd45b3f5d159b8ec974a3b183c060",
        },
        {
          url: "/_next/static/media/bd82c78e5b7b3fe9-s.woff2",
          revision: "9aee894ca91b94bee65c84906578850d",
        },
        {
          url: "/_next/static/media/c32c8052c071fc42-s.woff2",
          revision: "01b4a8bff3ad7fca1e516fd6e45f0794",
        },
        {
          url: "/_next/static/media/c4250770ab8708b6-s.p.woff2",
          revision: "4f069f9eb2ee449610e0e52a075b48ae",
        },
        {
          url: "/_next/static/media/img.ce2769a3.png",
          revision: "2e3ef72ce2ef9f027447c1c99e591504",
        },
        { url: "/manifest.json", revision: "49c68c07a8c6c00c52b8541ed4cde6a7" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: n,
              event: s,
              state: i,
            }) =>
              n && "opaqueredirect" === n.type
                ? new Response(n.body, {
                    status: 200,
                    statusText: "OK",
                    headers: n.headers,
                  })
                : n,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const n = e.pathname;
        return !n.startsWith("/api/auth/") && !!n.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});
