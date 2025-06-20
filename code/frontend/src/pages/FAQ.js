import '../fonts/fonts.css';
import Beauty from "../img/beauty.svg";

const Main = () => {
  return (
    <div style={styles.container}>
        <section style={styles.section1}>
            <h1 style={styles.h1}>Регистрация и аккаунт</h1>
            <div>
                <h2 style={styles.h2}>1. Как зарегистрироваться на сайте?</h2>
                <h3 style={styles.h3} >Всё очень просто. Перейдите на главную страницу → нажмите «Войти» → «Зарегистрироваться» введите необходимые данные → подтвердите регистрацию через ссылку в письме.</h3>
            </div>

            <div>
                <h2 style={styles.h2} >2. Не приходит письмо для подтверждения email. Что делать?</h2>
                <h3 style={styles.h3} >Проверьте папку «Спам». Если письма нет, запросите повторную отправку в разделе «Настройки аккаунта» → «Подтвердить email».</h3>
            </div>

            <div>
                <h2 style={styles.h2}>3. Могу ли я отредактировать свой профиль?</h2>
                <h3 style={styles.h3} >Конечно! После авторизации нажмите кнопку «Профиль» в верхнем меню сайта → измените имя, фото, контактные данные или другие поля → сохраните изменения.</h3>
            </div>

            <h1 style={{...styles.h1, marginTop: "80px"}}>Мероприятия</h1>

            <div>
                <h2 style={styles.h2}>4. Где я могу посмотреть доступные мероприятия?</h2>
                <h3 style={styles.h3} >Нажмите кнопку «Мероприятия». Вы увидите все доступные мероприятия. Вы так же можете отсортировать в зависимости предпочтений, даты, места проведения и т.д.</h3>
            </div>

            <div>
                <h2 style={styles.h2}>5. Как создать мероприятие?</h2>
                <h3 style={styles.h3} >Авторизуйтесь → нажмите «Профиль» → нажмите «Создать мероприятие» →  заполните необходимые данные → нажмите «Создать». После модерации оно появится в каталоге.</h3>
            </div>

            <div>
                <h2 style={styles.h2}>6. Можно ли отредактировать мероприятие после публикации?</h2>
                <h3 style={styles.h3} >Да! Зайдите в «Профиль» → выберите «Организованные мероприятия» → выберите желаемое мероприятие → внесите изменения → сохраните.</h3>
            </div>

            <div>
                <h2 style={styles.h2}>7. Как отменить мероприятие?</h2>
                <h3 style={styles.h3} >Авторизуйтесь → нажмите «Профиль» →выберите «Организованные мероприятия» → выберите желаемое мероприятие→ нажмите значок мусорного бака→ подтвердите действие. Участники получат уведомление.</h3>
            </div>
        </section>
        <div style={styles.div}>
            <section style={styles.section2}>
                <h2 style={styles.h2}>Вопросы для вас</h2>

                <h3 style={styles.h3} >Как дела?</h3>
                <h3 style={styles.h3} >Всё ли успеваете, что хотели?</h3>
                <h3 style={styles.h3} >Мы очень вами гордимся!</h3>
            </section>

            <section style={styles.section3}>
                <img src={Beauty}/>
            </section>
        </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Montserrat",
    display: "flex",
    gap: "149px",
    
  },

  section1: {
    width: "1000px",
    height: "1444px",
    marginLeft: "160px",
    marginRight: "220px",
    marginBottom: "300px"
  },

  section2: {
    width: "400px",
    height: "233px",
    marginTop: "auto",

  },

  section3: {
    width: "486px",
    height: "334px",
  },

  div: {
    display: "flex",
    flexDirection: "column",
    gap: "77px",
  },

  h1: {
    fontSize: "28px",
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: "2px",
    color: "#20516F",
  },

  h2: {
    fontSize: "28px",
    fontWeight: "600",
    lineHeight: "41.15px",
    color: "#20516F",
  },

  h3: {
    fontSize: "24px",
    fontWeight: "500",
    lineHeight: "39.5px",
    paddingLeft: "21px",
    color: "#3D6D8E"
  },

};

export default Main;