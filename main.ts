
namespace images {

    let inProgress: {[id: number]: boolean} = {}

    export enum imgsize {
        //% block="width"
        width = 1,
        //% block="full bitmap"
        fullbitmap = 0,
        //% block="height"
        height = -1
    }

    export enum croptype {
        //% block="horzontal"
        h = 1,
        //% block="vertical"
        v = -1,
        //% block="horzontal and vertical"
        handv = 0,
    }

    function rot90(im: Image) {
        const w = im.width;
        const h = im.height;
        const output = image.create(h, w);
        for (let x = 0; x < w; x++) {
            for (let y = 0; y < h; y++) {
                const c = im.getPixel(x, h - y - 1);
                output.setPixel(y, x, c);
             }
        }
        return output;
    }


    function cropInit(imgi: Image, vertical: boolean, horzontal: boolean) {
        let bufv: Buffer;
        let uimg: Image, vimg: Image
        let start: boolean, stop: boolean
        let i: number, count: number[] = []
        let x0 = 0, y0 = 0, x1 = imgi.width, y1 = imgi.height
        if (horzontal) {
            uimg = imgi.clone()
            start = false, stop = false
            bufv = pins.createBuffer(uimg.height)
            for (let x = 0; x < uimg.width; x+=i) {
                count = []
                for (i = 0;x + i < uimg.width; i++) {
                    uimg.getRows(x + i, bufv)
                    count.push(bufv.toArray(NumberFormat.UInt8LE).filter(val => val > 0).length)
                    if ((stop && (count[i - 1] > 0 && count[i] <= 0)) || (!stop && (start && count[i] <= 0) || (!start && count[i] > 0))) break;
                }
                if (start) {
                    if (stop) { 
                        if (x + i < uimg.width) x1 = x + i
                    } else {
                        x1 = x + i
                        stop = true
                    }
                } else {
                    x0 = x + i
                    start = true
                }
            }
        }
        if (vertical) {
            start = false, stop = false
            uimg = rot90(rot90(rot90(imgi.clone())))
            bufv = pins.createBuffer(uimg.height)
            for (let x = 0; x < uimg.width; x+=i) {
                count = []
                for (i = 0;x + i < uimg.width; i++) {
                    uimg.getRows(x + i, bufv)
                    count.push(bufv.toArray(NumberFormat.UInt8LE).filter(val => val > 0).length)
                    if ((stop && (count[i - 1] > 0 && count[i] <= 0)) || (!stop && (start && count[i] <= 0) || (!start && count[i] > 0))) break;
                }
                if (start) {
                    if (stop) {
                        if (x + i < uimg.width) y1 = x + i
                    } else {
                        y1 = x + i
                        stop = true
                    }
                } else {
                    y0 = x + i
                    start = true
                }
            }
        }
        vimg = image.create(Math.abs(x0 - x1), Math.abs(y0 - y1))
        vimg.drawImage(imgi, -x0, -y0)
        return vimg
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
     * stamp image with scrolling in velocity
     * @param your image to scrolling
     * @param velocity x number value
     * @param velocity y number value
     */
    //% blockid=images_scrollimage_velocity
    //% block="scroll $src=screen_image_picker by vx: $vx vy: $vy"
    //% to.shadow=variables_get to.defl=picture
    //% group="images util"
    //% inlineInputMode=inline
    //% weight=80
    export function scrollV(src: Image, vx: number, vy: number) {
        if (!src ) return;
        if (inProgress[1]) return;
        inProgress[1] = true 
        const dx = game.currentScene().eventContext.deltaTime * vx, dy = game.currentScene().eventContext.deltaTime * vy
        const uimg = src.clone(), usrc = image.create(uimg.width, uimg.height)
        const dxi = modules(dx, uimg.width), dyi = modules(dy, uimg.height)
        usrc.drawImage(uimg, dxi - uimg.width, dyi - uimg.height); usrc.drawImage(uimg, dxi, dyi)
        usrc.drawImage(uimg, dxi - uimg.width, dyi); usrc.drawImage(uimg, dxi, dyi - uimg.height)
        src.drawImage(usrc,0,0)
        inProgress[1] = false
    }

    /**
     * stamp image with scrolling in direction
     * @param your image to scrolling
     * @param direction x number value
     * @param direction y number value
     */
    //% blockid=images_scrollimage_direction
    //% block="scroll $src=screen_image_picker by dx: $dx dy: $dy"
    //% to.shadow=variables_get to.defl=picture
    //% group="images util"
    //% inlineInputMode=inline
    //% weight=79
    export function scrollD(src: Image, dx: number, dy: number) {
        if (!src ) return;
        if (inProgress[2]) return;
        inProgress[2] = true
        const uimg = src.clone(), usrc = image.create(uimg.width, uimg.height )
        let dxi = modules(dx, uimg.width), dyi = modules(dy, uimg.height)
        dxi = Math.round(dxi), dyi = Math.round(dyi)
        usrc.drawImage(uimg, dxi - uimg.width, dyi - uimg.height); usrc.drawImage(uimg, dxi, dyi)
        usrc.drawImage(uimg, dxi - uimg.width, dyi); usrc.drawImage(uimg, dxi, dyi - uimg.height)
        src.drawImage(usrc,0,0)
        inProgress[2] = false
    }

    function modules(numv: number,modv: number) {
        modv = Math.abs(modv)
        if (modv <= 0) return 0
        return ((numv % modv) + modv) % modv
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
    //% weight=78
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
    //% weight=77
    export function boxstamp(src: Image, to: Image, x: number, y: number) {
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
    //% blockid=images_blit
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

    /**
     * get image croping the quiet area
     * @param the current image
     * @param croping type -1=vertical, 0=horzontal and vertical, 1=horzontal
     */
    //%blockid=images_cropimage
    //%block="get $img=screen_image_picker crop image in $cropt"
    //%group="images util"
    //%inlineInputMode=inline
    //%weight=67
    export function crop(img: Image, cropt: croptype) {
        if (!img) return null
        switch(cropt) {
            case 1: return cropInit(img, false, true); break;
            case -1: return cropInit(img, true, false); break;
            case 0: default: return cropInit(img, true, true); break;
        }
    }

    /**
     * get image substacting from substactor image
     * @param current image
     * @param from substactor image
     * @param x position from image
     * @param y position from image
     * @param array of color index
     */
    //%blockid=images_substracting
    //%block="get $img=screen_image_picker substacting $from=screen_image_picker at $x $y by element of $arrc"
    //%arrc.shadow=lists_create_with arrc.defl=colorindexpicker
    //%group="images util"
    //%inlineInputMode=inline
    //%weight=66
    export function sub(img: Image, from: Image, x: number, y: number, arrc: number[]) {
        if (!img || !from) return null
        if (from.width > img.width || from.height > img.height) return img.clone()
        let bufv: Buffer, buft: Buffer, vimg: Image
        bufv = pins.createBuffer(img.height)
        buft = pins.createBuffer(from.height)
        vimg = image.create(img.width, img.height)
        for (let xi = x; xi < x + img.width; xi++) {
            from.getRows(xi, buft)
            img.getRows(xi - x, bufv)
            for (let yi = y; yi < y + img.height; yi++) {
                if (arrc.indexOf(buft[yi]) >= 0) bufv[yi - y] = 0
            }
            vimg.setRows(xi - x, bufv)
        }
        return vimg
    }

}
