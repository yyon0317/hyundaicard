"use strict";


$(function() {


    // config 변수
    var xl = 720; //1000
    
    // 전역함수
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
    
    // menu
    $('.btn_guide_menu').on('click', function(){
        $body.toggleClass('full')
    })
    
    var _menu = $('.guide_top strong').text(),
        _page = $('.guide_top span').text();
    
    $('.guide_gnb > li > a').each(function(){
        var _txt =  $(this).text();
    
        if(_txt == _menu){
            $(this).parent('li').addClass('open')
            var _menu2 = $(this).siblings('ul');
    
            _menu2.find('li').each(function(){
                var _txt =  $(this).find('a').text();
    
                if(_txt == _page){
                    $(this).addClass('active')
                }
            })
        }
    })
    
    
    $('.guide_gnb > li > a').on('click' , function(){
        if(!$(this).parent('li').is('.open')){
    
            if($(this).parent('li').is('.active')){
                $(this).parent('li').removeClass('active')
                $(this).siblings('ul').stop().slideUp(250);
            } else {
                $(this).parent('li').siblings('li').removeClass('active')
                $(this).parent('li').siblings('li:not(".open")').find('ul').stop().slideUp(250);
                $(this).parent('li').addClass('active')
                $(this).siblings('ul').stop().slideDown(250);
            }
    
        }
    })
    
    })
    



/**
 * 비밀번호 표시/숨기기 토글
 * @param {HTMLElement} selector - 비밀번호 토글 버튼
 * @param {String} closestSelector - 가장 가까운 부모 요소의 셀렉터
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
 * 탭 기능 초기화
 */
function initTabs() {
    const tabDisplays = document.querySelectorAll('[data-bui-tab="buiTabNormal"]');

    tabDisplays.forEach(tabDisplay => {
        const tabItems = tabDisplay.querySelectorAll('.tab-item');
        const tabContents = tabDisplay.parentElement.querySelectorAll('.bui-tab-target');

        tabItems.forEach(item => {
            item.addEventListener('click', function(event) {
                event.preventDefault(); // 기본 링크 동작 방지
                tabItems.forEach(tab => tab.classList.remove('current'));
                tabContents.forEach(content => content.classList.remove('active'));

                this.classList.add('current');
                const targetId = this.querySelector('a').getAttribute('href');
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
            item.addEventListener('click', function(event) {
                event.preventDefault();

                dropDisplay.querySelectorAll('.bui-dropdown-target').forEach(postItem => postItem.classList.remove('active'));
                dropDisplay.querySelectorAll('.btn.expand').forEach(btn => btn.classList.remove('active'));

                item.classList.toggle('active');
                const postItem = item.closest('.bui-dropdown-target');
                if (postItem) {
                    postItem.classList.toggle('active');
                }
            });
        });
    });
}

/**
 * 팝업 토글 기능
 * @param {String} popupId - 토글할 팝업의 ID
 */
function togglePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.toggle('active');
    }
}

/**
 * Swiper 슬라이드 초기화
 */
