// An advanced LED display
//
// % name="Led Ext" color=#5C2D91 weight=32 icon="\uf205" %
// advanced=true
//
namespace ledext {
    let img: Image;
    let suspended: boolean;

    /**
     * Turns on a pixel to the specified brightness
     * @param x horizontal coordinate, eg: 2
     * @param y vertical coordinate, eg: 2
     * @param l brightness level, eg: 255
     */
    //% weight=60 blockGap=8
    //% blockId=ledext_set block="set pixel at|x: %x|y: %y|to level:%l"
    //% parts="ledmatrix"
    export function set(x: number, y: number, l: number): void {
        x = Math.clamp(0, 4, x);
        y = Math.clamp(0, 4, y);
        l = Math.clamp(0, 255, l);
        img.setPixelBrightness(x, y, l);
        if (!suspended) refresh();
    }

    /**
     * Turns off a pixel
     * @param x horizontal coordinate, eg: 2
     * @param y vertical coordinate, eg: 2
     */
    //% weight=60 blockGap=8
    //% blockId=ledext_unset block="unset pixel at|x: %x|y: %y"
    //% parts="ledmatrix"
    export function unset(x: number, y: number): void {
        set(x, y, 0);
    }

    /**
     * Gets the brightness of a pixel
     * @param x horizontal coordinate, eg: 2
     * @param y vertical coordinate, eg: 2
     */
    //% weight=55 blockGap=8
    //% blockId=ledext_get block="get level of pixel at|x: %x|y: %y"
    //% parts="ledmatrix"
    export function get(x: number, y: number): number {
        return img.pixelBrightness(x,y)
    }
    
    /**
     * Gets the state of a pixel
     * @param x horizontal coordinate, eg: 2
     * @param y vertical coordinate, eg: 2
     */
    //% weight=55 blockGap=8
    //% blockId=ledext_isOn block="get state of pixel at|x: %x|y: %y"
    //% parts="ledmatrix"
    export function isOn(x: number, y: number): boolean {
        return img.pixelBrightness(x,y)>0;
    }
    
    /**
     * Clears the display
     */
    //% weight=50 blockGap=8
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
     * Suspends refreshing of the display until resume is called
     */
    //% weight=50 blockGap=8
    //% blockId=ledext_suspend block="suspend"
    //% parts="ledmatrix"
    export function suspend(): void {
        suspended = true;
    }
        
    /**
     * Resumes refreshing of the display.
     */
    //% weight=40 blockGap=8
    //% blockId=ledext_resume block="resume"
    //% parts="ledmatrix"
    export function resume(): void {
        suspended = false;
        refresh();
    }
    
    /**
     * Refreshes the display
     */
    //% weight=50 blockGap=8
    //% blockId=ledext_refresh block="refresh"
    //% parts="ledmatrix"
    export function refresh(): void {
        img.plotImage(0);  
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
