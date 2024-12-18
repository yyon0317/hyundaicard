웹접근성
skip만들기 


hedaer main footer 태그 사용


<header id="header" role="heading">
<main id="main" role="main"> 
<footer id="footer" role="contentinfo">

화면 크기가 줄어들면 media query를 이용하여 모바일용 메뉴도 만들었습니다. 
aria-controls와 aria-expanded 속성은 웹 접근성을 위한 속성입니다. 
aria-controls는 연관된 요소를 지정하고, aria-expanded는 토글 상태를 나타냅니다.

aria-controls="primary-menu" 
aria-expanded="false" 
role="button" 
tabindex="0"
배경 이미지는 꾸밈 요소로 사용되었기 때문에, 웹 접근성을 위해 "aria-hidden" 속성을 사용하였습니다.
aria-hidden="true" 속성을 추가하여 스크린 리더에게 이 요소들을 읽지 않도록 설정합니다.