function initSwiper() {
    const swiperContainer01 = document.querySelector('[data-bui-swiper="swipermodule01"]');

// 해당 요소가 존재할 때만 Swiper를 초기화
if (swiperContainer01) {
    fetch('../../data/swipercont.json')
        .then(response => response.json())
        .then(data => {
            const slides = data.swipermodule01;
            const swiperWrapper = swiperContainer01.querySelector('.swiper-wrapper');

            // 미디어 쿼리: 화면 너비가 720px 이하인지 확인
            const mediaQuery = window.matchMedia("(max-width: 720px)");

            // JSON 데이터를 이용해 슬라이드를 생성
            slides.forEach(item => {
                const slide = document.createElement('div');
                slide.classList.add('swiper-slide');

                // 이미지 마크업 생성
                const imageElement = document.createElement('img');
                imageElement.alt = item.title || '';
                imageElement.style.width = '100%';
                imageElement.style.height = 'auto';
                imageElement.dataset.desktop = item.image; // 데스크톱 이미지 URL 저장
                imageElement.dataset.mobile = item.mobileimage; // 모바일 이미지 URL 저장

                // 캡션, 타이틀, 서브타이틀 마크업 생성
                const captionMarkup = item.caption ? `<p class="caption">${item.caption}</p>` : '';
                const subtitleMarkup = item.subtitle ? `<p class="subtitle">${item.subtitle}</p>` : '';
                const titleMarkup = item.title ? `<p class="title">${item.title}</p>` : '';

                // swiper-inform으로 감싼 부분
                const informMarkup = `
                    <div class="swiper-inform">
                        ${captionMarkup}
                        ${subtitleMarkup}
                        ${titleMarkup}
                    </div>
                `;

                // 슬라이드에 이미지와 정보 마크업 추가
                slide.innerHTML = `
                    ${informMarkup}
                `;
                slide.prepend(imageElement);
                swiperWrapper.appendChild(slide);
            });

            // 이미지 URL 업데이트 함수
            function updateImages() {
                swiperWrapper.querySelectorAll('.swiper-slide img').forEach(img => {
                    if (mediaQuery.matches) {
                        // 화면 너비가 720px 이하인 경우, 모바일 이미지를 사용
                        img.src = img.dataset.mobile || img.dataset.desktop;
                    } else {
                        // 화면 너비가 721px 이상인 경우, 데스크톱 이미지를 사용
                        img.src = img.dataset.desktop || img.dataset.mobile;
                    }
                });
            }

            // Swiper 초기화
            new Swiper(swiperContainer01, {
                loop: true,
                autoplay: {
                    delay: 1000, // autoplaySpeed 대신 delay를 사용
                    disableOnInteraction: false // 사용자와 상호작용 시 자동 재생이 멈추지 않게 설정
                },
                pagination: {
                    el: '.swiper-pagination',
                    type: "progressbar",
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                loop: "infinite",
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
                        this.autoplay.running ? this.el.classList.add('auto-play') : this.el.classList.remove('auto-play');
                    }
                }
            });


            // 초기 이미지 업데이트
            updateImages();

            // 미디어 쿼리 변경 시 이미지 업데이트
            mediaQuery.addEventListener('change', updateImages);
        })
        .catch(error => console.error('Error fetching JSON data:', error));
    }

// 특정 속성을 가진 Swiper 컨테이너 요소를 선택
const swiperContainer02 = document.querySelector('[data-bui-swiper="swipermodule02"]');

// 해당 요소가 존재할 때만 Swiper를 초기화
if (swiperContainer02) {
    fetch('../../data/swipercont.json')
        .then(response => response.json())
        .then(data => {
            const slides = data.swipermodule02;
            const swiperWrapper = swiperContainer02.querySelector('.swiper-wrapper');

            // JSON 데이터를 이용해 슬라이드를 생성
        slides.forEach(item => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');

            // 각 필드가 존재할 때만 해당 마크업을 생성
            const imageMarkup = item.image ? `<img src="${item.image}" alt="${item.title || ''}" style="width: 100%; height: auto;">` : '';
            const captionMarkup = item.caption ? `<p class="caption">${item.caption}</p>` : '';
            const subtitleMarkup = item.subtitle ? `<p class="subtitle">${item.subtitle}</p>` : '';
            const titleMarkup = item.title ? `<p class="title">${item.title}</p>` : '';

            // swiper-inform으로 감싼 부분
            const informMarkup = `
                <div class="swiper-inform">
                    ${subtitleMarkup}
                    ${titleMarkup}
                    ${captionMarkup}
                </div>
            `;

            // 슬라이드에 이미지와 정보 마크업 추가
            slide.innerHTML = `
                ${imageMarkup}
                ${informMarkup}
            `;

            swiperWrapper.appendChild(slide);
        });

            // Swiper 초기화
            new Swiper(swiperContainer02, {initialSlide: 2,
                loop: true, // loop 활성화
                slidesPerView: 3, // 보이는 슬라이드 개수
                spaceBetween: 10, // 슬라이드 간격
                autoHeight: true,
                observer: true, // 새로고침 시 Swiper 업데이트
                observeParents: true, // 부모 요소 변경 시 Swiper 업데이트
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                0: {
                    slidesPerView: 1, // 720px 이하일 때 1개
                },
                721: {
                    slidesPerView: 3, // 721px 이상일 때 3개
                }
            }
            });
        })
        .catch(error => console.error('Error fetching JSON data:', error));
}

// 특정 속성을 가진 Swiper 컨테이너 요소를 선택
const swiperContainer03 = document.querySelector('[data-bui-swiper="swipermodule03"]');

