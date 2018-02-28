/*
 * version: 0.0.1
 */
function TouchSwipe() {
}
TouchSwipe.prototype = {
    contructor: TouchSwipe,
    handleEvent: function (evt) {
        if (evt.changedTouches.length > 1) return;
        var touch = null;
        if (!this.touchID) {
            touch = evt.changedTouches[0]; /* touchstart */
            this.touchID = touch.identifier;
        } else {
            var touches = evt.changedTouches;
            if (touches.identifiedTouch) {
                touch = evt.changedTouches.identifiedTouch(this.touchID);
            } else {
                touch = [].slice.call(touches).filter(function (t) {
                    return t.identifier === this.touchID;
                }, this)[0];
            }
        }
        if (!touch) return;
        evt.preventDefault();
        switch (evt.type) {
            case "touchmove":
                this.offsetX = touch.clientX - this.x;
                this.offsetY = touch.clientY - this.y;
                this.move(touch);
                break;
            case "touchstart":
                this.x = touch.clientX;
                this.y = touch.clientY;
                this.start(touch);
                break;
            case "touchend":
                this.touchID = 0;
                this.end(touch);
                break;
            case "touchcancel":
                this.touchID = 0;
                this.x = this.y = 0;
                this.offsetX = this.offsetY = 0;
                this.cancel(touch);
                break;
        }
    },
    start: function () {
        console.log("touchstart!");
    },
    move: function () {
        console.log("touchmove!");
    },
    end: function () {
        console.log("touchend!");
    },
    cancel: function () {
        console.log("touchcancel!");
    }
};
