$(function () {
    $(window).on("scroll", function () {
        const $h = $(".header");
        const a = this.scrollY > 10;
        $h
            .toggleClass("a1", a)
            .toggleClass("a2", !a);
    }).trigger("scroll");
    function r() {
        $(" .resveal ,  .resveal1 , .resveal011 , .resveal012 , .resveal2 , .resveal3 , .resveal0 , .resveal01 , .resveal02 ").each(function () {
            const tot = $(this).offset().top;
            const wstwh = $(window).scrollTop() + $(window).height();
            if (tot < wstwh - 50) {
                $(this).addClass("r-show");
            } else {
                $(this).removeClass("r-show");

            }
        });
    }
    $(window).on("scroll load", r);
    function num() {
        const $ns = $(".numbers");
        if ($ns.length === 0) {
            return;
        }
        const tot = $ns.offset().top;
        const wstwh = $(window).scrollTop() + $(window).height();
        if (tot < wstwh) {
            const $num = $ns.find(".num");
            $num.each(function () {
                const $n = $(this);
                const $nd = $n.data("num");
                $({ number: 0 }).animate({ number: $nd }, {
                    duration: 4000,
                    step: function () {
                        $n.text(Math.floor(this.number));
                    },
                    complete: function () {
                        $n.text($nd);
                    }
                });
            }
            );
            $(window).off("scroll load", num);
        }
    }
    $(window).on("scroll load", num);

    const $buys= $("#s3 .card");
    $buys.each(function () {
        const $buy= $(this).find("button");
        $buy.each(function () {            
            const $b= $(this);
            $b.on("click",function () {
                const $i= $b.find("svg");
                if ($b.hasClass("bg-g")) {
                    $b.toggleClass("bg-g");
                    $i.toggleClass("fa-check fa-plus");
                } else {
                    $b.toggleClass("bg-g");                    
                    $i.toggleClass("fa-check fa-plus");
                    $("#buyy").modal("show");
                }
            });
        });
    });
    $(".tt").each(function () {
        const $ttt = $(this).find(".ttt");
        $ttt.each(function () {
            const $t = $(this);
            function time() {
                const ttt = Math.floor(Math.random() * 450) / 100 + 0.5 + "s";
                $t.css("--ttt", ttt);
                $t.removeClass("tttt");
                setTimeout(() => {                    
                    $t.addClass("tttt");
                }, 100);
            }
            $t.on("animationend", function () {
                time();
            });
            time();
        });
    });
    const md = [
        {
            name: "台北鄧家華",
            text: "好多",
            likes: 10
        },
    ];
    const $name = $("#name");
    const $text = $("#text");
    const $msgs = $(".msgs");
    function esh(text) {
        return $("<div>").text(text).html();
    }
    function ct(data) {
        const hn = data.name.charAt(0);
        const left = Math.floor(Math.random() * 40) + 40 + "%";
        const move = Math.floor(Math.random() * 80) + 20 + "px";
        const time = Math.floor(Math.random() * 20) + 5 + "s";
        const $msgbox = $(`
                            <div class="msg pa card px-3 py-2 bg-bt blur bor-wt rounded-5 " style="
                    transform: scale(0.8);
                    --left:${left};
                    --move:${move};
                    --time:${time};
                    ">
                    <div class="d-fxcc jcs t-c0">
                        <div class="bg-c1t rounded-pill d-fxcc" style="width: 40px;height: 40px;" >
                            ${esh(hn)}
                        </div>
                        <div class="d-fxcc jcs pe-2">
                            <div class="ps-1 pt-1">
                                <div class="fw-bolder">${esh(data.name)}</div>
                                <div class="" style="transform: scale(0.8);">剛剛</div>
                            </div>
                        </div>
                    </div>
                    <div class="t-wt">
                        ${esh(data.text)}
                    </div>
                    <div class="d-fxcc jce">
                        <button class="btn t-wt like border-0">
                            <span>
                                ${esh(data.likes)}
                            </span>
                            <i class="fa-solid fa-heart"></i>
                        </button>
                    </div>
                </div>
            `);
        $msgs.append($msgbox);
        $msgbox.one("animationend", function () {
            $(this).remove();
        });
    }
    md.forEach(function (message, index) {
        setTimeout(() => {
            ct(message);
        }, index * 700);
    });
    setInterval(() => {
        const ranmsg = md[Math.floor(Math.random() * md.length)];
        ct({
            name: ranmsg.name,
            text: ranmsg.text,
            likes: ranmsg.likes
        });
    }, 1000);
    $(".msgbtn").on("click", function () {
        const name = $name.val().trim();
        const text = $text.val().trim();
        let v = true;
        if (!name) {
            $name.addClass("is-invalid");
            v = false;
        } else {
            $name.removeClass("is-invalid");
        }
        if (!text) {
            $text.addClass("is-invalid");
            v = false;
        } else {
            $text.removeClass("is-invalid");
        }
        if (!v) {
            return;
        }
        const newmsg = {
            name: name,
            text: text,
            likes: 0
        }
        md.push(newmsg);
        ct(newmsg);
        $name.val("");
        $text.val("");
        $("#msgcard").collapse("hide");
    });
    $msgs.on("click", ".like", function () {
        const $btn = $(this);
        const $num = $btn.find("span");
        let num = parseInt($num.text(), 10);
        if ($btn.hasClass("t-r")) {
            $btn.toggleClass("t-r t-wt");
            num--;
        } else {
            num++;
            $btn.toggleClass("t-r t-wt");
            $btn.addClass("t-r fa-bounce");
            setTimeout(() => {
                $btn.removeClass(" fa-bounce");
            }, 1000);
        }
        $num.text(num);
    });
});