// 해당 요소가 존재할 때만 Swiper를 초기화
if (swiperContainer03) {
    fetch('../../data/swipercont.json')
        .then(response => response.json())
        .then(data => {
            const slides = data.swipermodule03;
            const swiperWrapper = swiperContainer03.querySelector('.swiper-wrapper');

            // JSON 데이터를 이용해 슬라이드를 생성
        slides.forEach(item => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');

            // 각 필드가 존재할 때만 해당 마크업을 생성
            const imageMarkup = item.image ? `<img src="${item.image}" alt="${item.title || ''}" style="width: 100%; height: auto;">` : '';
            const captionMarkup = item.caption ? `<p class="caption">${item.caption}</p>` : '';
            const subtitleMarkup = item.subtitle ? `<p class="subtitle">${item.subtitle}</p>` : '';
            const titleMarkup = item.title ? `<p class="title">${item.title}</p>` : '';

            // swiper-inform으로 감싼 부분
            const informMarkup = `
                <div class="swiper-inform">
                    ${titleMarkup}
                    ${subtitleMarkup}
                    ${captionMarkup}
                </div>
            `;

            // 슬라이드에 이미지와 정보 마크업 추가
            slide.innerHTML = `
                ${imageMarkup}
                ${informMarkup}
            `;

            swiperWrapper.appendChild(slide);
        });

            // Swiper 초기화
            new Swiper(swiperContainer03, {
                initialSlide: 1,
                loop: true, // loop 활성화
                slidesPerView: 4, // 보이는 슬라이드 개수
                spaceBetween: 10, // 슬라이드 간격
                autoHeight: true,
                // loopAdditionalSlides: 4, // 추가 슬라이드 개수를 늘려 루프 가능하도록 설정
                observer: true, // 새로고침 시 Swiper 업데이트
                observeParents: true, // 부모 요소 변경 시 Swiper 업데이트
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                0: {
                    pagination: {
                        el: '.swiper-pagination',
                        type: "progressbar",
                        clickable: true,
                    },
                    slidesPerView: 1, // 720px 이하일 때 1개
                },
                721: {
                    slidesPerView: 4, // 721px 이상일 때 3개
                }
            }
            });
        })
        .catch(error => console.error('Error fetching JSON data:', error));
    }

const swiperContainer04 = document.querySelector('[data-bui-swiper="swipermodule04"]');

// 해당 요소가 존재할 때만 Swiper를 초기화
if (swiperContainer04) {
    fetch('../../data/swipercont.json')
        .then(response => response.json())
        .then(data => {
            const slides = data.swipermodule04;
            const swiperWrapper = swiperContainer04.querySelector('.swiper-wrapper');

            // 미디어 쿼리: 화면 너비가 720px 이하인지 확인
            const mediaQuery = window.matchMedia("(max-width: 720px)");

            // JSON 데이터를 이용해 슬라이드를 생성
            slides.forEach(item => {
                const slide = document.createElement('div');
                slide.classList.add('swiper-slide');

                // 이미지 마크업 생성
                const imageElement = document.createElement('img');
                imageElement.alt = item.title || '';
                imageElement.style.width = '100%';
                imageElement.style.height = 'auto';
                imageElement.dataset.desktop = item.image; // 데스크톱 이미지 URL 저장
                imageElement.dataset.mobile = item.mobileimage; // 모바일 이미지 URL 저장

                // 캡션, 타이틀, 서브타이틀 마크업 생성
                const captionMarkup = item.caption ? `<p class="caption">${item.caption}</p>` : '';
                const subtitleMarkup = item.subtitle ? `<p class="subtitle">${item.subtitle}</p>` : '';
                const titleMarkup = item.title ? `<p class="title">${item.title}</p>` : '';

                // swiper-inform으로 감싼 부분
                const informMarkup = `
                    <div class="swiper-inform">
                        ${captionMarkup}
                        ${subtitleMarkup}
                        ${titleMarkup}
                    </div>
                `;

                // 슬라이드에 이미지와 정보 마크업 추가
                slide.innerHTML = `
                    ${informMarkup}
                `;
                slide.prepend(imageElement);
                swiperWrapper.appendChild(slide);
            });

            // 이미지 URL 업데이트 함수
            function updateImages() {
                swiperWrapper.querySelectorAll('.swiper-slide img').forEach(img => {
                    if (mediaQuery.matches) {
                        // 화면 너비가 720px 이하인 경우, 모바일 이미지를 사용
                        img.src = img.dataset.mobile || img.dataset.desktop;
                    } else {
                        // 화면 너비가 721px 이상인 경우, 데스크톱 이미지를 사용
                        img.src = img.dataset.desktop || img.dataset.mobile;
                    }
                });
            }

            // Swiper 초기화
            new Swiper(swiperContainer04, {
                loop: true,
                    loop: true, // loop 활성화
                    slidesPerView: 2, // 보이는 슬라이드 개수
                    spaceBetween: 10, // 슬라이드 간격
                    observer: true, // 새로고침 시 Swiper 업데이트
                    observeParents: true, // 부모 요소 변경 시 Swiper 업데이트
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                0: {
                    slidesPerView: 1, // 720px 이하일 때 1개
                },
                721: {
                    slidesPerView: 2, // 721px 이상일 때 3개
                }
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
                        this.autoplay.running ? this.el.classList.add('auto-play') : this.el.classList.remove('auto-play');
                    }
                }
            });


            // 초기 이미지 업데이트
            updateImages();

            // 미디어 쿼리 변경 시 이미지 업데이트
            mediaQuery.addEventListener('change', updateImages);
        })
        .catch(error => console.error('Error fetching JSON data:', error));
    }

