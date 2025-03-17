
namespace images {

    export enum imgsize {
        width = 1,
        height = -1
    }

    /**
     * get image size by width or height
     * @param image for size data
     * @param size value type by width or height
     */
    //% blockid=image_sizevalue
    //% block="get size of $src=screen_image_picker by $v"
    //% group="images util"
    //% inlineInputMode=inline
    //% weight=18
    export function imageSize(src: Image, ve: imgsize) {
        if (!src) return -1
        switch (ve) {
            case 1:
                return src.width
                break;
            case -1:
                return src.height
                break;
        }
        return -1
    }

    /**
     * print text string into image
     * @param image to printing text
     * @param text input to print
     * @param position x image value
     * @param position y image value
     * @param all of color from pallete color index 
     */
    //% blockid=image_print
    //% block="print $to by $txt at x: $x y: $y color: $c"
    //% c.shadow=colorindexpicker
    //% to.shadow=variables_get to.defl=picture
    //% group="images util"
    //% inlineInputMode=inline
    //% weight=15
    export function print(to: Image, txt: string, x: number, y: number, c: number) {
        if (!to) return;
        to.print(txt, x, y, c)
    }

    /**
     * print text string into image with center
     * @param image to printing text
     * @param text input to print
     * @param position y image value
     * @param all of color from pallete color index
     */
    //% blockid=image_printcenter
    //% block="print center $to by $txt at y: $y color: $c"
    //% c.shadow=colorindexpicker
    //% to.shadow=variables_get to.defl=picture
    //% group="images util"
    //% inlineInputMode=inline
    //% weight=12
    export function printCenter(to: Image, txt: string, y: number, c: number) {
        if (!to) return;
        to.printCenter(txt, y, c)
    }

    /**
     * stamp image into the image
     * @param your image to stamp
     * @param your result image stamping
     * @param position x image value
     * @param position y image value
     */
    //% blockid=images_drawtransparentimage
    //% block="draw $src=screen_image_picker to $to at x: $x y: $y"
    //% to.shadow=variables_get to.defl=picture
    //% group="images util"
    //% inlineInputMode=inline
    //% weight=9
    export function drawTransparentImage(src: Image, to: Image, x: number, y: number) {
        if (!src || !to) return;
        to.drawTransparentImage(src, x, y)
    }

    /**
     * draw circle to the image
     * @param your result image
     * @param position x image value
     * @param position y image value
     * @param radius distance like circle
     * @param all of color from pallete color index
     */
    //% blockid=images_drawcircle
    //% block="draw circle $to at x: $x y: $y radius: $r color: $c"
    //% c.shadow=colorindexpicker
    //% to.shadow=variables_get to.defl=picture
    //% group="images util"
    //% inlineInputMode=inline
    //% weight=6
    export function drawCircle(to: Image, x: number, y: number, r: number, c: number) {
        if (!to) return;
        to.drawCircle(x, y, r, c)
    }

    /**
     * fill circle to the image
     * @param your result image
     * @param position x image value
     * @param position y image value
     * @param radius distance like circle
     * @param all of color from pallete color index
     */
    //% blockid=images_fillcircle
    //% block="fill circle $to at x: $x y: $y radius: $r color: $c"
    //% c.shadow=colorindexpicker
    //% to.shadow=variables_get to.defl=picture
    //% group="images util"
    //% inlineInputMode=inline
    //% weight=3
    export function fillCircle(to: Image, x: number, y: number, r: number, c: number) {
        if (!to) return;
        to.fillCircle(x, y, r, c)
    }

}


