/* ----

# Kico Style 2
# By: Dreamer-Paul
# Last Update: 2018.6.3

---- */

function Kico_Style () {
    var kico = {};
    var that = this;

    this.create = function (tag, cls, prop) {
        var obj = document.createElement(tag);
        if(cls) obj.className = cls;
        if(prop){
            if(prop.text){
                obj.innerText = prop.text;
            }
            else if(prop && prop.html){
                obj.innerText = prop.html;
            }
        }

        return obj;
    };

    this.select = function (obj) {
        if(typeof obj === "object"){
            return obj;
        }
        else if(typeof obj === "string"){
            return document.querySelector(obj);
        }
    };

    this.selectAll = function (obj) {
        if(typeof obj === "object"){
            return obj;
        }
        else if(typeof obj === "string"){
            return document.querySelectorAll(obj);
        }
    };

    kico.notice_list = this.create("div", "bk-notice-list");

    this.notice = function (content, attr) {
        var item = that.create("div", "bk-notice");
        item.innerHTML += "<span class='content'>" + content + "</span>";

        kico.notice_list.appendChild(item);

        if(!document.querySelector("body > .bk-notice-list")) document.body.appendChild(kico.notice_list);

        if(attr && attr.time){
            setTimeout(notice_remove, attr.time);
        }
        else{
            var close = document.createElement("span");
            close.className = "close";

            close.addEventListener("click", function () {
                notice_remove();
            });

            item.classList.add("dismiss");
            item.appendChild(close);
        }

        if(attr && attr.color){item.classList.add(attr.color);}

        function notice_remove() {
            item.classList.add("remove");

            setTimeout(function () {
                try{
                    kico.notice_list.removeChild(item);
                    item = null;
                }
                catch(err) {}

                if(document.querySelector("body > .bk-notice-list") && kico.notice_list.childNodes.length === 0){
                    document.body.removeChild(kico.notice_list);
                }
            }, 300);
        }
    };

    kico.overlay = this.create("div", "bk-overlay");

    this.overlay = function (attr) {
        document.body.appendChild(kico.overlay);

        if(attr && attr.time){
            setTimeout(overlay_remove, attr.time);
        }
        else{
            kico.overlay.addEventListener("click", overlay_remove);
        }

        if(attr && attr.code){
            kico.overlay.addEventListener("click", attr.code);
        }

        function overlay_remove() {
            kico.overlay.classList.add("remove");

            setTimeout(function () {
                if(document.querySelector("body > .bk-overlay")){
                    kico.overlay.classList.remove("remove");
                    document.body.removeChild(kico.overlay);
                }
            }, 300);
        }
    };

    kico.image_box = this.create("div", "bk-image");
    kico.image_panel = this.create("div", "bk-image-panel");
    kico.image_close = this.create("button", "bk-image-close");
    kico.image_frame = this.create("div", "bk-image-frame");
    kico.image_single = this.create("img");
    kico.image_prev = this.create("button", "bk-image-nav prev");
    kico.image_next = this.create("button", "bk-image-nav next");
    kico.image_alt_div = this.create("div", "bk-image-caption");
    kico.image_alt_content_tag = this.create("p");
    kico.image_group = [];
    kico.image_index = 0;
    kico.image_is_open = false;

    kico.image_prev.type = "button";
    kico.image_next.type = "button";
    kico.image_close.type = "button";
    kico.image_prev.innerHTML = "&#8249;";
    kico.image_next.innerHTML = "&#8250;";
    kico.image_close.innerHTML = "&#10005;";
    kico.image_prev.setAttribute("aria-label", "Previous image");
    kico.image_next.setAttribute("aria-label", "Next image");
    kico.image_close.setAttribute("aria-label", "Close preview");

    kico.image_frame.appendChild(kico.image_single);
    kico.image_alt_div.appendChild(kico.image_alt_content_tag);
    kico.image_panel.appendChild(kico.image_frame);
    kico.image_panel.appendChild(kico.image_alt_div);
    kico.image_box.appendChild(kico.image_close);
    kico.image_box.appendChild(kico.image_prev);
    kico.image_box.appendChild(kico.image_panel);
    kico.image_box.appendChild(kico.image_next);

    function render_image(index) {
        var current;
        if(!kico.image_group.length){
            return;
        }

        if(index < 0){
            index = kico.image_group.length - 1;
        }
        else if(index >= kico.image_group.length){
            index = 0;
        }

        current = kico.image_group[index];
        kico.image_index = index;
        kico.image_single.src = current.src;
        kico.image_single.alt = current.alt || "";
        kico.image_alt_content_tag.innerHTML = current.alt || "";
        kico.image_alt_div.classList.toggle("empty", !current.alt);
        kico.image_prev.disabled = kico.image_group.length === 1;
        kico.image_next.disabled = kico.image_group.length === 1;
    }

    function close_image_box() {
        if(!document.querySelector("body > .bk-image")){
            return;
        }

        kico.image_box.classList.add("remove");
        kico.image_panel.classList.add("remove");
        kico.image_is_open = false;

        setTimeout(function () {
            try{
                document.body.removeChild(kico.image_box);
                kico.image_box.classList.remove("remove");
                kico.image_panel.classList.remove("remove");
            }
            catch (err){}
        }, 180);
    }

    function switch_image(step) {
        if(!kico.image_group.length){
            return;
        }

        render_image(kico.image_index + step);
    }

    function image_keydown(event) {
        if(!kico.image_is_open){
            return;
        }

        if(event.key === "Escape"){
            close_image_box();
        }
        else if(event.key === "ArrowLeft"){
            switch_image(-1);
        }
        else if(event.key === "ArrowRight"){
            switch_image(1);
        }
    }

    document.addEventListener("keydown", image_keydown);

    this.image = function bk_image(selector) {
        var get_images = that.selectAll(selector);
        var image_group = Array.prototype.slice.call(get_images);

        function item(obj, index) {
            obj.setAttribute("bk-image", "active");
            obj.onclick = function () {
                kico.image_group = image_group;
                kico.image_is_open = true;
                render_image(index);

                if (!document.querySelector("body > .bk-image")) {
                    document.body.appendChild(kico.image_box);
                }
            };
        }

        for(var i = 0; i < get_images.length; i++){
            item(get_images[i], i);
        }

        kico.image_prev.onclick = function (event) {
            event.stopPropagation();
            switch_image(-1);
        };

        kico.image_next.onclick = function (event) {
            event.stopPropagation();
            switch_image(1);
        };

        kico.image_single.onclick = function (event) {
            event.stopPropagation();
            close_image_box();
        };

        kico.image_close.onclick = function (event) {
            event.stopPropagation();
            close_image_box();
        };

        kico.image_panel.onclick = function (event) {
            event.stopPropagation();
        };

        kico.image_box.onclick = function (event) {
            event.stopPropagation();
            close_image_box();
        };
    };

    console.log("%c Kico Style %c https://www.binkic.com ","color: #fff; margin: 1em 0; padding: 5px 0; background: #3498db;","margin: 1em 0; padding: 5px 0; background: #efefef;");
}

var ks = new Kico_Style();
