import {autoinject} from 'aurelia-framework';

@autoinject()
export class KeyupEnterCustomAttribute {
    element: Element;
    value: Function;
    enterPressed: (e: KeyboardEvent) => void;

    constructor(element: Element) {
        this.element = element;

        this.enterPressed = e => {
            let key = e.which || e.keyCode;
            if (key === 13) {
                this.value();//'this' won't be changed so you have access to your VM properties in 'called' method
            }
        };
    }

    attached() {
        this.element.addEventListener('keyup', this.enterPressed);
    }

    detached() {
        this.element.removeEventListener('keyup', this.enterPressed);
    }
}

