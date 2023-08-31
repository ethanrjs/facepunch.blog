// on load, fetch /changelogs
// for each, fetch /changelog/name
// append html to <main>

const main = document.querySelector('main');

async function fetchChangelogs() {
    const res = await fetch('/changelogs');
    const json = await res.json();

    return json;
}

async function fetchChangelog(name) {
    const res = await fetch(`/changelog/${name}`);
    const text = await res.text();

    return text;
}

async function loadChangelogs() {
    const changelogs = await fetchChangelogs();

    for (const changelog of changelogs) {
        const html = await fetchChangelog(changelog);

        main.innerHTML += html;
    }
}

loadChangelogs();
