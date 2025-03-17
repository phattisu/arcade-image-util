
namespace images {

    export enum imgsize {
        //% block="width"
        width = 1,
        //% block="full bitmap"
        fullbitmap = 0,
        //% block="height"
        height = -1
    }

    /**
     * get image size by width, height of fullbitmap
     * @param image for size data
     * @param size value type by width, height or fullbitmap
     */
    //% blockid=image_sizevalue
    //% block="get size of $src=screen_image_picker by $ve"
    //% group="images util"
    //% inlineInputMode=inline
    //% weight=18
    export function imageSize(src: Image, ve: imgsize) {
        if (!src) return -1
        switch (ve) {
            case 1:
                return src.width
                break;
            case 0:
                return src.width * src.height
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
     * @param your image to scrolling
     * @param direction x number value
     * @param direction y number value
     */
    //% blockid=images_scrollimage
    //% block="scroll $src by dx: $dx dy: $dy"
    //% to.shadow=variables_get to.defl=picture
    //% group="images util"
    //% inlineInputMode=inline
    //% weight=10
    export function scroll(src: Image, dx: number, dy: number) {
        if (!src ) return;
        let uimg = src.clone()
        let dxi = mod(dx, uimg.width), dyi = mod(dy, uimg.height)
        let usrc = image.create(uimg.width, uimg.height)
        usrc.drawImage(uimg, dxi - uimg.width, dyi - uimg.height); usrc.drawImage(uimg, dxi, dyi)
        usrc.drawImage(uimg, dxi - uimg.width, dyi); usrc.drawImage(uimg, dxi, dyi - uimg.height)
        src.drawImage(usrc,0,0)
    }

    function mod(numv: number,modv: number) {
        let uvn = numv
        while (uvn >= modv || uvn < 0) {
            if (uvn >= modv) uvn -= modv;
            else if (uvn < 0) uvn += modv;
        }
        return uvn
    }

    /**
     * stamp image into the image
     * @param your image to stamp
     * @param your result image get stamping
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
     * redraw image into the image
     * @param your image to redraw
     * @param your result image get redrawing
     * @param position x image value
     * @param position y image value
     */
    //% blockid=images_drawimage
    //% block="redraw $src=screen_image_picker to $to at x: $x y: $y"
    //% to.shadow=variables_get to.defl=picture
    //% group="images util"
    //% inlineInputMode=inline
    //% weight=8
    export function drawImage(src: Image, to: Image, x: number, y: number) {
        if (!src || !to) return;
        to.drawImage(src, x, y)
    }

    /**
     * image overlap the other image
     * @param your image to overlap
     * @param your image to get overlap
     * @param position x image value
     * @param position y image value
     */
    //% blockid=images_overlapimage
    //% block="get $src overlap by $to at x: $x y: $y"
    //% to.shadow=variables_get to.defl=otherpicture
    //% src.shadow=variables_get src.defl=picture
    //% group="images util"
    //% inlineInputMode=inline
    //% weight=7
    export function overlapImage(src: Image, to: Image, x: number, y: number) {
        if (!src || !to) return false
        return to.overlapsWith(src, x, y)
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

let uval = img`
    . . . . c c c b b b b b . . . .
    . . c c b 4 4 4 4 4 4 b b b . .
    . c c 4 4 4 4 4 5 4 4 4 4 b c .
    . e 4 4 4 4 4 4 4 4 4 5 4 4 e .
    e b 4 5 4 4 5 4 4 4 4 4 4 4 b c
    e b 4 4 4 4 4 4 4 4 4 4 5 4 4 e
    e b b 4 4 4 4 4 4 4 4 4 4 4 b e
    . e b 4 4 4 4 4 5 4 4 4 4 b e .
    8 7 e e b 4 4 4 4 4 4 b e e 6 8
    8 7 2 e e e e e e e e e e 2 7 8
    e 6 6 2 2 2 2 2 2 2 2 2 2 6 c e
    e c 6 7 6 6 7 7 7 6 6 7 6 c c e
    e b e 8 8 c c 8 8 c c c 8 e b e
    e e b e c c e e e e e c e b e e
    . e e b b 4 4 4 4 4 4 4 4 e e .
    . . . c c c c c e e e e e . . .
`
