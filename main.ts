// An advanced LED display
namespace led_extended {
    let img: Image;
    let suspended: boolean;

    export enum scrollDirectionStyle {
        LeftToRight,
        RightToLeft,
        BottomToTop,
        TopToBottom
    }

    /**
     * Turns on a pixel to the specified brightness
     * @param x horizontal coordinate, eg: 2
     * @param y vertical coordinate, eg: 2
     * @param l brightness level, eg: 255
     */
    //% weight=100 blockGap=8
    //% blockId=ledext_setLevel block="set pixel at|x: %x|y: %y|to level:%l"
    //% parts="ledmatrix"
    export function setLevel(x: number, y: number, l: number): void {
        x = Math.clamp(0, 4, x);
        y = Math.clamp(0, 4, y);
        l = Math.clamp(0, 255, l);
        img.setPixelBrightness(x, y, l);
        if (!suspended) refresh();
    }

    /**
     * Turns on a pixel to full brightness
     * @param x horizontal coordinate, eg: 2
     * @param y vertical coordinate, eg: 2
     */
    //% weight=95 blockGap=8
    //% blockId=ledext_set block="set pixel at|x: %x|y: %y"
    //% parts="ledmatrix"
    export function set(x: number, y: number): void {
        setLevel(x, y, 255);
    }

    /**
     * Turns off a pixel
     * @param x horizontal coordinate, eg: 2
     * @param y vertical coordinate, eg: 2
     */
    //% weight=90 blockGap=8
    //% blockId=ledext_unset block="unset pixel at|x: %x|y: %y"
    //% parts="ledmatrix"
    export function unset(x: number, y: number): void {
        setLevel(x, y, 0);
    }

    /**
     * Clears the display
     */
    //% weight=85 blockGap=8
    //% blockId=ledext_clear block="clear"
    //% parts="ledmatrix"
    export function clear(): void {
        let r: number, c: number;
        suspend();
        for (r = 0; r < 5; r++) {
            for (c = 0; c < 5; c++) {
                unset(c, r);
            }
        }
        resume();
    }
    
    /**
     * Gets the brightness of a pixel
     * @param x horizontal coordinate, eg: 2
     * @param y vertical coordinate, eg: 2
     */
    //% weight=80 blockGap=8
    //% blockId=ledext_getLevel block="get level of pixel at|x: %x|y: %y"
    //% parts="ledmatrix"
    export function getLevel(x: number, y: number): number {
        return img.pixelBrightness(x, y)
    }

    /**
     * Gets the state of a pixel
     * @param x horizontal coordinate, eg: 2
     * @param y vertical coordinate, eg: 2
     */
    //% weight=75 blockGap=8
    //% blockId=ledext_get block="get state of pixel at|x: %x|y: %y"
    //% parts="ledmatrix"
    export function get(x: number, y: number): boolean {
        return getLevel(x, y) > 0;
    }

    /**
     * Suspends refreshing of the display until resume is called
     */
    //% weight=70 blockGap=8
    //% blockId=ledext_suspend block="suspend"
    //% parts="ledmatrix"
    export function suspend(): void {
        suspended = true;
    }

    /**
     * Resumes refreshing of the display.
     */
    //% weight=65 blockGap=8
    //% blockId=ledext_resume block="resume"
    //% parts="ledmatrix"
    export function resume(): void {
        suspended = false;
        refresh();
    }

    /**
     * Refreshes the display
     */
    //% weight=60 blockGap=8
    //% blockId=ledext_refresh block="refresh"
    //% parts="ledmatrix"
    export function refresh(): void {
        img.plotImage(0);
    }

    /**
     * Draws a specified frame of an image presented as an array of strings.  Each string represents a row and each character the 
     * state of a pixel. Valid characters include 0-9 to represent the brightness of a pixel, F/f to represent a flashing pixel or
     *  anything else to represent the pixel being off.
     * @param frameIndex, eg: 0
     * @param image
     * @param scrollDirection, eg: scrollDirectionStyle.RightToLeft
     */
    //% weight=45 blockGap=8
    //% blockId=ledext_drawFrame block="draw |frame: %frameIndex| from image: %image| direction: %scrollDirection"
    //% parts="ledmatrix"
    export function drawFrame(frameIndex: number, image: string[], scrollDirection: scrollDirectionStyle) {
        let pixel: string;
        let level: number;
        let x: number;
        let y: number;
        if (image == null) return;
        if (image.length == 0) return;
        for (y = 0; y < 5; y++) {
            for (x = 0; x < 5; x++) {
                if (image.length > y) {
                    if (image[y].length > frameIndex + x && frameIndex + x >= 0) {
                        pixel = image[y][frameIndex + x];
                    }
                    else {
                        pixel = ".";
                    }
                }
                else {
                    pixel = ".";
                }
                if (pixel == "F") {
                    if (frameIndex % 2 == 0) {
                        level = 0;
                    }
                    else {
                        level = 255;
                    }
                }
                else if (pixel == "f") {
                    if (frameIndex % 2 == 0) {
                        level = 255;
                    }
                    else {
                        level = 0;
                    }
                }
                else if (pixel == "0" || pixel == " " || pixel == ".") {
                    level = 0;
                }
                else {
                    level = (255 / 9) * parseInt(pixel)
                    if (level == 0) {
                        level = 255;
                    }
                }
                switch (scrollDirection) {
                    case scrollDirectionStyle.RightToLeft:
                        setLevel(x, y, level);
                        break;
                    case scrollDirectionStyle.TopToBottom:
                        setLevel(y, 4 - x, level);
                        break;
                    case scrollDirectionStyle.LeftToRight:
                        setLevel(4 - x, y, level);
                        break;
                    case scrollDirectionStyle.BottomToTop:
                        setLevel(4 - y, x, level);
                        break;
                }
            }
        }
    }

    function init(): void {
        suspended = false;
        img = images.createImage(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `);
        led.setDisplayMode(DisplayMode.Greyscale);
        clear();
    }

    init();
}
