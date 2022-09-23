/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    this.element = element;
    this.registerEvents();
    this.lastOptions = {account_id: null};
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.element.querySelector('.remove-account').onclick = e => {
      this.removeAccount();
    }
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
    // confirm();
    Account.remove({ id: this.lastOptions.account_id}, (err, resp) => {
      if (resp?.success) {
        App.updateWidgets();
        App.updateForms();
        this.clear();
      }
    });
    this.clear();
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
    // confirm() ???
      Transaction.remove({id: id}, (err, resp) => {
        if (resp?.success) {
          App.update();
        }
      });
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    // Если объект options не передан, метод не должен работать.
    if (options){
      this.lastOptions = options;
      this.clear();
      Account.get(options.account_id, (err, resp) => {
        if (resp?.data) {
          this.renderTitle(resp.data.name);
        }
      });
      Transaction.list({account_id:options.account_id}, (err, resp) => { 
        if (resp?.data) {
          this.renderTransactions(resp.data);
        } 
      });
    }
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = {account_id: null};
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    this.element.querySelector('.content-title').innerText = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    return date; 
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    let timeAndData = this.formatDate(item.created_at);
    return `<div class="transaction transaction_`+item.type +` row" id="transact-`+item.id+`">
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">`+item.name+`</h4>
          <!-- дата -->
          <div class="transaction__date">`+timeAndData+`</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">
      <!--  сумма -->
          `+item.sum+` <span class="currency">₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls" id="t-`+item.id+`">
    </div>
</div>`;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    if (data.length){
      data.forEach(transact => {
        if (document.getElementById('transact-'+transact.id) === null){
          this.element.insertAdjacentHTML('beforeend', this.getTransactionHTML(transact));
          // append button with addEventListener
          let me = document.getElementById('t-'+transact.id);
    
          if (me.querySelector('button') === null){
            let btn = document.createElement('button');
            btn.setAttribute("class", "btn btn-danger transaction__remove");
            btn.setAttribute("data-id", transact.id);
            btn.addEventListener('click', (e) => {
              e.preventDefault();
              this.removeTransaction(transact.id);
            })
            let i = document.createElement('i');
            i.setAttribute("class", "fa fa-trash");
            btn.appendChild(i);
            me.appendChild(btn);
          }
        }
      })
    } else {
      this.element.querySelectorAll('.transaction').forEach(el => el.remove());
    }
    
  }
}