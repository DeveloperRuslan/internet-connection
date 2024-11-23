// Выбор всех необходимых элементов
const wrapper = document.querySelector(".wrapper"),
toast = wrapper.querySelector(".toast"),
title = toast.querySelector("span"),
subTitle = toast.querySelector("p"),
wifiIcon = toast.querySelector(".icon"),
closeIcon = toast.querySelector(".close-icon");

let isToastVisible = false; // Флаг для отслеживания состояния уведомления
let isOnline = true; // Флаг для отслеживания состояния сети (онлайн/оффлайн)

// Функция для закрытия уведомления
function hideToast() {
    wrapper.classList.add("hide");
    isToastVisible = false; // Установим флаг на false, когда уведомление закрыто
}

// Устанавливаем обработчик на кнопку закрытия
closeIcon.onclick = hideToast;

// Функция, вызывающаяся при загрузке окна
window.onload = () => {
    function ajax() {
        let xhr = new XMLHttpRequest(); // создание нового объекта XMLHttpRequest
        xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true); // отправка GET-запроса по указанному URL
        
        xhr.onload = () => { // когда AJAX-запрос завершен
            // Проверка статуса ответа
            if (xhr.status >= 200 && xhr.status < 300) {
                if (!isOnline && !isToastVisible) { // Проверяем, было ли уведомление о оффлайне показано
                    showOnlineToast();
                }
                isOnline = true; // Устанавливаем флаг на онлайн
            } else {
                offline(); // вызов функции offline, если статус не 200
            }
        }
        
        xhr.onerror = () => {
            offline(); // вызов функции offline, если произошла ошибка запроса (например, 404)
        }
        
        xhr.send(); // отправка GET-запроса на указанный URL
    }

    function showOnlineToast() {
        toast.classList.remove("offline"); // Удаляем класс 'offline' у тоста
        title.innerText = "Вы сейчас в онлайне"; // изменение текста заголовка
        subTitle.innerText = "Ура! Интернет подключён."; // изменение текста подзаголовка
        wifiIcon.innerHTML = '<i class="uil uil-wifi"></i>'; // отображение иконки Wi-Fi
        wrapper.classList.remove("hide"); // показываем обертку
        isToastVisible = true; // Устанавливаем флаг на true
        setTimeout(hideToast, 5000); // автоматическое скрытие уведомления через 5 секунд
    }

    function offline() { // функция для обработки оффлайна
        if (isOnline && !isToastVisible) { // Проверяем, было ли уведомление о онлайне показано
            wrapper.classList.remove("hide"); // отображение обертки
            toast.classList.add("offline"); // добавление класса 'offline' к тосту
            title.innerText = "Вы сейчас оффлайн"; // изменение текста заголовка
            subTitle.innerText = "Упс! Интернет отключён."; // изменение текста подзаголовка
            wifiIcon.innerHTML = '<i class="uil uil-wifi-slash"></i>'; // отображение иконки разорванного Wi-Fi
            isToastVisible = true; // Устанавливаем флаг на true
            isOnline = false; // Устанавливаем флаг на оффлайн
        }
    }

    setInterval(() => { // эта функция setInterval вызывает ajax через каждые 1000 мс
        ajax();
    }, 1000); 
}
