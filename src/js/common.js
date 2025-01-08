"use strict";

/**
 * Guide Menu
 */
function initGuideMenu() {
    // config 변수
    var xl = 720; 

    // 전역 변수
    var $window = $(window),
        $windowWidth = $window.width(),
        $body = $('body'),
        $header = $('#header'),
        $nav = $('#nav');

    // 넓이 리턴 함수
    function returnWidth(){
        $windowWidth = $window.width();
        return $windowWidth;
    }

    // menu toggle
    $('.btn_guide_menu').on('click', function(){
        $body.toggleClass('full');
    });

    var _menu = $('.guide_top strong').text(),
        _page = $('.guide_top span').text();

    $('.guide_gnb > li > a').each(function(){
        var _txt =  $(this).text();

        if(_txt == _menu){
            $(this).parent('li').addClass('open');
            var _menu2 = $(this).siblings('ul');

            _menu2.find('li').each(function(){
                var _txt =  $(this).find('a').text();

                if(_txt == _page){
                    $(this).addClass('active');
                }
            });
        }
    });

    $('.guide_gnb > li > a').on('click', function(){
        if(!$(this).parent('li').is('.open')){

            if($(this).parent('li').is('.active')){
                $(this).parent('li').removeClass('active');
                $(this).siblings('ul').stop().slideUp(250);
            } else {
                $(this).parent('li').siblings('li').removeClass('active');
                $(this).parent('li').siblings('li:not(".open")').find('ul').stop().slideUp(250);
                $(this).parent('li').addClass('active');
                $(this).siblings('ul').stop().slideDown(250);
            }

        }
    });
}

/**
 * GSAP Animations
 */
function initGSAPAnimations() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Scroll-triggered class toggle
    ScrollTrigger.create({
        start: 'top -10',
        end: 99999,
        toggleClass: {className: 'main-tool-bar--scrolled', targets: '.main-tool-bar'}
    });

    // Animate swiper-sidecont element
    gsap.to(".swiper-sidecont", {
        duration: 3,
        flex: '1 1 60%',
        ease: "power3.out",
        onComplete: () => {
            document.querySelector(".swiper-sidecont").classList.add("swiper-sidecont--event");
        }
    });
}

/**
 * PC 메뉴 hover 이벤트 처리
 */
function pcmenuhover() {
    $('#gnbContainer')
        .off('mouseenter', '.subsection-subject > a')
        .on('mouseenter', '.subsection-subject > a', function () {
            const sectionBody = $(this).closest('.subsection-head').next('.section-body');

            // 모든 섹션 비활성화 후 현재 섹션 활성화
            $('.section-body').removeClass('active');
            sectionBody.addClass('active');
            $('.dimmedLayer').show();
        });

    $('#gnbContainer')
        .off('mouseleave')
        .on('mouseleave', function () {
            $('.section-body').removeClass('active');
            $('.dimmedLayer').hide();
        });
}

/**
 * 화면 크기 변경에 따른 UI 업데이트
 */
function handleResize() {
    if (window.innerWidth > 1200) {
        // PC 모드 설정
        $('.mologo, .mologoWrap, .btnMobClose').hide();
        $('.momenu').show();
        $('.momenuheader').hide();
        $('.logoWrap, .utilWrap, #gnbContainer, .btnUtil').show();
        pcmenuhover();
    } else {
        // 모바일 모드 설정
        $('.mologoWrap').show();
        $('.logoWrap, .utilWrap, .btnUtil').hide();
        $('.mologo').show();
        $('.momenuheader, .momenu, .btnMobClose').hide();
        pcmenuhover();

        // 모바일 메뉴 열기 버튼 이벤트
        $('.ico_btnMobOpen_w')
            .off('click')
            .on('click', function () {
                $('#gnbContainer').show();
                $('.subsection:nth-child(1) .section-body').addClass('active');
                $('.utilWrap, .mologoWrap .dimmedLayer').hide();
                $('.momenuheader, .momenu, .btnMobClose').show();
                $('body').addClass('scrollLock');
            });

        // 모바일 메뉴 닫기 버튼 이벤트
        $('.btnMobClose')
            .off('click')
            .on('click', function () {
                $('#gnbContainer').hide();
                $('.utilWrap').hide();
                $('.mologoWrap').show();
                $('.momenuheader, .momenu, .btnMobClose').hide();
                $('body').removeClass('scrollLock');
            });
    }
}

// 초기 실행 및 리사이즈 이벤트 설정
$(window).on('resize', handleResize);
handleResize();

