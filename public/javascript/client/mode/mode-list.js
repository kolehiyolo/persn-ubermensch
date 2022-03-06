let modeListJS = {};

modeListJS.buildPageHTML = () => {
    $(`.main`).html(``);

    let sortedPosts = modeListJS.sortByDate(entryDB);

    // console.log(`sortedPosts:`);
    // console.log(sortedPosts);

    // sortedPosts.forEach((post, index) => {
    //     // console.log(`${index} = ${post.title} ${post.date.date.code}`);
    // })

    function postsDiv(sortedPosts) {
        let result = ``;
        result += `<div class="main--list">`;
        sortedPosts.forEach((post, index) => {
            let classList = `main--list--item-${index} main--list--item`;
            let innerResult = ``;
            innerResult += `<div class="${classList}">`;

            innerResult += `<div class="${classList}--upper">`;
            innerResult += `<p class="${classList}--upper--date">${post.date.date.year} ${post.date.date.string.slice(0,3)} ${post.date.date.date}</p>`;
            innerResult += `<p class="${classList}--upper--title">${post.title}</p>`;
            innerResult += `<div class="${classList}--upper--buttons">
                                <form action="/edit/${post.date.date.code}" method="GET" class="${classList}--upper--buttons--edit form-group">
                                    <button class="btn btn-primary" name="submit" type="submit">Edit</button>
                                </form>
                                <form action="/delete/${post.date.date.code}" method="POST" class="${classList}--upper--buttons--delete form-group">
                                    <button class="btn btn-primary" name="draft" type="submit">Delete</button>
                                </form>
                            </div>`;
            innerResult += `</div>`;

            innerResult += `<div class="${classList}--lower">`;
            innerResult += `<p class="${classList}--lower--body">${text.ellipsize(post.body)}</p>`;
            innerResult += `</div>`;

            innerResult += `</div>`;

            result += innerResult;
        });
        result += `</div>`;
        return result;
    }

    $(`.main`).html(postsDiv(sortedPosts));
};

modeListJS.sortByDate = (posts) => {
    // console.log(posts);

    let result = [JSON.parse(JSON.stringify(posts[0]))];
    // console.log(`result`); 
    // console.log(result); 
    // // console.log(posts.length); 
    // // console.log(result[0].date.date.year); 
    for (let i = 1; i < posts.length; i++) {
        let matchFound = false
        for (let j = 0; j < result.length && matchFound === false; j++) {
            // console.log(`${i} = ${posts[i].title} ${posts[i].date.date.code}`); 
            if (posts[i].date.date.year < result[j].date.date.year) {
                result.splice(j, 0, posts[i]);
                matchFound = true;
            } else if (posts[i].date.date.year === result[j].date.date.year) {
                if (posts[i].date.date.month < result[j].date.date.month) {
                    result.splice(j, 0, posts[i]);
                    matchFound = true;
                } else if (posts[i].date.date.month === result[j].date.date.month) {
                    if (posts[i].date.date.date < result[j].date.date.date) {
                        result.splice(j, 0, posts[i]);
                        matchFound = true;
                    }
                }
            }
        }
        if (matchFound === false) {
            result.push(posts[i]);
        }
    }

    return result;
}