// 특정 속성을 가진 Swiper 컨테이너 요소를 선택
const swiperContainer05 = document.querySelector('[data-bui-swiper="swipermodule05"]');

// 해당 요소가 존재할 때만 Swiper를 초기화
if (swiperContainer05) {
    fetch('../../data/swipercont.json')
        .then(response => response.json())
        .then(data => {
            const slides = data.swipermodule05.concat(data.swipermodule05);
            const swiperWrapper = swiperContainer05.querySelector('.swiper-wrapper');

            // JSON 데이터를 이용해 슬라이드를 생성
        slides.forEach(item => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');

            // 각 필드가 존재할 때만 해당 마크업을 생성
            const imageMarkup = item.image ? `<img src="${item.image}" alt="${item.title || ''}" style="width: 100%; height: auto;">` : '';
            const captionMarkup = item.caption ? `<p class="caption">${item.caption}</p>` : '';
            const subtitleMarkup = item.subtitle ? `<p class="subtitle">${item.subtitle}</p>` : '';
            const titleMarkup = item.title ? `<p class="title">${item.title}</p>` : '';

            // swiper-inform으로 감싼 부분
            const informMarkup = `
                <div class="swiper-inform">
                    ${subtitleMarkup}
                    ${titleMarkup}
                    ${captionMarkup}
                </div>
            `;

            // 슬라이드에 이미지와 정보 마크업 추가
            slide.innerHTML = `
                ${imageMarkup}
                ${informMarkup}
            `;

            swiperWrapper.appendChild(slide);
        });

            // Swiper 초기화
            new Swiper(swiperContainer05, {
                autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
            loop: true, // loop 활성화
            loopAdditionalSlides: 3, // 슬라이드를 추가로 복제하여 자연스러운 전환
            loopedSlides: 3, // 자연스러운 루프 전환을 위해 슬라이드 복제
            direction: 'vertical',
            //slidesPerGroup: 1,
            speed: 5000, // 슬라이드 전환 속도
            spaceBetween: 10, // 슬라이드 간격
            autoHeight: 'false',
            dir:"ltr",
            observer: true,
            observeParents: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    0: {
                        direction: 'horizontal',
                        slidesPerView: 'auto',
                    },
                    721: {
                        direction: 'vertical',
                        slidesPerView: '2.5',
                    }
                }
            });

            
        })
        .catch(error => console.error('Error fetching JSON data:', error));
}

// 특정 속성을 가진 Swiper 컨테이너 요소를 선택
const swiperContainer06 = document.querySelector('[data-bui-swiper="swipermodule06"]');