/**
 * Search Bar
 */
function initSearchBar() {
    // 검색창 열기
    $('.ico_searchopen_w, .ico_searchopen_b').click(function () {
        $('.dimmedLayer').show();
        $('.gnb').removeClass('mobMenuOpen');
        $('.totalSearchWrap').addClass('totalSearcopen');
        $('.ico_searchopen_w').hide();
        $('body').addClass('scrollLock');
    });

    // 검색창 닫기
    $('.btnsearchclose').click(function () {
        $('.dimmedLayer').hide();
        $('.totalSearchWrap').removeClass('totalSearcopen');
        $('.ico_searchopen_w').show();
        $('body').removeClass('scrollLock');
    });
}

/**
 * 탭 기능 초기화
 */
function initTabs() {
    const tabDisplays = document.querySelectorAll('[data-bui-tab="buiTabNormal"]');

    tabDisplays.forEach(tabDisplay => {
        const tabItems = tabDisplay.querySelectorAll('.tab-item');
        const tabContents = tabDisplay.parentElement.querySelectorAll('.bui-tab-target');

        tabItems.forEach(item => {
            const anchor = item.querySelector('a');
            // 초기 aria-selected 속성 추가
            anchor.setAttribute('aria-selected', 'false');

            anchor.addEventListener('click', function(event) {
                event.preventDefault(); // 기본 링크 동작 방지
                
                // 모든 탭에서 선택된 상태 해제
                tabItems.forEach(tab => {
                    const tabAnchor = tab.querySelector('a');
                    tab.classList.remove('current');
                    tabAnchor.setAttribute('aria-selected', 'false');
                });

                // 모든 탭 콘텐츠에서 활성 상태 해제
                tabContents.forEach(content => content.classList.remove('active'));

                // 클릭한 탭 활성화
                item.classList.add('current');
                this.setAttribute('aria-selected', 'true');

                // 관련 콘텐츠 활성화
                const targetId = this.getAttribute('href');
                const targetContent = document.querySelector(targetId);
                if (targetContent) targetContent.classList.add('active');
            });
        });
    });
}

/**
 * 드롭다운 기능 초기화
 */
function initDropdowns() {
    const dropDisplays = document.querySelectorAll('[data-bui-dropdown="dropdowngroup"]');

    dropDisplays.forEach(dropDisplay => {
        const dropItems = dropDisplay.querySelectorAll('.btn.expand');

        dropItems.forEach(item => {
            // 드롭다운 버튼 초기화
            item.setAttribute('aria-expanded', 'false');

            const postItem = item.closest('.bui-dropdown-target');
            if (postItem) {
                postItem.setAttribute('aria-hidden', 'true');
            }

            // 클릭 이벤트 추가
            item.addEventListener('click', function (event) {
                event.preventDefault();

                // 동일 그룹의 다른 드롭다운 닫기
                dropDisplay.querySelectorAll('.bui-dropdown-target').forEach(postItem => {
                    postItem.classList.remove('active');
                    postItem.setAttribute('aria-hidden', 'true');
                });

                dropDisplay.querySelectorAll('.btn.expand').forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-expanded', 'false');
                });

                // 현재 클릭된 버튼 및 대상 상태 토글
                console.log('Clicked button:', this); // 디버깅용: 클릭된 버튼 출력

                const isExpanded = this.classList.toggle('active');
                console.log('Active class toggled:', isExpanded); // 디버깅용: active 상태 출력
                this.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');

                if (postItem) {
                    const isActive = postItem.classList.toggle('active');
                    postItem.setAttribute('aria-hidden', isActive ? 'false' : 'true');
                }
            });
        });
    });
}

/**
 * Swiper
 */
