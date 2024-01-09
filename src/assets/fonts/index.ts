import NunitoLight from "./Nunito-Light.ttf";
import NunitoRegular from "./Nunito-Regular.ttf";
import NunitoMedium from "./Nunito-Medium.ttf";
import NunitoSemiBold from "./Nunito-SemiBold.ttf";

const fonts = `
  @font-face {
    font-family: 'Nunito-Light';
    src: url(${NunitoLight});
  }

  @font-face {
    font-family: 'Nunito-Regular';
    src: url(${NunitoRegular});
  }

  @font-face {
    font-family: 'Nunito-Medium';
    src: url(${NunitoMedium});
  }
  
  @font-face {
    font-family: 'Nunito-SemiBold';
    src: url(${NunitoSemiBold});
  }
`;

export default fonts;
