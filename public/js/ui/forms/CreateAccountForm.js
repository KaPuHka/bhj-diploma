/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (err, resp) => {
      if (resp?.success) {
        this.element.reset();
      }
    });
    App.update();
    const regnew = document.getElementById('modal-new-account');
    new Modal(regnew).close();
  }
}