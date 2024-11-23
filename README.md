# Уведомление о состоянии сети

Этот проект демонстрирует, как отображать уведомления о состоянии сети (онлайн/оффлайн) с помощью JavaScript, HTML и CSS. При изменении состояния сети пользователю будет показываться соответствующее уведомление.

## Оглавление

- [Описание](#описание)
- [Функции](#функции)
- [Использование](#использование)
- [Пример кода](#пример-кода)
- [Технологии](#технологии)

## Описание

Данный проект включает в себя уведомление (toast), которое информирует пользователя о доступности интернет-соединения. Уведомление отображается, когда устройство переходит в оффлайн или онлайн. Оно автоматически скрывается через несколько секунд или может быть закрыто вручную пользователем.

## Функции

- **Проверка состояния сети**: Каждые 1000 миллисекунд выполняется AJAX-запрос к фейковому API.
- **Уведомление о состоянии**: При успешном ответе отображается сообщение о том, что устройство подключено к интернету, а в случае ошибки — уведомление о том, что соединение отсутствует.
- **Автоматическое скрытие уведомления**: Уведомление скрывается через 5 секунд после его показа.
- **Закрытие уведомления**: Пользователь может закрыть уведомление вручную с помощью кнопки.

## Использование

1. Скопируйте файлы проекта на свой локальный сервер.
2. Откройте HTML-файл в браузере.
3. Следите за уведомлениями об изменении состояния сети (онлайн/оффлайн).

Убедитесь, что у вас включено интернет-соединение для корректной работы AJAX-запросов.

## Пример кода

Вот пример кода, который отвечает за отображение и скрытие уведомлений, а также проверку сетевого состояния:

```javascript
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
            if (xhr.status >= 200 && xhr.status < 300) {
                if (!isOnline && !isToastVisible) {
                    showOnlineToast();
                }
                isOnline = true; 
            } else {
                offline(); // вызов функции offline
            }
        }
        
        xhr.onerror = () => {
            offline(); // вызов функции offline
        }
        
        xhr.send(); // отправка GET-запроса
    }

    function showOnlineToast() {
        toast.classList.remove("offline");
        title.innerText = "Вы сейчас в онлайне";
        subTitle.innerText = "Ура! Интернет подключён.";
        wifiIcon.innerHTML = '<i class="uil uil-wifi"></i>'; 
        wrapper.classList.remove("hide");
        isToastVisible = true; 
        setTimeout(hideToast, 5000); 
    }

    function offline() { 
        if (isOnline && !isToastVisible) {
            wrapper.classList.remove("hide");
            toast.classList.add("offline");
            title.innerText = "Вы сейчас оффлайн";
            subTitle.innerText = "Упс! Интернет отключён.";
            wifiIcon.innerHTML = '<i class="uil uil-wifi-slash"></i>'; 
            isToastVisible = true; 
            isOnline = false; 
        }
    }

    setInterval(() => {
        ajax();
    }, 1000); 
}
```

## Технологии

- HTML
- CSS
- JavaScript

## Лицензия

Этот проект является открытым и доступен для использования, изменения и распространения.