function initSwiper() {
    const swiperModules = [
        {
            selector: '[data-bui-swiper="swipermodule01"]',
            moduleName: 'swipermodule01',
            customOptions: {
                loop: true,
                autoplay: {
                    delay: 1000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'progressbar',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                on: {
                    init: function () {
                        this.el.classList.add('auto-play');

                        // 재생 버튼 클릭 이벤트 설정
                        this.el.querySelector('.swiper-button-auto-play').addEventListener('click', () => {
                            this.autoplay.start();
                            this.el.classList.add('auto-play');
                        });

                        // 정지 버튼 클릭 이벤트 설정
                        this.el.querySelector('.swiper-button-auto-stop').addEventListener('click', () => {
                            this.autoplay.stop();
                            this.el.classList.remove('auto-play');
                        });
                    },
                    slideChangeTransitionEnd: function () {
                        this.autoplay.running
                            ? this.el.classList.add('auto-play')
                            : this.el.classList.remove('auto-play');
                    },
                },
            },
        },
        {
            selector: '[data-bui-swiper="swipermodule02"]',
            moduleName: 'swipermodule02',
            customOptions: {
                initialSlide: 2,
                loop: false,
                slidesPerView: 3,
                spaceBetween: 10,
                autoHeight: true,
                observer: true,
                observeParents: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    0: { slidesPerView: 1 },
                    721: { slidesPerView: 3 },
                },
            },
        },
        {
            selector: '[data-bui-swiper="swipermodule03"]',
            moduleName: 'swipermodule03',
            customOptions: {
                loop: false,
                slidesPerView: 4,
                spaceBetween: 10,
                autoHeight: true,
                observer: true,
                observeParents: true,
                pagination: {
                    el: '.swiper-pagination',
                    type: 'progressbar',
                    clickable: true,
                },
                breakpoints: {
                    0: { slidesPerView: 1 },
                    721: { slidesPerView: 4 },
                },
            },
        },
        {
            selector: '[data-bui-swiper="swipermodule04"]',
            moduleName: 'swipermodule04',
            customOptions: {
                slidesPerView: 2,
                spaceBetween: 10,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    0: { slidesPerView: 1 },
                    721: { slidesPerView: 2 },
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                on: {
                    init: function () {
                        this.el.classList.add('auto-play');

                        // 재생 버튼 클릭 이벤트 설정
                        this.el.querySelector('.swiper-button-auto-play').addEventListener('click', () => {
                            this.autoplay.start();
                            this.el.classList.add('auto-play');
                        });

                        // 정지 버튼 클릭 이벤트 설정
                        this.el.querySelector('.swiper-button-auto-stop').addEventListener('click', () => {
                            this.autoplay.stop();
                            this.el.classList.remove('auto-play');
                        });
                    },
                    slideChangeTransitionEnd: function () {
                        this.autoplay.running
                            ? this.el.classList.add('auto-play')
                            : this.el.classList.remove('auto-play');
                    },
                },
            },
        },
        {
            selector: '[data-bui-swiper="swipermodule05"]',
            moduleName: 'swipermodule05',
            customOptions: {
                direction: "vertical", // 방향
                slidesPerView: 2.5, // Swiper 영역에 보여질 슬라이드 개수
                // slidesPerView: "auto",
                centeredSlides: true, // 슬라이드를 container의 중앙 정렬 여부
                spaceBetween: 10, // 슬라이드 간 간격
                loop: true, // 반복여부
                speed: 5000, // 전체 애니메이션 속도
                allowTouchMove: false, // 터치/드래그 비활성화
                autoplay: {
                    delay: 0, // 딜레이 제거
                    disableOnInteraction: false, // 사용자가 슬라이드를 조작하면 자동 재생을 중지할 지 여부
                    reverseDirection: true, // 슬라이드 방향 (true: 반대로, false: 기본 방향)
                },
                // 부드러운 transition 효과
                effect: "slide",
                breakpoints: {
                    0: {
                        direction: 'horizontal',
                        slidesPerView: 'auto',
                    },
                    721: {
                        direction: 'vertical',
                        slidesPerView: '2.5',
                    }
                },
            },
        },
        {
            selector: '[data-bui-swiper="swipermodule06"]',
            moduleName: 'swipermodule06',
            customOptions: {
                direction: "vertical", // 방향
                slidesPerView: 2.5, // Swiper 영역에 보여질 슬라이드 개수
                // slidesPerView: "auto",
                centeredSlides: true, // 슬라이드를 container의 중앙 정렬 여부
                spaceBetween: 10, // 슬라이드 간 간격
                loop: true, // 반복여부
                speed: 5000, // 전체 애니메이션 속도
                allowTouchMove: false, // 터치/드래그 비활성화
                autoplay: {
                    delay: 0, // 딜레이 제거
                    disableOnInteraction: false, // 사용자가 슬라이드를 조작하면 자동 재생을 중지할 지 여부
                    reverseDirection: false, // 슬라이드 방향 (true: 반대로, false: 기본 방향)
                },
                // 부드러운 transition 효과
                effect: "slide",
                breakpoints: {
                    0: {
                        direction: 'horizontal',
                        slidesPerView: 'auto',
                    },
                    721: {
                        direction: 'vertical',
                        slidesPerView: '2.5',
                    }
                },
            },
        },
    ];

    swiperModules.forEach(({ selector, moduleName, customOptions }) => {
        const container = document.querySelector(selector);
        if (container) {
            fetch('../../data/swipercont.json')
                .then(response => response.json())
                .then(data => {
                    const slides = data[moduleName];
                    const wrapper = container.querySelector('.swiper-wrapper');

                    // 기존 슬라이드 제거 후 새로 추가
                    wrapper.innerHTML = '';

                    slides.forEach(item => {
                        const slide = document.createElement('div');
                        slide.classList.add('swiper-slide');

                        slide.innerHTML = `
                            <a href="${item.url || '#'}">
                                <img 
                                    src="${item.image || ''}"
                                    alt="${item.title || ''}"
                                    style="width: 100%; height: auto;"
                                    data-desktop="${item.image}"
                                    data-mobile="${item.mobileimage}"
                                />
                                <div class="swiper-inform">
                                    ${item.title ? `<p class="title">${item.title}</p>` : ''}
                                    ${item.subtitle ? `<p class="subtitle">${item.subtitle}</p>` : ''}
                                    ${item.caption ? `<p class="caption">${item.caption}</p>` : ''}
                                </div>
                            </a>
                        `;

                        const imgElement = slide.querySelector('img');

                        const updateImage = () => {
                            const mobileImage = imgElement.dataset.mobile;
                            const desktopImage = imgElement.dataset.desktop;
                            imgElement.src = window.matchMedia('(max-width: 720px)').matches
                                ? (mobileImage && mobileImage !== 'undefined' ? mobileImage : desktopImage)
                                : desktopImage;
                        };

                        updateImage();
                        window.addEventListener('resize', updateImage);

                        wrapper.appendChild(slide);
                    });

                    new Swiper(container, customOptions);
                })
                .catch(error => console.error(`Error initializing Swiper for ${moduleName}:`, error));
        }
    });

    // 모든 Swiper 컨테이너 요소를 선택
    const swiperContainers = document.querySelectorAll('[data-bui-swiper]');

    // 각 Swiper 컨테이너에 대해 JSON 데이터 가져오기 및 Swiper 초기화
    swiperContainers.forEach(swiperContainer => {
        const swiperModule = swiperContainer.getAttribute('data-bui-swiper'); // 예: swipermodule07, swipermodule08 등

        // swipermodule07, swipermodule08, swipermodule09, swipermodule10만 초기화
        if (['swipermodule07', 'swipermodule08', 'swipermodule09', 'swipermodule10'].includes(swiperModule)) {
            fetch('../../data/swipercont.json')
                .then(response => response.json())
                .then(data => {
                    const slides = data[swiperModule]; // JSON에서 해당 모듈에 맞는 데이터 가져오기
                    const swiperWrapper = swiperContainer.querySelector('.swiper-wrapper');

                    // JSON 데이터를 이용해 슬라이드를 생성
                    slides.forEach(item => {
                        const slide = document.createElement('div');
                        slide.classList.add('swiper-slide');

                        // 각 필드가 존재할 때만 해당 마크업을 생성
                        const imageMarkup01 = item.image01 ? `<a href="${item.image01url}"><img src="${item.image01}" alt="${item.title01 || ''}" style="width: 100%; height: 100%;"></a>` : '';
                        const imageMarkup02 = item.image02 ? `<a href="${item.image02url}"><img src="${item.image02}" alt="${item.title02 || ''}" style="width: 100%; height: 100%;"></a>` : '';
                        const imageMarkup03 = item.image03 ? `<a href="${item.image03url}"><img src="${item.image03}" alt="${item.title03 || ''}" style="width: 100%; height: 100%;"></a>` : '';
                        const imageMarkup04 = item.image04 ? `<a href="${item.image04url}"><img src="${item.image04}" alt="${item.title04 || ''}" style="width: 100%; height: 100%;"></a>` : '';

                        // swiper-inform으로 감싼 부분
                        const informMarkup = `
                            <div class="swiper-inform">
                                ${imageMarkup01}
                                ${imageMarkup02}
                                ${imageMarkup03}
                                ${imageMarkup04}
                            </div>
                        `;

                        // 슬라이드에 이미지와 정보 마크업 추가
                        slide.innerHTML = `
                            ${informMarkup}
                        `;
                        
                        swiperWrapper.appendChild(slide);
                    });

                    // Swiper 초기화
                    new Swiper(swiperContainer, {
                        slidesPerView: 1.8,        // 한 줄에 보이는 슬라이드 개수
                        // spaceBetween:10,        // 슬라이드 간격
                        breakpoints: {
                            0: {
                                slidesPerView: 1,    
                            },
                            721: {
                                slidesPerView:  1.8,     
                            }
                        },
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }
                        
                    });
                })
                .catch(error => console.error('Error fetching JSON data:', error));
            }
    });

}

