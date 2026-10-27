// Configuración de Jasmine + Karma para componentes React y lógica del catálogo.
module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],
    files: ["tests/**/*.spec.tsx"],
    preprocessors: { "tests/**/*.spec.tsx": ["webpack"] },
    webpack: {
      mode: "development",
      devtool: "inline-source-map",
      resolve: { extensions: [".tsx", ".ts", ".js", ".jsx"] },
      module: {
        rules: [
          {
            test: /\.[jt]sx?$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  ["@babel/preset-env", { targets: { chrome: "155" } }],
                  ["@babel/preset-react", { runtime: "automatic" }],
                  ["@babel/preset-typescript", { allExtensions: true, isTSX: true }]
                ]
              }
            }
          }
        ]
      }
    },
    reporters: ["progress"],
    browsers: ["ChromeHeadless"],
    singleRun: true,
    client: { clearContext: false },
    browserNoActivityTimeout: 60000,
    webpackMiddleware: { stats: "errors-only" }
  });
};
