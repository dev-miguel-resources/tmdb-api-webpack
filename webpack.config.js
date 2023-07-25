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
  plugins: [ // plugin de soporte de webpack para entornos modernos de react (v18.0 en adelante)
    new webpack.ProvidePlugin({
       React: "react", 
    }),
  ],
}
