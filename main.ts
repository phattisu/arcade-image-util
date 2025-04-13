
namespace images {

    const inProgress: {[id: number]: boolean} = {}

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
    //% weight=100
    export function imageSize(src: Image, ve: imgsize) {
        if (!src) return -1
        switch (ve) {
            case 1: return src.width; break;
            case 0: return src.width * src.height; break;
            case -1: return src.height; break;
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
    //% weight=90
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
    //% weight=89
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
    //% block="scroll $src=screen_image_picker by vx: $vx vy: $vy"
    //% to.shadow=variables_get to.defl=picture
    //% group="images util"
    //% inlineInputMode=inline
    //% weight=80
    export function scroll(src: Image, vx: number, vy: number) {
        if (!src ) return;
        if (inProgress[1]) return;
        inProgress[1] = true 
        const dx = Math.floor(game.currentScene().eventContext.deltaTime * vx), dy = Math.floor(game.currentScene().eventContext.deltaTime * vy)
        const uimg = src.clone(), usrc = image.create(uimg.width, uimg.height)
        const dxi = modules(dx, uimg.width), dyi = modules(dy, uimg.height)
        usrc.drawImage(uimg, dxi - uimg.width, dyi - uimg.height); usrc.drawImage(uimg, dxi, dyi)
        usrc.drawImage(uimg, dxi - uimg.width, dyi); usrc.drawImage(uimg, dxi, dyi - uimg.height)
        src.drawImage(usrc,0,0)
        inProgress[1] = false
    }

    function modules(numv: number,modv: number) {
        if (inProgress[0]) return 0
        inProgress[0] = true 
        let uvn = numv
        if (uvn < modv && uvn >= 0) return uvn
        while (uvn >= modv || uvn < 0) {
            if (uvn >= modv) uvn -= modv;
            else if (uvn < 0) uvn += modv;
        }
        inProgress[0] = false 
        return uvn
    }

    /**
     * stamp image into the image
     * @param your image to stamp
     * @param your result image get stamping
     * @param position x image value
     * @param position y image value
     */
    //% blockid=images_stampimage
    //% block="draw $src=screen_image_picker to $to at x: $x y: $y"
    //% to.shadow=variables_get to.defl=picture
    //% group="images util"
    //% inlineInputMode=inline
    //% weight=79
    export function stamp(src: Image, to: Image, x: number, y: number) {
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
    //% blockid=images_restampimage
    //% block="redraw $src=screen_image_picker to $to at x: $x y: $y"
    //% to.shadow=variables_get to.defl=picture
    //% group="images util"
    //% inlineInputMode=inline
    //% weight=78
    export function restamp(src: Image, to: Image, x: number, y: number) {
        if (!src || !to) return;
        to.drawImage(src, x, y)
    }

    /**
     * get current image copy from next image
     * @param the current image
     * @param the next image
     */
    //% blockid=images_copyimage
    //% block="$to copy from $from=screen_image_picker"
    //% to.shadow=variables_get to.defl=picture
    //% group="images util"
    //% inlineInputMode=inline
    //% weight=68
    export function copy(to: Image, from: Image) {
        if (!to || !from) return;
        to.copyFrom(from)
    }

    /**
     * get current image copy from next image
     * @param the current image
     * @param x from current image
     * @param y from current image
     * @param from the image
     * @param x from the image
     * @param height from the image
     */
    //% blockid=images_blitrow
    //% block="$to set blit row at distX: $dsx distY: $dsy by $from=screen_image_picker fromX: $fox|| fromHeight: $foh "
    //% to.shadow=variables_get to.defl=picture
    //% group="images util"
    //% inlineInputMode=inline
    //% weight=67
    export function blitrow(to: Image, dsx: number, dsy: number, from: Image, fox: number, foh: number = null) {
        if (!to || !from) return;
        if (!foh) foh = from.height
        to.blitRow(dsx, dsy, from, fox, foh)
    }

    /**
     * get image checking between current image's area and refferent image's area
     * @param the current image
     * @param x from current image
     * @param y from current image
     * @param width from current image
     * @param height from current image
     * @param the refferent image
     * @param x from refferent image
     * @param y from refferent image
     * @param width from refferent image
     * @param height from refferent image
     * @param the transparenting mode
     * @param the checking mode
     */
    //% blockid=images_blitrow
    //% block="$to get checking blit at distX: $dsx distY: $dsy distW: $dsw distH: $dsh from $src=screen_image_picker at X: $srx Y: $sry width: $srw height: $srh|| transparent mode: $tspr and get checking: $cek"
    //% to.shadow=variables_get to.defl=picture
    //% tspr.shadow=toggleYesNo
    //% cek.shadow=toggleYesNo
    //% group="images util"
    //% inlineInputMode=inline
    //% weight=66
    export function blit(to: Image, dsx: number, dsy: number, dsw: number, dsh: number, src: Image, srx: number, sry: number, srw: number, srh: number, tspr: boolean = true, cek: boolean = false) {
        if (!to || !src) return false
        return to.blit(dsx, dsy, dsw, dsh, src, srx, sry, srw, srh, tspr, cek)
    }

    /**
     * image overlap the other image
     * @param the current image
     * @param the overlaping image
     * @param position x image value
     * @param position y image value
     */
    //% blockid=images_overlapimage
    //% block="get $src overlap by $to at x: $x y: $y"
    //% to.shadow=variables_get to.defl=otherpicture
    //% src.shadow=variables_get src.defl=picture
    //% group="images util"
    //% inlineInputMode=inline
    //% weight=76
    export function overlaps(src: Image, to: Image, x: number, y: number) {
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
    //% weight=70
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
    //% weight=69
    export function fillCircle(to: Image, x: number, y: number, r: number, c: number) {
        if (!to) return;
        to.fillCircle(x, y, r, c)
    }

    /**
     * get your image resize to square image
     * @param the current image
     */
    //%blockid=images_squareimage
    //%block="$uimg=screen_image_picker as square"
    //%group="images util"
    //%inlineInputMode=inline
    //%weight=68
    export function square(uimg: Image) {
        if (!uimg) return;
        const imax = Math.max(uimg.width, uimg.height), uuimg = image.create(imax, imax)
        stamp(uimg.clone(), uuimg, Math.floor((imax / 2) - (uimg.width / 2)), Math.floor((imax / 2) - (uimg.height / 2)))
        uimg.copyFrom(uuimg)
    }

}