/**
 * marquee
 */
function initmarquee() {
    $('.marquee-wrap').marquee({
        speed: 80, // 속도
        // gap: 100, // 간격
        delayBeforeStart: 0, // 시작 delay값
        direction: 'left', // 방향
        duplicated: false, // 선택 영역 복제
        pauseOnHover: false // hover시 일시중지 여부
    });
}

/**
 * 비밀번호 표시/숨기기 토글
 */
const passwordVisibility = function(selector, closestSelector) {
    const formElem = selector.closest(closestSelector).querySelector('.form-elem');
    const buttonText = selector.querySelector('.btn-text');

    formElem.select();

    if (formElem.type === 'password') {
        formElem.type = 'text';
        selector.classList.add('active');
        buttonText.innerText = '텍스트 숨기기';
    } else {
        formElem.type = 'password';
        selector.classList.remove('active');
        buttonText.innerText = '텍스트 보기';
    }
};

/**
 * 팝업 토글 기능
 */
function togglePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.toggle('active');
    }
}

/**
 * GNB
 */
function initGNB() {
    // JSON 데이터를 가져와 모든 GNB 항목을 렌더링
    fetch('../../data/menu.json')
        .then(response => response.json())
        .then(data => {
            const mainContainer = document.getElementById("gnbContainer"); // GNB 항목들이 들어갈 메인 컨테이너
            data.mobile.forEach(gnbItem => renderGnbContent(gnbItem, mainContainer));
        })
        .catch(error => console.error('Error loading menu JSON:', error));
}

