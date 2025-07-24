import { LitElement, html, css } from 'Lit'
class MyButton extends LitElement{
    static properties = { 
        label : {type: string },
        color : { type : string },

    };
    static styles = css`
    button {
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        background-color: var(--btn-color, #ee5700ff);
        color: white;

        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
}