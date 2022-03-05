let calendarDateJS = {};

calendarDateJS.buildPageHTML = () => {
    $(`.main--calendar--carousel--inner`).html(``);

    function calendarDiv() {
        let result = ``;

        for (let i = 0; i < 3; i++) {
            let classList = `main--calendar--carousel--inner--item carousel-item carousel-item-${i}`;
            result += `<div class="${classList}">`;
            result += `<div class="main--calendar--carousel--inner--item--date">`;
            result += `<div class="main--calendar--carousel--inner--item--date--center">`;
            result += `<h2>Date ${i}</h2>`;
            result += `</div>`;
            result += `</div>`;
            result += `</div>`;
        }

        return result;
    }

    $(`.main--calendar--carousel--inner`).html(calendarDiv());
    $(`.carousel-item-0`).addClass(`active`);
};
