const numGifs = 25;

const app = new PIXI.Application();
await app.init({
    width: window.innerHeight,
    height: window.innerHeight,
    backgroundAlpha: 0,
    resizeTo: window,
});
document.body.appendChild(app.canvas);

const image = await PIXI.Assets.load("herta.gif");

function createHerta() {
    let herta = image.clone();

    const size = Math.random() * 150 + 50;
    herta.width = size;
    herta.height = size;

    herta.x = app.screen.width + Math.random() * app.screen.width;
    herta.y = Math.random() * (app.screen.height - size);

    herta.speed = ((200 - size) / 150) * 2 + 1;

    app.stage.addChild(herta);
}

function gameLoop(ticker) {
    app.stage.children.forEach((herta) => {
        herta.x -= herta.speed * ticker.deltaTime;
        if (herta.x < -herta.width) {
            app.stage.removeChild(herta);
            createHerta();
        }
    });
}

for (let i = 0; i < numGifs; i++) {
    createHerta();
}

app.ticker.add(gameLoop);
