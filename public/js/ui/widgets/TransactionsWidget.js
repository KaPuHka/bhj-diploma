/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    this.element = element;
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
   
    this.element.querySelector('.create-income-button').addEventListener('click', (e) => {
      e.preventDefault();
      const form = document.getElementById('modal-new-income');
      new Modal(form).open();
    })

    this.element.querySelector('.create-expense-button').addEventListener('click', (e) => {
      e.preventDefault();
      const form = document.getElementById('modal-new-expense');
      new Modal(form).open();
    })

  }
}
