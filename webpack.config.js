const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production', // especificación del entorno que vamos a optimizar mediante el build
  entry: './src/index.js', // especificación de archivo de arranque o de entrada a mi app
  output: {
    // especificación de salida para mis archivos generados por el build
    path: path.join(__dirname, 'public'), // me permite asociarlo a un directorio en la raíz con un nombre x
    filename: 'bundle.js', // me permite al archivo con la salida del js darle un nombre
  },
  module: {
    rules: [
      // defino un módulo de reglas para que webpack pueda interpretar todos los recursos de mi app con sus respectivas extensiones
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // me permite definir un array de loaders para la interpretación de ciertos recursos
      },
      /*{
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },*/
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              disable: true, // ignore la verificación de versiones de webpack
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // plugin de soporte de webpack para entornos modernos de react (v18.0 en adelante)
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
  resolve: { // soporte de ayuda en la resolución de archivos .js, .jsx para entornos de react
    extensions: ['.js', '.jsx'],
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'error' : false,
    maxEntrypointSize: 50000, // bytes -> verificación de los recursos de js para mejorar su performance
    maxAssetSize: 50000, // bytes -> verificación de recursos estáticos: css, images, etc....
  },
  devtool: 'source-map', // observable que también me entrega informes por la terminal de procesos que no sean de performance
  devServer: {
    proxy: {
      // servidor de prueba que se levantará a partir del código optimizado del build
      '/api': {
        // la referencia interna de ruta del server
        target: 'http://127.0.0.1:8080', // la ruta de exposición
        changeOrigin: true, // habilitar este nuevo origen
        secure: false, // para que no requiere certificado
        pathRewrite: {
          '^/api': '/api', // traspaso de app (local con el build) -> api test
        },
      },
    },
    static: path.resolve(__dirname, 'public'), // es la especificación para ya resolver el traspaso de los recursos optimizados al directorio definido en la raíz
  },
}
