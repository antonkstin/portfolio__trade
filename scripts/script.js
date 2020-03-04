// Класс для взаимодействия с круглыми блоками
class Circles {
  constructor() {
    this.blocks = [ {name: '_trade', isActive: false}, {name: '_invest', isActive: false}, {name: '_attract', isActive: false} ]
    this.container = document.querySelector('.choose__circles');
  }

  // Включение/выключение блока для логики
  changeIsActive(elem) {
    elem.isActive ? elem.isActive = false : elem.isActive = true;
  }



  // ПК ВЕРСИЯ ---------------------

  // Изменение стиля меню
  activateMenu() {
    for(let elem of this.blocks) {
      let block = document.querySelector(`.type__navigation-menu${elem.name}`);
      elem.isActive ? block.classList.add('type__navigation-menu_active') : undefined;
    }
  }

  // Изменение текстового блока
  activateContent() {
    for(let elem of this.blocks) {
      let block = document.querySelector(`.type__content${elem.name}`);
      elem.isActive ? block.classList.add('type__content_active') : undefined;
    }
  }

  // Сброс всех стилей "выбора" перед отрисовкой нового выбора
  reset() {
    for(let elem of this.blocks) {
      document.querySelector(`.type__navigation-menu${elem.name}`).classList.remove('type__navigation-menu_active');
      document.querySelector(`.type__content${elem.name}`).classList.remove('type__content_active');
      elem.isActive = false;
    }
  }



  // МОБИЛЬНАЯ ВЕРСИЯ --------------

  // Показ/скрытие текстового блока
  onOffContent() {
    for(let elem of this.blocks) {
      let block = document.querySelector(`.type__content${elem.name}`);
      elem.isActive ? block.classList.add('type__content_active') : block.classList.remove('type__content_active');
    }
  }

  // Смена желтого фона
  checkActivity() {
    let counter = 0;
    for(let elem of this.blocks) {
      if(elem.isActive) {counter++}
    }
    let block = document.querySelector('.choose');
    let margin = document.querySelector('.choose__circles');
    counter ? block.setAttribute('style', 'background: #f3f2da;') : block.removeAttribute('style');
    counter ? margin.setAttribute('style', 'margin-bottom: 50px;') : margin.removeAttribute('style');
  }

  // Изменение положения открывающей/закрывающей стрелочки
  changeDirectionArrow() {
    for(let elem of this.blocks) {
      let block = document.querySelector(`.choose__circle${elem.name} .choose__circle-arrow`);
      elem.isActive ? block.classList.add('choose__circle-arrow_active') : block.classList.remove('choose__circle-arrow_active');
    }
  }

}



const circles = new Circles;
circles.container.addEventListener('click', function(event){
  for(let elem of circles.blocks) {

    // Мобильная версия
    if(event.target.classList.contains(`choose__circle${elem.name}`) && document.documentElement.clientWidth <= 1000) {
      circles.changeIsActive(elem);
      circles.onOffContent();
      circles.changeDirectionArrow();
      circles.checkActivity();
    }
    // ПК версия
    else if(event.target.classList.contains(`choose__circle${elem.name}`)) {
      circles.reset();
      circles.changeIsActive(elem);
      circles.activateMenu();
      circles.activateContent();
    }

  }
});


function changeTexts() {
  const buttonText = document.querySelector('.type__button');
  const circleText = document.querySelector('.choose__circle_trade .choose__circle-title');
  if(buttonText.textContent === 'Продолжить'){
    for(let elem of circles.blocks){
      document.querySelector(`.type__content${elem.name} .type__button`).textContent = 'Открыть счет';
    }
    circleText.textContent = 'Самостоятельно торговать';
  } else {
    for(let elem of circles.blocks){
      document.querySelector(`.type__content${elem.name} .type__button`).textContent = 'Продолжить';
    }
    circleText.textContent = 'Торговать';
  }
}



// Отрисовка блоков если изначально открыли на мобильной версии
if(document.documentElement.clientWidth <= 1000) {
  window.addEventListener('resize', jumpUp);
  for(let elem of circles.blocks) {
    document.querySelector(`.choose__circle${elem.name}`).insertAdjacentElement('afterend', document.querySelector(`.type__content${elem.name}`));
  }
  changeTexts();
} else {
  window.addEventListener('resize', jumpDown);
}

// Смена расположения блоков, если перешли из ПК версии в мобильную
function jumpDown() {
  if(document.documentElement.clientWidth <= 1000) {
    for(let elem of circles.blocks) {
      document.querySelector(`.choose__circle${elem.name}`).insertAdjacentElement('afterend', document.querySelector(`.type__content${elem.name}`));
    }
    circles.checkActivity();
    circles.changeDirectionArrow();
    window.removeEventListener('resize', jumpDown);
    window.addEventListener('resize', jumpUp);
    changeTexts();
  }
}

// Смена расположения блоков, если перешли из мобильной версии в ПК
function jumpUp() {
  if(document.documentElement.clientWidth > 1000) {
    for(let elem of circles.blocks) {
      document.querySelector(`.type`).insertAdjacentElement('beforeend', document.querySelector(`.type__content${elem.name}`));
    }
    circles.reset();
    circles.checkActivity();
    window.removeEventListener('resize', jumpUp);
    window.addEventListener('resize', jumpDown);
    changeTexts();
  }
}