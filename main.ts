// An advanced LED display
//
// % color=#008272 weight=32 icon="\uf205" %
// advanced=true
//
namespace ledext {
    let img: Image;

    /**
     * Sets a pixel to the specified brightness
     * @param x horizontal coordinate, eg: 2
     * @param y vertical coordinate, eg: 2
     */
    //% weight=60 blockGap=8
    //% blockId=ledext_set block="set pixel at|x: %x|y: %y|to brightness:%b"
    //% parts="ledmatrix"
    export function set(x: number, y: number, b: number) {
        init();
        x = Math.clamp(0, 4, x);
        y = Math.clamp(0, 4, y);
        b = Math.clamp(0, 255, b);
        if (b == 0) {
            img.setPixel(x, y, false);
        }
        else {
            img.setPixel(x, y, true);
            img.setPixelBrightness(x, y, b);
        }
    }

    /**
     * Turns off a pixel
     * @param x horizontal coordinate, eg: 2
     * @param y vertical coordinate, eg: 2
     */
    //% weight=60 blockGap=8
    //% blockId=ledext_unset block="unset pixel at|x: %x|y: %y"
    //% parts="ledmatrix"
    export function unset(x: number, y: number) {
        init();
        x = Math.clamp(0, 5, x);
        y = Math.clamp(0, 5, y);
        img.setPixel(x, y, false);
    }
    
    function init(): void {
        if (img == null) {
            img = images.createImage(". . . . . . . . . . . . . . . . . . . . . . . . .");
            led.setDisplayMode(DisplayMode.Greyscale);
            basic.forever(() => {
                basic.pause(30);
                img.plotImage(0);
            });
        }
    }
}
