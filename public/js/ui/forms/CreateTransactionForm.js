/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let user = User.current();
    if (user?.id){
      Account.list({user_id: user.id}, (err, resp) => {
        if (resp?.data) {
          document.querySelectorAll('.accounts-select').forEach(list => {
            resp.data.forEach(option => {
              if(document.getElementById('o-'+ option.id) === null) {
                // <option value="${id}">${name}</option> 
                let op = document.createElement('option');
                op.setAttribute('value', option.id);
                op.setAttribute('id', 'o-'+ option.id);
                op.textContent = option.name;
                list.appendChild(op);
              }
            })
          })   
        }
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, resp) => {
      if (resp?.success) {
        this.element.reset();
        // data ? 
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
        App.update();
      } 
    });
  }
}