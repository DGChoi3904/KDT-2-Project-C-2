//* 태그를 만드는 함수
const MKTag = (tagName,target,Attribute,innerText)=>{
  const tag = document.createElement(tagName);
  target.appendChild(tag);
  if (Attribute && typeof(Attribute)==='object') {
    for (p in Attribute) {
      tag.setAttribute(p,Attribute[p]);
    }
  }
  if (innerText) {
    tag.innerText = innerText;
  }
}

//* 컨테이너 변수에 할당
const container = document.getElementById('container');


// * 컨테이너 영역 분할
for (i=0; i<4; i++) {
  MKTag('div',container)
}

// * 로고, Form태그, 계정찾기/회원가입, 버튼
const login_logo       = container.children[0];
const login_form       = container.children[1];
const login_findORJoin = container.children[2];
const login_button     = container.children[3];
login_logo.innerHTML   = '<h3 style="color:gray;">로고 들어갈 곳</h3>';

function makeLoginForm() {
  //* h1 생성
  MKTag('h1',login_form,{},'로그인');
  
  //* 폼 태그 생성
  let Attri = {
    'id'     : 'loginForm',
    'action' : 'checkLogin',
    'method' : 'POST'
  }
  MKTag('form',login_form,Attri);
  const form = document.getElementsByTagName('form')[0]

  //* 아이디, 비밀번호 인풋 생성
  for (i=0; i<2; i++) {
    if (i===0) {
      let Attri = {
        'type'        : 'text',
        'name'        : 'UserID',
        'placeholder' : '아이디를 입력해 주세요.'
      }
      MKTag('input',form,Attri)
    }
    if (i===1) {
      let Attri = {
        'type'        : 'password',
        'name'        : 'UserPW',
        'placeholder' : '비밀번호를 입력해 주세요.'
      }
      MKTag('input',form,Attri);
    }
  }

  //* 버튼 생성
  for (i=0; i<2; i++) {
    if (i===0) {
      let Attri = {
        'type'    : 'button',
        'value'   : '돌아가기',
      }
      MKTag('input',login_button,Attri);
    }
    if (i===1) {
      let Attri = {
        'type'  : 'submit',
        'value' : '로그인',
      }
      MKTag('input',login_button,Attri);
    }
  }
  
  //* 계정 찾기 / 계정
  for (i=0; i<2; i++) {
    if (i===0) {
      MKTag('a',login_findORJoin,{'href':'../HTML/findAccount.html'},'계정을 잊으셨나요?')
    }
    if (i===1) {
      MKTag('a',login_findORJoin,{'href':'../HTML/createAccount.html'},'회원가입')
    }
    form.appendChild(login_findORJoin);
    form.appendChild(login_button);
  }
}
makeLoginForm();

document.getElementsByTagName('input')[2].addEventListener('click',()=>{history.go(-1)})