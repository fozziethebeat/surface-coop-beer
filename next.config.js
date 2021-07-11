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
  webpack: function (config, { dev, isServer }) {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    if (!dev) {
      config.plugins.push(
        new CopyPlugin({
          patterns: [
            { from: "prisma/brew_db/brewDB.sqlite", to: "brewDB.sqlite" },
          ],
        })
      );
    }

    return config;
  },
};