// 해당 요소가 존재할 때만 Swiper를 초기화
if (swiperContainer06) {
    fetch('../../data/swipercont.json')
        .then(response => response.json())
        .then(data => {
            const slides = data.swipermodule06.concat(data.swipermodule06);
            const swiperWrapper = swiperContainer06.querySelector('.swiper-wrapper');

            // JSON 데이터를 이용해 슬라이드를 생성
        slides.forEach(item => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');

            // 각 필드가 존재할 때만 해당 마크업을 생성
            const imageMarkup = item.image ? `<img src="${item.image}" alt="${item.title || ''}" style="width: 100%; height: auto;">` : '';
            const captionMarkup = item.caption ? `<p class="caption">${item.caption}</p>` : '';
            const subtitleMarkup = item.subtitle ? `<p class="subtitle">${item.subtitle}</p>` : '';
            const titleMarkup = item.title ? `<p class="title">${item.title}</p>` : '';

            // swiper-inform으로 감싼 부분
            const informMarkup = `
                <div class="swiper-inform">
                    ${subtitleMarkup}
                    ${titleMarkup}
                    ${captionMarkup}
                </div>
            `;

            // 슬라이드에 이미지와 정보 마크업 추가
            slide.innerHTML = `
                ${imageMarkup}
                ${informMarkup}
            `;

            swiperWrapper.appendChild(slide);
        });

            // Swiper 초기화
            new Swiper(swiperContainer06, {autoplay: {
                delay: 0,
                disableOnInteraction: false,
                reverseDirection: true,
            },
            direction: 'rtl',
            loop: true, // loop 활성화
            loopAdditionalSlides: 3, // 슬라이드를 추가로 복제하여 자연스러운 전환
            loopedSlides: 3, // 자연스러운 루프 전환을 위해 슬라이드 복제
            direction: 'vertical',
            //slidesPerGroup: 1,
            speed: 5000, // 슬라이드 전환 속도
            spaceBetween: 10, // 슬라이드 간격
            autoHeight: 'false',
            observer: true,
            observeParents: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    0: {
                        direction: 'horizontal',
                        slidesPerView: 'auto',
                    },
                    721: {
                        direction: 'vertical',
                        slidesPerView: '2.5',
                    }
                }
            });

            
        })
        .catch(error => console.error('Error fetching JSON data:', error));
}

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
                    const imageMarkup01 = item.image01 ? `<a href="${item.image01url}"><img src="${item.image01}" alt="${item.title01 || ''}" style="width: 100%; height: auto;"></a>` : '';
                    const imageMarkup02 = item.image02 ? `<a href="${item.image02url}"><img src="${item.image02}" alt="${item.title02 || ''}" style="width: 100%; height: auto;"></a>` : '';
                    const imageMarkup03 = item.image03 ? `<a href="${item.image03url}"><img src="${item.image03}" alt="${item.title03 || ''}" style="width: 100%; height: auto;"></a>` : '';
                    const imageMarkup04 = item.image04 ? `<a href="${item.image04url}"><img src="${item.image04}" alt="${item.title04 || ''}" style="width: 100%; height: auto;"></a>` : '';

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
                    slidesPerView: 2.2,        // 한 줄에 보이는 슬라이드 개수
                    // spaceBetween:10,        // 슬라이드 간격
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


// 페이지 로드 완료 후 모든 기능 초기화
document.addEventListener('DOMContentLoaded', function() {
    initTabs();          // 탭 기능 초기화
    initDropdowns();     // 드롭다운 기능 초기화
    initSwiper();        // Swiper 슬라이드 초기화
    initmarquee();        // Swiper 슬라이드 초기화
});


// JSON 데이터를 가져와 모든 GNB 항목을 렌더링
fetch('../../data/menu.json')
  .then(response => response.json())
  .then(data => {
    const mainContainer = document.getElementById("gnbContainer"); // GNB 항목들이 들어갈 메인 컨테이너
    data.mobile.forEach(gnbItem => renderGnbContent(gnbItem, mainContainer));
  })
  .catch(error => console.error('Error loading menu JSON:', error));

// GNB 콘텐츠 렌더링 함수
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
          <ul class="lnb-list"></ul>
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
























// $(function() {

//     //open 마무스 효과
//     const _root = document.documentElement;
//     const _mouse = document.querySelector('.mouse');
//     const _mouse_mid = document.querySelector('.mouse-mid');
//     const _mouse_guide = document.querySelector('.mouse-guide');

//     const a = 0.4;	// Div follow mouse - speed
//     let _s = 60;		// Div size - hover

//     let x_ = 0;
//     let y_ = 0;
//     let _x = 0;
//     let _y = 0;
//     let _xm_ = 0;
//     let _ym_ = 0;
//     let _x_ = 0;
//     let _y_ = 0;

//     _root.addEventListener('mousemove', function(event) {
//         _x = event.clientX;
//         _y = event.clientY;	
//     }, false);

