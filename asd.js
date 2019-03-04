function calcBytes(a) {
    var b = 0;
    for (i = 0; i < a.length; i++) {
        var c = a.charAt(i);
        escape(c).length > 4 ? b += 2 : "\n" == c ? "\r" != a.charAt(i - 1) && (b += 1) : b += "<" == c || ">" == c ? 4 : 1
    }
    return b
}
function maxLengthCheck(a, b, c, d) {
    var e, f, g = c.value.length, h = parseInt(a), i = "", j = 0;
    if (0 == g)
        null != document.getElementById("spn_input_char") && (document.getElementById("spn_input_char").innerText = h);
    else
        for (k = 0; k < g; k++) {
            if (e = c.value.charAt(k),
            "\n" == e && j++,
            escape(e).length > 4 ? h -= 2 : h--,
            0 > h) {
                alert("총 한글 " + a / 2 + "자 영문 " + a + "자 까지 쓰실 수 있습니다."),
                c.value = i;
                break
            }
            if (null != b & j > parseInt(b)) {
                alert("라인수 " + b + "라인을 넘을 수 없습니다."),
                j = 0,
                f = i.length - 1,
                c.value = i.substring(0, f);
                break
            }
            null != document.getElementById("spn_input_char") && (document.getElementById("spn_input_char").innerText = h),
            i += e
        }
}
!function(a, b, c) {
    "use strict";
    var d = b.module("app", ["lotteComm", "lotteSrh", "lotteSideCtg", "lotteCommFooter", "lotteSns", "lotteProduct", "lotteNgSwipe", "lotteMainPop"]);
    d.filter("pageRange", [function() {
        return function(a, b, c) {
            for (var d = [], e = 0; e < a.length; e++)
                e >= b * c && (b + 1) * c > e && d.push(a[e]);
            return d
        }
    }
    ]),
    d.filter("removeZero", [function() {
        return function(a) {
            if ("0" == a.substr(0, 1))
                var b = a.substr(1, 1);
            else
                var b = a.substr(0, 2);
            if ("0" == a.substr(3, 1))
                var c = a.substr(4, 1);
            else
                var c = a.substr(3, 2);
            return b + "/" + c + "~"
        }
    }
    ]),
    d.controller("PlanshopCtrl", ["$scope", "$http", "$window", "$timeout", "$sce", "$location", "LotteCommon", "LotteStorage", "commInitData", "LotteLink", "$compile", function(d, e, f, g, h, i, j, k, l, m, n) {
        function o(a) {
            a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var b = new RegExp("[\\?&]" + a + "=([^&#]*)")
              , c = b.exec(location.search);
            return null === c ? "" : decodeURIComponent(c[1].replace(/\+/g, " "))
        }
        function p(a) {
            return 10 > a ? "0" + a : a + ""
        }
        function q(a, b, c, d, e, f) {
            var g = new Date(a,b,c,d,e,f);
            return a && b && c && (g.setFullYear(a),
            g.setMonth(b - 1),
            g.setDate(c),
            d && g.setHours(d),
            e && g.setMinutes(e),
            f && g.setSeconds(f)),
            g.getTime()
        }
        function r(a) {
            var b = 0;
            return b = q(a.substring(0, 4), a.substring(4, 6) ? a.substring(4, 6) : 1, a.substring(6, 8) ? a.substring(6, 8) : 1, a.substring(8, 10), a.substring(10, 12), a.substring(12, 14))
        }
        function s(a) {
            return a.indexOf("javascript") < 0 && a.indexOf("tel:") < 0 && a.indexOf("mailto:") < 0 && (a = a.indexOf("?") > -1 ? a + "&" + d.baseParam : a + "?" + d.baseParam),
            a
        }
        function t() {
            d.cate_first == d.itemCateDataList[1].divObjNm ? d.firstcate_flag = !1 : d.firstcate_flag = !0
        }
        d.showWrap = !0,
        d.contVisible = !0,
        d.isShowThisSns = !0,
        d.subTitle = "기획전",
        d.screenID = "Planshop",
        d.isProductLoading = !0,
        d.productMoreScroll = !0,
        d.isLoading = !0,
        d.dataLoadingFinish = !1,
        d.allProductOpenFlag = !1,
        d.cateViewFlag = !1,
        d.allProductFlag = !0,
        d.upplanshopMainData = [],
        d.itemCateDataList = [],
        d.sortCateTop,
        d.dispNoParam = o("curDispNo"),
        "" == o("divObjNo") ? d.divObjNoParam = "" : d.divObjNoParam = o("divObjNo"),
        "5397380" == d.dispNoParam && (d.isShowThisSns = !1,
        d.appObj.isApp || (alert("※ 본 기획전은 모바일 APP에서만 확인하실 수 있습니다."),
        f.location.href = "/")),
        d.storyParam = o("ss_yn"),
        d.shoppingholicParam = o("shoppingholicYn"),
        d.planShopGubunParam = o("planShopGubun"),
        d.recentParam = o("recent_goods_no"),
        d.paramTitle = o("divObjTitle"),
        d.productList = [],
        d.pageSize = 60,
        d.product_tot_cnt = 0,
        d.thisPage = 0,
        d.rtnType,
        d.divName = "전체상품",
        d.paramTitle.length >= 1 && (d.divName = d.paramTitle),
        d.brReplace = function(a) {
            return a.replace("&lt;br&gt;", "<br>")
        }
        ,
        d.brRemove = function(a) {
            return a = a.replace("&lt;br&gt;", " "),
            a = a.replace("<br>", " ")
        }
        ,
        d.stCate = o("stcate"),
        "null" == d.stCate && (d.stCate = "스토리샵"),
        d.stTitle = d.brRemove(o("stnm")),
        d.stDate = o("stdt"),
        d.stno = o("stno"),
        d.storyLink = function(c, e, f) {
            var g = c.img_link
              , h = (c.mov_frme_cd,
            {
                ss_yn: "Y",
                stcate: c.category_nm,
                stnm: d.brRemove(c.banner_nm),
                stdt: c.date,
                stno: c.category_no
            })
              , i = e;
            null != f && (i += 10 > f ? "0" + f : f),
            g = g + "&" + d.baseParam + "&tclick=" + i,
            b.forEach(h, function(a, b) {
                g += "&" + b + "=" + a
            }),
            a.location.href = g
        }
        ;
        var u = new Date
          , v = u.getFullYear() + p(u.getMonth() + 1) + p(u.getDate())
          , w = u.getTime();
        if (l.query.testDate) {
            l.query.testDate;
            v = l.query.testDate,
            w = r(v)
        }
        w >= q(2018, 10, 1) && (d.appPushFlag = "10"),
        w >= q(2018, 11, 1) && (d.appPushFlag = "11"),
        w >= q(2018, 11, 5) && (d.appPushFlag = ""),
        d.param_cn = o("cn"),
        d.goApppush_Event2 = function() {
            setTimeout(function() {
                if ("pnhZkYs9a5U=" == getCookie("MBRSCTCD"))
                    alert("간편계정 회원의 경우 응모가 불가합니다.\nL.POINT 통합회원 가입 후 신청해주세요.");
                else if (d.loginInfo.isLogin)
                    $.ajax({
                        type: "post",
                        async: !1,
                        url: "/event/regAppPush.do",
                        data: {
                            evt_no: ""
                        },
                        success: function(a) {
                            if (a.indexOf("|") > -1) {
                                var b = a.split("|")
                                  , c = b[1];
                                if ("S" == b[0])
                                    return void (w >= q(2018, 11, 1) && w < q(2018, 11, 5) ? alert("금주 [" + c + "]회 L-point 10점 적립 응모 완료! 7회 응모시 총 100점(차주 화요일 지급)\n11월 4일 이벤트 종료!\ncoming soon!!") : alert("금주 [" + c + "]회 L-point 10점 적립 응모 완료! 7회 응모시 총 100점(차주 화요일 지급)\n11월 4일 이벤트 종료!\ncoming soon!!"));
                                if ("D" == b[0])
                                    return void alert("오늘은 이미 적립하셨네요.\n금주 [" + c + "]회 적립 응모 완료")
                            }
                        }
                    });
                else if (confirm("로그인 후 적립하실 수 있습니다.")) {
                    var a = "targetUrl=" + encodeURIComponent(location.href, "UTF-8");
                    location.href = "/login/m/loginForm.do?" + a
                }
            }, 500)
        }
        ,
        d.goApppush_Event3 = function() {
            setTimeout(function() {
                if ("pnhZkYs9a5U=" == getCookie("MBRSCTCD"))
                    alert("간편계정 회원의 경우 응모가 불가합니다.\nL.POINT 통합회원 가입 후 신청해주세요.");
                else if (d.loginInfo.isLogin)
                    $.ajax({
                        type: "post",
                        async: !1,
                        url: "/event/regAppPush.do",
                        data: {
                            evt_no: ""
                        },
                        success: function(a) {
                            if (a.indexOf("|") > -1) {
                                var b = a.split("|")
                                  , c = b[1];
                                if ("S" == b[0])
                                    return void (w >= q(2018, 10, 1) && w < q(2018, 10, 8) ? alert("금주 [" + c + "]회 L-point 10점 적립 응모 완료! 7회 응모시 총 100점(차주 월요일 지급)\nL-point 1만점 추가찬스(11월 발표)") : w >= q(2018, 10, 8) && w < q(2018, 10, 22) ? alert("금주 [" + c + "]회 L-point 10점 적립 응모 완료! 7회 응모시 총 100점(차주 화요일 지급)\nL-point 1만점 추가찬스(11월 발표)") : w >= q(2018, 10, 22) && w < q(2018, 10, 29) ? alert("금주 [" + c + "]회 L-point 10점 적립 응모 완료! 7회 응모시 총 100점(차주 목요일 지급)\nL-point 1만점 추가찬스(11월 발표)") : alert("금주 [" + c + "]회 L-point 10점 적립 응모 완료! 7회 응모시 총 100점(차주 화요일 지급)\nL-point 1만점 추가찬스(11월 발표)"));
                                if ("D" == b[0])
                                    return void alert("오늘은 이미 적립하셨네요. 내일 또 만나요^^\n금주 [" + c + "]회 적립 응모 완료")
                            }
                        }
                    });
                else if (confirm("로그인 후 적립하실 수 있습니다.")) {
                    var a = "targetUrl=" + encodeURIComponent(location.href, "UTF-8");
                    location.href = "/login/m/loginForm.do?" + a
                }
            }, 500)
        }
        ,
        d.sslive_flag = !1,
        d.sslive_vod_flag = !1,
        "5400745" == d.dispNoParam && (d.sslive_flag = !0,
        e.get(j.sslive_good).success(function(a) {
            d.goods_info = a.sslive,
            d.goods_info != c && 0 != d.goods_info.goods_no && (d.sslive_vod_flag = !0)
        })),
        d.event0516Flag = !1;
        for (var x = o("cn"), y = ["183926", "183925", "183924", "183745", "183744", "183628", "183526", "183525", "183524"], z = 0; z < y.length; z++)
            y[z] == x && (d.event0516Flag = !0);
        d.goToApp = function() {
            m.appDeepLink("lotte", null, "m_web_appdown_201503", "lotte200087lotte")
        }
        ,
        d.loadedListTemplate = function(a) {
            g(function() {
                d.$apply(function() {
                    d.templateType = a,
                    g(function() {
                        d.dataLoadingFinish = !0
                    })
                })
            })
        }
        ,
        d.rtnType = "A",
        d.firstcate_flag = !1,
        d.swipefnc = function() {
            setTimeout(function() {
                d.$apply(function() {
                    var a = parseInt($("#swipe_indi").attr("val"))
                      , c = d.findfirstCate(d.productList[0].divObjNo);
                    if (0 == a)
                        d.cate_first = c.divObjNm,
                        d.cate_count = c.goodsCnt;
                    else {
                        var e = b.element(".prod_list_03 > li").eq(a);
                        d.cate_first = e.attr("item_nm"),
                        d.cate_count = e.attr("item_cnt")
                    }
                    t()
                })
            }, 300)
        }
        ,
        d.findfirstCate = function(a) {
            var c = {
                divObjNo: "",
                divObjNm: "",
                goodsCnt: 0
            };
            return b.forEach(d.itemCateDataList, function(b, d) {
                b.divObjNo == a && (c = b)
            }),
            c
        }
        ,
        d.getProductDataLoad = function() {
            d.thisPage++,
            d.productListLoading = !0;
            try {
                e.get(j.planshopData + "?spdpNo=" + d.dispNoParam + "&divObjNo=" + d.divObjNoParam + "&recent_goods_no=" + d.recentParam + "&shoppingholicYn=" + d.shoppingholicParam + "&planShopGubunParam=" + d.planShopGubunParam + "&ss_yn=" + d.storyParam + "&page=" + d.thisPage + "&dispCnt=" + d.pageSize + "&rtnType=" + d.rtnType + "&stno=" + d.stno).success(function(a) {
                    if ("19511" == a.max.tmpl_no && (d.gucciproduct = !0),
                    "0000" == a.max.resultCode) {
                        d.page_end = parseInt(a.max.page_end),
                        d.product_tot_cnt = a.max.productCount;
                        var f = [];
                        if ("1" == d.thisPage) {
                            d.maxitemData = a.max.productCount,
                            null == a.max.linkSpdpList ? (d.categoryData = [],
                            d.categoryData.total_count = "0") : d.categoryData = a.max.linkSpdpList,
                            null == a.max.stsLst ? d.stroyShopData = [] : d.stroyShopData = a.max.stsLst.items,
                            null == a.max.ctgList ? (d.itemCateData = [],
                            d.itemCateDataList = []) : null == a.max.ctgList.items ? (d.itemCateData = [],
                            d.itemCateDataList = []) : (d.itemCateData = a.max.ctgList,
                            d.itemCateDataList = a.max.ctgList.items),
                            d.subTitle = a.max.spdp_nm,
                            d.planshopNumber = a.max.spdpNo;
                            var g = b.element(a.max.topHtml)
                              , h = 0;
                            for (h; h < g.length; h++) {
                                var i = b.element(g[h])
                                  , k = i.attr("href");
                                i.is("a") && i.attr("href", s(k)),
                                i.find("a").each(function(a, c) {
                                    var d = b.element(c)
                                      , e = d.attr("href");
                                    d.attr("href", s(e))
                                })
                            }
                            var l = "";
                            switch (g.each(function(a, b) {
                                l += "#text" == b.nodeName ? $(b)[0].textContent : $(b).prop("outerHTML")
                            }),
                            d.topHtml = l,
                            0 == d.topHtml.indexOf("null") && (d.topHtml = ""),
                            null == a.max.benefitBnr || "" == a.max.benefitBnr ? d.benefitData = "" : d.benefitData = a.max.benefitBnr,
                            "" == a.max.auto_pfcn_yn ? "10" == a.max.spdp_tp_cd ? d.autoBanner = "Y" : d.autoBanner = "N" : d.autoBanner = a.max.auto_pfcn_yn,
                            d.autoBannerData = a.max.autoProductEntity,
                            null == a.max.mo_spdp_bnr_img ? d.bannerImgData = "" : d.bannerImgData = a.max.mo_spdp_bnr_img,
                            d.bannerNameData = a.max.spdp_nm,
                            "11" != a.max.spdp_tp_cd && "24" != a.max.spdp_tp_cd ? "Y" == d.storyParam ? d.planKindData = "SS" : "superchance" == a.max.superChaceSpdpTpCd ? d.planKindData = "superchance" : d.planKindData = "10" : d.planKindData = a.max.spdp_tp_cd,
                            null == a.max.topConr ? d.upplanshopMainData = "0" : "0" == a.max.topConr.items.length ? d.upplanshopMainData = "0" : d.upplanshopMainData = a.max.topConr,
                            null == a.max.topConr ? d.promotionData = "0" : d.promotionData = a.max.topConr.promotion,
                            d.lastProData = a.max.recentPrdLst,
                            d.prv_banner_list = a.max.prv_banner_list,
                            d.templateType) {
                            case "image":
                                d.loadedListTemplate("image");
                                break;
                            case "list":
                                d.loadedListTemplate("list");
                                break;
                            case "swipe":
                                d.loadedListTemplate("swipe");
                                break;
                            default:
                                null == a.max.mbl_goods_disp_lst_tp_cd ? d.loadedListTemplate("image") : "10" == a.max.mbl_goods_disp_lst_tp_cd ? d.loadedListTemplate("image") : "20" == a.max.mbl_goods_disp_lst_tp_cd ? d.loadedListTemplate("list") : "30" == a.max.mbl_goods_disp_lst_tp_cd ? d.loadedListTemplate("swipe") : d.loadedListTemplate("image")
                            }
                            if (null == a.max.prdLst)
                                d.productList = [];
                            else {
                                var m = []
                                  , o = a.max.prdLst.items[0];
                                d.cid = 1,
                                d.cate_first = o.divObjNm,
                                d.cate_count = d.itemCateDataList[d.cid].goodsCnt,
                                t();
                                for (var p = d.cate_count, h = 0; h < a.max.prdLst.items.length; h++)
                                    o = a.max.prdLst.items[h],
                                    f.length < 3 && f.push(o.goods_no + "" || ""),
                                    o.divObjNo && h > 0 && o.divObjNo != a.max.prdLst.items[h - 1].divObjNo && (d.cid++,
                                    d.itemCateDataList[d.cid].goodsCnt && (p = d.itemCateDataList[d.cid].goodsCnt),
                                    m.push({
                                        cateflag: !0,
                                        divObjNm: o.divObjNm,
                                        count: p,
                                        id: d.cid
                                    })),
                                    o.cnt = p,
                                    m.push(o);
                                d.productList = m
                            }
                            d.product_tot_cnt < d.thisPage * d.pageSize ? d.productMoreScroll = !1 : d.productMoreScroll = !0,
                            d.productListLoading = !1
                        } else {
                            var p = 0;
                            d.productList[d.productList.length - 1] && (p = d.productList[d.productList.length - 1].cnt),
                            b.forEach(a.max.prdLst.items, function(a, b) {
                                a.divObjNo && d.productList.length > 0 && d.productList[d.productList.length - 1].divObjNo && a.divObjNo != d.productList[d.productList.length - 1].divObjNo && d.cid < d.itemCateDataList.length - 1 && (d.cid++,
                                d.itemCateDataList[d.cid].goodsCnt && (p = d.itemCateDataList[d.cid].goodsCnt),
                                d.productList.push({
                                    cateflag: !0,
                                    divObjNm: a.divObjNm,
                                    count: p,
                                    id: d.cid
                                })),
                                a.cnt = p,
                                d.productList.push(a)
                            }),
                            d.product_tot_cnt < d.thisPage * d.pageSize ? d.productMoreScroll = !1 : d.productMoreScroll = !0,
                            d.productListLoading = !1
                        }
                        d.productListLoading = !1
                    } else
                        d.contents = {},
                        d.subTitle = "기획전",
                        d.noData = !0,
                        d.productListLoading = !1;
                    d.isLoading = !1,
                    "A" == d.rtnType && (d.isSurprise = !1,
                    a.max.surpriseTopInfo != c && null != a.max.surpriseTopInfo && (d.isSurprise = !0,
                    d.surpriseTopInfo = a.max.surpriseTopInfo.items[0],
                    d.surpriseTopInfo.bannerDesc = d.surpriseTopInfo.bannerDesc.replace("<br>", " "),
                    d.spromotion = a.max.topConr.promotion,
                    d.surpriseEventBanner = a.max.surpriseEventBanner,
                    d.surpriseNotice = a.max.surpriseNotice.items)),
                    d.comment = a.max.comment_yn,
                    d.commentType = a.max.rpl_pos_cd,
                    "Y" == d.comment && e.get(j.planshopCommentData + "?&spdpNo=" + d.dispNoParam).success(function(a) {
                        if (d.commentData = a.max,
                        d.commentListData = [],
                        d.agrPppUseData = d.commentData.cust_agr_ppp_use_yn,
                        d.agrCommentsPop = !1,
                        d.commentData.cust_agr_ppp_txt_cont && (d.pop_txt_cont = d.commentData.cust_agr_ppp_txt_cont),
                        null != a.max.comment) {
                            for (var b = 0; b < a.max.comment.items.length; b++)
                                a.max.comment.items[b].cont = a.max.comment.items[b].cont.split("&#34;").join('"'),
                                a.max.comment.items[b].cont = a.max.comment.items[b].cont.split("&lt;").join("<"),
                                a.max.comment.items[b].cont = a.max.comment.items[b].cont.split("&gt;").join(">");
                            d.commentListData = a.max.comment.items,
                            d.commentidData = a.max.comment.items.mbr_id,
                            d.commentList = null != a.max.comment ? a.max.comment.items : []
                        }
                    }),
                    d.sendBuzzni && d.sendBuzzni("list", f),
                    setTimeout(function() {
                        d.topHtml && $("#mobile_html").html(n(d.topHtml)(d))
                    }, 500)
                }).error(function(a, b, c, d) {
                    console.log("Error Data : ", b, c, d)
                })
            } catch (a) {
                d.contents = {},
                d.subTitle = "기획전",
                d.noData = !0,
                d.isLoading = !1,
                d.productListLoading = !1,
                console.log("Planshop data error")
            }
        }
        ,
        g(function() {
            "Y" == d.autoBanner ? d.share_img = d.autoBannerData.img_url_550 : d.share_img = "http://image.lotte.com/lotte/mobile/common/share_img2016_v2.png"
        }, 2e3),
        d.gotoPrepageSide = function() {
            d.sendTclick("m_side_new_pre"),
            history.go(-1)
        }
        ,
        g(function() {
            d.moreListClick = function() {
                d.sendTclick(d.tClickBase + "Planshop_Scl_Prd_page" + d.divObjNoParam),
                d.getProductDataLoad()
            }
        }),
        d.surpriseEventBannerClick = function() {
            var a = "&tclick=" + d.tClickBase + "m_Suprise_Ban01";
            f.location.href = j.baseUrl + d.surpriseEventBanner.linkUrl + a
        }
        ,
        d.allProductClick = function() {
            d.sendTclick(d.tClickBase + "Planshop_Clk_Btn_1"),
            d.allProductOpenFlag = !d.allProductOpenFlag
        }
        ,
        d.benefitClick = function() {
            var a = "&tclick=" + d.tClickBase + "Planshop_Clk_Btn_1";
            f.location.href = j.baseUrl + d.benefitData.linkUrl + a + "&" + d.baseParam
        }
        ,
        d.closeProClick = function() {
            d.allProductOpenFlag = !1
        }
        ,
        d.changeTemplate = function(a) {
            d.sendTclick(d.tClickBase + "Planshop_Clk_Pico_" + a),
            d.firstcate_flag = !1;
            var b = d.findfirstCate(d.productList[0].divObjNo);
            d.cate_first = b.divObjNm,
            d.cate_count = b.goodsCnt,
            t(),
            d.templateType = a,
            k.setSessionStorage(d.screenID + "Loc", i.absUrl()),
            k.setSessionStorage(d.screenID + "TemplateType", d.templateType)
        }
        ,
        d.closeCateClick = function() {
            d.cateViewFlag = !1
        }
        ,
        d.cateViewClick = function() {
            return "Y" == d.storyParam ? (d.sendTclick("m_DC_Planshop_Clk_Btn_8"),
            "0" == d.stroyShopData.total_count ? !1 : (d.cateViewFlag = !d.cateViewFlag,
            !1)) : (d.sendTclick(d.tClickBase + "Planshop_Clk_Btn_8"),
            "0" == d.categoryData.total_count ? !1 : "10" == d.planKindData ? "0" == d.categoryData ? (d.cateViewFlag = !1,
            !1) : (d.cateViewFlag = !1,
            !1) : (d.cateViewFlag = !d.cateViewFlag,
            !1))
        }
        ,
        d.gotoPrepage = function() {
            d.sendTclick("m_RDC_header_new_pre")
        }
        ,
        d.storyshopMove = function(a, b) {
            10 > b && (b = "0" + b);
            var c = "m_DC_Planshop_ClkW_Rst_B" + b;
            f.location.href = j.baseUrl + a.link_url + "&ss_yn=Y&tclick=" + c + "&stno=" + d.stno + "&stcate=" + d.stCate + "&stnm=" + d.brRemove(a.title_nm) + "&stdt=" + a.start_date
        }
        ,
        d.goGoodsDetail = function(b, c, e) {
            var f = e + 1;
            if ("Y" == b.limit_age_yn || "19" == b.pmg_byr_age_lmt_cd) {
                if ("" == scope.$parent.loginInfo.isAdult)
                    return alert("이 상품은 본인 인증 후 이용하실 수 있습니다."),
                    scope.$parent.goAdultSci(),
                    !1;
                if (!scope.$parent.loginInfo.isAdult)
                    return alert("이 상품은 법률규정에 의하여 만 19세 이상 성인만 조회 및 구매가 가능합니다."),
                    !1
            }
            var g = "";
            b.curDispNo && (g = "&curDispNo=" + b.curDispNo);
            var h = "";
            if (b.curDispNoSctCd && (h = "&curDispNoSctCd=" + b.curDispNoSctCd),
            "recent" == c)
                var i = "_Clk_Prd_1";
            else if ("norUp" == c)
                var i = "_Swp_Prd_A" + f;
            else if ("spUp" == c)
                var i = "_Swp_Prd_" + f;
            var k = d.tClickBase + "Planshop" + i;
            a.location.href = j.prdviewUrl + "?" + d.baseParam + "&goods_no=" + b.goods_no + g + h + "&tclick=" + k
        }
        ,
        d.sortCateClick = function(a, c, h) {
            var m = h + 1;
            d.sendTclick(d.tClickBase + "Planshop_ClkW_Rst_A" + m);
            var n = {};
            d.dataLoadingFinish = !1,
            d.divObjNoParam = a,
            d.divName = c,
            d.thisPage = "1",
            d.productList = [],
            d.isLoading = !1,
            d.isProductLoading = !0,
            d.allProductOpenFlag = !1,
            d.rtnType = "P",
            d.StoredScrollY = d.sortCateTop = $(".planshop_sub_cate").offset().top - 47,
            b.element(f).scrollTop(d.sortCateTop + 1),
            e.get(j.planshopData + "?spdpNo=" + d.dispNoParam + "&divObjNo=" + d.divObjNoParam + "&recent_goods_no=" + d.recentParam + "&shoppingholicYn=" + d.shoppingholicParam + "&planShopGubunParam=" + d.planShopGubunParam + "&ss_yn=" + d.storyParam + "&page=" + d.thisPage + "&dispCnt=" + d.pageSize + "&rtnType=" + d.rtnType + "&stno=" + d.stno).success(function(a) {
                $("#curcatenm").text(d.divName),
                d.page_end = parseInt(a.max.page_end),
                d.product_tot_cnt = a.max.productCount,
                d.cid = 1;
                var c = d.findfirstCate(a.max.prdLst.items[0].divObjNo)
                  , e = c.goodsCnt;
                b.forEach(a.max.prdLst.items, function(a, b) {
                    a.divObjNo && b > 0 && d.productList[b - 1].divObjNo && a.divObjNo != d.productList[d.productList.length - 1].divObjNo && (d.cid++,
                    d.itemCateDataList[d.cid].goodsCnt && (e = d.itemCateDataList[d.cid].goodsCnt),
                    d.productList.push({
                        cateflag: !0,
                        divObjNm: a.divObjNm,
                        count: e,
                        id: d.cid
                    })),
                    a.cnt = e,
                    d.productList.push(a)
                }),
                d.cate_first = c.divObjNm,
                d.cate_count = c.goodsCnt,
                t(),
                d.product_tot_cnt < d.thisPage * d.pageSize ? d.productMoreScroll = !1 : d.productMoreScroll = !0,
                d.productListLoading = !1,
                d.maxitemData = a.max.productCount,
                "image" == d.templateType ? d.loadedListTemplate("image") : "list" == d.templateType ? d.loadedListTemplate("list") : "swipe" == d.templateType && d.loadedListTemplate("swipe"),
                d.isProductLoading = !0
            }).error(function(a, b, c, d) {
                console.log("Error Data : ", b, c, d)
            }),
            g(function() {
                n.subTitle = d.subTitle,
                n.allProductOpenFlag = d.allProductOpenFlag,
                n.cateViewFlag = d.cateViewFlag,
                n.allProductFlag = d.allProductFlag,
                n.upplanshopMainData = d.upplanshopMainData,
                n.itemCateDataList = d.itemCateDataList,
                n.dispNoParam = d.dispNoParam,
                n.divObjNoParam = d.divObjNoParam,
                n.storyParam = d.storyParam,
                n.shoppingholicParam = d.shoppingholicParam,
                n.planShopGubunParam = d.planShopGubunParam,
                n.recentParam = d.recentParam,
                n.productList = d.productList,
                n.pageSize = d.pageSize,
                n.product_tot_cnt = d.product_tot_cnt,
                n.rtnType = d.rtnType,
                n.divName = d.divName,
                n.thisPage = d.thisPage,
                n.page_end = d.page_end,
                n.maxitemData = d.maxitemData,
                n.categoryData = d.categoryData,
                n.stroyShopData = d.stroyShopData,
                n.itemCateData = d.itemCateData,
                n.itemCateDataList = d.itemCateDataList,
                n.planshopNumber = d.planshopNumber,
                n.topHtml = d.topHtml,
                n.autoBanner = d.autoBanner,
                n.autoBannerData = d.autoBannerData,
                n.bannerImgData = d.bannerImgData,
                n.bannerNameData = d.bannerNameData,
                n.planKindData = d.planKindData,
                n.promotionData = d.promotionData,
                n.templateType = d.templateType,
                n.benefitData = d.benefitData,
                n.isSurprise = d.isSurprise,
                n.surpriseTopInfo = d.surpriseTopInfo,
                n.surpriseEventBanner = d.surpriseEventBanner,
                n.spromotion = d.spromotion,
                n.surpriseNotice = d.surpriseNotice,
                n.comment = d.comment,
                n.commentType = d.commentType,
                n.commentData = d.commentData,
                n.commentListData = d.commentListData,
                n.agrPppUseData = d.agrPppUseData,
                n.pop_txt_cont = d.pop_txt_cont,
                !l.query.localtest && d.leavePageStroage && (k.setSessionStorage(d.screenID + "Loc", i.absUrl()),
                k.setSessionStorage(d.screenID + "Data", n, "json"),
                k.setSessionStorage(d.screenID + "ScrollY", b.element(f).scrollTop())),
                $("#curcatenm").text(d.divName)
            }, 2e3)
        }
        ,
        d.goPlanshopClick = function(a) {
            var b = d.tClickBase + "Planshop_ClkW_Rst_B" + d.divObjNoParam;
            f.location.href = j.prdlstUrl + "?" + d.baseParam + "&curDispNo=" + a + "&tclick=" + b
        }
        ,
        g(function() {
            d.getPlanSwipeSize = function() {
                if (d.itemCateDataList.length) {
                    var a = parseInt(d.itemCateDataList.length / 5);
                    return d.itemCateDataList.length % 5 != 0 && a++,
                    new Array(a)
                }
                return new Array
            }
        }, 2e3),
        d.getPlanSwipeSize = function() {
            if (d.itemCateDataList.length) {
                var a = parseInt(d.itemCateDataList.length / 5);
                return d.itemCateDataList.length % 5 != 0 && a++,
                new Array(a)
            }
            return new Array
        }
        ,
        g(function() {
            d.getStorySwipeSize = function() {
                return d.stroyShopData.length ? new Array(parseInt(d.stroyShopData.length / 5 + .9)) : new Array
            }
        }, 2e3),
        d.supriseClick = function() {
            f.location.href = d.upplanshopMainData.promotion.link_url
        }
        ,
        b.element(f).on("scroll", function(a) {});
        var A = k.getSessionStorage(d.screenID + "Loc")
          , B = k.getSessionStorage(d.screenID + "Data")
          , C = k.getSessionStorage(d.screenID + "ScrollY")
          , D = k.getSessionStorage(d.screenID + "TemplateType");
        if (d.StoredScrollY = C,
        A == a.location.href) {
            var E = JSON.parse(B);
            d.isLoading = !1,
            d.dataLoadingFinish = !1,
            d.subTitle = E.subTitle,
            d.allProductOpenFlag = E.allProductOpenFlag,
            d.cateViewFlag = E.cateViewFlag,
            d.allProductFlag = E.allProductFlag,
            d.upplanshopMainData = E.upplanshopMainData,
            d.itemCateDataList = E.itemCateDataList,
            d.dispNoParam = E.dispNoParam,
            d.divObjNoParam = E.divObjNoParam,
            d.storyParam = E.storyParam,
            d.shoppingholicParam = E.shoppingholicParam,
            d.planShopGubunParam = E.planShopGubunParam,
            d.recentParam = E.recentParam,
            d.productList = E.productList,
            d.pageSize = E.pageSize,
            d.product_tot_cnt = E.product_tot_cnt,
            d.rtnType = E.rtnType,
            d.divName = E.divName,
            d.thisPage = E.thisPage,
            d.page_end = E.page_end,
            d.maxitemData = E.maxitemData,
            d.categoryData = E.categoryData,
            d.stroyShopData = E.stroyShopData,
            d.itemCateData = E.itemCateData,
            d.itemCateDataList = E.itemCateDataList,
            d.planshopNumber = E.planshopNumber,
            d.topHtml = E.topHtml,
            d.autoBanner = E.autoBanner,
            d.autoBannerData = E.autoBannerData,
            d.bannerImgData = E.bannerImgData,
            d.bannerNameData = E.bannerNameData,
            d.planKindData = E.planKindData,
            d.promotionData = E.promotionData,
            d.templateType = D,
            d.benefitData = E.benefitData,
            d.isSurprise = E.isSurprise,
            d.surpriseTopInfo = E.surpriseTopInfo,
            d.surpriseEventBanner = E.surpriseEventBanner,
            d.spromotion = E.spromotion,
            d.surpriseNotice = E.surpriseNotice,
            d.comment = E.comment,
            d.commentType = E.commentType,
            d.commentData = E.commentData,
            d.commentListData = E.commentListData,
            d.agrPppUseData = E.agrPppUseData,
            d.pop_txt_cont = E.pop_txt_cont,
            "list" == d.templateType ? d.loadedListTemplate("list") : "swipe" == d.templateType ? d.loadedListTemplate("swipe") : d.loadedListTemplate("image"),
            d.product_tot_cnt < d.thisPage * d.pageSize ? d.productMoreScroll = !1 : d.productMoreScroll = !0,
            g(function() {
                b.element(f).scrollTop(C);
                var a = d.findfirstCate(d.productList[0].divObjNo);
                d.cate_first = a.divObjNm,
                d.cate_count = a.goodsCnt,
                t(),
                $("#curcatenm").text(d.divName)
            }, 800)
        } else
            d.StoredScrollY = 0,
            d.templateType = D,
            d.getProductDataLoad();
        b.element(f).on("unload", function(a) {
            0 == d.allProductOpenFlag,
            0 == d.cateViewFlag,
            0 == d.allProductFlag;
            var c = {};
            c.subTitle = d.subTitle,
            c.allProductOpenFlag = d.allProductOpenFlag,
            c.cateViewFlag = d.cateViewFlag,
            c.allProductFlag = d.allProductFlag,
            c.upplanshopMainData = d.upplanshopMainData,
            c.itemCateDataList = d.itemCateDataList,
            c.dispNoParam = d.dispNoParam,
            c.divObjNoParam = d.divObjNoParam,
            c.storyParam = d.storyParam,
            c.shoppingholicParam = d.shoppingholicParam,
            c.planShopGubunParam = d.planShopGubunParam,
            c.recentParam = d.recentParam,
            c.productList = d.productList,
            c.pageSize = d.pageSize,
            c.product_tot_cnt = d.product_tot_cnt,
            c.rtnType = d.rtnType,
            c.divName = d.divName,
            c.thisPage = d.thisPage,
            c.page_end = d.page_end,
            c.maxitemData = d.maxitemData,
            c.categoryData = d.categoryData,
            c.stroyShopData = d.stroyShopData,
            c.itemCateData = d.itemCateData,
            c.itemCateDataList = d.itemCateDataList,
            c.planshopNumber = d.planshopNumber,
            c.topHtml = d.topHtml,
            c.autoBanner = d.autoBanner,
            c.autoBannerData = d.autoBannerData,
            c.bannerImgData = d.bannerImgData,
            c.bannerNameData = d.bannerNameData,
            c.planKindData = d.planKindData,
            c.promotionData = d.promotionData,
            c.templateType = d.templateType,
            c.benefitData = d.benefitData,
            c.isSurprise = d.isSurprise,
            c.surpriseTopInfo = d.surpriseTopInfo,
            c.surpriseEventBanner = d.surpriseEventBanner,
            c.spromotion = d.spromotion,
            c.surpriseNotice = d.surpriseNotice,
            c.comment = d.comment,
            c.commentType = d.commentType,
            c.commentData = d.commentData,
            c.commentListData = d.commentListData,
            c.agrPppUseData = d.agrPppUseData,
            c.pop_txt_cont = d.pop_txt_cont,
            !l.query.localtest && d.leavePageStroage && (k.setSessionStorage(d.screenID + "Loc", i.absUrl()),
            k.setSessionStorage(d.screenID + "Data", c, "json"),
            k.setSessionStorage(d.screenID + "ScrollY", b.element(f).scrollTop()),
            k.setSessionStorage(d.screenID + "TemplateType", d.templateType))
        })
    }
    ]),
    d.directive("lotteContainer", function() {
        return {
            templateUrl: "/lotte/resources_dev/product/m/product_list_container.html",
            replace: !0,
            link: function(a, b, c) {}
        }
    }),
    d.directive("scrollIf", function() {
        return function(b, c, d) {
            setTimeout(function() {
                b.$eval(d.scrollIf) && a.scrollTo(0, c[0].offsetTop - 115)
            })
        }
    }),
    d.directive("sortCate", ["$window", "$timeout", "$location", "AppDownBnrService", "LotteStorage", function(a, c, d, e, f) {
        return {
            templateUrl: "/lotte/resources_dev/product/m/product_list_select_container2.html",
            replace: !0,
            link: function(d, e, f) {
                var g;
                d.fixflag = !1,
                d.sortPosition = function() {
                    g = b.element(".planshop_sub_cate").offset().top - 47,
                    d.appObj.isNativeHeader || (g = b.element(".planshop_sub_cate").offset().top),
                    d.$parent.$parent.sortCateTop = g
                }
                ,
                b.element(a).on("scroll", function(c) {
                    if ($(".planshop_sub_cate").length > 0 && (g = b.element(".planshop_sub_cate").offset().top - 48,
                    d.appObj.isNativeHeader && (g = b.element(".planshop_sub_cate").offset().top)),
                    b.element(a).scrollTop() > g) {
                        var f = 0;
                        d.appObj.isNativeHeader || (f = 48),
                        e[0].style.cssText = "position:fixed;top:" + f + "px;",
                        d.fixflag = !0
                    } else
                        e[0].style.cssText = "",
                        d.fixflag = !1;
                    if ("swipe" != d.templateType && "" == d.divObjNoParam) {
                        var h = 1
                          , i = 0
                          , j = 0
                          , k = 174
                          , l = d.screenType
                          , m = 0;
                        "image" == d.templateType && (k = parseInt($(".prod_list_02 > li:first-child").height()),
                        l += 1);
                        for (var n = [0]; i < d.productList.length; i++)
                            d.productList[i].cateflag ? (n.push(j),
                            j += 49,
                            m = 0) : (0 == m && (j += k),
                            m += 1,
                            m >= l && (m = 0));
                        for (i = 0; i < n.length; i++)
                            this.pageYOffset - g > n[i] && (h = i + 1);
                        d.fixflag || (h = 0),
                        h < d.itemCateDataList.length && (d.divName = d.itemCateDataList[h].divObjNm,
                        $("#curcatenm").text(d.divName))
                    }
                }),
                c(function() {
                    var a = b.element(".plan_bannerWrap img,.prd_swipe img");
                    0 != a.length ? (a.load(function() {
                        c(function() {
                            d.sortPosition()
                        }, 900)
                    }),
                    c(function() {
                        d.sortPosition()
                    }, 900)) : c(function() {
                        d.sortPosition()
                    }, 900)
                }, 1500)
            }
        }
    }
    ]),
    d.directive("subHeaderEach", ["$window", "AppDownBnrService", function(a, c) {
        return {
            replace: !0,
            link: function(d, e, f) {
                function g() {
                    d.appObj.isNativeHeader && (j = 0),
                    i.scrollTop() >= c.appDownBnrInfo.height ? h.attr("style", "z-index:10;position:fixed;top:" + j + "px;width:100%") : h.removeAttr("style")
                }
                var h = b.element(e)
                  , i = b.element(a)
                  , j = d.subHeaderHeight;
                i.on("scroll", function(a) {
                    g(),
                    setTimeout(g, 300)
                })
            }
        }
    }
    ]),
    d.directive("commentModule", ["$window", "$http", "LotteCommon", "LotteUtil", "LotteCookie", function(a, b, c, d, e) {
        return {
            templateUrl: "/lotte/resources_dev/product/m/product_list_comment.html",
            replace: !0,
            link: function(a, d, e) {
                a.input = {},
                a.input.commentTxt = "",
                a.commentListIndex,
                a.commentListClick = function(b) {
                    a.commentListIndex == b ? a.commentListIndex = null : a.commentListIndex = b
                }
                ,
                a.reqDetailParam = {
                    NoArrList: []
                },
                a.commentList = [],
                a.commentListPage = 1,
                a.registerCheck = function() {
                    if (null == a.loginInfo || !a.loginInfo.isLogin) {
                        var b = "targetUrl=" + encodeURIComponent(location.href, "UTF-8");
                        return void (location.href = "/login/m/loginForm.do?" + b)
                    }
                }
                ,
                a.register = function(d, e) {
                    var f = a.input.commentTxt;
                    return $.ajax({
                        type: "POST",
                        url: c.planshopCommentRegData + "?&spdpNo=" + a.dispNoParam,
                        data: {
                            cont: f
                        }
                    }).success(function(d) {
                        "reg_success" == d.commentInsert.response_code ? (alert("등록되었습니다."),
                        b.get(c.planshopCommentData + "?&spdpNo=" + a.dispNoParam).success(function(b) {
                            if (a.commentData = b.max,
                            a.commentListData = [],
                            a.agrPppUseData = a.commentData.cust_agr_ppp_use_yn,
                            a.agrCommentsPop = !1,
                            a.commentData.cust_agr_ppp_txt_cont && (a.pop_txt_cont = a.commentData.cust_agr_ppp_txt_cont),
                            null != b.max.comment) {
                                for (var c = 0; c < b.max.comment.items.length; c++)
                                    b.max.comment.items[c].cont = b.max.comment.items[c].cont.split("&#34;").join('"'),
                                    b.max.comment.items[c].cont = b.max.comment.items[c].cont.split("&lt;").join("<"),
                                    b.max.comment.items[c].cont = b.max.comment.items[c].cont.split("&gt;").join(">");
                                a.commentListData = b.max.comment.items,
                                a.commentidData = b.max.comment.items.mbr_id,
                                a.commentList = null != b.max.comment ? b.max.comment.items : [],
                                a.commentLoginidData = b.max.comment.items.login_id
                            }
                        }),
                        a.input.commentTxt = "") : "reg_fail" == d.commentInsert.response_code && alert("등록이 실패되었습니다.")
                    }),
                    !1
                }
                ,
                a.idChange = function(a) {
                    for (var b = a.substr(0, 3), c = 3; c < a.length; c++)
                        b += "*";
                    return b
                }
                ,
                a.deleteComment = function(d, e) {
                    var f = confirm("댓글을 삭제하시겠습니까?");
                    return f ? void b.get(c.planshopCommentDeleteData + "?&spdpNo=" + a.dispNoParam, {
                        params: {
                            bbcNo: d
                        }
                    }).success(function(b) {
                        "del_success" == b.commentDelete.response_code && (alert("삭제되었습니다."),
                        a.commentListData.splice(e, 1))
                    }) : !1
                }
                ,
                a.getCommentListPaging = function(d) {
                    0 == d && (a.commentList = []),
                    d *= 1,
                    a.commentListPage = d + 1,
                    a.reqDetailParam.page = a.commentListPage,
                    b.get(c.planshopCommentData + "?&spdpNo=" + a.dispNoParam, {
                        params: a.reqDetailParam
                    }).success(function(b) {
                        try {
                            var c = b.max;
                            if (c.comment)
                                for (var d = 0; d < c.comment.items.length; d++)
                                    a.commentListData.push(c.comment.items[d]);
                            a.commentData = b.max
                        } catch (e) {}
                    }).error(function() {
                        console.log("Data Error : getCommentViewListPaging 실패")
                    })
                }
                ,
                a.newRegister = function() {
                    var b = a.input.commentTxt
                      , c = document.querySelector("#commentTxt");
                    return 0 == b.trim().length ? (alert("댓글을 남겨주세요."),
                    c.focus(),
                    !1) : calcBytes(b) > 200 ? (alert("댓글은 100자[한글기준] 이내로 제한되어 있습니다."),
                    c.focus(),
                    !1) : void ("Y" == a.agrPppUseData ? a.agrCommentsPop = !0 : a.register())
                }
                ,
                a.commentsPopClose = function() {
                    a.agrCommentsPop = !1,
                    document.querySelector("#commentTxt").focus()
                }
            }
        }
    }
    ]),
    d.directive("htmlSwipe", [function() {
        return {
            restrict: "AEC",
            replace: !0,
            scope: !0,
            link: function(b, c, d) {
                b.htmlSiwpeIndex = 0,
                b.htmlSiwpeTotal = 0,
                b.htmlSiwpeController = {},
                b.getProdDetailHtmlSwipeControl = function(a) {
                    b.htmlSiwpeController = a,
                    b.htmlSiwpeIndex = a.getIndex(),
                    b.htmlSiwpeTotal = c.find(".swipeBox li").not(".dummy").length
                }
                ,
                b.HtmlswipeEnd = function(a) {
                    b.htmlSiwpeIndex = a
                }
                ,
                b.htmlSwipeBefore = function() {
                    var a = b.htmlSiwpeIndex;
                    a > 0 ? a-- : a = b.htmlSiwpeTotal - 1,
                    b.htmlSiwpeController.moveIndex(a)
                }
                ,
                b.htmlSwipeNext = function() {
                    var a = b.htmlSiwpeIndex;
                    a < b.htmlSiwpeTotal ? a++ : a = 0,
                    b.htmlSiwpeController.moveIndex(a)
                }
                ,
                b.$watch("htmlSiwpeTotal", function(a, c) {
                    a && setTimeout(function() {
                        b.$apply()
                    }, 500)
                }),
                $scope.luchyPointClick = function() {
                    $scope.sendTclick($scope.tClickBase + "footer_Clk_Btn_8"),
                    $scope.appObj.isApp ? openNativePopup("럭키포인트", "https://m.lpoint.com/app/event/LWEA100200.do?evnId=EVN501177") : a.open("https://m.lpoint.com/app/event/LWEA100200.do?evnId=EVN501177")
                }
            }
        }
    }
    ]).directive("planshopIframe", ["$timeout", function(c) {
        return {
            restrict: "AE",
            replace: !0,
            scope: !0,
            link: function(d, e, f) {
                function g() {
                    l = e[0],
                    m = l.contentWindow,
                    e.attr("onLoad", "angular.element(this).scope().iframeOnLoaded()"),
                    l.width = "100%",
                    a.onmessage = k,
                    i(),
                    "auto" == l.height,
                    a.onload = function() {
                        i()
                    }
                    ,
                    a.onresize = h,
                    n = a.innerWidth
                }
                function h() {
                    if (Math.ceil(n) != Math.ceil(a.innerWidth)) {
                        n = a.innerWidth;
                        var c = b.element(l).attr("src");
                        b.element(l).attr("src", c)
                    }
                }
                function i() {
                    m.postMessage(o, "*")
                }
                function j(a) {
                    p && clearTimeout(p),
                    p = setTimeout(function() {
                        l.height = a + "px",
                        d.$apply()
                    }, 500)
                }
                function k(a) {
                    console.log(a, l.height),
                    "auto" != l.height && "dearpet" == a.data.type && a.data.height && j(a.data.height)
                }
                var l, m, n, o = location.hostname, p = 0;
                d.iframeOnLoaded = function() {
                    l.height = "0px",
                    a.scrollTo(0, 0),
                    i()
                }
                ,
                e.attr("scrolling", "no"),
                e.attr("frameborder", "0"),
                c(g, 1e3)
            }
        }
    }
    ])
}(window, window.angular),
function(a, b, c) {
    "use strict";
    var d = b.module("lotteUnit", ["lotteUtil"]);
    d.directive("commUnit", [function() {
        return {
            templateUrl: "/lotte/resources_dev/unit/comm_unit.html",
            replace: !0,
            link: function(a, b, c) {
                var d = "";
                c.curdispno && (d = c.curdispno);
                var e = "";
                c.curdispnosctcd && (e = c.curdispnosctcd);
                var f = "";
                c.tclick && (f = c.tclick),
                a.clickUnit = function() {
                    a.item.curDispNo = d,
                    a.item.curDispNoSctCd = e,
                    a.productView(a.item, d, e, f)
                }
            }
        }
    }
    ]),
    d.directive("planUnit", function() {
        return {
            templateUrl: "/lotte/resources_dev/unit/plan_unit.html",
            replace: !0,
            link: function(a, b, c) {
                var d = "";
                c.curdispno && (d = c.curdispno);
                var e = "";
                c.curdispnosctcd && (e = c.curdispnosctcd);
                var f = "";
                c.tclick && (f = c.tclick),
                a.clickUnit = function() {
                    a.item.curDispNo = d,
                    a.item.curDispNoSctCd = e,
                    a.productView(a.item, d, e, f)
                }
            }
        }
    }),
    d.directive("commUnitDeal01", ["LotteLink", function(a) {
        return {
            templateUrl: "/lotte/resources_dev/unit/comm_unit_deal01.html",
            replace: !0,
            link: function(b, c, d) {
                var e = "";
                d.curdispno && (e = d.curdispno);
                var f = "";
                d.curdispnosctcd && (f = d.curdispnosctcd);
                var g = "";
                d.tclick && (g = d.tclick),
                b.clickUnit = function() {
                    if (b.item.outlnk && "" != b.item.outlnk)
                        if ("LECS" == b.item.outlnkMall) {
                            if (confirm("공식 온라인 몰로 이동 후 구입 할 수 있습니다.")) {
                                b.sendTclick(g);
                                try {
                                    console.log("TCLICK : " + g)
                                } catch (c) {}
                                a.goOutLink(b.item.outlnk, b.item.outlnkMall)
                            }
                        } else {
                            b.sendTclick(g);
                            try {
                                console.log("TCLICK : " + g)
                            } catch (c) {}
                            a.goOutLink(b.item.outlnk, b.item.outlnkMall)
                        }
                    else
                        b.item.curDispNo = e,
                        b.item.curDispNoSctCd = f,
                        b.productView(b.item, e, f, g)
                }
            }
        }
    }
    ]),
    d.directive("lotteUnit01ImgSrc", ["$http", "LotteCommon", function(a, b) {
        return {
            link: function(a, b, c) {
                "19" == a.item.byrAgelmt && !a.loginInfo || !a.loginInfo.isAdult && "19" == a.item.byrAgelmt ? c.$set("src", a.imgPath + "/lotte/mobile/sub/img_19_280x280.png") : c.$set("src", c.lotteUnit01ImgSrc),
                b.on("error", function(b) {
                    c.src != a.imgPath + "/lotte/images/common/product/no_280.gif" && c.$set("src", a.imgPath + "/lotte/images/common/product/no_280.gif")
                })
            }
        }
    }
    ]),
    d.directive("commUnitType01", ["$http", "LotteUtil", "LotteCommon", "LotteLink", "LotteStorage", function(a, b, c, d, e) {
        return {
            templateUrl: "/lotte/resources_dev/unit/comm_unit_type01.html",
            replace: !0,
            link: function(a, b, c) {
                a.addWishFlag = !1;
                var f = "";
                c.curdispno && (f = c.curdispno);
                var g = "";
                c.curdispnosctcd && (g = c.curdispnosctcd);
                var h = "";
                c.tclick && (h = c.tclick),
                a.clickUnit = function() {
                    if (a.item.outlnk && "" != a.item.outlnk) {
                        if ("LECS" == a.item.outlnkMall) {
                            if (confirm("공식 온라인 몰로 이동 후 구입 할 수 있습니다.")) {
                                a.sendTclick(h);
                                try {
                                    console.log("TCLICK : " + h)
                                } catch (b) {}
                                d.goOutLink(a.item.outlnk, a.item.outlnkMall)
                            }
                        } else if ("SP" == a.item.outlnkMall && confirm("롯데슈퍼로 이동후 구입할수있습니다.")) {
                            a.sendTclick(h);
                            try {
                                console.log("TCLICK : " + h)
                            } catch (b) {}
                            d.goOutLink(a.item.outlnk, a.item.outlnkMall)
                        }
                    } else
                        a.item.curDispNo = f,
                        a.item.curDispNoSctCd = g,
                        a.productView(a.item, f, g, h)
                }
                ,
                a.clickComment = function() {
                    "LECS" == a.item.outlnkMall ? confirm("공식온라인 몰로 이동후 확인 할 수 있습니다.") && d.goOutLink(a.item.outlnk, a.item.outlnkMall) : "SP" == a.item.outlnkMall ? confirm("롯데슈퍼로 이동후 확인 할 수 있습니다.") && d.goOutLink(a.item.outlnk, a.item.outlnkMall) : (e.setSessionStorage("comment", "ok"),
                    a.clickUnit())
                }
                ,
                a.addWish = function() {
                    if ("LECS" == a.item.outlnkMall)
                        return confirm("공식온라인 몰로 이동후 담을 수 있습니다.") && d.goOutLink(a.item.outlnk, a.item.outlnkMall),
                        !1;
                    if ("SP" == a.item.outlnkMall)
                        return confirm("롯데슈퍼로 이동후 담을 수 있습니다.") && d.goOutLink(a.item.outlnk, a.item.outlnkMall),
                        !1;
                    if (a.addWishFlag)
                        return alert("이미 등록된 상품입니다."),
                        a.addWishFlag = !0,
                        !1;
                    if (!a.loginInfo.isLogin)
                        return alert("로그인 후 이용하실 수 있습니다."),
                        a.loginProc(),
                        !1;
                    if (19 == a.item.byrAgelmt) {
                        if ("" == a.loginInfo.isAdult)
                            return alert("이 상품은 본인 인증 후 이용하실 수 있습니다."),
                            a.goAdultSci(),
                            !1;
                        if (!a.loginInfo.isAdult)
                            return alert("이 상품은 법률규정에 의하여 만 19세 이상 성인만 조회 및 구매가 가능합니다."),
                            !1
                    }
                    a.sendProductWish(a.item.goodsNo, function(b) {
                        b ? a.addWishFlag = !0 : a.addWishFlag = !1
                    })
                }
            }
        }
    }
    ])
}(window, window.angular);
var callDownCpn;
!function(a, b, c) {
    "use strict";
    var d = b.module("lotteMainPop", []);
    d.controller("lotteMainPopCtrl", ["$scope", "$window", "$location", "$http", "LotteCommon", "LotteUtil", "LotteCookie", "LotteStorage", "AppDownBnrService", "LotteLink", "commInitData", "LotteGA", "$timeout", function(a, d, e, f, g, h, i, j, k, l, m, n, o) {
        a.loadMainPopup = function(d) {
            function e() {
                f.get(g.mainPopupData, {
                    params: q
                }).success(function(b) {
                    if (!j.getSessionStorage("appDownBnrHide") && !a.appObj.isApp) {
                        var e = k.appDownBnrLoadDefer;
                        e.resolve(b.app_down_popup)
                    }
                    a.mainPop = b.current_page_popup,
                    a.mainPopNew = null,
                    a.isShowPop = !1,
                    "10" == q.ppp_tgt_pg_cd && b.main_new_popup != c && b.main_new_popup.length > 1 && (a.mainPopNew = b.main_new_popup,
                    a.isShowPop = !0,
                    a.getControlmp = function(b) {
                        a.controlmp = b
                    }
                    ,
                    a.next_pop = function(b) {
                        var c = a.controlmp.getIndex() + b;
                        a.controlmp.moveIndex(c)
                    }
                    ),
                    a.hideActionBar = h.isApp() && "F" == a.mainPop.ppp_prt_tp_cd && "20" != d.pppTgtPgCd && "30" != d.pppTgtPgCd ? !0 : !1,
                    0 != a.mainPop.ppp_sn && (callDownCpn = function() {
                        a.dupCouponIssue("88045"),
                        a.sendTclick("m_abtest_naverbanner_01")
                    }
                    ,
                    a.dupCouponIssue = function(b) {
                        if (a.loginInfo.isLogin)
                            b.length > 0 && f({
                                url: g.couponRegCouponData + "?" + a.baseParam,
                                data: "cpn_issu_no=" + b,
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                                }
                            }).success(function(b) {
                                b.result = b.result.replace("\\n", " "),
                                "undefined" != typeof h.getParameter("cn") && "140924" == h.getParameter("cn") && b.result.indexOf("발급받은") > -1 ? (alert("이달의 앱 쿠폰을 모두 받으셨습니다. 참좋은혜택 등급 쿠폰도 확인하세요!"),
                                location.href = g.gdBenefitUrl + "?" + a.baseParam) : alert(b.result),
                                a.popClose()
                            }).error(function(a) {
                                "1000" == a.error.response_code ? alert(a.error.response_msg) : ajaxResponseErrorHandler(a, function() {})
                            });
                        else {
                            var c = "?" + a.baseParam;
                            c += "&targetUrl=" + encodeURIComponent(location.href),
                            j.setSessionStorage("alliancePopupPPPSN", a.mainPop.ppp_sn),
                            location.href = g.loginUrl + c
                        }
                    }
                    ,
                    a.cookieName = a.mainPop.cookie_nm,
                    null != j.getSessionStorage("alliancePopupPPPSN") && a.loginInfo.isLogin ? a.dupCouponIssue(a.mainPop.cpn_no) : a.screenType > 1 && 10 == d.pppTgtPgCd || a.nopopup == c && (10 == d.pppTgtPgCd ? "Y" != j.getSessionStorage("nowPopView") && (a.isOpenPop = !0,
                    a.popOpen()) : (a.isOpenPop = !0,
                    a.popOpen())),
                    j.delSessionStorage("alliancePopupPPPSN"))
                }).error(function(a) {
                    console.log("Error Data :  메인팝업")
                })
            }
            var p = m.query
              , q = {
                ppp_tgt_pg_cd: d.pppTgtPgCd,
                cn: p.cn,
                udid: p.udid,
                schema: p.schema
            };
            a.nopopup = p.nopop,
            h.getParameter("testDate") && (q.testDate = h.getParameter("testDate")),
            a.hideActionBar = !1,
            a.cookieName = null,
            a.appActionBarHide = function() {
                a.appObj.isApp && a.hideActionBar && (location.href = "lottebridge://lotteapps/fullscreenhide")
            }
            ,
            a.appActionBarShow = function() {
                a.appObj.isApp && a.hideActionBar && (location.href = "lottebridge://lotteapps/fullscreenshow")
            }
            ,
            a.pop_move = function(a) {
                location.href = a
            }
            ,
            a.popGATag = function(b, c) {
                null != a.mainPopNew && (0 == b ? n.evtTag("MO_메인_팝업", "팝업", "닫기", "", "") : 1 == b ? n.evtTag("MO_메인_팝업", "팝업", "오늘하루그만보기", "", "") : 2 == b && (c += 1,
                10 > c && (c = "0" + c),
                n.evtTag("MO_메인_팝업", "팝업", c, "", "")))
            }
            ,
            a.popOpen = function() {
                b.element(".main_popup").show(),
                $("#wrapper").css("height", "97%"),
                null == a.mainPopNew && o(function() {
                    var c = b.element(".main_popup .inner.noswipe img")
                      , d = c.length
                      , e = 0;
                    0 === d && (a.isShowPop = !1),
                    c.each(function() {
                        $(this).one("load error", function(b) {
                            ++e === d && (a.isShowPop = !0)
                        }).each(function() {
                            (this.complete || "" == this.src) && $(this).trigger("load")
                        })
                    }),
                    a.isShowPop || $("#wrapper").css("height", "auto")
                }, 100)
            }
            ,
            a.popClose = function(e) {
                a.sendTclick("m_RDC_popup_Close"),
                b.element(".main_popup").remove(),
                $("#wrapper").css("height", "auto"),
                e == c && a.popGATag(0),
                "10" === d.pppTgtPgCd && j.setSessionStorage("nowPopView", "Y")
            }
            ,
            a.popToday = function() {
                a.sendTclick("m_RDC_popup_stoptoday"),
                i.setCookie(a.cookieName, "Y", 1),
                a.popGATag(1),
                a.popClose(0)
            }
            ,
            a.chkAlliancePopupObj = {
                flag: !0,
                imgPath: "",
                deepLinkFlag: !0,
                tclick: ""
            },
            a.closeAlliancePopup = function() {
                a.chkAlliancePopupObj.flag = !1
            }
            ,
            a.allianceExcuteApp = function(b) {
                var c = a.chkAlliancePopupObj.deepLinkFlag ? null : "http://m.lotte.com";
                a.chkAlliancePopupObj.tclick ? a.chkAlliancePopupObj.tclick : null;
                l.appDeepLink("lotte", c, a.chkAlliancePopupObj.tclick, b)
            }
            ,
            e()
        }
    }
    ]),
    d.config(["$compileProvider", function(a) {
        a.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/)
    }
    ]),
    d.directive("lotteMainPopup", ["$window", function(b) {
        return {
            templateUrl: "/lotte/resources_dev/layer/main_popup.html",
            controller: "lotteMainPopCtrl",
            replace: !0,
            link: function(b, c, d) {
                b.isOpenPop = !1,
                b.loadMainPopup(d),
                b.couponBnrLink = function(c) {
                    c.isOutLink ? getScope().appObj.isApp ? openNativePopup("", c.lnk_url_addr) : a.open(c.lnk_url_addr) : location.href = b.baseLink(c.lnk_url_addr)
                }
            }
        }
    }
    ]),
    d.controller("appDownBnrCtrl", ["$scope", "AppDownBnrService", function(a, b) {
        a.appBnrInfo = null,
        b.appDownSettingData().then(function(b) {
            a.appBnrInfo = b
        })
    }
    ]),
    d.directive("appDownBnr", ["$location", "LotteLink", "LotteStorage", "AppDownBnrService", "LotteGA", function(b, c, d, e, f) {
        return {
            templateUrl: "/lotte/resources_dev/layer/app_down_bnr.html",
            controller: "appDownBnrCtrl",
            replace: !0,
            link: function(g, h, i) {
                g.appDown_pop = function(b) {
                    if (b && b.hasEvent && "./" != e.appDownBnrInfo.linkUrl)
                        try {
                            "/" == e.appDownBnrInfo.linkUrl.substring(0, 1) || e.appDownBnrInfo.linkUrl.indexOf("://m.lotte.com") > 0 ? c.goLink(e.appDownBnrInfo.linkUrl, g.baseParam, "", "_blank") : a.open(e.appDownBnrInfo.linkUrl)
                        } catch (d) {}
                }
                ,
                g.appDown = function() {
                    var a = null
                      , d = e.appDownBnrInfo.linkUrl + ""
                      , f = "" != e.appDownBnrInfo.tclick ? e.appDownBnrInfo.tclick : null;
                    "./" != d && (a = "http" == d.substring(0, 4) ? e.appDownBnrInfo.linkUrl : "/" == d.substring(0, 1) ? b.protocol() + "://" + b.host() + d : b.protocol() + "://" + b.host() + "/" + d),
                    f && g.sendTclick(f),
                    c.appDeepLink("lotte", a, null, e.appDownBnrInfo.referrer)
                }
                ,
                g.appDownBnrClose = function() {
                    return d.setSessionStorage("appDownBnrHide", !0),
                    e.appDownBnrInfo.isShowFlag = !1,
                    !1
                }
                ,
                g.clickAppBtn = function(a) {
                    return f.evtTag("MO_공통_헤더", "앱다운로드배너", e.appDownBnrInfo.pageType + "_앱으로보기"),
                    e.appDownBnrInfo.hasEvent ? void location.replace(a) : void (location.href = "http://m.lotte.com/appAdbrix.do?ack=6157347&ick=2210413")
                }
            }
        }
    }
    ])
}(window, window.angular);
