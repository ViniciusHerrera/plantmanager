// Cria um tipo de definição no typescript para aceitar imagens png
declare module '*.png' {
  const content: any;
  export default content;
}