//     _root.addEventListener('mousedown', function(event) {
//         _mouse.style.width = _s + 'px';
//         _mouse.style.height = _s + 'px';
//     }, false);

//     _root.addEventListener('mouseup', function(event) {
//         _mouse.style.width = (_s / 1.3) + 'px';
//         _mouse.style.height = (_s / 1.3) + 'px';
//     }, false);

//     function main() {
//         requestAnimationFrame(main);
//         x_ += (_x - x_) * a / 2;
//         y_ += (_y - y_) * a / 2;
//         _x_ += (_x - _x_) * a;
//         _y_ += (_y - _y_) * a;
//         _xm_ += (_x - _xm_) * a / 1.5;
//         _ym_ += (_y - _ym_) * a / 1.5;
//         //--
//         _mouse.style.left = x_ + 'px';
//         _mouse.style.top = y_ + 'px';
//         _mouse_mid.style.left = _xm_ + 'px';
//         _mouse_mid.style.top = _ym_ + 'px';
//         _mouse_guide.style.left = _x_ + 'px';
//         _mouse_guide.style.top = _y_ + 'px';
//     }

//     window.addEventListener('load', main, false);



//     const scrollSection = document.querySelector('.maincollect');
//     const scrollContent = document.querySelector('.collectbox');

//     const scrollHeight = scrollSection.clientHeight;
//     const contentWidth = scrollContent.clientWidth;

//     document.addEventListener('scroll', e => {
//         const scrolled = window.pageYOffset;
//         const sectionOffset = Math.abs(scrollSection.offsetTop - scrolled);
//         const notReachedBottom = parseInt(Math.max(0, scrollSection.getBoundingClientRect().bottom - window.innerHeight));

//         if (scrollSection.offsetTop <= scrolled && notReachedBottom) {

//         gsap.to(scrollContent, {
//             x: -sectionOffset });

//         }
//     });

//     /*GNB배너 모바일 PC*/

//     $(".btnMobOpen").click(function(){

//         $(".gnb").addClass("mobMenuOpen");
//         $('body').addClass('scrollLock');
    
//     });

//     $(".btnMobClose").click(function(){

//         $(".gnb").removeClass("mobMenuOpen");
//         $('body').removeClass('scrollLock');
//     });

//     $(window).resize(function(){
//         if (window.innerWidth > 940) {  // 다바이스 크기가 480이상일때
//             // $('.menu1 > a').mouseenter(function(){
//             //     $(this).next(".sub").stop().slideDown(400);
//             // });
//             // $('.gnbList').mouseleave(function(){
//             //     $(this).next(".sub").stop().slideUp(100);
//             // });
//             function pcmenuhover(){
//                 $('.menu1 > a').mouseenter(function(){
//                     // $(this).toggleClass('ongray').closest("li").siblings().children().removeClass('ongray');
//                     $('.sub').slideUp();
//                     if ($(this).next('.sub').is(':hidden')){
//                         $(this).next('.sub').slideDown(200);
//                         $('.dimmedLayer').show();
//                     } else{
//                         $(this).next('.sub').slideUp(200);
//                     }
//                     return false;
//                 });
//                 $('.menu1').mouseleave(function(){
//                     // $(this).toggleClass('active').closest("li").siblings().children().removeClass('active');
//                     $('.sub').hide();
//                     $('.dimmedLayer').hide(); 
//                     return false;
//                 });
                
//             };
        
//             pcmenuhover();

            
//             $(".btnSearchOpen").click(function(){

//             $(".gnb").removeClass("mobMenuOpen");
//             $(".totalSearchWrap").addClass("totalSearcopen");
//             $('.btnSearchOpen').hide();
//             // $(".header").css('border-bottom',' 0px solid');
//             // $(".menu1 > a").off('mouseenter');
//             $('.menu1 > a').off('mouseenter');
//             $('body').addClass('scrollLock');
//             $('.dimmedLayer').show();
//             });

//             $(".btnsearchclose").click(function(){

//             $(".totalSearchWrap").removeClass("totalSearcopen");
//             $('.btnSearchOpen').show();
//             $('body').removeClass('scrollLock');
//             $('.dimmedLayer').hide();
//             // $(".header").css('border-bottom',' 1px solid #000');
//             pcmenuhover();
//             // $(".menu1 > a").on('mouseenter');
//             // $('.sub').show();
//             });

//             let header = document.querySelector("header");
//             let headerHeight = header.offsetHeight;