/**
 * Render GNB Content
 */
function renderGnbContent(data, container) {
    // 기본 HTML 구조를 복제하여 사용
    const subsection = document.createElement("div");
    subsection.classList.add("subsection");

    subsection.innerHTML = `
        <div class="subsection-wrap">
            <div class="subsection-head">
                <p class="subsection-subject">
                    <a href="${data.link}">${data.name}</a>
                </p>
            </div>
            <div class="section-body">
                <div class="lnb-navi">
                    <p>${data.name}</p>
                    <ul class="lnb-list"></ul>
                    <a href="${data.link}">
                    <img src="${data.gnbimg}" alt="${data.name}"></a>
                </div>
            </div>
        </div>
    `;

    // LNB 리스트를 찾아서 항목 추가
    const lnbList = subsection.querySelector(".lnb-list");

    data.sub.forEach((lnbItem) => {
        const lnbItemElement = document.createElement("li");
        lnbItemElement.classList.add("lnb-item");

        // LNB 항목 링크 생성
        const lnbLink = document.createElement("a");
        lnbLink.href = lnbItem.link;
        lnbLink.textContent = lnbItem.name;
        lnbItemElement.appendChild(lnbLink);

        // SNB 리스트 추가 (하위 항목이 있는 경우에만)
        if (lnbItem.sub && lnbItem.sub.length > 0) {
            const snbListContainer = document.createElement("div");
            snbListContainer.classList.add("snb-navi");

            const snbList = document.createElement("ul");
            snbList.classList.add("snb-list");

            lnbItem.sub.forEach((snbItem) => {
                const snbItemElement = document.createElement("li");
                snbItemElement.classList.add("snb-item");

                // SNB 항목 링크
                const snbLink = document.createElement("a");
                snbLink.href = snbItem.link;
                snbLink.textContent = snbItem.name;

                snbItemElement.appendChild(snbLink);
                snbList.appendChild(snbItemElement);
            });

            snbListContainer.appendChild(snbList);
            lnbItemElement.appendChild(snbListContainer);
        }

        // LNB 리스트에 항목 추가
        lnbList.appendChild(lnbItemElement);
    });

    // 최종적으로 메인 컨테이너에 섹션 추가
    container.appendChild(subsection);
}

$(document).ready(function () {
    initTabs();          // 탭 기능 초기화
    initDropdowns();     // 드롭다운 기능 초기화
    initSwiper();        // Swiper 슬라이드 초기화
    initmarquee();       // marquee 초기화
    initSearchBar();     // 검색창 초기화

    initGuideMenu(); // 가이드 메뉴 초기화
    initGSAPAnimations(); // GSAP 애니메이션 초기화
    initGNB(); // GNB 초기화
});

