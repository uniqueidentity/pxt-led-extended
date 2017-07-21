// An advanced LED display
//
// % name="Led Ext" color=#5C2D91 weight=32 icon="\uf205" %
// advanced=true
//
namespace ledext {
    let img: Image;
    let suspended: boolean;

    /**
     * Sets a pixel to the specified brightness
     * @param x horizontal coordinate, eg: 2
     * @param y vertical coordinate, eg: 2
     */
    //% weight=60 blockGap=8
    //% blockId=ledext_set block="set pixel at|x: %x|y: %y|to brightness:%b"
    //% parts="ledmatrix"
    export function set(x: number, y: number, b: number) {
        x = Math.clamp(0, 4, x);
        y = Math.clamp(0, 4, y);
        b = Math.clamp(0, 255, b);
        img.setPixelBrightness(x, y, b);
        refresh();
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
        set(x, y, 0);
    }

    /**
     * Clears the display
     */
    //% weight=50 blockGap=8
    //% blockId=ledext_clear block="clear"
    //% parts="ledmatrix"
    export function clear() {
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
     * Suspends refreshing of the display until resume is called
     */
    //% weight=50 blockGap=8
    //% blockId=ledext_suspend block="suspend"
    //% parts="ledmatrix"
    export function suspend() {
        suspend = true;
    }
        
    /**
     * Resumes refreshing of the display.
     */
    //% weight=40 blockGap=8
    //% blockId=ledext_resume block="resume"
    //% parts="ledmatrix"
    export function resume() {
        suspend = false;
        refresh();
    }
    
    /**
     * Refreshes the display
     */
    //% weight=50 blockGap=8
    //% blockId=ledext_refresh block="refresh"
    //% parts="ledmatrix"
    export function refresh():void {
        if (suspended) return;
        img.plotImage(0);  
    }
    
    function init(): void {
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
