/**
 * Класс UserWidget отвечает за
 * отображение информации о имени пользователя
 * после авторизации или его выхода из системы
 * */

class UserWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element){
    this.element = element;
    this.update();
  }

  /**
   * Получает информацию о текущем пользователе
   * с помощью User.current()
   * Если пользователь авторизован,
   * в элемент .user-name устанавливает имя
   * авторизованного пользователя
   * */
  update(){
    let user = User.current();
    if ( user?.name) {
      Array.from(document.getElementsByClassName('user-name'))[0].innerText = user.name;
    } else if (user) {
      // no name
      Array.from(document.getElementsByClassName('user-name'))[0].innerText = '';
    }
    
  }
}