//             window.onscroll = function () {
//             let windowTop = window.scrollY;
//             if (windowTop >= headerHeight) {
//                 header.classList.add("sticky");
//             } else {
//                 header.classList.remove("sticky");
//             }
//             };
//         } else {
//             $('.menu1 > a').click(function(){
//                 $(this).toggleClass('active').closest("li").siblings().children().removeClass('active');
//                 $('.sub').slideUp();
//                 if ($(this).next('.sub').is(':hidden')){
//                     $(this).next('.sub').slideDown(200);
//                 } else{
//                     $(this).next('.sub').slideUp(200);
//                 }

//                 return false;
//             });

//             $(".btnSearchOpen").click(function(){

//                 $(".gnb").removeClass("mobMenuOpen");
//                 $(".totalSearchWrap").addClass("totalSearcopen");
//                 $('.btnSearchOpen').hide();
//                 $(".header").css('border-bottom',' 0px solid');
//                 $('body').addClass('scrollLock');
//             });
        
//             $(".btnsearchclose").click(function(){
        
//                 $(".totalSearchWrap").removeClass("totalSearcopen");
//                 $('.btnSearchOpen').show();
//                 $(".header").css('border-bottom',' 1px solid #000');
//                 $('body').removeClass('scrollLock');
//             });
//         }
//     }).resize();



//     $(window).on('scroll', function() {
//         var scrollTop = $(document).scrollTop();
//         var $seasons_box = $('.mainabout .aboutimg_box');
//         var move_01 = scrollTop / 10;
//         var move_02 = scrollTop / 10;
//         var move_03 = scrollTop / 10;
//         var move_04 = scrollTop / 10;
//         $seasons_box.eq(0).find('.box').css({'transform':'translateY('+ move_01 +'px)'});
//         $seasons_box.eq(1).find('.box').css({'transform':'translateY('+ (-move_02) +'px)'});
//         $seasons_box.eq(2).find('.box').css({'transform':'translateY('+ move_03 +'px)'});
//         $seasons_box.eq(3).find('.box').css({'transform':'translateY('+ (-move_04) +'px)'});
//     });
    
    


//     var $cursor = $("#cursor"),
//         $cursor2 = $("#cursor2"),
//         $cursor3 = $("#cursor3");
    
//     $('.cont_newsletter').on("mousemove", function(event) {
//         $cursor.css({ left: event.clientX + "px", top: event.clientY + "px" });
//         $cursor2.css({ left: event.clientX + "px", top: event.clientY + "px" });
//         $cursor3.css({ left: event.clientX + "px", top: event.clientY + "px" });
//     });

//     function addHover() {
//         $cursor2.add($cursor3).addClass("hover hover-2");
//     }

//     function removeHover() {
//         $cursor2.add($cursor3).removeClass("hover hover-2");
//     }



//     removeHover();

//     $(".hover-target, .hover-target-2").hover(addHover, removeHover);

//     $('.img-1, .img-2, .img-3, .img-4').hover(function() {
//         var className = $(this).attr('class');
//         $('.cont_newsletter').addClass(className + '-wrap');
//     }, function() {
//         var className = $(this).attr('class');
//         $('.cont_newsletter').removeClass(className + '-wrap');
//     });


//     $('.cont_newsletter').on('mouseenter', function() {
//         $('.cont_newsletter [class^="cursor"]').css('display', 'block');
//     }).on('mouseleave', function() {
//         $('.cont_newsletter [class^="cursor"]').css('display', 'none');
//     });







//     // var controller = new ScrollMagic.Controller();

//     // var horizontalSlide = new TimelineMax()
//     // // animate panels
//     // .to("#js-slideContainer", 1,   {x: "-20%"})	
//     // .to("#js-slideContainer", 1,   {x: "-40%"})
//     // .to("#js-slideContainer", 1,   {x: "-60%"})
//     // .to("#js-slideContainer", 1,   {x: "-80%"})
  
  
//     // // create scene to pin and link animation
//     // new ScrollMagic.Scene({
//     //   triggerElement: "#js-wrapper",
//     //   triggerHook: "onLeave",
//     //   duration: "400%"
//     // })
//     //   .setPin("#js-wrapper")
//     //   .setTween(horizontalSlide)
//     //   //.addIndicators() // add indicators (requires plugin)
//     //   .addTo(controller);


// })


