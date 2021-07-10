const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  async redirects() {
    return [
      {
        source: "/beer/american-wheat-ale-round-1",
        destination: "/beer/american-wheat-ale",
        permanent: true,
      },
      {
        source: "/beer/camomile-wheat-ale-round-1",
        destination: "/beer/chamomile-wit",
        permanent: true,
      },
      {
        source: "/beer/english-wheat-ale-round-1",
        destination: "/beer/english-wheat-ale",
        permanent: true,
      },
      {
        source: "/beer/hakuba-saison-round-1",
        destination: "/beer/hakuba-saison",
        permanent: true,
      },
      {
        source: "/beer/half-smash-round-1",
        destination: "/beer/half-smash",
        permanent: true,
      },
      {
        source: "/beer/wheaty-black-ale-round-1",
        destination: "/beer/wheaty-black-ale",
        permanent: true,
      },
      {
        source: "/beer/maybe-stout-round-1",
        destination: "/beer/maybe-stout",
        permanent: true,
      },
    ];
  },
  target: "serverless",
  future: {
    webpack5: true,
  },
  webpack: function (config, { dev, isServer }) {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    // copy files you're interested in
    if (!dev) {
      config.plugins.push(
        new CopyPlugin({
          patterns: [{ from: "prisma/brewDB.sqlite", to: "brewDB.sqlite" }],
        })
      );
    }

    return config;
  },
};
