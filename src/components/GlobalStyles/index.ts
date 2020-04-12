import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

    * {
        padding: 0px;
        margin: 0px;
        outline: 0;
        box-sizing: border-box;
        font-family: Roboto, Arial, Helvetica, sans-serif;
        text-decoration: none;
        --webkit-font-smoothing: antialiased;
        
        :hover, :focus, :active, :visited {     
            text-decoration: none !important;
        }

    }
    input, button {
        font-size: 16px;
        font-family: Roboto, Arial, Helvetica, sans-serif;
    }

    :root {
        /**
        |
        | Essa cor dark foi ajustada de acordo com o material theme do google
        | LINK: https://material-ui.com/customization/color/#color-tool
        |
        |
        |
         */
        --saints-gold-color: #d3bc8d;
        --saints-gold-color-dark: #938362; 
        --saints-black-color: #101820;
        --twitter-color: #1DA1F2;
        --header-text-color: #bdbdbd;
        --header-bg: #101820;
        --bg-black: #212121;
        --bg-white: #fff;
        --bg-gray: #eeeeee;
        --bg-white-admin: #f5f5f5;
        --text-gray: #616161;
        --text-white: #fff;
        --text-black: #212121;
    }

    #root, html, body {
        height: 100%;
        width: 100%;
        background-color: var(bg-white);
    }
`;
