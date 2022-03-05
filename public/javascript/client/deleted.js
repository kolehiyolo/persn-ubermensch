console.log(`RUNNING deleted.js`);

let deletedJS = {};

$(`.header--navbar--menu--ul--li--button--deleted`).addClass(`header--navbar--menu--ul--li--mode__active`);

deletedJS.buildAllDeletedHTML = (deletedPosts) => {
    let result = ``;

    deletedPosts.forEach((item, index) => {
        let HTML = `<div class='main--deleted--post'>`;
        HTML += `<i>${item._id}</i>`;
        HTML += `<h2>${item.title}</h2>`;
        HTML += `<h3>${item.date.date.code}</h3>`;
        HTML += `<p>${item.body}</p>`;
        HTML += `<form action="/restore/${item._id}" method="POST" class="main--post--buttons--edit form-group">`;
        HTML += `<button class="btn btn-primary" name="submit" type="submit">Restore</button>`;
        HTML += `</form>`;
        HTML += `<form action="/permadelete/${item._id}" method="POST" class="main--post--buttons--edit form-group">`;
        HTML += `<button class="btn btn-primary" name="submit" type="submit">Delete</button>`;
        HTML += `</form>`;
        HTML += `</div>`;

        result += HTML;
    });

    $(`.main--deleted`).html(result);
};

deletedJS.buildAllDeletedHTML(deletedDB);